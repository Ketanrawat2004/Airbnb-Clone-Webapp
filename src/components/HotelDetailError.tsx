
import { Button } from '@/components/ui/button';
import HotelDetailLayout from './HotelDetailLayout';

interface HotelDetailErrorProps {
  onBackToHome: () => void;
}

const HotelDetailError = ({ onBackToHome }: HotelDetailErrorProps) => {
  return (
    <HotelDetailLayout>
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Hotel not found</h1>
        <Button onClick={onBackToHome}>Back to Home</Button>
      </div>
    </HotelDetailLayout>
  );
};

export default HotelDetailError;
