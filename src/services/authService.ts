import { supabase } from '@/integrations/supabase/client';

export const authService = {
  async signUp(email: string, password: string, fullName: string) {
    try {
      console.log('Signing up user:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: window.location.origin.includes('localhost') 
            ? 'http://localhost:8080/' 
            : `${window.location.origin}/`,
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
    }
  },

  async signIn(email: string, password: string) {
    try {
      console.log('Signing in user:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error);
        return { error };
      }
      
      console.log('Sign in successful:', data);
      return { error: null };
    } catch (error) {
      console.error('Error in signIn:', error);
      return { error };
    }
  },

  async signInWithGoogle() {
    try {
      console.log('Starting Google sign in process');
      
      const origin = window.location.origin;
      const redirectTo = origin.includes('localhost') 
        ? 'http://localhost:8080/' 
        : `${origin}/`;
      
      console.log('Google sign in redirect URL:', redirectTo);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          skipBrowserRedirect: true, // Prevent redirect inside iframe
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        },
      });
      
      if (error) {
        console.error('Google sign in error:', error);
        return { error };
      }
      
      const url = data?.url;
      if (url) {
        // Navigate the TOP window to avoid "accounts.google.com refused to connect" in iframes
        try {
          if (window.top) {
            (window.top as Window).location.href = url;
          } else {
            window.location.href = url;
          }
        } catch (e) {
          console.warn('Top-level navigation blocked, falling back to same window:', e);
          window.location.href = url;
        }
        return { error: null };
      }
      
      console.warn('No OAuth URL returned from Supabase.');
      return { error: { message: 'OAuth URL not generated' } } as any;
    } catch (error) {
      console.error('Error in signInWithGoogle:', error);
      return { error };
    }
  },

  async generateOTP(name: string) {
    try {
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
    }
  },

  async validateOTP(name: string, otpCode: string) {
    try {
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
      
      console.log('OTP validation successful');
      return { error: null, validationResult };
    } catch (error) {
      console.error('Error in validateOTP:', error);
      return { error };
    }
  },

  async signOut() {
    try {
      console.log('Signing out user');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        throw error;
      }
      console.log('Sign out successful');
    } catch (error) {
      console.error('Error in signOut:', error);
      throw error;
    }
  }
};
