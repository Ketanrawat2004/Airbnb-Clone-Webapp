
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import HotelCard from './HotelCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

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
        // Get the current session to check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        // Query hotels with proper error handling
        const { data, error } = await supabase
          .from('hotels')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.warn('Error fetching hotels:', error.message);
          // Handle the case where RLS might be blocking the query
          if (error.message.includes('RLS') || error.message.includes('policy')) {
            console.info('Note: Hotel data requires authentication for full access');
            // You might want to show a message to users about signing in
            setHotels([]);
          } else {
            // For other errors, show empty state
            setHotels([]);
          }
        } else if (data) {
          // Ensure available_rooms has a default value if null
          const hotelsWithDefaults = data.map(hotel => ({
            ...hotel,
            available_rooms: hotel.available_rooms || 0
          }));
          setHotels(hotelsWithDefaults);
        }
      } catch (error) {
        console.warn('Unexpected error fetching hotels:', error);
        setHotels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return (
      <div className="relative px-12">
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="space-y-4">
                  <Skeleton className="h-48 sm:h-56 lg:h-64 w-full rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 sm:h-5 w-3/4" />
                    <Skeleton className="h-4 sm:h-5 w-1/2" />
                    <Skeleton className="h-3 sm:h-4 w-1/4" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
    );
  }

  return (
    <div className="relative px-12">
      <Carousel 
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {hotels.map((hotel) => (
            <CarouselItem key={hotel.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <HotelCard hotel={hotel} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-0" />
        <CarouselNext className="right-0 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-0" />
      </Carousel>
    </div>
  );
};

export default HotelGrid;
