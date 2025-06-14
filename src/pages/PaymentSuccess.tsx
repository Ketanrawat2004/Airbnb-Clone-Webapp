
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Download, MessageSquare, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-gray-600">
            <p className="mb-2">Your booking has been confirmed!</p>
            <p className="text-sm">Session ID: {sessionId}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <MessageSquare className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm text-green-700">
                SMS confirmation sent to your phone
              </span>
            </div>

            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <Download className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm text-blue-700">
                Booking receipt will be sent to your email
              </span>
            </div>
          </div>

          <div className="pt-4 space-y-2">
            <Link to="/profile" className="block">
              <Button className="w-full bg-rose-500 hover:bg-rose-600">
                View My Bookings
              </Button>
            </Link>
            <Link to="/" className="block">
              <Button variant="outline" className="w-full">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
