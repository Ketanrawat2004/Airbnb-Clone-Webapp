
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, CreditCard } from 'lucide-react';
import BookingModalBookingSummary from './BookingModalBookingSummary';
import { Guest } from './GuestForm';

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

interface GuestDetails {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
}

interface BookingModalPaymentStepProps {
  hotel: Hotel;
  nights: number;
  guests: string;
  checkInDate: string;
  checkOutDate: string;
  finalAmountInPaise: number;
  guestList: Guest[];
  guestDetails: GuestDetails | null;
  appliedCoupon: { code: string; discountAmount: number; couponId: string } | null;
  loading: boolean;
  onRazorpayPayment: () => void;
  onDemoPayment: () => void;
}

const BookingModalPaymentStep = ({
  hotel,
  nights,
  guests,
  checkInDate,
  checkOutDate,
  finalAmountInPaise,
  guestList,
  loading,
  onRazorpayPayment,
  onDemoPayment
}: BookingModalPaymentStepProps) => {
  const [readyToPayment, setReadyToPayment] = useState(false);

  // Preload payment readiness
  useEffect(() => {
    const timer = setTimeout(() => {
      setReadyToPayment(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <BookingModalBookingSummary
        hotel={hotel}
        nights={nights}
        guests={guests}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        finalAmountInPaise={finalAmountInPaise}
        guestList={guestList}
      />

      <div className="space-y-4">
        <h3 className="font-bold text-lg flex items-center space-x-2">
          <CreditCard className="h-5 w-5 text-rose-500" />
          <span>Choose Payment Method</span>
        </h3>
        
        <Button 
          onClick={onRazorpayPayment}
          disabled={loading || !readyToPayment}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-6 text-lg font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 disabled:scale-100 disabled:opacity-70"
        >
          {loading ? (
            <div className="flex items-center space-x-3">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Setting up payment...</span>
            </div>
          ) : !readyToPayment ? (
            <div className="flex items-center space-x-3">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Preparing...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span>Pay ₹{(finalAmountInPaise / 100).toLocaleString('en-IN')} with Razorpay</span>
            </div>
          )}
        </Button>
        
        <Button 
          onClick={onDemoPayment}
          variant="outline"
          disabled={loading}
          className="w-full border-2 border-blue-300 text-blue-600 hover:bg-blue-50 py-6 text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105 disabled:scale-100 disabled:opacity-70"
        >
          <div className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Demo Payment (Test Mode)</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default BookingModalPaymentStep;
