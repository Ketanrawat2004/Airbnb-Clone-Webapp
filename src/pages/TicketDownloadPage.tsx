
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import HotelTicketGenerator from '@/components/HotelTicketGenerator';
import FlightTicketGenerator from '@/components/FlightTicketGenerator';
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
  const [flightData, setFlightData] = useState<any>(null);

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
          // Generate flight data (dummy for demonstration)
          const airlines = ['Air India', 'IndiGo', 'SpiceJet', 'Vistara', 'GoAir'];
          const aircraft = ['Boeing 737', 'Airbus A320', 'Boeing 777', 'Airbus A350'];
          const cities = [
            { name: 'Mumbai', code: 'BOM', airport: 'Chhatrapati Shivaji International' },
            { name: 'Delhi', code: 'DEL', airport: 'Indira Gandhi International' },
            { name: 'Bangalore', code: 'BLR', airport: 'Kempegowda International' },
            { name: 'Chennai', code: 'MAA', airport: 'Chennai International' },
            { name: 'Kolkata', code: 'CCU', airport: 'Netaji Subhash Chandra Bose' }
          ];

          const departure = cities[Math.floor(Math.random() * cities.length)];
          const arrival = cities.filter(city => city.code !== departure.code)[Math.floor(Math.random() * (cities.length - 1))];
          const airline = airlines[Math.floor(Math.random() * airlines.length)];
          const departureTime = new Date();
          departureTime.setHours(Math.floor(Math.random() * 12) + 6, Math.floor(Math.random() * 60));
          const arrivalTime = new Date(departureTime.getTime() + (Math.floor(Math.random() * 4) + 1) * 60 * 60 * 1000);

          setFlightData({
            bookingReference: bookingId?.slice(0, 6).toUpperCase() || 'ABC123',
            passengerName: 'John Doe',
            flightNumber: `${airline.slice(0, 2).toUpperCase()}${Math.floor(Math.random() * 9000) + 1000}`,
            airline: airline,
            departure: {
              city: departure.name,
              airport: departure.airport,
              code: departure.code,
              time: departureTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
              date: departureTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
              terminal: `${Math.floor(Math.random() * 3) + 1}`,
              gate: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 50) + 1}`
            },
            arrival: {
              city: arrival.name,
              airport: arrival.airport,
              code: arrival.code,
              time: arrivalTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
              date: arrivalTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
              terminal: `${Math.floor(Math.random() * 3) + 1}`
            },
            seatNumber: `${Math.floor(Math.random() * 30) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 6))}`,
            class: 'Economy',
            duration: `${Math.floor(Math.random() * 3) + 1}h ${Math.floor(Math.random() * 60)}m`,
            aircraft: aircraft[Math.floor(Math.random() * aircraft.length)],
            totalAmount: Math.floor(Math.random() * 15000) + 5000,
            bookingDate: new Date().toLocaleDateString('en-US'),
            passengerPhone: '+91 98765 43210',
            passengerEmail: 'passenger@example.com'
          });
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
          <Link to="/">
            <Button className="bg-rose-500 hover:bg-rose-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Home
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
          <Link to="/" className="inline-flex items-center text-rose-600 hover:text-rose-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
        
        {type === 'hotel' && hotelData ? (
          <HotelTicketGenerator hotelData={hotelData} />
        ) : type === 'flight' && flightData ? (
          <FlightTicketGenerator flightData={flightData} />
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
