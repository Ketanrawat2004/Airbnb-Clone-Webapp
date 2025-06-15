
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

const CheapRatesHotelGrid = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCheapHotels = async () => {
      try {
        // Get the current session to check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        // Query hotels with price filter (500-1500 paise = 5-15 rupees)
        const { data, error } = await supabase
          .from('hotels')
          .select('*')
          .gte('price_per_night', 500) // 5 rupees in paise
          .lte('price_per_night', 1500) // 15 rupees in paise
          .order('price_per_night', { ascending: true });

        if (error) {
          console.warn('Error fetching cheap hotels:', error.message);
          // Handle the case where RLS might be blocking the query
          if (error.message.includes('RLS') || error.message.includes('policy')) {
            console.info('Note: Hotel data requires authentication for full access');
            setHotels([]);
          } else {
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
        console.warn('Unexpected error fetching cheap hotels:', error);
        setHotels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCheapHotels();
  }, []);

  if (loading) {
    return (
      <div className="relative px-4 sm:px-8 lg:px-16">
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="space-y-4">
                  <Skeleton className="h-48 sm:h-56 lg:h-64 w-full rounded-xl" />
                  <div className="space-y-3 px-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-white/95 backdrop-blur-sm hover:bg-white shadow-xl border-0" />
          <CarouselNext className="right-2 bg-white/95 backdrop-blur-sm hover:bg-white shadow-xl border-0" />
        </Carousel>
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No hotels found in the 5-15 rupees price range.</p>
      </div>
    );
  }

  return (
    <div className="relative px-4 sm:px-8 lg:px-16">
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
        <CarouselPrevious className="left-2 bg-white/95 backdrop-blur-sm hover:bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300" />
        <CarouselNext className="right-2 bg-white/95 backdrop-blur-sm hover:bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300" />
      </Carousel>
    </div>
  );
};

export default CheapRatesHotelGrid;
