
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CreditCard, Shield, Zap, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentData: {
    order_id: string;
    amount: number;
    currency: string;
    key_id: string;
    hotel_name: string;
    user_email: string;
    user_name: string;
    guest_phone: string;
  };
  onSuccess: (paymentId: string) => void;
}

const RazorpayPaymentModal = ({ 
  open, 
  onOpenChange, 
  paymentData, 
  onSuccess 
}: RazorpayPaymentModalProps) => {
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { toast } = useToast();

  // Preload Razorpay script when modal opens
  const loadRazorpayScript = async () => {
    if (window.Razorpay || scriptLoaded) return true;

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        setScriptLoaded(true);
        resolve(true);
      };
      script.onerror = () => reject(new Error('Failed to load Razorpay script'));
      document.body.appendChild(script);
    });
  };

  // Load script when modal opens
  React.useEffect(() => {
    if (open && !scriptLoaded) {
      loadRazorpayScript().catch(console.error);
    }
  }, [open, scriptLoaded]);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Ensure script is loaded
      await loadRazorpayScript();

      const options = {
        key: paymentData.key_id,
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: 'Hotel Booking',
        description: `Booking for ${paymentData.hotel_name}`,
        order_id: paymentData.order_id,
        prefill: {
          name: paymentData.user_name,
          email: paymentData.user_email,
          contact: paymentData.guest_phone,
        },
        theme: {
          color: '#f43f5e',
        },
        handler: async (response: any) => {
          try {
            // Quick payment verification
            const { data, error } = await supabase.functions.invoke('verify-razorpay-payment', {
              body: {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
            });

            if (error || !data?.success) {
              throw new Error('Payment verification failed');
            }

            toast({
              title: 'Payment Successful! 🎉',
              description: 'Your booking has been confirmed.',
            });

            onSuccess(response.razorpay_payment_id);
            onOpenChange(false);
          } catch (error) {
            console.error('Payment verification error:', error);
            toast({
              title: 'Payment verification failed',
              description: 'Please contact support if money was deducted.',
              variant: 'destructive',
            });
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment failed',
        description: 'Unable to process payment. Please try again.',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-2 rounded-lg">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <span>Secure Payment</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Payment Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <h3 className="font-semibold text-gray-800 mb-2">Payment Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Hotel:</span>
                <span className="font-medium">{paymentData.hotel_name}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                <span className="font-semibold text-gray-800">Total Amount:</span>
                <span className="font-bold text-xl text-rose-600">
                  ₹{(paymentData.amount / 100).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">Secure</span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <Zap className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Fast</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="text-center text-xs text-gray-500">
            Supports UPI, Cards, Net Banking, and Wallets
          </div>

          {/* Pay Button */}
          <Button 
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-6 text-lg font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-70"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading Payment...</span>
              </div>
            ) : (
              <>
                <CreditCard className="h-5 w-5 mr-2" />
                Pay ₹{(paymentData.amount / 100).toLocaleString('en-IN')}
              </>
            )}
          </Button>

          <div className="text-center text-xs text-gray-500">
            Powered by Razorpay • Secure & Encrypted
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RazorpayPaymentModal;
