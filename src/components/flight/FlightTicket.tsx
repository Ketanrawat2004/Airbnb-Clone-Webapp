
import { motion } from 'framer-motion';
import FlightTicketHeader from './FlightTicketHeader';
import FlightTicketPassengerInfo from './FlightTicketPassengerInfo';
import FlightTicketDetails from './FlightTicketDetails';
import FlightTicketAdditionalInfo from './FlightTicketAdditionalInfo';
import FlightTicketActions from './FlightTicketActions';

interface FlightTicketProps {
  bookingId: string;
  flightData: any;
  passengerData: any[];
  contactInfo: any;
  totalAmount: number;
  paymentId?: string;
}

const FlightTicket = ({ bookingId, flightData, passengerData, contactInfo, totalAmount, paymentId }: FlightTicketProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto space-y-6 px-4"
    >
      {/* Action Buttons */}
      <FlightTicketActions
        bookingId={bookingId}
        flightData={flightData}
        passengerData={passengerData}
        contactInfo={contactInfo}
        totalAmount={totalAmount}
      />

      {/* Digital Ticket Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Air India Header */}
        <FlightTicketHeader />

        {/* Passenger Information */}
        <FlightTicketPassengerInfo 
          bookingId={bookingId}
          passengerData={passengerData}
        />

        {/* Flight Details */}
        <FlightTicketDetails flightData={flightData} />

        {/* Additional Information */}
        <FlightTicketAdditionalInfo
          flightData={flightData}
          totalAmount={totalAmount}
          contactInfo={contactInfo}
        />
      </motion.div>
    </motion.div>
  );
};

export default FlightTicket;
