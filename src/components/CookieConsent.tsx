
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md">
      <Card className="border-rose-200 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cookie className="h-5 w-5 text-rose-500" />
              <CardTitle className="text-lg">Cookie Notice</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={declineCookies}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-sm">
            We use cookies to enhance your browsing experience and provide personalized content. 
            By continuing to use our site, you agree to our use of cookies.
          </CardDescription>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <Button
              onClick={acceptCookies}
              className="bg-rose-500 hover:bg-rose-600 text-white flex-1"
            >
              Accept All
            </Button>
            <Button
              variant="outline"
              onClick={declineCookies}
              className="flex-1"
            >
              Decline
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            <Link to="/privacy" className="text-rose-500 hover:underline">
              View our Privacy Policy
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent;
