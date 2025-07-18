
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import HotelCard from './HotelCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { motion } from 'framer-motion';

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
        
        // Query hotels with proper error handling and filter out budget hotels (1-15 rupees = 100-1500 paise)
        const { data, error } = await supabase
          .from('hotels')
          .select('*')
          .gt('price_per_night', 1500) // Only get hotels priced above 15 rupees (1500 paise)
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
      <div className="relative px-4 sm:px-8 lg:px-16">
        <Carousel className="w-full">
          <CarouselContent className="-ml-4 md:-ml-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <CarouselItem key={index} className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="space-y-4 bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden p-2">
                  <Skeleton className="h-56 sm:h-64 lg:h-72 w-full rounded-xl" />
                  <div className="space-y-3 px-4 pb-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 lg:left-4 bg-white/95 backdrop-blur-sm hover:bg-white shadow-2xl border-0 h-12 w-12 hover:scale-110 transition-all duration-300" />
          <CarouselNext className="right-2 lg:right-4 bg-white/95 backdrop-blur-sm hover:bg-white shadow-2xl border-0 h-12 w-12 hover:scale-110 transition-all duration-300" />
        </Carousel>
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
          skipSnaps: false,
          dragFree: true,
        }}
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {hotels.map((hotel, index) => (
            <CarouselItem key={hotel.id} className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <HotelCard hotel={hotel} />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 lg:left-4 bg-white/95 backdrop-blur-sm hover:bg-white shadow-2xl border-0 h-14 w-14 hover:scale-110 hover:shadow-3xl transition-all duration-300 text-gray-700 hover:text-rose-600" />
        <CarouselNext className="right-2 lg:right-4 bg-white/95 backdrop-blur-sm hover:bg-white shadow-2xl border-0 h-14 w-14 hover:scale-110 hover:shadow-3xl transition-all duration-300 text-gray-700 hover:text-rose-600" />
      </Carousel>
    </div>
  );
};

export default HotelGrid;
