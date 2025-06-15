import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType } from '@/types/auth';
import { authService } from '@/services/authService';
import { createMockSession } from '@/utils/sessionUtils';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

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
    const handleEmailConfirmation = async () => {
      // Check if we have confirmation tokens in the URL hash
      const hash = window.location.hash.substring(1);
      const hashParams = new URLSearchParams(hash);
      
      const access_token = hashParams.get('access_token');
      const refresh_token = hashParams.get('refresh_token');
      const token_type = hashParams.get('token_type');
      const type = hashParams.get('type');
      
      console.log('Checking for confirmation tokens:', { access_token: !!access_token, refresh_token: !!refresh_token, type });
      
      if (access_token && refresh_token && (type === 'signup' || token_type === 'bearer')) {
        console.log('Found confirmation tokens, setting session');
        
        try {
          const { data, error } = await supabase.auth.setSession({
            access_token,
            refresh_token
          });
          
          if (error) {
            console.error('Error setting session:', error);
            toast.error('Email confirmation failed. Please try again.');
          } else {
            console.log('Session set successfully from confirmation tokens');
            toast.success('Email confirmed successfully! Welcome to Airbnb Clone+! 🎉');
            
            // Clear the hash from URL
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
            
            // Set the session state
            setSession(data.session);
            setUser(data.session?.user ?? null);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.error('Unexpected error during confirmation:', err);
          toast.error('An unexpected error occurred during confirmation.');
        }
      }
    };

    // Handle email confirmation first
    handleEmailConfirmation();

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
    setLoading(true);
    try {
      const result = await authService.signUp(email, password, fullName);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await authService.signIn(email, password);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const generateOTP = async (name: string) => {
    setLoading(true);
    try {
      const result = await authService.generateOTP(name);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const validateOTP = async (name: string, otpCode: string) => {
    setLoading(true);
    try {
      const result = await authService.validateOTP(name, otpCode);
      
      if (!result.error) {
        // Set the user state to simulate being logged in
        const { user: mockUser, session: mockSession } = createMockSession(name);
        setUser(mockUser);
        setSession(mockSession);
      }
      
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await authService.signOut();
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
