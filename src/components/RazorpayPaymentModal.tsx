
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, CreditCard, Shield, Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

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
  const { user } = useAuth();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRazorpayScript = () => {
      if (window.Razorpay) {
        setScriptLoaded(true);
        return;
      }

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
  }, [isOpen, scriptLoaded]);

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please login to continue with payment');
      return;
    }

    setLoading(true);
    setPaymentError(null);

    try {
      console.log('Creating Razorpay order with amount:', amount);
      
      // Get auth token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error('Authentication required');
      }

      // Create order using Supabase edge function
      const { data: orderData, error } = await supabase.functions.invoke('create-razorpay-payment', {
        body: {
          hotel_id: hotelId,
          check_in_date: checkInDate,
          check_out_date: checkOutDate,
          guests: parseInt(guests),
          guest_phone: phone,
          total_amount: amount,
          guest_details: {
            firstName: name.split(' ')[0] || 'Guest',
            lastName: name.split(' ').slice(1).join(' ') || '',
            email: email,
            phone: phone,
          },
          guest_list: [],
          coupon_data: null
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      console.log('Order creation response:', orderData, error);

      if (error) {
        throw new Error(error.message || 'Failed to create payment order');
      }

      if (!orderData?.order_id) {
        throw new Error('Invalid order response from server');
      }

      // Initialize Razorpay payment
      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Hotel Booking',
        description: `Booking for ${orderData.hotel_name}`,
        order_id: orderData.order_id,
        handler: async function (response: any) {
          console.log('Payment successful:', response);
          
          try {
            // Verify payment
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-razorpay-payment', {
              body: {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
            });

            console.log('Payment verification response:', verifyData, verifyError);

            if (verifyError) {
              throw new Error(verifyError.message || 'Payment verification failed');
            }

            if (verifyData?.success) {
              setPaymentSuccess(true);
              toast.success('Payment successful! Your booking is confirmed.');
              
              setTimeout(() => {
                setIsOpen(false);
                window.location.href = `/payment-success?payment_id=${response.razorpay_payment_id}`;
              }, 2000);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (verifyError) {
            console.error('Payment verification error:', verifyError);
            toast.error('Payment verification failed. Please contact support.');
            setPaymentError('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        notes: {
          hotel_id: hotelId,
          user_id: user.id,
        },
        theme: {
          color: '#FF5A5F',
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed');
            setLoading(false);
          }
        }
      };

      console.log('Opening Razorpay with options:', options);
      
      const razorpay = new (window as any).Razorpay(options);
      
      razorpay.on('payment.failed', function (error: any) {
        console.error('Payment failed:', error);
        setPaymentError('Payment failed. Please check your details and try again.');
        setLoading(false);
        toast.error('Payment failed. Please try again.');
      });
      
      razorpay.open();
      
    } catch (error: any) {
      console.error('Payment error:', error);
      setPaymentError(error.message || 'An error occurred during payment setup.');
      setLoading(false);
      toast.error(error.message || 'Payment setup failed. Please try again.');
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
              disabled={!scriptLoaded || loading || !user}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Payment...
                </>
              ) : !user ? (
                'Please Login First'
              ) : (
                <>
                  Pay ₹{(amount / 100).toLocaleString('en-IN')}
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
