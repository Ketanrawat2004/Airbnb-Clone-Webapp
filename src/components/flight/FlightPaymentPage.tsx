
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Shield, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

interface FlightPaymentPageProps {
  flightData: any;
  passengerData: any[];
  totalAmount: number;
}

const FlightPaymentPage = ({ flightData, passengerData, totalAmount }: FlightPaymentPageProps) => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('demo');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      if (selectedPayment === 'razorpay') {
        // Real Razorpay implementation would go here
        // For now, we'll simulate a real payment
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate booking ID and navigate to success
        const bookingId = `FL${Date.now().toString().slice(-8)}`;
        navigate('/payment-success', {
          state: {
            type: 'flight',
            bookingId,
            flightData,
            passengerData,
            totalAmount
          }
        });
      } else {
        // Demo payment
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const bookingId = `FL${Date.now().toString().slice(-8)}`;
        navigate('/payment-success', {
          state: {
            type: 'flight',
            bookingId,
            flightData,
            passengerData,
            totalAmount
          }
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Payment</h2>
        <p className="text-gray-600">Choose your payment method</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Payment Methods */}
        <div className="lg:col-span-2">
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
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
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
                </div>

                {/* Demo Payment Option */}
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
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
                </div>
              </RadioGroup>

              {/* Security Notice */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium text-green-800 mb-1">Secure Payment</div>
                    <div className="text-green-700">
                      Your payment information is encrypted and secure. We use industry-standard security measures.
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
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
                  `Pay ₹${totalAmount.toLocaleString()}`
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg sticky top-6">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Flight Details */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Flight Details</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Route:</span>
                    <span>{flightData?.from} → {flightData?.to}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{flightData?.departureDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Passengers:</span>
                    <span>{passengerData?.length || 1}</span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Base Fare</span>
                  <span>₹{(totalAmount * 0.8).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Taxes & Fees</span>
                  <span>₹{(totalAmount * 0.2).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span className="text-blue-600">₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Features */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <Check className="h-4 w-4" />
                  <span>Free Cancellation</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <Check className="h-4 w-4" />
                  <span>Instant Confirmation</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <Check className="h-4 w-4" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default FlightPaymentPage;
