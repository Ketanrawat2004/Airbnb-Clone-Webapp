
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Download, MapPin, Calendar, Users, Phone, Home, CheckCircle, Clock, Star, Wifi, Car, Coffee, Utensils } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';

interface TicketData {
  id: string;
  hotel_id: string;
  check_in_date: string;
  check_out_date: string;
  guests: number;
  total_amount: number;
  guest_phone: string;
  guest_name: string;
  status: string;
  payment_status: string;
  created_at: string;
  user_id: string;
  hotels: {
    name: string;
    location: string;
    facilities: string[];
    rules_and_regulations: string[];
  };
}

const TicketPage = () => {
  const { bookingId } = useParams();
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (bookingId) {
      fetchTicket();
    }
  }, [bookingId]);

  const fetchTicket = async () => {
    try {
      console.log('Fetching ticket for booking ID:', bookingId);
      
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single();

      if (bookingError) {
        console.error('Error fetching booking:', bookingError);
        toast.error('Failed to load booking details');
        return;
      }

      if (!booking) {
        console.error('No booking found');
        toast.error('Booking not found');
        return;
      }

      const { data: hotel, error: hotelError } = await supabase
        .from('hotels')
        .select('name, location, facilities, rules_and_regulations')
        .eq('id', booking.hotel_id)
        .single();

      if (hotelError) {
        console.error('Error fetching hotel:', hotelError);
        toast.error('Failed to load hotel details');
        return;
      }

      const ticketData: TicketData = {
        ...booking,
        hotels: hotel
      };

      setTicket(ticketData);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load ticket');
    } finally {
      setLoading(false);
    }
  };

  const downloadTicket = async () => {
    if (!ticket) return;

    try {
      const { data, error } = await supabase.functions.invoke('generate-receipt', {
        body: { booking_id: ticket.id }
      });

      if (error) {
        console.error('Error calling generate-receipt function:', error);
        throw error;
      }

      if (data?.html_content) {
        const blob = new Blob([data.html_content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `booking-ticket-${ticket.id.substring(0, 8)}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast.success('Ticket downloaded successfully!');
      } else {
        throw new Error('No HTML content received');
      }
    } catch (error) {
      console.error('Error downloading ticket:', error);
      toast.error('Failed to download ticket');
    }
  };

  const calculateNights = () => {
    if (!ticket) return 0;
    const checkIn = new Date(ticket.check_in_date);
    const checkOut = new Date(ticket.check_out_date);
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));
  };

  const getFacilityIcon = (facility: string) => {
    const lower = facility.toLowerCase();
    if (lower.includes('wifi')) return <Wifi className="h-4 w-4" />;
    if (lower.includes('parking')) return <Car className="h-4 w-4" />;
    if (lower.includes('coffee') || lower.includes('tea')) return <Coffee className="h-4 w-4" />;
    if (lower.includes('restaurant') || lower.includes('dining')) return <Utensils className="h-4 w-4" />;
    return <Star className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg font-medium text-rose-600 animate-pulse">Loading your ticket...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-rose-100 rounded-full flex items-center justify-center">
              <Home className="h-12 w-12 text-rose-400" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ticket Not Found</h1>
            <p className="text-gray-600 mb-8 text-sm md:text-base">We couldn't find the booking ticket you're looking for.</p>
            <Link to="/profile">
              <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const nights = calculateNights();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <Header />
      
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <Link to="/profile">
              <Button variant="outline" className="hover:bg-white/80 border-rose-200 text-rose-700 text-sm md:text-base">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {isMobile ? 'Back' : 'Back to Profile'}
              </Button>
            </Link>
            <Button 
              onClick={downloadTicket}
              className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg text-sm md:text-base"
            >
              <Download className="h-4 w-4 mr-2" />
              {isMobile ? 'Download' : 'Download Ticket'}
            </Button>
          </div>

          {/* Main Ticket Card */}
          <Card className="overflow-hidden shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            {/* Header Section */}
            <CardHeader className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white p-6 md:p-8">
              <div className="text-center space-y-4 md:space-y-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-3 md:mr-4 backdrop-blur-sm">
                    <Home className="h-6 w-6 md:h-8 md:w-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Airbnb Clone+</h1>
                    <p className="text-pink-100 text-sm md:text-lg">Your Premier Hospitality Experience</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 md:h-6 md:w-6 mr-2" />
                    <span className="text-lg md:text-xl font-semibold">Booking Confirmed</span>
                  </div>
                  
                  <div className="inline-flex items-center bg-white/20 px-4 md:px-6 py-2 md:py-3 rounded-full backdrop-blur-sm">
                    <span className="font-bold text-sm md:text-lg">Booking ID: #{ticket.id.substring(0, 8).toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 md:p-8 space-y-6 md:space-y-8">
              {/* Hotel Information */}
              <div className="space-y-4">
                <div className="flex items-start justify-between flex-col md:flex-row space-y-2 md:space-y-0">
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{ticket.hotels.name}</h2>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-2 text-rose-500" />
                      <span className="text-sm md:text-lg">{ticket.hotels.location}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm font-medium">
                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    Confirmed
                  </Badge>
                </div>
              </div>

              <Separator className="bg-pink-200" />

              {/* Booking Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Guest Information */}
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center">
                    <Users className="h-4 w-4 md:h-5 md:w-5 mr-2 text-rose-500" />
                    Guest Details
                  </h3>
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4 md:p-6 space-y-3 md:space-y-4 border border-pink-200">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm md:text-base">Primary Guest</span>
                      <span className="font-semibold text-sm md:text-base">{ticket.guest_name || 'Guest'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm md:text-base">Contact Number</span>
                      <span className="font-semibold text-sm md:text-base">{ticket.guest_phone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm md:text-base">Total Guests</span>
                      <span className="font-semibold text-sm md:text-base">{ticket.guests} {ticket.guests === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                  </div>
                </div>

                {/* Stay Information */}
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center">
                    <Calendar className="h-4 w-4 md:h-5 md:w-5 mr-2 text-rose-500" />
                    Stay Details
                  </h3>
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4 md:p-6 space-y-3 md:space-y-4 border border-pink-200">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm md:text-base">Check-in</span>
                      <span className="font-semibold text-sm md:text-base">{new Date(ticket.check_in_date).toLocaleDateString('en-US', { 
                        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm md:text-base">Check-out</span>
                      <span className="font-semibold text-sm md:text-base">{new Date(ticket.check_out_date).toLocaleDateString('en-US', { 
                        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm md:text-base">Duration</span>
                      <span className="font-semibold text-sm md:text-base">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-pink-200" />

              {/* Payment Summary */}
              <div className="bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 rounded-2xl p-6 md:p-8 border border-rose-200">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 text-center">Payment Summary</h3>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex justify-between items-center text-base md:text-lg">
                    <span className="text-gray-600">Subtotal ({nights} {nights === 1 ? 'night' : 'nights'})</span>
                    <span className="font-semibold">₹{(ticket.total_amount / 100).toLocaleString('en-IN')}</span>
                  </div>
                  <Separator className="bg-pink-300" />
                  <div className="flex justify-between items-center">
                    <span className="text-xl md:text-2xl font-bold text-gray-900">Total Paid</span>
                    <span className="text-2xl md:text-3xl font-bold text-rose-600">
                      ₹{(ticket.total_amount / 100).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-center mt-4">
                    <Badge className="bg-green-500 hover:bg-green-600 text-white px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm">
                      <CheckCircle className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                      Payment Confirmed
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Hotel Facilities */}
              {ticket.hotels.facilities && ticket.hotels.facilities.length > 0 && (
                <>
                  <Separator className="bg-pink-200" />
                  <div className="space-y-4">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">Hotel Amenities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {ticket.hotels.facilities.map((facility, index) => (
                        <div key={index} className="flex items-center bg-blue-50 text-blue-700 px-3 md:px-4 py-2 md:py-3 rounded-lg border border-blue-200">
                          {getFacilityIcon(facility)}
                          <span className="ml-2 font-medium text-sm md:text-base">{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Important Information */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 md:p-6">
                <h3 className="text-base md:text-lg font-bold text-amber-800 mb-3 md:mb-4 flex items-center">
                  <Clock className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Important Check-in Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-amber-700 text-sm md:text-base">
                  <div className="space-y-2">
                    <p className="font-medium">• Check-in: 3:00 PM onwards</p>
                    <p className="font-medium">• Check-out: 11:00 AM</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">• Valid government ID required</p>
                    <p className="font-medium">• Present this confirmation at reception</p>
                  </div>
                </div>
              </div>

              {/* Hotel Rules */}
              {ticket.hotels.rules_and_regulations && ticket.hotels.rules_and_regulations.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">Hotel Policies</h3>
                  <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                    <ul className="space-y-2 md:space-y-3">
                      {ticket.hotels.rules_and_regulations.map((rule, index) => (
                        <li key={index} className="flex items-start text-gray-700 text-sm md:text-base">
                          <span className="w-2 h-2 bg-rose-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="text-center pt-4 md:pt-6 border-t border-pink-200">
                <p className="text-gray-600 mb-2 text-sm md:text-base">For assistance, contact the hotel directly or our support team</p>
                <p className="text-xs md:text-sm text-gray-500">Booking Date: {new Date(ticket.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', month: 'long', day: 'numeric' 
                })}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
