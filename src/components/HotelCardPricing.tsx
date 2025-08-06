
import { Button } from '@/components/ui/button';

interface HotelCardPricingProps {
  pricePerNight: number;
  onBookClick: (e: React.MouseEvent) => void;
}

const HotelCardPricing = ({ pricePerNight, onBookClick }: HotelCardPricingProps) => {
  return (
    <div className="flex items-center justify-between px-3 sm:px-4 pb-3 sm:pb-4">
      <div>
        <span className="text-base sm:text-lg font-semibold royal-heading">₹{pricePerNight.toLocaleString('en-IN')}</span>
        <span className="royal-text text-xs sm:text-sm ml-1">/ night</span>
      </div>
      <Button 
        variant="royal"
        size="sm" 
        className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2 mobile-royal-optimized"
        onClick={onBookClick}
      >
        Book
      </Button>
    </div>
  );
};

export default HotelCardPricing;
