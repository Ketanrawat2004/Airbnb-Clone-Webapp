
import { motion } from 'framer-motion';
import { ArrowLeft, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookingProgressSteps from './BookingProgressSteps';

interface FlightBookingHeaderProps {
  currentStep: number;
  onBackClick: () => void;
}

const FlightBookingHeader = ({ currentStep, onBackClick }: FlightBookingHeaderProps) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-8 bg-white border-b"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={onBackClick}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <Plane className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-gray-900">Flight Booking</span>
          </div>
        </div>

        <BookingProgressSteps currentStep={currentStep} />
      </div>
    </motion.section>
  );
};

export default FlightBookingHeader;
