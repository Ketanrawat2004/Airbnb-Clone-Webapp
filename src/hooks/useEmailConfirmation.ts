
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useEmailConfirmation = () => {
  const handleEmailConfirmation = useCallback(async () => {
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
          return { success: false, session: null };
        } else {
          console.log('Session set successfully from confirmation tokens');
          toast.success('Email confirmed successfully! Welcome to Airbnb Clone+! 🎉');
          
          // Clear the hash from URL
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
          
          return { success: true, session: data.session };
        }
      } catch (err) {
        console.error('Unexpected error during confirmation:', err);
        toast.error('An unexpected error occurred during confirmation.');
        return { success: false, session: null };
      }
    }
    
    return { success: false, session: null };
  }, []);

  return { handleEmailConfirmation };
};
