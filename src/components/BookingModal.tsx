
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Users, CreditCard, MapPin, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GuestDetailsForm from './GuestDetailsForm';

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
    return nights * (hotel.price_per_night / 100); // Convert from cents
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

  const handleGuestDetailsSubmit = async (guestDetails: GuestDetails, agreeToTerms: boolean) => {
    if (!agreeToTerms) {
      toast({
        title: 'Agreement required',
        description: 'Please agree to the terms and conditions to proceed.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      
      const totalAmount = Math.round(calculateTotal() * 100); // Convert to cents
      const guestPhone = `${guestDetails.countryCode}${guestDetails.phone}`;
      
      console.log('Creating payment with details:', {
        hotel_id: hotel.id,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        guests: parseInt(guests),
        guest_phone: guestPhone,
        total_amount: totalAmount,
      });

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          hotel_id: hotel.id,
          check_in_date: checkInDate,
          check_out_date: checkOutDate,
          guests: parseInt(guests),
          guest_phone: guestPhone,
          total_amount: totalAmount,
          guest_details: {
            title: guestDetails.title,
            first_name: guestDetails.firstName,
            last_name: guestDetails.lastName,
            email: guestDetails.email,
            phone: guestPhone,
          }
        },
      });

      if (error) {
        console.error('Payment creation error:', error);
        throw error;
      }

      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('No payment URL received');
      }
      
    } catch (error) {
      console.error('Error creating payment:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast({
        title: 'Payment setup failed',
        description: `There was an error setting up your payment: ${errorMessage}. Please try again.`,
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
  const basePrice = total * 83; // Convert to INR
  const discount = Math.round(basePrice * 0.64);
  const discountedPrice = Math.round(basePrice * 0.36);
  const taxes = Math.round(basePrice * 0.2);
  const finalAmount = Math.round(basePrice * 0.56);

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
          <div className="space-y-6">
            {/* Hotel Info */}
            <div className="flex space-x-3">
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{hotel.name}</h3>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-3 w-3 mr-1" />
                  {hotel.location}
                </div>
                <p className="text-sm text-gray-600">
                  ${(hotel.price_per_night / 100).toFixed(2)} per night
                </p>
              </div>
            </div>

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
                    onChange={(e) => setCheckInDate(e.target.value)}
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
                    onChange={(e) => setCheckOutDate(e.target.value)}
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
                  onChange={(e) => setGuests(e.target.value)}
                  min="1"
                  max={hotel.available_rooms * 2}
                />
              </div>
            </div>

            {/* Price Breakdown */}
            {nights > 0 && (
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>1 Room x {nights} Night{nights > 1 ? 's' : ''}</span>
                  <span></span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Base Price</span>
                  <span>₹ {basePrice.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Total Discount</span>
                  <span>- ₹ {discount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Price after Discount</span>
                  <span>₹ {discountedPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxes & Service Fees</span>
                  <span>₹ {taxes}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total Amount to be paid</span>
                  <span>₹ {finalAmount}</span>
                </div>
              </div>
            )}

            {/* Continue Button */}
            <Button
              onClick={handleBookingContinue}
              disabled={!checkInDate || !checkOutDate || !guests || nights <= 0}
              className="w-full bg-rose-500 hover:bg-rose-600"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Continue to Guest Details
            </Button>
          </div>
        ) : (
          <GuestDetailsForm 
            onSubmit={handleGuestDetailsSubmit}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
