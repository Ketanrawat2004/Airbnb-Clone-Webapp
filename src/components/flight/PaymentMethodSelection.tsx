
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface PaymentMethodSelectionProps {
  selectedPayment: string;
  onPaymentMethodChange: (method: string) => void;
}

const PaymentMethodSelection = ({ selectedPayment, onPaymentMethodChange }: PaymentMethodSelectionProps) => {
  return (
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
          <RadioGroup value={selectedPayment} onValueChange={onPaymentMethodChange}>
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
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PaymentMethodSelection;
