
import { AlertCircle, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import AuthConfirmHeader from './AuthConfirmHeader';
import MobileTroubleshooting from './MobileTroubleshooting';

interface AuthConfirmErrorProps {
  error: string;
  isMobile: boolean;
}

const AuthConfirmError = ({ error, isMobile }: AuthConfirmErrorProps) => {
  const navigate = useNavigate();

  const handleSignUpAgain = () => navigate('/');
  const handleContinue = () => navigate('/');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-25 to-pink-50 p-4">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl text-center max-w-md w-full border border-gray-100">
        <AuthConfirmHeader />
        
        <AlertCircle className="h-12 md:h-16 w-12 md:w-16 text-red-500 mx-auto mb-6" />
        
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
          Email Confirmation Issue
        </h2>
        
        <p className="text-red-600 mb-6 text-sm leading-relaxed">{error}</p>
        
        <MobileTroubleshooting isMobile={isMobile} />
        
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
};

export default AuthConfirmError;
