
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
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GuestDetailsForm from './GuestDetailsForm';
import BookingDetailsStep from './BookingDetailsStep';
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
  const [step, setStep] = useState<'booking' | 'guest-details'>('booking');
  
  const [checkInDate, setCheckInDate] = useState(initialCheckIn);
  const [checkOutDate, setCheckOutDate] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);

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

    console.log('Starting payment process...');
    console.log('User:', user);
    console.log('Guest details:', guestDetails);
    console.log('Guest list:', guestList);
    console.log('Booking details:', { checkInDate, checkOutDate, guests });

    try {
      setLoading(true);
      
      // Calculate total in INR (paise) for backend
      const nights = calculateNights();
      const totalAmountInPaise = nights * hotel.price_per_night;
      const guestPhone = `${guestDetails.countryCode}${guestDetails.phone}`;
      
      console.log('Payment details:', {
        hotel_id: hotel.id,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        guests: parseInt(guests),
        guest_phone: guestPhone,
        total_amount: totalAmountInPaise,
        nights: nights,
        price_per_night: hotel.price_per_night,
        guest_list: guestList
      });

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
          guest_list: guestList
        },
      });

      console.log('Payment function response:', { data, error });

      if (error) {
        console.error('Payment creation error:', error);
        throw new Error(error.message || 'Failed to create payment session');
      }

      if (!data) {
        throw new Error('No response received from payment service');
      }

      if (!data.url) {
        console.error('No payment URL in response:', data);
        throw new Error('Payment URL not received from server');
      }

      console.log('Redirecting to payment URL:', data.url);
      
      // Open Stripe checkout in the same tab
      window.location.href = data.url;
      
    } catch (error) {
      console.error('Error in payment process:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      toast({
        title: 'Payment setup failed',
        description: `Unable to process payment: ${errorMessage}. Please try again.`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setStep('booking');
    onOpenChange(false);
  };

  const nights = calculateNights();
  const total = calculateTotal();

  return (
    <Dialog open={open} onOpenChange={handleModalClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>
              {step === 'booking' ? 'Book your stay' : 'Guest Details'}
            </DialogTitle>
            {step === 'guest-details' && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setStep('booking')}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
          </div>
        </DialogHeader>

        {step === 'booking' ? (
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
          />
        ) : (
          <GuestDetailsForm 
            onSubmit={handleGuestDetailsSubmit}
            loading={loading}
            totalGuests={parseInt(guests)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
