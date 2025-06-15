import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, MessageSquare, Home, Calendar, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import PaymentSuccessToast from '@/components/PaymentSuccessToast';

// WhatsApp helper function (get WhatsApp URL with message)
function getWhatsAppUrl(phone: string, message: string) {
  // WhatsApp API expects numbers without "+", but do a best effort
  const safePhone = phone.replace(/^\+/, '');
  return `https://wa.me/${safePhone}?text=${encodeURIComponent(message)}`;
}

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

  // WhatsApp Feature state
  const [hasSentWhatsapp, setHasSentWhatsapp] = useState(false);
  // Add a flag to prevent multiple auto-redirects per visit:
  const [autoWhatsappTriggered, setAutoWhatsappTriggered] = useState(false);

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

  // Centralize WhatsApp message creation
  function buildWhatsappMessage(b: BookingDetails) {
    const hotelName = b.hotels.name;
    const location = b.hotels.location;
    const checkIn = new Date(b.check_in_date).toLocaleDateString();
    const checkOut = new Date(b.check_out_date).toLocaleDateString();
    const guests = b.guests;
    const amount = `₹${(b.total_amount / 100).toLocaleString('en-IN')}`;
    const referenceId =
      sessionId || paymentId || b.id.substring(0, 8).toUpperCase();
    const fullName = (b.profiles && (b.profiles as any).full_name) || "Guest";

    const message =
      `🏨 Booking Confirmed!%0A%0A` +
      `Hotel: ${hotelName}%0A` +
      `Location: ${location}%0A` +
      `Check-in: ${checkIn}%0A` +
      `Check-out: ${checkOut}%0A` +
      `Guests: ${guests}%0A` +
      `Total Paid: ${amount}%0A` +
      `Reference ID: #${referenceId}%0A%0A` +
      `Name: ${fullName}%0A%0A` +
      `Your booking receipt is available online. Have a great stay!`;

    return message;
  }

  // Replace handleSendToWhatsapp → sendToWhatsapp and reuse for both automatic and manual
  const sendToWhatsapp = (isAuto = false) => {
    if (!booking) {
      if (!isAuto) toast.error("Booking not loaded yet.");
      return;
    }
    const message = buildWhatsappMessage(booking);
    const url = getWhatsAppUrl(booking.guest_phone, message);
    setHasSentWhatsapp(true);
    window.open(url, "_blank");
    if (!isAuto) toast.success("Ticket sent to WhatsApp!");
  };

  const handleViewAllBookings = () => {
    navigate('/profile?payment_success=true');
  };

  // Automatically trigger WhatsApp send after booking loads, but only ONCE
  useEffect(() => {
    if (
      booking &&
      !loading &&
      !hasSentWhatsapp &&
      !autoWhatsappTriggered
    ) {
      sendToWhatsapp(true); // true = auto
      setAutoWhatsappTriggered(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking, loading]); // don't depend on autoWhatsappTriggered, hasSentWhatsapp to avoid extra triggers

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

              {/* Send to WhatsApp Button */}
              <div className="flex flex-col items-center justify-center mt-4 space-y-2">
                <Button
                  size="lg"
                  className="w-full bg-green-500 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-green-600 transition"
                  onClick={() => sendToWhatsapp(false)}
                  disabled={hasSentWhatsapp}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967s-.47-.148-.668.149c-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.656-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.668-1.611-.916-2.209-.242-.579-.487-.5-.668-.51a2.777 2.777 0 0 0-.572-.011c-.198.024-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.212 3.074c.149.198 2.094 3.2 5.077 4.364.71.306 1.262.489 1.693.625.712.227 1.36.195 1.87.118.57-.085 1.758-.719 2.008-1.414.248-.694.248-1.288.173-1.414-.074-.127-.272-.198-.569-.347z" fill="currentColor"/>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                  {hasSentWhatsapp ? 'Sent to WhatsApp' : 'Send Ticket to WhatsApp'}
                </Button>
                <span className="text-xs text-gray-500 text-center">
                  {hasSentWhatsapp ? 'You can re-send this ticket if needed.' : 'Tap to open WhatsApp with your booking confirmation.'}
                </span>
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
