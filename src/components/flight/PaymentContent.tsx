
import PaymentMethodSelection from './PaymentMethodSelection';
import PaymentButton from './PaymentButton';
import BookingSummaryCard from './BookingSummaryCard';

interface PaymentContentProps {
  selectedPayment: string;
  onPaymentMethodChange: (method: string) => void;
  onPayment: () => void;
  isProcessing: boolean;
  totalAmount: number;
  flightData: any;
  passengerData: any[];
}

const PaymentContent = ({
  selectedPayment,
  onPaymentMethodChange,
  onPayment,
  isProcessing,
  totalAmount,
  flightData,
  passengerData
}: PaymentContentProps) => {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Payment Methods */}
      <div className="lg:col-span-2 space-y-6">
        <PaymentMethodSelection 
          selectedPayment={selectedPayment}
          onPaymentMethodChange={onPaymentMethodChange}
        />
        
        <PaymentButton
          onPayment={onPayment}
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
  );
};

export default PaymentContent;
