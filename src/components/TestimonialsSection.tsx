
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import TestimonialCard from './TestimonialCard';
import { Skeleton } from '@/components/ui/skeleton';
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-40 w-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Quote className="h-8 w-8 text-rose-500 mr-2" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Guest Reviews
            </h2>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Hear what our guests have to say about their unforgettable experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
