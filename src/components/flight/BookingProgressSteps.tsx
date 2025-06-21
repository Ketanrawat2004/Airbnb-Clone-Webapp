
import { motion } from 'framer-motion';

interface BookingProgressStepsProps {
  currentStep: number;
}

const BookingProgressSteps = ({ currentStep }: BookingProgressStepsProps) => {
  return (
    <div className="flex items-center justify-center space-x-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center space-x-2"
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
          currentStep >= 1 ? 'bg-blue-600 text-white scale-110' : 'bg-gray-200 text-gray-600'
        }`}>
          1
        </div>
        <span className={`text-sm font-medium transition-all duration-300 ${
          currentStep >= 1 ? 'text-blue-600' : 'text-gray-600'
        }`}>
          Passenger Info
        </span>
      </motion.div>
      
      <motion.div
        className={`w-16 h-1 transition-all duration-500 ${
          currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'
        }`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: currentStep >= 2 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex items-center space-x-2"
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
          currentStep >= 2 ? 'bg-blue-600 text-white scale-110' : 'bg-gray-200 text-gray-600'
        }`}>
          2
        </div>
        <span className={`text-sm font-medium transition-all duration-300 ${
          currentStep >= 2 ? 'text-blue-600' : 'text-gray-600'
        }`}>
          Payment
        </span>
      </motion.div>
    </div>
  );
};

export default BookingProgressSteps;
