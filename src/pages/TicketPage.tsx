
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, MapPin, Calendar, Users, Phone } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';

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

  useEffect(() => {
    if (bookingId) {
      fetchTicket();
    }
  }, [bookingId]);

  const fetchTicket = async () => {
    try {
      console.log('Fetching ticket for booking ID:', bookingId);
      
      // First fetch the booking
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

      console.log('Booking found:', booking);

      // Then fetch the hotel details
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

      console.log('Hotel found:', hotel);

      // Combine the data
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
      console.log('Downloading ticket for booking:', ticket.id);
      
      const { data, error } = await supabase.functions.invoke('generate-receipt', {
        body: { booking_id: ticket.id }
      });

      if (error) {
        console.error('Error calling generate-receipt function:', error);
        throw error;
      }

      console.log('Receipt generation response:', data);

      if (data?.html_content) {
        // Create a Blob from the HTML content
        const blob = new Blob([data.html_content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        // Create a temporary link and trigger download
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading ticket...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Ticket not found</h1>
            <Link to="/profile">
              <Button>Back to Profile</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const nights = calculateNights();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/profile">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Profile
              </Button>
            </Link>
            <Button onClick={downloadTicket}>
              <Download className="h-4 w-4 mr-2" />
              Download Ticket
            </Button>
          </div>

          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-rose-500 to-pink-600 text-white">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-xl font-bold">A</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Airbnb Clone+</h1>
                    <p className="text-sm opacity-90">Your Premier Hospitality Experience</p>
                  </div>
                </div>
                <CardTitle className="text-2xl mb-2">Booking Confirmation</CardTitle>
                <div className="inline-block bg-white/20 px-4 py-2 rounded-full">
                  <span className="font-semibold">Booking ID: #{ticket.id.substring(0, 8).toUpperCase()}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Hotel Information */}
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-2">{ticket.hotels.name}</h3>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{ticket.hotels.location}</span>
                </div>
              </div>

              {/* Guest Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Guest Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{ticket.guest_name || 'Guest'}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{ticket.guest_phone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Booking Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span>Check-in: {new Date(ticket.check_in_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span>Check-out: {new Date(ticket.check_out_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{ticket.guests} guests • {nights} {nights === 1 ? 'night' : 'nights'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Payment Summary</h4>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Amount Paid</span>
                  <span className="text-2xl font-bold text-rose-600">
                    ₹{(ticket.total_amount / 100).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Payment Confirmed
                  </span>
                </div>
              </div>

              {/* Hotel Facilities */}
              {ticket.hotels.facilities && ticket.hotels.facilities.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Hotel Facilities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {ticket.hotels.facilities.map((facility, index) => (
                      <div key={index} className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded">
                        {facility}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Important Information */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Important Information</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Check-in time: 3:00 PM onwards</li>
                  <li>• Check-out time: 11:00 AM</li>
                  <li>• Please carry a valid government-issued photo ID</li>
                  <li>• Present this booking confirmation at reception</li>
                </ul>
              </div>

              {/* Hotel Rules */}
              {ticket.hotels.rules_and_regulations && ticket.hotels.rules_and_regulations.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Hotel Policies</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {ticket.hotels.rules_and_regulations.map((rule, index) => (
                      <li key={index}>• {rule}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact Information */}
              <div className="border-t pt-4 text-center text-sm text-gray-500">
                <p>For any assistance, please contact the hotel directly or reach out to our support team.</p>
                <p className="mt-2">Booking Date: {new Date(ticket.created_at).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
