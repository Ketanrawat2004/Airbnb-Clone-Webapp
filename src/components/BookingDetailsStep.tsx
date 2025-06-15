
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Users, CreditCard } from 'lucide-react';
import HotelInfo from './HotelInfo';
import PriceBreakdown from './PriceBreakdown';
import CouponInput from './CouponInput';

interface Hotel {
  id: string;
  name: string;
  location: string;
  price_per_night: number;
  images: string[];
  available_rooms: number;
  facilities: string[];
  rules_and_regulations: string[];
}

interface BookingDetailsStepProps {
  hotel: Hotel;
  checkInDate: string;
  checkOutDate: string;
  guests: string;
  nights: number;
  total: number;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
  onGuestsChange: (guests: string) => void;
  onContinue: () => void;
  appliedCoupon?: { code: string; discountAmount: number; couponId: string } | null;
  onCouponApplied?: (couponData: { code: string; discountAmount: number; couponId: string } | null) => void;
}

const BookingDetailsStep = ({
  hotel,
  checkInDate,
  checkOutDate,
  guests,
  nights,
  total,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  onContinue,
  appliedCoupon,
  onCouponApplied,
}: BookingDetailsStepProps) => {
  // Calculate booking amount in paise for coupon validation
  // hotel.price_per_night is in paise, total is in rupees
  const calculateBookingAmountInPaise = () => {
    return nights * hotel.price_per_night; // hotel.price_per_night is already in paise
  };

  return (
    <div className="space-y-6">
      {/* Hotel Info */}
      <HotelInfo hotel={hotel} />

      {/* Booking Details */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="checkIn" className="flex items-center text-sm font-medium mb-1">
              <Calendar className="h-3 w-3 mr-1" />
              Check-in
            </Label>
            <Input
              id="checkIn"
              type="date"
              value={checkInDate}
              onChange={(e) => onCheckInChange(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <Label htmlFor="checkOut" className="flex items-center text-sm font-medium mb-1">
              <Calendar className="h-3 w-3 mr-1" />
              Check-out
            </Label>
            <Input
              id="checkOut"
              type="date"
              value={checkOutDate}
              onChange={(e) => onCheckOutChange(e.target.value)}
              min={checkInDate || new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="guests" className="flex items-center text-sm font-medium mb-1">
            <Users className="h-3 w-3 mr-1" />
            Guests
          </Label>
          <Input
            id="guests"
            type="number"
            value={guests}
            onChange={(e) => onGuestsChange(e.target.value)}
            min="1"
            max={hotel.available_rooms * 2}
          />
        </div>

        {/* Coupon Input */}
        {nights > 0 && onCouponApplied && (
          <CouponInput
            bookingAmount={calculateBookingAmountInPaise()}
            onCouponApplied={onCouponApplied}
            appliedCoupon={appliedCoupon}
          />
        )}
      </div>

      {/* Price Breakdown */}
      <PriceBreakdown 
        nights={nights} 
        total={hotel.price_per_night / 100} 
        appliedCoupon={appliedCoupon}
      />

      {/* Continue Button */}
      <Button
        onClick={onContinue}
        disabled={!checkInDate || !checkOutDate || !guests || nights <= 0}
        className="w-full bg-rose-500 hover:bg-rose-600"
      >
        <CreditCard className="h-4 w-4 mr-2" />
        Continue to Guest Details
      </Button>
    </div>
  );
};

export default BookingDetailsStep;
