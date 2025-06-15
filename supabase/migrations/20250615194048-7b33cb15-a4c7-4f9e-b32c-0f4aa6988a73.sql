
-- Create a table for user reviews that will feed into the testimonials section
CREATE TABLE public.user_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  guest_name TEXT NOT NULL,
  guest_location TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  hotel_id UUID REFERENCES public.hotels(id),
  room_type TEXT,
  stay_date DATE,
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.user_reviews ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to view all reviews
CREATE POLICY "Anyone can view reviews" 
  ON public.user_reviews 
  FOR SELECT 
  USING (true);

-- Policy to allow authenticated users to create reviews
CREATE POLICY "Authenticated users can create reviews" 
  ON public.user_reviews 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Policy to allow users to update their own reviews
CREATE POLICY "Users can update their own reviews" 
  ON public.user_reviews 
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy to allow users to delete their own reviews
CREATE POLICY "Users can delete their own reviews" 
  ON public.user_reviews 
  FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);

-- Create a function to automatically add featured user reviews to testimonials
CREATE OR REPLACE FUNCTION public.sync_featured_reviews_to_testimonials()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- If the review is being marked as featured, add it to testimonials
  IF NEW.is_featured = true AND (OLD.is_featured IS NULL OR OLD.is_featured = false) THEN
    INSERT INTO public.testimonials (
      guest_name,
      guest_location,
      rating,
      review_text,
      hotel_id,
      room_type,
      stay_date,
      is_verified,
      is_featured
    ) VALUES (
      NEW.guest_name,
      NEW.guest_location,
      NEW.rating,
      NEW.review_text,
      NEW.hotel_id,
      NEW.room_type,
      NEW.stay_date,
      NEW.is_verified,
      true
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to sync featured reviews to testimonials
CREATE TRIGGER sync_featured_reviews
  AFTER UPDATE ON public.user_reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_featured_reviews_to_testimonials();
