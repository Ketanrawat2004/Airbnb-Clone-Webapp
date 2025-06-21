
import { motion } from 'framer-motion';

const PaymentPageHeader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Complete Your Flight Booking</h2>
      <p className="text-gray-600">Secure payment and instant confirmation</p>
    </motion.div>
  );
};

export default PaymentPageHeader;
