
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import PaymentMethodSelection from './PaymentMethodSelection';
import PaymentButton from './PaymentButton';
import BookingSummaryCard from './BookingSummaryCard';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface FlightPaymentPageProps {
  flightData: any;
  passengerData: any[];
  contactInfo: any;
  totalAmount: number;
}

const FlightPaymentPage = ({ flightData, passengerData, contactInfo, totalAmount }: FlightPaymentPageProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedPayment, setSelectedPayment] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRazorpayPayment = async () => {
    setIsProcessing(true);

    try {
      if (!user) {
        alert('Please login to continue with payment');
        return;
      }

      // Create flight booking order
      const { data, error } = await supabase.functions.invoke('create-flight-payment', {
        body: {
          flight_data: flightData,
          passenger_data: passengerData,
          contact_info: contactInfo,
          total_amount: totalAmount
        }
      });

      if (error) throw error;

      // Initialize Razorpay
      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: "Flight Booking",
        description: `Flight booking from ${flightData.from} to ${flightData.to}`,
        order_id: data.order_id,
        handler: async function (response: any) {
          try {
            // Verify payment
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-flight-payment', {
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              }
            });

            if (verifyError) throw verifyError;

            // Navigate to success page
            navigate('/payment-success', {
              state: {
                type: 'flight',
                bookingId: verifyData.booking_id,
                flightData,
                passengerData,
                contactInfo,
                totalAmount,
                paymentId: response.razorpay_payment_id
              }
            });
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: `${passengerData[0]?.firstName || ''} ${passengerData[0]?.lastName || ''}`.trim(),
          email: contactInfo.email,
          contact: contactInfo.phone
        },
        theme: {
          color: "#2563eb"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDemoPayment = async () => {
    setIsProcessing(true);
    
    try {
      if (!user) {
        alert('Please login to continue with demo payment');
        return;
      }

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
        throw bookingError;
      }

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const bookingId = `FL${Date.now().toString().slice(-8)}`;
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
    } catch (error) {
      console.error('Demo payment error:', error);
      alert('Demo payment failed. Please try again.');
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto space-y-8 px-4"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Complete Your Flight Booking</h2>
        <p className="text-gray-600">Secure payment and instant confirmation</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-6">
          <PaymentMethodSelection 
            selectedPayment={selectedPayment}
            onPaymentMethodChange={setSelectedPayment}
          />
          
          <PaymentButton
            onPayment={handlePayment}
            isProcessing={isProcessing}
            totalAmount={totalAmount}
          />
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <BookingSummaryCard
            flightData={flightData}
            passengerData={passengerData}
            totalAmount={totalAmount}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default FlightPaymentPage;
