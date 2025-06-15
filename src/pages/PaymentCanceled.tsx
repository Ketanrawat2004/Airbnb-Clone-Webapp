
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, Home, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PaymentCanceled = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-6 relative">
            <div className="bg-gradient-to-r from-red-400 to-red-500 rounded-full p-4 shadow-lg">
              <XCircle className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full p-2">
              <AlertTriangle className="h-4 w-4 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Payment Canceled
          </CardTitle>
          <p className="text-gray-600 mt-2">Don't worry, you can try again anytime!</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200">
            <p className="text-gray-700 font-medium mb-2">Your payment was canceled.</p>
            <p className="text-sm text-gray-600">No charges were made to your account.</p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => window.history.back()} 
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-6 text-lg font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Try Again
            </Button>
            
            <Link to="/" className="block">
              <Button 
                variant="outline" 
                className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-6 text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105"
              >
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
            <p>Need help? Contact our support team for assistance.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentCanceled;
