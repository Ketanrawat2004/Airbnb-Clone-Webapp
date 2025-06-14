
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface CancelBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: {
    id: string;
    hotels: {
      name: string;
    };
    check_in_date: string;
    payment_status: string;
  };
  onBookingCancelled: () => void;
}

const CancelBookingDialog = ({ 
  open, 
  onOpenChange, 
  booking, 
  onBookingCancelled 
}: CancelBookingDialogProps) => {
  const [cancelling, setCancelling] = useState(false);

  const handleCancelBooking = async () => {
    setCancelling(true);
    
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: 'cancelled',
          payment_status: 'refunded'
        })
        .eq('id', booking.id);

      if (error) {
        console.error('Error cancelling booking:', error);
        toast.error('Failed to cancel booking');
        return;
      }

      toast.success('Booking cancelled successfully');
      onBookingCancelled();
      onOpenChange(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to cancel booking');
    } finally {
      setCancelling(false);
    }
  };

  const isCheckInToday = () => {
    const today = new Date();
    const checkInDate = new Date(booking.check_in_date);
    today.setHours(0, 0, 0, 0);
    checkInDate.setHours(0, 0, 0, 0);
    return checkInDate.getTime() === today.getTime();
  };

  const isCheckInPassed = () => {
    const today = new Date();
    const checkInDate = new Date(booking.check_in_date);
    today.setHours(0, 0, 0, 0);
    checkInDate.setHours(0, 0, 0, 0);
    return checkInDate.getTime() < today.getTime();
  };

  if (isCheckInPassed()) {
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cannot Cancel Booking</AlertDialogTitle>
            <AlertDialogDescription>
              This booking cannot be cancelled as the check-in date has already passed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  const refundWarning = isCheckInToday() 
    ? "Since check-in is today, cancellation fees may apply." 
    : "You will receive a full refund for this cancellation.";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel your booking at {booking.hotels.name}? 
            {booking.payment_status === 'paid' && (
              <span className="block mt-2 text-sm text-gray-600">
                {refundWarning}
              </span>
            )}
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={cancelling}>Keep Booking</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleCancelBooking}
            disabled={cancelling}
            className="bg-red-600 hover:bg-red-700"
          >
            {cancelling ? 'Cancelling...' : 'Cancel Booking'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelBookingDialog;
