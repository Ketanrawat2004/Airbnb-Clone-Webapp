
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import HotelCard from './HotelCard';
import { Skeleton } from '@/components/ui/skeleton';

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
  available_rooms: number;
  total_rooms?: number;
}

const HotelGrid = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data, error } = await supabase
          .from('hotels')
          .select('*')
          .order('created_at', { ascending: false });

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
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="h-48 sm:h-56 lg:h-64 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 sm:h-5 w-3/4" />
              <Skeleton className="h-4 sm:h-5 w-1/2" />
              <Skeleton className="h-3 sm:h-4 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
};

export default HotelGrid;
