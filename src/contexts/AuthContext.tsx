import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  generateOTP: (name: string) => Promise<{ error: any; expiresAt?: string }>;
  validateOTP: (name: string, otpCode: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);
      
      console.log('Signing up user:', email);
      
      // Get the correct redirect URL based on current environment
      const getRedirectUrl = () => {
        // If we're in development and running on port 8080 (Vite default)
        if (window.location.hostname === 'localhost' && window.location.port === '8080') {
          return `${window.location.protocol}//${window.location.hostname}:${window.location.port}/auth/confirm`;
        }
        // For deployed apps or other local setups
        return `${window.location.origin}/auth/confirm`;
      };
      
      const redirectUrl = getRedirectUrl();
      console.log('Using redirect URL:', redirectUrl);
      
      // Sign up with Supabase - this will automatically send a confirmation email
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: redirectUrl,
        },
      });
      
      if (error) {
        console.error('Sign up error:', error);
        return { error };
      }
      
      console.log('Sign up successful:', data);
      return { error: null };
    } catch (error) {
      console.error('Error in signUp:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error);
      }
      
      return { error };
    } catch (error) {
      console.error('Error in signIn:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const generateOTP = async (name: string) => {
    try {
      setLoading(true);
      
      console.log('Generating OTP for:', name);
      
      const { data, error } = await supabase.rpc('generate_otp', {
        user_name: name
      });
      
      if (error) {
        console.error('OTP generation error:', error);
        return { error };
      }
      
      console.log('OTP generated successfully:', data);
      return { error: null, expiresAt: data[0]?.expires_at };
    } catch (error) {
      console.error('Error in generateOTP:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const validateOTP = async (name: string, otpCode: string) => {
    try {
      setLoading(true);
      
      console.log('Validating OTP for:', name);
      
      const { data, error } = await supabase.rpc('validate_otp', {
        user_name: name,
        provided_otp: otpCode
      });
      
      if (error) {
        console.error('OTP validation error:', error);
        return { error };
      }
      
      const validationResult = data[0];
      
      if (!validationResult?.valid) {
        return { error: { message: validationResult?.message || 'Invalid OTP' } };
      }
      
      // Create a temporary user session for OTP-based login
      // Note: This is a simplified approach. In production, you might want to 
      // create actual user accounts or use a different authentication flow
      const tempUser = {
        id: `otp-${name}`,
        email: `${name}@otp.local`,
        user_metadata: { full_name: name, auth_method: 'otp' }
      };
      
      // For OTP login, we'll create a mock session
      const mockSession = {
        access_token: `otp-token-${Date.now()}`,
        refresh_token: `otp-refresh-${Date.now()}`,
        expires_in: 3600,
        token_type: 'bearer',
        user: tempUser
      };
      
      // Set the user state to simulate being logged in
      setUser(tempUser as any);
      setSession(mockSession as any);
      
      console.log('OTP validation successful');
      return { error: null };
    } catch (error) {
      console.error('Error in validateOTP:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
      }
    } catch (error) {
      console.error('Error in signOut:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    generateOTP,
    validateOTP,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
