
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GuestDetailsForm from './GuestDetailsForm';
import BookingDetailsStep from './BookingDetailsStep';
import DemoPaymentModal from './DemoPaymentModal';
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
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'booking' | 'guest-details' | 'payment-method'>('booking');
  const [showDemoPayment, setShowDemoPayment] = useState(false);
  
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

  const calculateTotal = () => {
    const nights = calculateNights();
    // Convert from paise to rupees, then to USD for payment processing
    return nights * (hotel.price_per_night / 100 / 83); // Convert INR to USD
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

    // Validate guest count matches booking
    if (guestList.length !== parseInt(guests)) {
      toast({
        title: 'Guest count mismatch',
        description: `Please add details for all ${guests} guests.`,
        variant: 'destructive',
      });
      return;
    }

    // Validate all guest fields are completed
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

    console.log('Guest details submitted:', guestDetails);
    console.log('Guest list:', guestList);

    setGuestDetails(guestDetails);
    setGuestList(guestList);
    setStep('payment-method');
  };

  const handleStripePayment = async () => {
    if (!guestDetails) return;

    console.log('Starting Stripe payment process...');

    try {
      setLoading(true);
      
      const nights = calculateNights();
      const totalAmountInPaise = nights * hotel.price_per_night;
      const guestPhone = `${guestDetails.countryCode}${guestDetails.phone}`;
      
      console.log('Calling create-payment function...');

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          hotel_id: hotel.id,
          check_in_date: checkInDate,
          check_out_date: checkOutDate,
          guests: parseInt(guests),
          guest_phone: guestPhone,
          total_amount: totalAmountInPaise,
          guest_details: {
            title: guestDetails.title,
            first_name: guestDetails.firstName,
            last_name: guestDetails.lastName,
            email: guestDetails.email,
            phone: guestPhone,
          },
          guest_list: guestList,
          coupon_data: appliedCoupon
        },
      });

      if (error || !data?.url) {
        throw new Error(error?.message || 'Payment URL not received');
      }

      console.log('Redirecting to Stripe:', data.url);
      window.location.href = data.url;
      
    } catch (error) {
      console.error('Stripe payment error:', error);
      toast({
        title: 'Payment setup failed',
        description: `Unable to process payment: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setStep('booking');
    setAppliedCoupon(null);
    setGuestDetails(null);
    setGuestList([]);
    onOpenChange(false);
  };

  const nights = calculateNights();
  const total = calculateTotal();
  const totalAmountInPaise = nights * hotel.price_per_night;

  return (
    <>
      <Dialog open={open} onOpenChange={handleModalClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center space-x-2">
                {step === 'booking' && (
                  <>
                    <div className="bg-rose-100 p-1 rounded-full">
                      <Users className="h-4 w-4 text-rose-600" />
                    </div>
                    <span>Book your stay</span>
                  </>
                )}
                {step === 'guest-details' && (
                  <>
                    <div className="bg-blue-100 p-1 rounded-full">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>Guest Details</span>
                  </>
                )}
                {step === 'payment-method' && (
                  <>
                    <div className="bg-green-100 p-1 rounded-full">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <span>Payment Method</span>
                  </>
                )}
              </DialogTitle>
              {(step === 'guest-details' || step === 'payment-method') && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setStep(step === 'payment-method' ? 'guest-details' : 'booking')}
                  className="p-2 hover:bg-gray-100"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
            </div>
            {/* Progress Indicator */}
            <div className="flex items-center space-x-2 mt-2">
              <div className={`h-2 w-8 rounded-full ${step === 'booking' ? 'bg-rose-500' : 'bg-rose-200'}`} />
              <div className={`h-2 w-8 rounded-full ${step === 'guest-details' ? 'bg-blue-500' : step === 'payment-method' ? 'bg-blue-200' : 'bg-gray-200'}`} />
              <div className={`h-2 w-8 rounded-full ${step === 'payment-method' ? 'bg-green-500' : 'bg-gray-200'}`} />
            </div>
          </DialogHeader>

          {step === 'booking' && (
            <BookingDetailsStep
              hotel={hotel}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              guests={guests}
              nights={nights}
              total={total}
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
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-600" />
                  <span>Booking Summary</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">{hotel.name}</span>
                    <span className="font-semibold">₹{(totalAmountInPaise / 100).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{nights} nights • {guests} guests</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{checkInDate} to {checkOutDate}</span>
                  </div>
                  {guestList.length > 0 && (
                    <div className="border-t pt-2 mt-2">
                      <p className="font-medium text-gray-700 mb-1">Guests:</p>
                      {guestList.map((guest, index) => (
                        <p key={guest.id} className="text-xs text-gray-600">
                          {index + 1}. {guest.title} {guest.firstName} {guest.lastName} ({guest.age} years)
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Choose Payment Method</h3>
                
                <Button 
                  onClick={handleStripePayment}
                  disabled={loading}
                  className="w-full bg-rose-500 hover:bg-rose-600 py-3"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    'Pay with Stripe (Real Payment)'
                  )}
                </Button>
                
                <Button 
                  onClick={() => setShowDemoPayment(true)}
                  variant="outline"
                  className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 py-3"
                >
                  Demo Payment (Test Mode)
                </Button>
              </div>
            </div>
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
          total_amount: totalAmountInPaise,
          guest_details: guestDetails,
          guest_list: guestList,
        }}
      />
    </>
  );
};

export default BookingModal;
