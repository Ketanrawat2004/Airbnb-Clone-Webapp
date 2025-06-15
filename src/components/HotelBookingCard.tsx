
import { Button } from '@/components/ui/button';

interface HotelBookingCardProps {
  pricePerNight: number;
  onReserveClick: () => void;
}

const HotelBookingCard = ({ pricePerNight, onReserveClick }: HotelBookingCardProps) => {
  // pricePerNight comes in paise, convert to rupees for display
  const priceInRupees = pricePerNight / 100;

  return (
    <div className="lg:col-span-1 order-first lg:order-last">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:sticky lg:top-8">
        <div className="text-center mb-4 sm:mb-6">
          <div className="text-2xl sm:text-3xl font-bold text-gray-900">
            ₹{priceInRupees.toLocaleString('en-IN')}
          </div>
          <div className="text-gray-600 text-sm sm:text-base">per night</div>
        </div>
        
        <Button 
          className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 sm:py-3 text-base sm:text-lg font-semibold"
          onClick={onReserveClick}
        >
          Reserve Now
        </Button>
        
        <p className="text-center text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4">
          You won't be charged yet
        </p>
      </div>
    </div>
  );
};

export default HotelBookingCard;
