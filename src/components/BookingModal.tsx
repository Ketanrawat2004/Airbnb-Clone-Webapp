import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import GuestDetailsForm from './GuestDetailsForm';
import BookingDetailsStep from './BookingDetailsStep';
import DemoPaymentModal from './DemoPaymentModal';
import RazorpayPaymentModal from './RazorpayPaymentModal';
import BookingModalHeader from './BookingModalHeader';
import BookingModalPaymentStep from './BookingModalPaymentStep';
import { Guest } from './GuestForm';
import { useNavigate } from 'react-router-dom';

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

interface BookingModalProps {
  hotel: Hotel;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: string;
}

interface GuestDetails {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
}

type Step = 'booking' | 'guest-details' | 'payment-method';

const BookingModal = ({ 
  hotel, 
  open, 
  onOpenChange, 
  initialCheckIn = '', 
  initialCheckOut = '', 
  initialGuests = '1' 
}: BookingModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<Step>('booking');
  const [showDemoPayment, setShowDemoPayment] = useState(false);
  const [showRazorpayPayment, setShowRazorpayPayment] = useState(false);
  const [razorpayData, setRazorpayData] = useState<any>(null);
  
  const [checkInDate, setCheckInDate] = useState(initialCheckIn);
  const [checkOutDate, setCheckOutDate] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number; couponId: string } | null>(null);
  const [guestDetails, setGuestDetails] = useState<GuestDetails | null>(null);
  const [guestList, setGuestList] = useState<Guest[]>([]);

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    return Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)));
  };

  const calculateFinalAmount = () => {
    const nights = calculateNights();
    const baseAmountInPaise = nights * hotel.price_per_night;
    const couponDiscountInPaise = appliedCoupon ? appliedCoupon.discountAmount : 0;
    return baseAmountInPaise - couponDiscountInPaise;
  };

  const validateBookingDetails = () => {
    if (!checkInDate || !checkOutDate || !guests) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all booking details.',
        variant: 'destructive',
      });
      return false;
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) {
      toast({
        title: 'Invalid check-in date',
        description: 'Check-in date cannot be in the past.',
        variant: 'destructive',
      });
      return false;
    }

    if (checkIn >= checkOut) {
      toast({
        title: 'Invalid dates',
        description: 'Check-out date must be after check-in date.',
        variant: 'destructive',
      });
      return false;
    }

    if (parseInt(guests) > hotel.available_rooms * 2) {
      toast({
        title: 'Too many guests',
        description: `This property can accommodate up to ${hotel.available_rooms * 2} guests.`,
        variant: 'destructive',
      });
      return false;
    }

    if (parseInt(guests) < 1) {
      toast({
        title: 'Invalid guest count',
        description: 'At least 1 guest is required.',
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  const handleBookingContinue = () => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to make a booking.',
        variant: 'destructive',
      });
      return;
    }

    if (!validateBookingDetails()) {
      return;
    }

    setStep('guest-details');
  };

  const handleGuestDetailsSubmit = async (guestDetails: GuestDetails, agreeToTerms: boolean, guestList: Guest[]) => {
    if (!agreeToTerms) {
      toast({
        title: 'Agreement required',
        description: 'Please agree to the terms and conditions to proceed.',
        variant: 'destructive',
      });
      return;
    }

    if (guestList.length !== parseInt(guests)) {
      toast({
        title: 'Guest count mismatch',
        description: `Please add details for all ${guests} guests.`,
        variant: 'destructive',
      });
      return;
    }

    const incompleteGuests = guestList.some(guest => 
      !guest.firstName.trim() || !guest.lastName.trim() || !guest.age.trim()
    );

    if (incompleteGuests) {
      toast({
        title: 'Incomplete guest details',
        description: 'Please complete all required fields for each guest.',
        variant: 'destructive',
      });
      return;
    }

    setGuestDetails(guestDetails);
    setGuestList(guestList);
    setStep('payment-method');
  };

  const handleRazorpayPayment = async () => {
    if (!guestDetails) return;

    try {
      setLoading(true);
      
      const finalAmountInPaise = calculateFinalAmount();
      const guestPhone = `${guestDetails.countryCode}${guestDetails.phone}`;
      
      // Set razorpay data for the modal
      const razorpayPaymentData = {
        amount: finalAmountInPaise,
        currency: 'INR',
        key_id: 'rzp_test_9wRKnN4to5ERAQ', // This will be set by the edge function
        hotel_name: hotel.name,
        user_email: guestDetails.email,
        user_name: `${guestDetails.firstName} ${guestDetails.lastName}`,
        guest_phone: guestPhone,
        order_id: `temp_${Date.now()}`, // This will be replaced by actual order_id
      };

      setRazorpayData(razorpayPaymentData);
      setShowRazorpayPayment(true);
      
    } catch (error) {
      console.error('Razorpay payment error:', error);
      toast({
        title: 'Payment setup failed',
        description: `Unable to process payment: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = (paymentId: string) => {
    toast({
      title: 'Payment successful! 🎉',
      description: 'Your booking has been confirmed.',
    });
    
    // Navigate to success page
    navigate(`/payment-success?payment_id=${paymentId}`);
    handleModalClose();
  };

  const handleModalClose = () => {
    setStep('booking');
    setAppliedCoupon(null);
    setGuestDetails(null);
    setGuestList([]);
    setShowRazorpayPayment(false);
    setRazorpayData(null);
    onOpenChange(false);
  };

  const nights = calculateNights();
  const finalAmountInPaise = calculateFinalAmount();

  return (
    <>
      <Dialog open={open} onOpenChange={handleModalClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white via-rose-50/20 to-pink-50/30 border-0 shadow-2xl">
          <DialogHeader>
            <BookingModalHeader step={step} onStepChange={setStep} />
          </DialogHeader>

          {step === 'booking' && (
            <BookingDetailsStep
              hotel={hotel}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              guests={guests}
              nights={nights}
              total={nights * (hotel.price_per_night / 100)}
              onCheckInChange={setCheckInDate}
              onCheckOutChange={setCheckOutDate}
              onGuestsChange={setGuests}
              onContinue={handleBookingContinue}
              appliedCoupon={appliedCoupon}
              onCouponApplied={setAppliedCoupon}
            />
          )}

          {step === 'guest-details' && (
            <GuestDetailsForm 
              onSubmit={handleGuestDetailsSubmit}
              loading={loading}
              totalGuests={parseInt(guests)}
            />
          )}

          {step === 'payment-method' && (
            <BookingModalPaymentStep
              hotel={hotel}
              nights={nights}
              guests={guests}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              finalAmountInPaise={finalAmountInPaise}
              guestList={guestList}
              guestDetails={guestDetails}
              appliedCoupon={appliedCoupon}
              loading={loading}
              onRazorpayPayment={handleRazorpayPayment}
              onDemoPayment={() => setShowDemoPayment(true)}
            />
          )}
        </DialogContent>
      </Dialog>

      <DemoPaymentModal
        open={showDemoPayment}
        onOpenChange={setShowDemoPayment}
        bookingData={{
          hotel_id: hotel.id,
          hotel_name: hotel.name,
          check_in_date: checkInDate,
          check_out_date: checkOutDate,
          guests: parseInt(guests),
          guest_phone: guestDetails ? `${guestDetails.countryCode}${guestDetails.phone}` : '',
          total_amount: finalAmountInPaise,
          guest_details: guestDetails,
          guest_list: guestList,
        }}
      />

      {razorpayData && (
        <RazorpayPaymentModal
          isOpen={showRazorpayPayment}
          setIsOpen={setShowRazorpayPayment}
          amount={razorpayData.amount}
          currency={razorpayData.currency}
          email={razorpayData.user_email}
          name={razorpayData.user_name}
          phone={razorpayData.guest_phone}
          bookingId={razorpayData.order_id}
          hotelId={hotel.id}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          guests={guests}
        />
      )}
    </>
  );
};

export default BookingModal;
