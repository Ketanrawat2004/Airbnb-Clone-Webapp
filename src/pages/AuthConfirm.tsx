
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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        setLoading(true);
        
        // Get all URL parameters for debugging
        const allParams = Object.fromEntries(searchParams.entries());
        console.log('All URL parameters:', allParams);
        
        // Get URL parameters for email confirmation
        const tokenHash = searchParams.get('token_hash');
        const type = searchParams.get('type');
        const accessToken = searchParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token');
        
        console.log('Confirmation parameters:', { tokenHash, type, accessToken, refreshToken });

        // Check if we have the required parameters for email confirmation
        if (tokenHash && type) {
          console.log('Attempting email verification with token_hash method');
          
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: type as any,
          });

          console.log('VerifyOtp response:', { data, error });

          if (error) {
            console.error('Email verification error:', error);
            if (error.message.includes('expired') || error.message.includes('invalid')) {
              setError('The confirmation link has expired or is invalid. Please try signing up again to receive a new confirmation email.');
            } else {
              setError(`Email confirmation failed: ${error.message}`);
            }
          } else if (data.user) {
            console.log('Email confirmed successfully for user:', data.user.email);
            setConfirmed(true);
          } else {
            setError('Email confirmation completed but no user data received. Please try signing in.');
          }
        } 
        // If we have access and refresh tokens, try to set the session
        else if (accessToken && refreshToken) {
          console.log('Attempting session setup with access/refresh tokens');
          
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          console.log('SetSession response:', { data, error });

          if (error) {
            console.error('Session setup error:', error);
            setError(`Session setup failed: ${error.message}. Please try signing in manually.`);
          } else if (data.user) {
            console.log('Session established successfully for user:', data.user.email);
            setConfirmed(true);
          }
        }
        // Check if user is already authenticated
        else {
          console.log('No confirmation parameters found, checking existing session');
          const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
          
          console.log('Current session check:', { sessionData, sessionError });
          
          if (sessionData.session) {
            console.log('User already authenticated');
            setConfirmed(true);
          } else {
            console.log('No valid confirmation parameters or existing session found');
            setError('Invalid confirmation link. Please check your email for the correct confirmation link, or try signing up again.');
          }
        }
      } catch (err) {
        console.error('Unexpected error during confirmation:', err);
        setError('An unexpected error occurred during email confirmation. Please try again or contact support.');
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
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-rose-500" />
          <p className="text-gray-600">Confirming your email...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
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
          Your email has been successfully confirmed! Your account is now active and you can start exploring amazing places around the world.
        </p>
        
        <Button onClick={handleContinue} className="w-full">
          Start Exploring
        </Button>
      </div>
    </div>
  );
};

export default AuthConfirm;
