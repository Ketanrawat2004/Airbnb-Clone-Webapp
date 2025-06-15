
import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, MessageSquare, Home, Calendar, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import PaymentSuccessToast from '@/components/PaymentSuccessToast';

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
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  const paymentId = searchParams.get('payment_id');
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    if (sessionId || paymentId) {
      fetchBookingDetails();
    } else {
      setLoading(false);
    }
  }, [sessionId, paymentId]);

  useEffect(() => {
    if (booking && !loading) {
      const timer = setTimeout(() => {
        setShowSuccessToast(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [booking, loading]);

  const fetchBookingDetails = async () => {
    try {
      let query = supabase
        .from('bookings')
        .select(`
          *,
          hotels:hotel_id (name, location),
          profiles:user_id (full_name)
        `);

      if (sessionId) {
        query = query.eq('stripe_session_id', sessionId);
      } else if (paymentId) {
        query = query.eq('razorpay_payment_id', paymentId);
      }

      const { data, error } = await query.single();

      if (error) {
        console.error('Error fetching booking details:', error);
      } else {
        setBooking(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
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

  const handleViewAllBookings = () => {
    navigate('/profile?payment_success=true');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-rose-200 border-t-rose-500 mx-auto mb-6"></div>
            <Sparkles className="h-6 w-6 text-rose-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="text-gray-600 text-lg font-medium">Processing your payment...</p>
          <p className="text-gray-400 text-sm mt-2">This may take a few moments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      {showSuccessToast && (
        <PaymentSuccessToast onShow={() => setShowSuccessToast(false)} />
      )}
      
      <Card className="max-w-2xl w-full shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-6 relative">
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-4 shadow-lg animate-bounce">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-2 animate-spin">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            🎉 Booking Confirmed! 🎉
          </CardTitle>
          <p className="text-gray-600 mt-2">Your dream vacation awaits!</p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {booking && (
            <>
              {/* Enhanced Booking Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100 shadow-inner">
                <h3 className="font-bold text-blue-900 mb-4 text-lg flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Booking Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-blue-900 text-lg">{booking.hotels.name}</p>
                      <p className="text-blue-700 text-sm">{booking.hotels.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-2xl text-rose-600">₹{(booking.total_amount / 100).toLocaleString('en-IN')}</p>
                      <p className="text-xs text-gray-500">Total Paid</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-800">Check-in to Check-out</p>
                        <p className="text-sm text-gray-600">
                          {new Date(booking.check_in_date).toLocaleDateString()} - {new Date(booking.check_out_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-blue-800">{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Confirmation Messages */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                  <div className="bg-green-500 rounded-full p-2 mr-4">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-green-700 font-semibold">SMS Confirmation Sent</p>
                    <p className="text-xs text-green-600">Details sent to {booking.guest_phone}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                  <div className="bg-blue-500 rounded-full p-2 mr-4">
                    <Download className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-700 font-semibold">Digital Ticket Ready</p>
                    <p className="text-xs text-blue-600">Ready for download</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={downloadTicket} 
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-6 text-lg font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Ticket
                </Button>
                
                <Link to={`/ticket/${booking.id}`} className="block">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-blue-300 text-blue-600 hover:bg-blue-50 py-6 text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    View Ticket Online
                  </Button>
                </Link>
              </div>
            </>
          )}

          {/* Session/Payment ID for reference */}
          {(sessionId || paymentId) && (
            <div className="text-center text-xs text-gray-500 border-t pt-4 bg-gray-50 rounded-lg p-3">
              <p>Reference ID: {sessionId || paymentId}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="pt-4 space-y-3">
            <Button 
              onClick={handleViewAllBookings}
              variant="outline" 
              className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-4 rounded-xl transition-all duration-200"
            >
              View All Bookings
            </Button>
            <Link to="/" className="block">
              <Button 
                variant="ghost" 
                className="w-full text-gray-600 hover:bg-gray-100 py-4 rounded-xl transition-all duration-200"
              >
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
