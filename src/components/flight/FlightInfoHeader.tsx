
import { motion } from 'framer-motion';

interface FlightInfoHeaderProps {
  flightData: any;
  passengerCount: number;
}

const FlightInfoHeader = ({ flightData, passengerCount }: FlightInfoHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 sm:p-6 border border-blue-200 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm">
        <div className="font-medium text-blue-800 text-base">
          {flightData?.from} → {flightData?.to}
        </div>
        <div className="text-blue-600 flex flex-col sm:flex-row sm:items-center gap-2">
          <span>{flightData?.departureDate}</span>
          <span className="hidden sm:inline">•</span>
          <span>{passengerCount} passenger{passengerCount > 1 ? 's' : ''}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default FlightInfoHeader;
