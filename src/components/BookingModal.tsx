
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
import { ArrowLeft, Users, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GuestDetailsForm from './GuestDetailsForm';
import BookingDetailsStep from './BookingDetailsStep';
import DemoPaymentModal from './DemoPaymentModal';
import RazorpayPaymentModal from './RazorpayPaymentModal';
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
  const [step, setStep] = useState<'booking' | 'guest-details' | 'payment-method'>('booking');
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
      
      const { data, error } = await supabase.functions.invoke('create-razorpay-payment', {
        body: {
          hotel_id: hotel.id,
          check_in_date: checkInDate,
          check_out_date: checkOutDate,
          guests: parseInt(guests),
          guest_phone: guestPhone,
          total_amount: finalAmountInPaise,
          guest_details: {
            title: guestDetails.title,
            firstName: guestDetails.firstName,
            lastName: guestDetails.lastName,
            email: guestDetails.email,
            phone: guestPhone,
          },
          guest_list: guestList,
          coupon_data: appliedCoupon
        },
      });

      if (error || !data?.order_id) {
        throw new Error(error?.message || 'Payment setup failed');
      }

      setRazorpayData(data);
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
                  onClick={() => setStep(step === 'payment-method' ? 'guest-details' : 'booking')}
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
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 shadow-inner">
                <h3 className="font-bold mb-4 flex items-center space-x-2 text-lg">
                  <Users className="h-6 w-6 text-gray-600" />
                  <span>Booking Summary</span>
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">{hotel.name}</span>
                    <span className="font-bold text-xl text-rose-600">₹{(finalAmountInPaise / 100).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{nights} nights • {guests} guests</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{checkInDate} to {checkOutDate}</span>
                  </div>
                  {guestList.length > 0 && (
                    <div className="border-t pt-3 mt-3">
                      <p className="font-semibold text-gray-700 mb-2">Guests:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        {guestList.map((guest, index) => (
                          <p key={guest.id} className="text-xs text-gray-600 bg-white rounded-lg px-2 py-1">
                            {index + 1}. {guest.title} {guest.firstName} {guest.lastName} ({guest.age} years)
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">Choose Payment Method</h3>
                
                <Button 
                  onClick={handleRazorpayPayment}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-6 text-lg font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Setting up payment...</span>
                    </div>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Pay with Razorpay
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={() => setShowDemoPayment(true)}
                  variant="outline"
                  className="w-full border-2 border-blue-300 text-blue-600 hover:bg-blue-50 py-6 text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105"
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
          total_amount: finalAmountInPaise,
          guest_details: guestDetails,
          guest_list: guestList,
        }}
      />

      {razorpayData && (
        <RazorpayPaymentModal
          open={showRazorpayPayment}
          onOpenChange={setShowRazorpayPayment}
          paymentData={razorpayData}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
};

export default BookingModal;
