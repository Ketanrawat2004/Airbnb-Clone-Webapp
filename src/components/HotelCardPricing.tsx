
import { Button } from '@/components/ui/button';

interface HotelCardPricingProps {
  pricePerNight: number;
  onBookClick: (e: React.MouseEvent) => void;
}

const HotelCardPricing = ({ pricePerNight, onBookClick }: HotelCardPricingProps) => {
  return (
    <div className="flex items-center justify-between px-5 pb-5 pt-4 border-t border-gray-100 mt-auto">
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-gray-900">₹{pricePerNight.toLocaleString('en-IN')}</span>
        <span className="text-gray-600 text-sm font-medium">/ night</span>
      </div>
      <Button 
        className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        onClick={onBookClick}
      >
        Book
      </Button>
    </div>
  );
};

export default HotelCardPricing;
