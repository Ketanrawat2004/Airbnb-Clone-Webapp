
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="page-container">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-primary opacity-20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(234,179,8,0.2),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.3),transparent_50%)]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-teal-400/20 to-cyan-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '3s' }}></div>
      
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="floating-card max-w-2xl mx-auto text-center animate-scale-in">
          {/* Large 404 */}
          <div className="mb-8">
            <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-bold gradient-text leading-none">
              404
            </h1>
          </div>
          
          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto">
              The page you're looking for seems to have taken a vacation. 
              Don't worry, let's get you back to exploring amazing places!
            </p>
          </div>
          
          {/* Current Path Display */}
          <div className="mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Attempted to access:</p>
            <code className="text-sm font-mono text-gray-700 bg-white px-3 py-1 rounded-lg border">
              {location.pathname}
            </code>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleGoHome}
              size="lg"
              className="gradient-primary text-white hover:shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
            
            <Button
              onClick={handleGoBack}
              variant="outline"
              size="lg"
              className="glass-effect hover:bg-white/20 w-full sm:w-auto"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </Button>
            
            <Button
              onClick={() => navigate('/search')}
              variant="ghost"
              size="lg"
              className="text-gray-600 hover:text-gray-900 w-full sm:w-auto"
            >
              <Search className="h-5 w-5 mr-2" />
              Search Properties
            </Button>
          </div>
          
          {/* Decorative Elements */}
          <div className="mt-12 flex justify-center space-x-4">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
