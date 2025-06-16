import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, Loader2, AlertCircle, Home, Search, User, Laptop, Smartphone, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

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

  const copyCurrentUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('URL copied to clipboard!');
  };

  const openInBrowser = () => {
    window.open(window.location.href, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-25 to-pink-50 p-4">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl text-center max-w-md w-full border border-gray-100">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Logo />
            <h1 className="text-xl md:text-2xl font-bold text-rose-500">Airbnb Clone+</h1>
          </div>
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-rose-500" />
          <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Confirming your email...</h2>
          <p className="text-sm md:text-base text-gray-600">Please wait while we verify your account</p>
          {isMobile && (
            <p className="text-xs text-amber-600 mt-4 bg-amber-50 p-2 rounded-lg">
              📱 Mobile device detected - processing confirmation...
            </p>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-25 to-pink-50 p-4">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl text-center max-w-md w-full border border-gray-100">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Logo />
            <h1 className="text-xl md:text-2xl font-bold text-rose-500">Airbnb Clone+</h1>
          </div>
          
          <AlertCircle className="h-12 md:h-16 w-12 md:w-16 text-red-500 mx-auto mb-6" />
          
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
            Email Confirmation Issue
          </h2>
          
          <p className="text-red-600 mb-6 text-sm leading-relaxed">{error}</p>
          
          {/* Mobile-specific troubleshooting */}
          {isMobile && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center mb-2">
                <Smartphone className="h-5 w-5 text-amber-600 mr-2" />
                <span className="text-sm font-semibold text-amber-800">Mobile Troubleshooting</span>
              </div>
              <div className="space-y-3 text-xs text-amber-700">
                <p className="font-medium">Try these steps to fix the issue:</p>
                <ol className="list-decimal list-inside space-y-1 text-left">
                  <li>Copy the confirmation link from your email</li>
                  <li>Open your mobile browser (Chrome/Safari)</li>
                  <li>Paste the link in the address bar</li>
                  <li>Press Enter to load the confirmation page</li>
                </ol>
                <div className="flex space-x-2 mt-3">
                  <Button 
                    onClick={copyCurrentUrl} 
                    size="sm" 
                    variant="outline"
                    className="flex-1 text-xs"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy URL
                  </Button>
                  <Button 
                    onClick={openInBrowser} 
                    size="sm" 
                    variant="outline"
                    className="flex-1 text-xs"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Open
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Desktop recommendation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <Laptop className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm font-semibold text-blue-800">Recommended Solution</span>
            </div>
            <p className="text-xs text-blue-700 leading-relaxed">
              For the best experience and to avoid email confirmation issues, we recommend using this website on a laptop or desktop computer. 
              Mobile email apps sometimes have issues with clickable confirmation links.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button onClick={handleSignUpAgain} className="w-full bg-rose-500 hover:bg-rose-600 text-sm md:text-base">
              Try Signing Up Again
            </Button>
            <Button onClick={handleContinue} variant="outline" className="w-full text-sm md:text-base">
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-25 to-pink-50 p-4">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl text-center max-w-lg w-full border border-gray-100">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Logo />
          <h1 className="text-xl md:text-2xl font-bold text-rose-500">Airbnb Clone+</h1>
        </div>
        
        <CheckCircle className="h-16 md:h-20 w-16 md:w-20 text-green-500 mx-auto mb-6" />
        
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
          Welcome to Airbnb Clone+! 🎉
        </h2>
        
        <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
          Thank you for confirming your email! Your account is now ready and you're automatically signed in. 
          You can now access all our enhanced features including improved navigation and personalized experience.
        </p>

        {/* Success message for mobile users */}
        {isMobile && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <Smartphone className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm font-semibold text-green-800">Mobile Confirmation Successful! 📱</span>
            </div>
            <p className="text-xs text-green-700 leading-relaxed">
              Great! Your email was successfully confirmed on mobile. You're now signed in and ready to explore Airbnb Clone+.
            </p>
          </div>
        )}

        {/* Experience recommendation for all users */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6 border border-blue-200">
          <div className="flex items-center justify-center mb-2">
            <Laptop className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-blue-800">💡 Recommendation</span>
          </div>
          <p className="text-xs text-blue-700 leading-relaxed">
            For the best browsing experience and seamless email confirmations, we recommend using this website on a laptop or desktop. 
            Our platform is optimized for larger screens and some mobile email apps may have compatibility issues.
          </p>
        </div>

        {/* Enhanced Navigation Options */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">🚀 Ready to explore?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Button 
              onClick={handleContinue} 
              variant="outline" 
              size="sm"
              className="flex items-center space-x-2 text-xs md:text-sm"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Button>
            <Button 
              onClick={handleExplore} 
              variant="outline" 
              size="sm"
              className="flex items-center space-x-2 text-xs md:text-sm"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Button>
            <Button 
              onClick={handleProfile} 
              variant="outline" 
              size="sm"
              className="flex items-center space-x-2 text-xs md:text-sm"
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
              <span className="text-gray-600 text-sm md:text-base">Redirecting you to the main page...</span>
            </div>
            <Button onClick={handleContinue} className="w-full bg-rose-500 hover:bg-rose-600 text-sm md:text-base">
              Continue Now
            </Button>
          </div>
        ) : (
          <Button onClick={handleContinue} className="w-full bg-rose-500 hover:bg-rose-600 text-sm md:text-base">
            Continue to Explore
          </Button>
        )}
      </div>
    </div>
  );
};

export default AuthConfirm;
