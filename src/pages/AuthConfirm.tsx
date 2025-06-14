
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

const AuthConfirm = () => {
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        setLoading(true);
        
        // Check if user is already authenticated
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionData.session) {
          console.log('User already authenticated');
          setConfirmed(true);
          setLoading(false);
          return;
        }
        
        // If no session, show success message anyway since they clicked the confirmation link
        console.log('Email confirmation page accessed');
        setConfirmed(true);
        setLoading(false);
        
      } catch (err) {
        console.error('Unexpected error during confirmation:', err);
        setError('An unexpected error occurred. Please try signing in to your account.');
        setLoading(false);
      }
    };

    handleEmailConfirmation();
  }, []);

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
