
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import AuthConfirmLoading from '@/components/auth/AuthConfirmLoading';
import AuthConfirmError from '@/components/auth/AuthConfirmError';
import AuthConfirmSuccess from '@/components/auth/AuthConfirmSuccess';

const AuthConfirm = () => {
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoRedirecting, setAutoRedirecting] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        setLoading(true);

        // Mobile-specific logging
        console.log('[AuthConfirm] Mobile device detected:', isMobile);
        console.log('[AuthConfirm] User agent:', navigator.userAgent);

        // First, check URL search parameters (query string with ?)
        let token_hash = searchParams.get('token_hash');
        let type = searchParams.get('type');
        let access_token = searchParams.get('access_token');
        let refresh_token = searchParams.get('refresh_token');

        // For debugging: log all search params
        console.log('[AuthConfirm] Query params:', {
          token_hash,
          type,
          access_token,
          refresh_token,
          queryString: window.location.search,
          hash: window.location.hash,
          fullUrl: window.location.href
        });

        // If not found in search params, check URL fragments (hash with #)
        if (!token_hash && !access_token) {
          const hash = window.location.hash.substring(1); // Remove the # symbol
          const hashParams = new URLSearchParams(hash);

          token_hash = hashParams.get('token_hash');
          type = hashParams.get('type');
          access_token = hashParams.get('access_token');
          refresh_token = hashParams.get('refresh_token');

          console.log('[AuthConfirm] Extracted from hash:', {
            token_hash, type, access_token, refresh_token, fullHash: window.location.hash
          });
        }

        console.log('[AuthConfirm] Final params after fragment merge:', {
          token_hash, type, access_token, refresh_token
        });

        let sessionSet = false;

        // If we have access_token and refresh_token, set the session directly
        if (access_token && refresh_token) {
          console.log('[AuthConfirm] Found access_token/refresh_token, setting session with Supabase');
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token,
            refresh_token
          });

          if (sessionError) {
            console.error('[AuthConfirm] Session error:', sessionError);
            setError(`Session error: ${sessionError.message}`);
          } else {
            console.log('[AuthConfirm] Session set successfully:', data);
            sessionSet = true;
            setConfirmed(true);

            // Clear the URL hash to remove sensitive tokens
            window.history.replaceState(null, '', window.location.pathname);
          }
        }
        // If we have token_hash and type, verify with OTP
        else if (token_hash && type) {
          console.log('[AuthConfirm] Attempting OTP verification');
          const { data, error: verifyError } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as any
          });

          if (verifyError) {
            console.error('[AuthConfirm] OTP verification error:', verifyError);
            if (verifyError.message.includes('expired') || verifyError.message.includes('invalid')) {
              setError('This confirmation link has expired or is invalid. Please try signing up again to receive a new confirmation email.');
            } else {
              setError(`Verification failed: ${verifyError.message}`);
            }
          } else {
            console.log('[AuthConfirm] Email verified successfully:', data);
            sessionSet = true;
            setConfirmed(true);
          }
        }
        // Check if user is already authenticated
        else {
          console.log('[AuthConfirm] No tokens found, checking existing session...');
          const { data: sessionData } = await supabase.auth.getSession();

          if (sessionData.session) {
            console.log('[AuthConfirm] Already authenticated session:', sessionData.session);
            sessionSet = true;
            setConfirmed(true);
          } else {
            console.log('[AuthConfirm] No valid confirmation parameters found, sessionData:', sessionData);
            if (isMobile) {
              setError('Mobile email confirmation issue detected. Please try opening this link in your mobile browser directly, or use a desktop/laptop for the best experience.');
            } else {
              setError('Invalid confirmation link. Please check your email for a valid confirmation link or try signing up again.');
            }
          }
        }

        // If session was set successfully, auto-redirect after a short delay
        if (sessionSet) {
          toast.success('Email confirmed successfully! Welcome to Airbnb Clone+! 🎉');
          setAutoRedirecting(true);

          // Wait 3 seconds to show the success message, then redirect
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      } catch (err) {
        console.error('[AuthConfirm] Unexpected error during confirmation:', err);
        setError('An unexpected error occurred. Please try signing up again.');
      } finally {
        setLoading(false);
      }
    };

    handleEmailConfirmation();
  }, [searchParams, navigate, isMobile]);

  if (loading) {
    return <AuthConfirmLoading isMobile={isMobile} />;
  }

  if (error) {
    return <AuthConfirmError error={error} isMobile={isMobile} />;
  }

  return (
    <AuthConfirmSuccess 
      isMobile={isMobile} 
      autoRedirecting={autoRedirecting} 
    />
  );
};

export default AuthConfirm;
