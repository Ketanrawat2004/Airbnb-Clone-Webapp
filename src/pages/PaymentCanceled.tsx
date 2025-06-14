
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PaymentCanceled = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600">
            Payment Canceled
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-gray-600">
            <p className="mb-2">Your payment was canceled.</p>
            <p className="text-sm">No charges were made to your account.</p>
          </div>

          <div className="pt-4 space-y-2">
            <Button 
              onClick={() => window.history.back()} 
              className="w-full bg-rose-500 hover:bg-rose-600"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Try Again
            </Button>
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

export default PaymentCanceled;
