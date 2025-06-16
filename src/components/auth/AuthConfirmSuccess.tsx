
import { CheckCircle, Smartphone, Laptop, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import AuthConfirmHeader from './AuthConfirmHeader';
import NavigationOptions from './NavigationOptions';

interface AuthConfirmSuccessProps {
  isMobile: boolean;
  autoRedirecting: boolean;
}

const AuthConfirmSuccess = ({ isMobile, autoRedirecting }: AuthConfirmSuccessProps) => {
  const navigate = useNavigate();

  const handleContinue = () => navigate('/');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-25 to-pink-50 p-4">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl text-center max-w-lg w-full border border-gray-100">
        <AuthConfirmHeader />
        
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

        <NavigationOptions />
        
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

export default AuthConfirmSuccess;
