
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
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

        // Get tokens from URL parameters
        const token_hash = searchParams.get('token_hash');
        const type = searchParams.get('type');

        console.log('Email confirmation params:', { token_hash: !!token_hash, type });

        if (token_hash && type) {
          console.log('Attempting email verification with OTP');
          
          const { data, error: verifyError } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as any
          });

          if (verifyError) {
            console.error('Email verification error:', verifyError);
            setError('Email confirmation failed. The link may be expired or invalid.');
          } else {
            console.log('Email verified successfully:', data);
            setConfirmed(true);
            toast.success('Email confirmed successfully! Welcome to Airbnb Clone+! 🎉');
            
            // Redirect after 2 seconds
            setTimeout(() => {
              navigate('/');
            }, 2000);
          }
        } else {
          // Check if user is already authenticated
          const { data: sessionData } = await supabase.auth.getSession();
          
          if (sessionData.session) {
            console.log('User already authenticated');
            setConfirmed(true);
            navigate('/');
          } else {
            setError('Invalid confirmation link. Please check your email or try signing up again.');
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
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-25 to-pink-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md w-full">
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-25 to-pink-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md w-full">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Logo />
            <h1 className="text-2xl font-bold text-rose-500">Airbnb Clone+</h1>
          </div>
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-xl font-bold text-gray-900 mb-4">Email Confirmation Failed</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <div className="space-y-3">
            <Button onClick={() => navigate('/')} className="w-full bg-rose-500 hover:bg-rose-600">
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-25 to-pink-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md w-full">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Logo />
          <h1 className="text-2xl font-bold text-rose-500">Airbnb Clone+</h1>
        </div>
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h2 className="text-xl font-bold text-gray-900 mb-4">Welcome to Airbnb Clone+! 🎉</h2>
        <p className="text-gray-600 mb-6">
          Your email has been confirmed successfully! You're now signed in and ready to explore.
        </p>
        <Button onClick={() => navigate('/')} className="w-full bg-rose-500 hover:bg-rose-600">
          Continue to Explore
        </Button>
      </div>
    </div>
  );
};

export default AuthConfirm;
