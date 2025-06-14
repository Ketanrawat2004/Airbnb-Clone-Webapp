
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
import { Calendar, Users, CreditCard, MapPin, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  
  const [checkInDate, setCheckInDate] = useState(initialCheckIn);
  const [checkOutDate, setCheckOutDate] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);
  const [guestPhone, setGuestPhone] = useState('');

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return nights * (hotel.price_per_night / 100); // Convert from cents
  };

  const handleBooking = async () => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to make a booking.',
        variant: 'destructive',
      });
      return;
    }

    if (!checkInDate || !checkOutDate || !guests || !guestPhone) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all booking details including phone number.',
        variant: 'destructive',
      });
      return;
    }

    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      toast({
        title: 'Invalid dates',
        description: 'Check-out date must be after check-in date.',
        variant: 'destructive',
      });
      return;
    }

    if (parseInt(guests) > hotel.available_rooms * 2) {
      toast({
        title: 'Too many guests',
        description: `This property can accommodate up to ${hotel.available_rooms * 2} guests.`,
        variant: 'destructive',
      });
      return;
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(guestPhone)) {
      toast({
        title: 'Invalid phone number',
        description: 'Please enter a valid phone number for SMS notifications.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      
      const totalAmount = calculateTotal() * 100; // Convert to cents
      
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          hotel_id: hotel.id,
          check_in_date: checkInDate,
          check_out_date: checkOutDate,
          guests: parseInt(guests),
          guest_phone: guestPhone,
          total_amount: totalAmount,
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
      toast({
        title: 'Payment setup failed',
        description: 'There was an error setting up your payment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const nights = calculateNights();
  const total = calculateTotal();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book your stay</DialogTitle>
        </DialogHeader>

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
                ${hotel.price_per_night / 100} per night
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

            <div>
              <Label htmlFor="phone" className="flex items-center text-sm font-medium mb-1">
                <Phone className="h-3 w-3 mr-1" />
                Phone Number (for SMS notifications)
              </Label>
              <Input
                id="phone"
                type="tel"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                placeholder="+1234567890"
              />
            </div>
          </div>

          {/* Price Breakdown */}
          {nights > 0 && (
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>${hotel.price_per_night / 100} × {nights} nights</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Book Button */}
          <Button
            onClick={handleBooking}
            disabled={loading || !checkInDate || !checkOutDate || !guests || !guestPhone}
            className="w-full bg-rose-500 hover:bg-rose-600"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            {loading ? 'Processing...' : `Pay now - $${total.toFixed(2)}`}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            You will receive booking confirmation and receipt via SMS and email after successful payment.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
