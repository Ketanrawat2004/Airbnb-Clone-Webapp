
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

const AuthConfirm = () => {
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        setLoading(true);
        
        // Get all possible URL parameters that Supabase might use
        const token_hash = searchParams.get('token_hash') || searchParams.get('token');
        const type = searchParams.get('type');
        const access_token = searchParams.get('access_token');
        const refresh_token = searchParams.get('refresh_token');
        
        console.log('URL parameters:', { token_hash, type, access_token, refresh_token });
        console.log('Full URL:', window.location.href);
        
        // If we have access_token and refresh_token, set the session directly
        if (access_token && refresh_token) {
          console.log('Setting session with tokens from URL');
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token,
            refresh_token
          });
          
          if (sessionError) {
            console.error('Session error:', sessionError);
            setError(`Session error: ${sessionError.message}`);
          } else {
            console.log('Session set successfully:', data);
            setConfirmed(true);
          }
        }
        // If we have token_hash and type, verify with OTP
        else if (token_hash && type) {
          console.log('Verifying email with token hash');
          
          const { data, error: verifyError } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as any
          });
          
          if (verifyError) {
            console.error('Verification error:', verifyError);
            setError(`Verification failed: ${verifyError.message}`);
          } else {
            console.log('Email verified successfully:', data);
            setConfirmed(true);
          }
        }
        // Check if user is already authenticated
        else {
          const { data: sessionData } = await supabase.auth.getSession();
          
          if (sessionData.session) {
            console.log('User already authenticated');
            setConfirmed(true);
          } else {
            console.log('No valid confirmation parameters found');
            setError('Invalid confirmation link. Please check your email for a valid confirmation link or try signing up again.');
          }
        }
        
      } catch (err) {
        console.error('Unexpected error during confirmation:', err);
        setError('An unexpected error occurred. Please try signing in to your account.');
      } finally {
        setLoading(false);
      }
    };

    handleEmailConfirmation();
  }, [searchParams]);

  const handleContinue = () => {
    navigate('/');
  };

  const handleTryAgain = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Logo />
            <h1 className="text-2xl font-bold text-rose-500">Airbnb Clone+</h1>
          </div>
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-rose-500" />
          <p className="text-gray-600">Confirming your email...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
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
            <Button onClick={handleTryAgain} className="w-full">
              Try Signing In
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Logo />
          <h1 className="text-2xl font-bold text-rose-500">Airbnb Clone+</h1>
        </div>
        
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to Airbnb Clone+! 🎉
        </h2>
        
        <p className="text-gray-600 mb-6">
          Thank you for confirming your email! Your account is now ready. You can now sign in and start exploring amazing places around the world.
        </p>
        
        <Button onClick={handleContinue} className="w-full">
          Continue to Sign In
        </Button>
      </div>
    </div>
  );
};

export default AuthConfirm;
