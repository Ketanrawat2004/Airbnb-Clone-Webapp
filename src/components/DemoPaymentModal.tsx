
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
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Shield, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DemoPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingData: {
    hotel_id: string;
    hotel_name: string;
    check_in_date: string;
    check_out_date: string;
    guests: number;
    guest_phone: string;
    total_amount: number;
    guest_details: any;
    guest_list: any[];
  };
}

const DemoPaymentModal = ({ open, onOpenChange, bookingData }: DemoPaymentModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);

  const handleDemoPayment = async () => {
    if (!user) return;

    try {
      setProcessing(true);
      
      console.log('Creating demo booking...');
      
      // Create booking directly in database (demo mode)
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          hotel_id: bookingData.hotel_id,
          check_in_date: bookingData.check_in_date,
          check_out_date: bookingData.check_out_date,
          guests: bookingData.guests,
          total_amount: bookingData.total_amount,
          guest_phone: bookingData.guest_phone,
          guest_name: `${bookingData.guest_details.firstName} ${bookingData.guest_details.lastName}`,
          stripe_session_id: `demo_${Date.now()}`,
          payment_status: 'paid',
          status: 'confirmed',
        })
        .select()
        .single();

      if (bookingError) {
        console.error('Error creating booking:', bookingError);
        throw new Error(`Failed to create booking: ${bookingError.message}`);
      }

      console.log('Demo booking created:', booking);

      // Send SMS notification
      try {
        await supabase.functions.invoke('send-sms', {
          body: { 
            booking_id: booking.id,
            phone: bookingData.guest_phone,
          },
        });
        console.log('SMS sent successfully');
      } catch (smsError) {
        console.log('SMS sending failed (demo mode):', smsError);
      }

      // Generate receipt
      try {
        await supabase.functions.invoke('generate-receipt', {
          body: { booking_id: booking.id },
        });
        console.log('Receipt generated successfully');
      } catch (receiptError) {
        console.log('Receipt generation failed (demo mode):', receiptError);
      }

      toast({
        title: 'Demo Payment Successful!',
        description: 'Your booking has been confirmed (demo mode)',
      });

      // Redirect to payment success page with demo session
      window.location.href = `/payment-success?session_id=demo_${booking.id}`;
      
    } catch (error) {
      console.error('Demo payment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      toast({
        title: 'Demo Payment Failed',
        description: `Unable to process demo payment: ${errorMessage}`,
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Demo Payment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 text-blue-700">
                <Shield className="h-5 w-5" />
                <span className="font-medium">Demo Mode</span>
              </div>
              <p className="text-sm text-blue-600 mt-1">
                This is a demonstration payment. No actual charges will be made.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Hotel:</span>
              <span className="font-medium">{bookingData.hotel_name}</span>
            </div>
            <div className="flex justify-between">
              <span>Dates:</span>
              <span className="font-medium">
                {new Date(bookingData.check_in_date).toLocaleDateString()} - {new Date(bookingData.check_out_date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Guests:</span>
              <span className="font-medium">{bookingData.guests}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-semibold">Total Amount:</span>
              <span className="font-bold text-lg">₹{(bookingData.total_amount / 100).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <Button 
              onClick={handleDemoPayment}
              disabled={processing}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {processing ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Processing Demo Payment...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Complete Demo Payment
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={processing}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoPaymentModal;
