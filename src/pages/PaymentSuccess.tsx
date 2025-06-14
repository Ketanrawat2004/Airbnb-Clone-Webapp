
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Download, MessageSquare, Home, Phone, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface BookingDetails {
  id: string;
  guest_phone: string;
  check_in_date: string;
  check_out_date: string;
  guests: number;
  total_amount: number;
  hotels: {
    name: string;
    location: string;
  };
  profiles: {
    full_name: string;
  };
}

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<BookingDetails | null>(null);

  useEffect(() => {
    if (sessionId) {
      fetchBookingDetails();
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  const fetchBookingDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          hotels:hotel_id (name, location),
          profiles:user_id (full_name)
        `)
        .eq('stripe_session_id', sessionId)
        .single();

      if (error) {
        console.error('Error fetching booking details:', error);
      } else {
        setBooking(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // Simulate loading delay for better UX
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const downloadTicket = async () => {
    if (!booking) return;

    try {
      const { data, error } = await supabase.functions.invoke('generate-receipt', {
        body: { booking_id: booking.id }
      });

      if (error) throw error;

      if (data?.html_content) {
        const blob = new Blob([data.html_content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `booking-receipt-${booking.id.substring(0, 8)}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast.success('Ticket downloaded successfully!');
      }
    } catch (error) {
      console.error('Error downloading ticket:', error);
      toast.error('Failed to download ticket');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">
            Booking Confirmed!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {booking && (
            <>
              {/* Booking Summary */}
              <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-blue-900">Booking Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-blue-800">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="font-medium">{booking.hotels.name}</span>
                  </div>
                  <div className="flex items-center text-blue-700">
                    <span>{booking.hotels.location}</span>
                  </div>
                  <div className="flex items-center text-blue-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {new Date(booking.check_in_date).toLocaleDateString()} - {new Date(booking.check_out_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                    <span className="font-medium">Total Paid:</span>
                    <span className="font-bold text-lg">₹{(booking.total_amount / 100).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Confirmation Messages */}
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-green-600 mr-3" />
                  <div className="flex-1">
                    <span className="text-sm text-green-700 font-medium">SMS Confirmation Sent</span>
                    <p className="text-xs text-green-600">
                      Booking details sent to {booking.guest_phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <Download className="h-5 w-5 text-blue-600 mr-3" />
                  <div className="flex-1">
                    <span className="text-sm text-blue-700 font-medium">Digital Ticket Ready</span>
                    <p className="text-xs text-blue-600">
                      Your booking receipt is ready for download
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button onClick={downloadTicket} className="w-full bg-rose-500 hover:bg-rose-600">
                  <Download className="h-4 w-4 mr-2" />
                  Download Ticket
                </Button>
                
                <Link to={`/ticket/${booking.id}`} className="block">
                  <Button variant="outline" className="w-full">
                    View Ticket Online
                  </Button>
                </Link>
              </div>
            </>
          )}

          {/* Session ID for reference */}
          {sessionId && (
            <div className="text-center text-xs text-gray-500 border-t pt-4">
              <p>Session ID: {sessionId}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="pt-4 space-y-2">
            <Link to="/profile" className="block">
              <Button variant="outline" className="w-full">
                View All Bookings
              </Button>
            </Link>
            <Link to="/" className="block">
              <Button variant="ghost" className="w-full">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
