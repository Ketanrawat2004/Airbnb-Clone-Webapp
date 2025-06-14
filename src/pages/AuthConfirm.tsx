
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
        
        // Get URL parameters
        const tokenHash = searchParams.get('token_hash');
        const type = searchParams.get('type');
        
        console.log('Confirmation params:', { tokenHash, type });

        if (tokenHash && type) {
          console.log('Verifying OTP with token_hash:', tokenHash, 'type:', type);
          
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: type as any,
          });

          if (error) {
            console.error('OTP verification error:', error);
            setError('Email confirmation failed. The link may be expired or invalid. Please try signing up again.');
          } else if (data.user) {
            console.log('Email confirmed successfully for user:', data.user.id);
            setConfirmed(true);
          } else {
            console.log('OTP verification returned no user');
            setError('Email confirmation failed. Please try again.');
          }
        } else {
          // Check if user is already authenticated
          const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) {
            console.error('Session error:', sessionError);
            setError('There was an error checking your authentication status.');
          } else if (sessionData.session) {
            console.log('User already authenticated');
            setConfirmed(true);
          } else {
            console.log('No confirmation token found in URL');
            setError('No confirmation token found. Please check your email for the confirmation link.');
          }
        }
      } catch (err) {
        console.error('Unexpected error during confirmation:', err);
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    handleEmailConfirmation();
  }, [searchParams]);

  const handleContinue = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
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
          
          <Button onClick={handleContinue} className="w-full">
            Return to Home
          </Button>
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
          Email Confirmed Successfully!
        </h2>
        
        <p className="text-gray-600 mb-6">
          Welcome to Airbnb Clone+! Your email has been confirmed and your account is now active.
        </p>
        
        <Button onClick={handleContinue} className="w-full">
          Continue to Airbnb Clone+
        </Button>
      </div>
    </div>
  );
};

export default AuthConfirm;
