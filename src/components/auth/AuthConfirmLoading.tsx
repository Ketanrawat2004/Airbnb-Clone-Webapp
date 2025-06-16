
import { Loader2 } from 'lucide-react';
import AuthConfirmHeader from './AuthConfirmHeader';

interface AuthConfirmLoadingProps {
  isMobile: boolean;
}

const AuthConfirmLoading = ({ isMobile }: AuthConfirmLoadingProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-25 to-pink-50 p-4">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl text-center max-w-md w-full border border-gray-100">
        <AuthConfirmHeader />
        
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
};

export default AuthConfirmLoading;
