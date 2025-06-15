
import { ArrowLeft, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogTitle } from '@/components/ui/dialog';

type Step = 'booking' | 'guest-details' | 'payment-method';

interface BookingModalHeaderProps {
  step: Step;
  onStepChange: (step: Step) => void;
}

const BookingModalHeader = ({ step, onStepChange }: BookingModalHeaderProps) => {
  const handleBackClick = () => {
    if (step === 'payment-method') {
      onStepChange('guest-details');
    } else if (step === 'guest-details') {
      onStepChange('booking');
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <DialogTitle className="flex items-center space-x-3">
          {step === 'booking' && (
            <>
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-2 rounded-xl shadow-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Book your stay
              </span>
            </>
          )}
          {step === 'guest-details' && (
            <>
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-xl shadow-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Guest Details
              </span>
            </>
          )}
          {step === 'payment-method' && (
            <>
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Payment Method
              </span>
            </>
          )}
        </DialogTitle>
        {(step === 'guest-details' || step === 'payment-method') && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleBackClick}
            className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      {/* Enhanced Progress Indicator */}
      <div className="flex items-center space-x-3 mt-4">
        <div className={`h-3 w-12 rounded-full transition-all duration-300 ${
          step === 'booking' ? 'bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg' : 'bg-rose-200'
        }`} />
        <div className={`h-3 w-12 rounded-full transition-all duration-300 ${
          step === 'guest-details' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg' : 
          step === 'payment-method' ? 'bg-blue-200' : 'bg-gray-200'
        }`} />
        <div className={`h-3 w-12 rounded-full transition-all duration-300 ${
          step === 'payment-method' ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg' : 'bg-gray-200'
        }`} />
      </div>
    </>
  );
};

export default BookingModalHeader;
