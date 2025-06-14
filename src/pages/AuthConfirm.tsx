
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, Loader2 } from 'lucide-react';
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
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          setError('There was an error confirming your email. Please try again.');
          console.error('Auth confirmation error:', error);
        } else if (data.session) {
          setConfirmed(true);
        } else {
          setError('Email confirmation link may have expired. Please request a new one.');
        }
      } catch (err) {
        setError('An unexpected error occurred. Please try again.');
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    handleEmailConfirmation();
  }, []);

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
          <p className="text-red-600 mb-4">{error}</p>
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
          You have successfully registered in Airbnb Clone+
        </h2>
        
        <p className="text-gray-600 mb-6">
          Thank you for joining! Your email has been confirmed and your account is now active.
        </p>
        
        <Button onClick={handleContinue} className="w-full">
          Continue to Airbnb Clone+
        </Button>
      </div>
    </div>
  );
};

export default AuthConfirm;
