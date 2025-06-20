
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Shield, Check, Plane, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

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
          isDemo: true
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
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <span>Payment Methods</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                  {/* Razorpay Option */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <RadioGroupItem value="razorpay" id="razorpay" />
                    <Label htmlFor="razorpay" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Smartphone className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">Razorpay</div>
                            <div className="text-sm text-gray-600">UPI, Cards, Netbanking & More</div>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-blue-600">Real Payment</div>
                      </div>
                    </Label>
                  </motion.div>

                  {/* Demo Payment Option */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <RadioGroupItem value="demo" id="demo" />
                    <Label htmlFor="demo" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Shield className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium">Demo Payment</div>
                            <div className="text-sm text-gray-600">Test booking without real payment</div>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-green-600">Free</div>
                      </div>
                    </Label>
                  </motion.div>
                </RadioGroup>

                {/* Security Notice */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-4"
                >
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-green-800 mb-1">Secure Payment</div>
                      <div className="text-green-700">
                        Your payment information is encrypted and secure. We use industry-standard security measures.
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Payment Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-5 w-5" />
                        <span>Pay ₹{totalAmount.toLocaleString()}</span>
                      </div>
                    )}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="shadow-lg sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plane className="h-5 w-5 text-blue-600" />
                  <span>Flight Booking Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Flight Details */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Flight Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Route:</span>
                      <span className="font-medium">{flightData?.from} → {flightData?.to}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{flightData?.departureDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Passengers:</span>
                      <span className="font-medium">{passengerData?.length || 1}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Flight:</span>
                      <span className="font-medium">{flightData?.airline} {flightData?.flightNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Passenger Details */}
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Passengers</h4>
                  <div className="space-y-2">
                    {passengerData?.map((passenger, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-medium text-gray-900">
                          {passenger.title} {passenger.firstName} {passenger.lastName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Base Fare</span>
                    <span>₹{Math.round(totalAmount * 0.83).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span>₹{Math.round(totalAmount * 0.17).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total Amount</span>
                    <span className="text-blue-600">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <Check className="h-4 w-4" />
                    <span>Instant E-Ticket</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <Check className="h-4 w-4" />
                    <span>Free Cancellation*</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <Check className="h-4 w-4" />
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <Download className="h-4 w-4" />
                    <span>Downloadable Ticket</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FlightPaymentPage;
