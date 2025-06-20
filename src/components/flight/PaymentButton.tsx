
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentButtonProps {
  onPayment: () => void;
  isProcessing: boolean;
  totalAmount: number;
}

const PaymentButton = ({ onPayment, isProcessing, totalAmount }: PaymentButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        onClick={onPayment}
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
  );
};

export default PaymentButton;
