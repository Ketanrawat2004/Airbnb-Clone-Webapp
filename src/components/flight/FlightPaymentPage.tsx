
import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePaymentHandler } from './PaymentHandler';
import PaymentPageHeader from './PaymentPageHeader';
import PaymentContent from './PaymentContent';

interface FlightPaymentPageProps {
  flightData: any;
  passengerData: any[];
  contactInfo: any;
  totalAmount: number;
}

const FlightPaymentPage = ({ flightData, passengerData, contactInfo, totalAmount }: FlightPaymentPageProps) => {
  const [selectedPayment, setSelectedPayment] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);

  const { handlePayment } = usePaymentHandler({
    flightData,
    passengerData,
    contactInfo,
    totalAmount,
    selectedPayment,
    setIsProcessing
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto space-y-8 px-4"
    >
      <PaymentPageHeader />

      <PaymentContent
        selectedPayment={selectedPayment}
        onPaymentMethodChange={setSelectedPayment}
        onPayment={handlePayment}
        isProcessing={isProcessing}
        totalAmount={totalAmount}
        flightData={flightData}
        passengerData={passengerData}
      />
    </motion.div>
  );
};

export default FlightPaymentPage;
