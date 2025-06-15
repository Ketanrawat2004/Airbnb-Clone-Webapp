
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Star, Send, User, MapPin, Calendar, Home } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const reviewSchema = z.object({
  guest_name: z.string().min(2, 'Name must be at least 2 characters'),
  guest_location: z.string().optional(),
  rating: z.number().min(1).max(5),
  review_text: z.string().min(10, 'Review must be at least 10 characters'),
  hotel_id: z.string().optional(),
  room_type: z.string().optional(),
  stay_date: z.string().optional(),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  onReviewSubmitted?: () => void;
}

const ReviewForm = ({ onReviewSubmitted }: ReviewFormProps) => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { toast } = useToast();

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      guest_name: '',
      guest_location: '',
      rating: 0,
      review_text: '',
      hotel_id: '',
      room_type: '',
      stay_date: '',
    },
  });

  const watchedRating = form.watch('rating');

  React.useEffect(() => {
    const fetchHotels = async () => {
      const { data, error } = await supabase
        .from('hotels')
        .select('id, name, location')
        .order('name');
      
      if (data && !error) {
        setHotels(data);
      }
    };

    fetchHotels();
  }, []);

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const reviewData = {
        ...data,
        user_id: session?.user?.id || null,
        hotel_id: data.hotel_id || null,
        stay_date: data.stay_date || null,
        is_verified: false,
        is_featured: false,
      };

      const { error } = await supabase
        .from('user_reviews')
        .insert([reviewData]);

      if (error) {
        throw error;
      }

      toast({
        title: "Review Submitted Successfully! 🎉",
        description: "Thank you for sharing your experience. Your review will be reviewed and may appear in our testimonials section.",
      });

      form.reset();
      onReviewSubmitted?.();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, onStarClick?: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-6 w-6 cursor-pointer transition-colors ${
              star <= (hoveredRating || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300 hover:text-yellow-400'
            }`}
            onClick={() => onStarClick?.(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
          Share Your Experience
        </CardTitle>
        <p className="text-gray-600 mt-2">
          Help other travelers by sharing your honest review and suggestions
        </p>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="guest_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Your Name *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        {...field} 
                        className="focus:ring-rose-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="guest_location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="City, Country" 
                        {...field} 
                        className="focus:ring-rose-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Overall Rating *
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      {renderStars(field.value, (rating) => field.onChange(rating))}
                      <span className="text-sm text-gray-600 ml-2">
                        {field.value > 0 && `${field.value} star${field.value > 1 ? 's' : ''}`}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="review_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review & Suggestions *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your experience and any suggestions for improvement..."
                      className="min-h-[120px] focus:ring-rose-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="hotel_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Hotel (Optional)
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="focus:ring-rose-400">
                          <SelectValue placeholder="Select hotel" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {hotels.map((hotel) => (
                          <SelectItem key={hotel.id} value={hotel.id}>
                            {hotel.name} - {hotel.location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="room_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Type</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Deluxe Room" 
                        {...field} 
                        className="focus:ring-rose-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stay_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Stay Date
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field} 
                        className="focus:ring-rose-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !watchedRating}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Send className="h-4 w-4" />
                  <span>Submit Review</span>
                </div>
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Your review will be moderated before appearing on our website. Thank you for helping other travelers!
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
