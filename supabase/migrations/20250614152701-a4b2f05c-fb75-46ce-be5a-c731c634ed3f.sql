
-- Add an index on the location column for better search performance
CREATE INDEX IF NOT EXISTS idx_hotels_location ON public.hotels USING gin(to_tsvector('english', location));

-- Create a view for available rooms (assuming each hotel has rooms available by default)
-- In a real application, you'd have a separate rooms table
ALTER TABLE public.hotels ADD COLUMN IF NOT EXISTS total_rooms INTEGER DEFAULT 10;
ALTER TABLE public.hotels ADD COLUMN IF NOT EXISTS available_rooms INTEGER DEFAULT 10;

-- Update existing hotels with room data
UPDATE public.hotels 
SET total_rooms = 10, available_rooms = FLOOR(RANDOM() * 8) + 3
WHERE total_rooms IS NULL;

-- Create a function to search hotels by location
CREATE OR REPLACE FUNCTION search_hotels(search_location TEXT)
RETURNS TABLE (
  id UUID,
  name TEXT,
  location TEXT,
  description TEXT,
  price_per_night INTEGER,
  amenities TEXT[],
  images TEXT[],
  rating NUMERIC,
  reviews_count INTEGER,
  total_rooms INTEGER,
  available_rooms INTEGER,
  created_at TIMESTAMPTZ
) 
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT h.id, h.name, h.location, h.description, h.price_per_night, 
         h.amenities, h.images, h.rating, h.reviews_count, 
         h.total_rooms, h.available_rooms, h.created_at
  FROM public.hotels h
  WHERE h.location ILIKE '%' || search_location || '%'
     OR to_tsvector('english', h.location) @@ plainto_tsquery('english', search_location)
  ORDER BY h.rating DESC, h.reviews_count DESC;
END;
$$;
