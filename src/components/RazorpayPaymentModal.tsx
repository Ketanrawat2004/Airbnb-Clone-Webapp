import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, CreditCard, Shield, Lock } from 'lucide-react';

interface RazorpayPaymentModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  amount: number;
  currency: string;
  email: string;
  name: string;
  phone: string;
  bookingId: string;
  hotelId: string;
  checkInDate: string;
  checkOutDate: string;
  guests: string;
}

const RazorpayPaymentModal: React.FC<RazorpayPaymentModalProps> = ({
  isOpen,
  setIsOpen,
  amount,
  currency,
  email,
  name,
  phone,
  bookingId,
  hotelId,
  checkInDate,
  checkOutDate,
  guests,
}) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => {
        console.error('Failed to load Razorpay script');
        setPaymentError('Failed to load payment gateway. Please try again.');
      };
      document.body.appendChild(script);
    };

    if (isOpen && !scriptLoaded) {
      loadRazorpayScript();
    }

    return () => {
      // Clean up script on unmount or when modal is closed
      const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (script) {
        document.body.removeChild(script);
        setScriptLoaded(false);
      }
    };
  }, [isOpen, scriptLoaded]);

  const handlePayment = async () => {
    setLoading(true);
    setPaymentError(null);

    try {
      const res = await fetch('/api/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) {
        throw new Error(`Failed to create order: ${res.status} ${res.statusText}`);
      }

      const orderData = await res.json();

      if (!orderData || !orderData.order.id) {
        throw new Error('Failed to fetch order ID from server');
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'Airbnb Clone+ Booking',
        description: 'Secure Payment for your stay',
        image: '/favicon.ico',
        order_id: orderData.order.id,
        handler: async function (response: any) {
          // Verify payment and update booking status
          const verificationRes = await fetch('/api/razorpay/verification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderId: orderData.order.id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              bookingId: bookingId,
              hotelId: hotelId,
              checkInDate: checkInDate,
              checkOutDate: checkOutDate,
              guests: guests
            }),
          });

          if (!verificationRes.ok) {
            const errorResult = await verificationRes.json();
            throw new Error(errorResult.error || 'Payment verification failed');
          }

          setPaymentSuccess(true);
          setLoading(false);
          setTimeout(() => {
            setIsOpen(false);
            window.location.href = `/ticket/${bookingId}`;
          }, 2000);
        },
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        notes: {
          address: 'Airbnb Clone+ Corporate Office',
        },
        theme: {
          color: '#FF5A5F',
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.on('payment.failed', function (error: any) {
        console.error('Payment failed:', error);
        setPaymentError('Payment failed. Please check your details and try again.');
        setLoading(false);
      });
      razorpay.open();
    } catch (error: any) {
      console.error('Payment error:', error);
      setPaymentError(error.message || 'An error occurred during payment.');
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {paymentSuccess ? 'Payment Successful!' : 'Secure Payment'}
          </DialogTitle>
        </DialogHeader>

        {paymentSuccess ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Shield className="h-12 w-12 text-green-500" />
            <p className="text-lg font-semibold text-green-600">
              Your payment was processed successfully!
            </p>
            <p>Redirecting to your ticket...</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {paymentError && (
              <div className="rounded-md border border-destructive bg-destructive/15 p-3 text-sm text-destructive">
                <Lock className="h-4 w-4 mr-2 inline-block align-middle" />
                {paymentError}
              </div>
            )}
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-rose-500" />
              <p className="text-sm font-medium">
                Pay securely with Razorpay
              </p>
            </div>
            <Button
              onClick={handlePayment}
              disabled={!scriptLoaded || loading}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  Pay ₹{(amount / 100).toLocaleString()}
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RazorpayPaymentModal;
