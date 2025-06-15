
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useEmailConfirmation } from './useEmailConfirmation';

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { handleEmailConfirmation } = useEmailConfirmation();

  useEffect(() => {
    const initializeAuth = async () => {
      // Handle email confirmation first
      const confirmationResult = await handleEmailConfirmation();
      
      if (confirmationResult.success && confirmationResult.session) {
        setSession(confirmationResult.session);
        setUser(confirmationResult.session?.user ?? null);
        setLoading(false);
        return;
      }

      // Get initial session if no confirmation happened
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    initializeAuth();

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
  }, [handleEmailConfirmation]);

  return {
    user,
    session,
    loading,
    setUser,
    setSession,
    setLoading
  };
};
