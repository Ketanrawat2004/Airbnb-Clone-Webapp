
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import HotelTicketGenerator from '@/components/HotelTicketGenerator';
import FlightTicket from '@/components/flight/FlightTicket';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const TicketDownloadPage = () => {
  const { bookingId } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'hotel'; // 'hotel' or 'flight'
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hotelData, setHotelData] = useState<any>(null);
  const [flightBookingData, setFlightBookingData] = useState<any>(null);

  useEffect(() => {
    const fetchBookingData = async () => {
      if (!bookingId) {
        setError('No booking ID provided');
        setLoading(false);
        return;
      }

      try {
        if (type === 'hotel') {
          // Fetch hotel booking data
          const { data: booking, error: bookingError } = await supabase
            .from('bookings')
            .select(`
              *,
              hotels (
                name,
                location,
                address,
                phone,
                email,
                amenities,
                rules_and_regulations
              )
            `)
            .eq('id', bookingId)
            .single();

          if (bookingError) throw bookingError;

          if (booking) {
            const guestList = booking.guest_list || [];
            const primaryGuest = guestList[0] || {};
            
            setHotelData({
              bookingReference: booking.id.slice(0, 8).toUpperCase(),
              guestName: primaryGuest.firstName ? `${primaryGuest.title || ''} ${primaryGuest.firstName} ${primaryGuest.lastName}`.trim() : booking.guest_name || 'Guest',
              hotelName: booking.hotels?.name || 'Hotel Name',
              hotelAddress: booking.hotels?.address || booking.hotels?.location || 'Hotel Address',
              hotelPhone: booking.hotels?.phone || '+1 (555) 123-4567',
              hotelEmail: booking.hotels?.email || 'hotel@example.com',
              checkIn: {
                date: new Date(booking.check_in_date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }),
                time: '2:00 PM'
              },
              checkOut: {
                date: new Date(booking.check_out_date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }),
                time: '11:00 AM'
              },
              roomType: booking.room_type || 'Standard Room',
              guests: booking.guests,
              nights: Math.ceil((new Date(booking.check_out_date).getTime() - new Date(booking.check_in_date).getTime()) / (1000 * 60 * 60 * 24)),
              totalAmount: booking.total_amount / 100,
              bookingDate: new Date(booking.created_at).toLocaleDateString('en-US'),
              guestPhone: booking.guest_phone || '+1 (555) 000-0000',
              guestEmail: primaryGuest.email || 'guest@example.com',
              roomNumber: `${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 90) + 10}`,
              amenities: booking.hotels?.amenities || ['Free WiFi', 'Room Service', 'Air Conditioning'],
              policies: booking.hotels?.rules_and_regulations || [
                'Check-in time is 2:00 PM',
                'Check-out time is 11:00 AM',
                'Valid ID required at check-in',
                'No smoking in rooms'
              ]
            });
          }
        } else {
          // Fetch flight booking data
          const { data: booking, error: bookingError } = await supabase
            .from('flight_bookings')
            .select('*')
            .eq('id', bookingId)
            .single();

          if (bookingError) throw bookingError;

          if (booking) {
            setFlightBookingData(booking);
          }
        }
      } catch (err) {
        console.error('Error fetching booking:', err);
        setError('Failed to load booking information');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [bookingId, type]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-rose-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading your ticket...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Ticket</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/profile">
            <Button className="bg-rose-500 hover:bg-rose-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profile
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link to="/profile" className="inline-flex items-center text-rose-600 hover:text-rose-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Link>
        </div>
        
        {type === 'hotel' && hotelData ? (
          <HotelTicketGenerator hotelData={hotelData} />
        ) : type === 'flight' && flightBookingData ? (
          <FlightTicket
            bookingId={flightBookingData.id}
            flightData={flightBookingData.flight_data}
            passengerData={flightBookingData.passenger_data}
            contactInfo={flightBookingData.contact_info}
            totalAmount={flightBookingData.total_amount}
          />
        ) : (
          <div className="text-center">
            <p className="text-gray-600">No ticket data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketDownloadPage;
