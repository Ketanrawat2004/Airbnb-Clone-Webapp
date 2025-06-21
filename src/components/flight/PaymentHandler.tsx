
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentHandlerProps {
  flightData: any;
  passengerData: any[];
  contactInfo: any;
  totalAmount: number;
  selectedPayment: string;
  setIsProcessing: (processing: boolean) => void;
}

export const usePaymentHandler = ({ 
  flightData, 
  passengerData, 
  contactInfo, 
  totalAmount, 
  selectedPayment,
  setIsProcessing 
}: PaymentHandlerProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleRazorpayPayment = async () => {
    setIsProcessing(true);

    try {
      if (!user) {
        toast.error('Please login to continue with payment');
        return;
      }

      console.log('Starting Razorpay payment process...');
      
      // Create flight booking order
      const { data, error } = await supabase.functions.invoke('create-flight-payment', {
        body: {
          flight_data: flightData,
          passenger_data: passengerData,
          contact_info: contactInfo,
          total_amount: totalAmount
        }
      });

      if (error) {
        console.error('Payment creation error:', error);
        throw new Error(error.message || 'Failed to create payment order');
      }

      console.log('Payment order created:', data);
      toast.success('Payment order created successfully');

      // Initialize Razorpay
      if (!window.Razorpay) {
        throw new Error('Razorpay SDK not loaded. Please refresh the page and try again.');
      }

      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: "Airbnb Clone+ Flight Booking",
        description: `Flight booking from ${flightData.from} to ${flightData.to}`,
        order_id: data.order_id,
        handler: async function (response: any) {
          try {
            console.log('Payment successful, verifying...', response);
            toast.loading('Verifying payment...');
            
            // Verify payment
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-flight-payment', {
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              }
            });

            if (verifyError) {
              console.error('Payment verification error:', verifyError);
              throw new Error(verifyError.message || 'Payment verification failed');
            }

            console.log('Payment verified successfully:', verifyData);
            toast.success('Payment verified successfully!');

            // Navigate to success page
            navigate('/payment-success', {
              state: {
                type: 'flight',
                bookingId: verifyData.booking_id,
                flightData,
                passengerData,
                contactInfo,
                totalAmount,
                paymentId: response.razorpay_payment_id,
                flightBookingId: verifyData.flight_booking_id
              }
            });
          } catch (error: any) {
            console.error('Payment verification failed:', error);
            toast.error(error.message || 'Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: `${passengerData[0]?.firstName || ''} ${passengerData[0]?.lastName || ''}`.trim(),
          email: contactInfo.email,
          contact: contactInfo.phone
        },
        theme: {
          color: "#2563eb"
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed');
            toast.info('Payment cancelled');
            setIsProcessing(false);
          }
        }
      };

      console.log('Opening Razorpay with options:', options);
      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response.error);
        toast.error(`Payment failed: ${response.error.description}`);
        setIsProcessing(false);
      });

      razorpay.open();
      
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleDemoPayment = async () => {
    setIsProcessing(true);
    
    try {
      if (!user) {
        toast.error('Please login to continue with demo payment');
        return;
      }

      console.log('Processing demo payment...');
      toast.loading('Processing demo payment...');

      // Create flight booking record for demo payment
      const { data: bookingData, error: bookingError } = await supabase
        .from('flight_bookings')
        .insert([{
          user_id: user.id,
          booking_type: 'flight',
          flight_data: flightData,
          passenger_data: passengerData,
          contact_info: contactInfo,
          total_amount: totalAmount,
          payment_status: 'paid',
          status: 'confirmed',
          razorpay_payment_id: 'DEMO_PAYMENT'
        }])
        .select()
        .single();

      if (bookingError) {
        console.error('Demo booking creation error:', bookingError);
        throw new Error('Failed to create demo booking');
      }

      console.log('Demo booking created:', bookingData);

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const bookingId = `FL${Date.now().toString().slice(-8)}`;
      toast.success('Demo payment successful!');
      
      navigate('/payment-success', {
        state: {
          type: 'flight',
          bookingId,
          flightData,
          passengerData,
          contactInfo,
          totalAmount,
          isDemo: true,
          flightBookingId: bookingData.id
        }
      });
    } catch (error: any) {
      console.error('Demo payment error:', error);
      toast.error(error.message || 'Demo payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayment = () => {
    if (selectedPayment === 'razorpay') {
      handleRazorpayPayment();
    } else {
      handleDemoPayment();
    }
  };

  return { handlePayment };
};
