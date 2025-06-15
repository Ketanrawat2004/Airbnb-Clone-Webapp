
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import TestimonialCard from './TestimonialCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  guest_name: string;
  guest_location: string | null;
  rating: number;
  review_text: string;
  stay_date: string | null;
  room_type: string | null;
  is_verified: boolean | null;
  is_featured: boolean | null;
  hotels?: {
    name: string;
  };
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select(`
            *,
            hotels:hotel_id (name)
          `)
          .eq('is_featured', true)
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) {
          console.error('Error fetching testimonials:', error);
        } else {
          setTestimonials(data || []);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <Skeleton className="h-10 w-64 mx-auto mb-6" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="relative px-4 sm:px-8 lg:px-16">
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="space-y-4">
                      <Skeleton className="h-48 w-full rounded-xl" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(59,130,246,0.03),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(99,102,241,0.03),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-block p-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full mb-8 shadow-xl">
            <div className="bg-white rounded-full px-8 py-4">
              <span className="text-rose-600 text-sm font-bold tracking-wider uppercase flex items-center">
                <Quote className="h-4 w-4 mr-2" />
                Guest Stories
              </span>
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              What Our Guests
            </span>
            <span className="block text-gray-800 mt-2">Are Saying</span>
          </h2>
          
          <p className="text-gray-600 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed px-4">
            Hear what our guests have to say about their unforgettable experiences and discover why they choose us for their perfect stays.
          </p>
        </div>

        <div className="relative px-4 sm:px-8 lg:px-16">
          <Carousel 
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-white/95 backdrop-blur-sm hover:bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300" />
            <CarouselNext className="right-2 bg-white/95 backdrop-blur-sm hover:bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
