import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, Loader2, AlertCircle, Home, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { toast } from 'sonner';

const AuthConfirm = () => {
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoRedirecting, setAutoRedirecting] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        setLoading(true);

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
          hash: window.location.hash
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
            setError('Invalid confirmation link. Please check your email for a valid confirmation link or try signing up again.');
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
  }, [searchParams, navigate]);

  const handleContinue = () => {
    navigate('/');
  };

  const handleSignUpAgain = () => {
    navigate('/');
  };

  const handleExplore = () => {
    navigate('/search');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-25 to-pink-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md border border-gray-100">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Logo />
            <h1 className="text-2xl font-bold text-rose-500">Airbnb Clone+</h1>
          </div>
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-rose-500" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Confirming your email...</h2>
          <p className="text-gray-600">Please wait while we verify your account</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-25 to-pink-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md border border-gray-100">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Logo />
            <h1 className="text-2xl font-bold text-rose-500">Airbnb Clone+</h1>
          </div>
          
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
          
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Email Confirmation Issue
          </h2>
          
          <p className="text-red-600 mb-6 text-sm leading-relaxed">{error}</p>
          
          <div className="space-y-3">
            <Button onClick={handleSignUpAgain} className="w-full bg-rose-500 hover:bg-rose-600">
              Try Signing Up Again
            </Button>
            <Button onClick={handleContinue} variant="outline" className="w-full">
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-25 to-pink-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-lg border border-gray-100">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Logo />
          <h1 className="text-2xl font-bold text-rose-500">Airbnb Clone+</h1>
        </div>
        
        <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to Airbnb Clone+! 🎉
        </h2>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Thank you for confirming your email! Your account is now ready and you're automatically signed in. 
          You can now access all our enhanced features including improved navigation and personalized experience.
        </p>

        {/* Enhanced Navigation Options */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">🚀 Ready to explore?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Button 
              onClick={handleContinue} 
              variant="outline" 
              size="sm"
              className="flex items-center space-x-2"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Button>
            <Button 
              onClick={handleExplore} 
              variant="outline" 
              size="sm"
              className="flex items-center space-x-2"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Button>
            <Button 
              onClick={handleProfile} 
              variant="outline" 
              size="sm"
              className="flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Button>
          </div>
        </div>
        
        {autoRedirecting ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin text-rose-500" />
              <span className="text-gray-600">Redirecting you to the main page...</span>
            </div>
            <Button onClick={handleContinue} className="w-full bg-rose-500 hover:bg-rose-600">
              Continue Now
            </Button>
          </div>
        ) : (
          <Button onClick={handleContinue} className="w-full bg-rose-500 hover:bg-rose-600">
            Continue to Explore
          </Button>
        )}
      </div>
    </div>
  );
};

export default AuthConfirm;
