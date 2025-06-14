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
import { CheckCircle, CreditCard, Smartphone, Wallet } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

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
    guest_details: {
      title: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    } | null;
    guest_list: any[];
  };
}

const DemoPaymentModal = ({ open, onOpenChange, bookingData }: DemoPaymentModalProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string>('credit-card');
  const [processing, setProcessing] = useState(false);

  const paymentMethods = [
    { id: 'credit-card', name: 'Credit Card', icon: CreditCard },
    { id: 'upi', name: 'UPI Payment', icon: Smartphone },
    { id: 'wallet', name: 'Digital Wallet', icon: Wallet },
  ];

  const handleDemoPayment = async () => {
    if (!user) {
      toast.error('Please sign in to make a booking');
      return;
    }

    if (!bookingData.guest_details) {
      toast.error('Guest details are missing');
      return;
    }

    setProcessing(true);

    try {
      console.log('Creating demo booking with data:', bookingData);

      // Create the booking with the current user's ID
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id, // This is crucial for RLS policies
          hotel_id: bookingData.hotel_id,
          check_in_date: bookingData.check_in_date,
          check_out_date: bookingData.check_out_date,
          guests: bookingData.guests,
          total_amount: bookingData.total_amount,
          guest_phone: bookingData.guest_phone,
          guest_name: `${bookingData.guest_details.firstName} ${bookingData.guest_details.lastName}`,
          status: 'confirmed',
          payment_status: 'paid',
          stripe_session_id: `demo_${Date.now()}`,
          discount_amount: 0,
        })
        .select()
        .single();

      if (bookingError) {
        console.error('Booking creation error:', bookingError);
        throw new Error(`Failed to create booking: ${bookingError.message}`);
      }

      console.log('Booking created successfully:', booking);

      // Send SMS confirmation
      try {
        console.log('Sending SMS to:', bookingData.guest_phone);
        const { data: smsData, error: smsError } = await supabase.functions.invoke('send-sms', {
          body: {
            booking_id: booking.id,
            phone: bookingData.guest_phone
          }
        });

        if (smsError) {
          console.error('SMS sending error:', smsError);
          toast.error('Booking created but SMS failed to send');
        } else {
          console.log('SMS sent successfully:', smsData);
          toast.success('Booking confirmed! SMS sent to your phone');
        }
      } catch (smsError) {
        console.error('SMS function error:', smsError);
        toast.error('Booking created but SMS failed to send');
      }

      // Send confirmation email
      try {
        console.log('Sending confirmation email');
        const { error: emailError } = await supabase.functions.invoke('send-confirmation-email', {
          body: {
            booking_id: booking.id,
            guest_email: bookingData.guest_details.email,
            guest_name: `${bookingData.guest_details.firstName} ${bookingData.guest_details.lastName}`,
          }
        });

        if (emailError) {
          console.error('Email sending error:', emailError);
        } else {
          console.log('Confirmation email sent successfully');
        }
      } catch (emailError) {
        console.error('Email function error:', emailError);
      }

      // Close modal and redirect to payment success
      onOpenChange(false);
      navigate(`/payment-success?session_id=${booking.stripe_session_id}`);

    } catch (error) {
      console.error('Demo payment error:', error);
      toast.error(`Payment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Demo Payment</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              This is a demo payment for testing purposes. No actual charges will be made.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Select Payment Method:</h3>
            {paymentMethods.map((method) => (
              <Card 
                key={method.id} 
                className={`cursor-pointer transition-colors ${
                  selectedMethod === method.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <CardContent className="flex items-center space-x-3 p-4">
                  <method.icon className="h-5 w-5" />
                  <span>{method.name}</span>
                  {selectedMethod === method.id && (
                    <CheckCircle className="h-4 w-4 text-blue-500 ml-auto" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Amount:</span>
              <span className="text-lg font-bold">₹{(bookingData.total_amount / 100).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDemoPayment}
              disabled={processing}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {processing ? 'Processing...' : 'Pay Now'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoPaymentModal;
