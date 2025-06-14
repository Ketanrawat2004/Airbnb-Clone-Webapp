
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import HotelCard from '@/components/HotelCard';
import ChatBot from '@/components/ChatBot';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Calendar, Users } from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  price_per_night: number;
  amenities: string[];
  facilities: string[];
  rules_and_regulations: string[];
  images: string[];
  rating: number;
  reviews_count: number;
  total_rooms: number;
  available_rooms: number;
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  
  const location = searchParams.get('location') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = searchParams.get('guests') || '';

  useEffect(() => {
    const searchHotels = async () => {
      try {
        setLoading(true);
        
        if (location) {
          // Use our custom search function
          const { data, error } = await supabase.rpc('search_hotels', {
            search_location: location
          });

          if (error) {
            console.error('Error searching hotels:', error);
          } else {
            // Ensure available_rooms has a default value if null
            const hotelsWithDefaults = (data || []).map(hotel => ({
              ...hotel,
              available_rooms: hotel.available_rooms || 0
            }));
            setHotels(hotelsWithDefaults);
          }
        } else {
          // If no location, get all hotels
          const { data, error } = await supabase
            .from('hotels')
            .select('*')
            .order('rating', { ascending: false });

          if (error) {
            console.error('Error fetching hotels:', error);
          } else {
            // Ensure available_rooms has a default value if null
            const hotelsWithDefaults = (data || []).map(hotel => ({
              ...hotel,
              available_rooms: hotel.available_rooms || 0
            }));
            setHotels(hotelsWithDefaults);
          }
        }
      } catch (error) {
        console.error('Error searching hotels:', error);
      } finally {
        setLoading(false);
      }
    };

    searchHotels();
  }, [location, checkIn, checkOut, guests]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Summary */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {location ? `Stays in ${location}` : 'All stays'}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            {location && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
            )}
            {checkIn && checkOut && (
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{checkIn} - {checkOut}</span>
              </div>
            )}
            {guests && (
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>{guests} guests</span>
              </div>
            )}
          </div>
          
          <p className="text-gray-600 mt-2">
            {loading ? 'Searching...' : `${hotels.length} stays found`}
          </p>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-64 w-full rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : hotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hotels.map((hotel) => (
              <HotelCard 
                key={hotel.id} 
                hotel={hotel} 
                searchParams={{
                  checkIn,
                  checkOut,
                  guests
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <MapPin className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No stays found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse all available stays.
            </p>
          </div>
        )}
      </div>

      {/* ChatBot */}
      <ChatBot />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SearchResults;
