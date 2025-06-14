
-- Add rooms table to manage individual rooms within hotels
CREATE TABLE public.rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES public.hotels(id) ON DELETE CASCADE NOT NULL,
  room_number TEXT NOT NULL,
  room_type TEXT NOT NULL, -- e.g., 'Standard', 'Deluxe', 'Suite'
  max_occupancy INTEGER NOT NULL DEFAULT 2,
  price_per_night INTEGER NOT NULL, -- in paise (INR cents)
  amenities TEXT[],
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(hotel_id, room_number)
);

-- Add room bookings table to track which rooms are booked
CREATE TABLE public.room_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
  room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(booking_id, room_id)
);

-- Enable RLS for rooms
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_bookings ENABLE ROW LEVEL SECURITY;

-- Policies for rooms (public read access)
CREATE POLICY "Anyone can view rooms" ON public.rooms
  FOR SELECT USING (true);

-- Policies for room_bookings
CREATE POLICY "Users can view their own room bookings" ON public.room_bookings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.bookings b 
      WHERE b.id = room_bookings.booking_id 
      AND b.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create their own room bookings" ON public.room_bookings
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.bookings b 
      WHERE b.id = room_bookings.booking_id 
      AND b.user_id = auth.uid()
    )
  );

-- Update hotels table to store base price in INR (paise)
ALTER TABLE public.hotels 
ALTER COLUMN price_per_night SET DEFAULT 500000; -- 5000 INR in paise

-- Update existing hotels prices to INR (multiply by 83 for USD to INR conversion)
UPDATE public.hotels 
SET price_per_night = price_per_night * 83;

-- Insert sample rooms for existing hotels using a CTE approach
WITH room_data AS (
  SELECT 
    h.id as hotel_id,
    'R' || room_num::text as room_number,
    CASE 
      WHEN room_num % 3 = 0 THEN 'Suite'
      WHEN room_num % 2 = 0 THEN 'Deluxe'
      ELSE 'Standard'
    END as room_type,
    CASE 
      WHEN room_num % 3 = 0 THEN 4
      WHEN room_num % 2 = 0 THEN 3
      ELSE 2
    END as max_occupancy,
    CASE 
      WHEN room_num % 3 = 0 THEN h.price_per_night * 2 -- Suite: 2x price
      WHEN room_num % 2 = 0 THEN h.price_per_night * 3 / 2 -- Deluxe: 1.5x price
      ELSE h.price_per_night -- Standard: base price
    END as price_per_night,
    ARRAY['WiFi', 'AC', 'TV'] as amenities
  FROM public.hotels h
  CROSS JOIN generate_series(101, 105) as room_num
)
INSERT INTO public.rooms (hotel_id, room_number, room_type, max_occupancy, price_per_night, amenities)
SELECT hotel_id, room_number, room_type, max_occupancy, price_per_night, amenities
FROM room_data;

-- Create function to get available rooms for a hotel within date range
CREATE OR REPLACE FUNCTION get_available_rooms(
  hotel_id_param UUID,
  check_in_date DATE,
  check_out_date DATE
)
RETURNS TABLE (
  id UUID,
  room_number TEXT,
  room_type TEXT,
  max_occupancy INTEGER,
  price_per_night INTEGER,
  amenities TEXT[]
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT r.id, r.room_number, r.room_type, r.max_occupancy, r.price_per_night, r.amenities
  FROM public.rooms r
  WHERE r.hotel_id = hotel_id_param
    AND r.is_available = true
    AND r.id NOT IN (
      SELECT rb.room_id
      FROM public.room_bookings rb
      JOIN public.bookings b ON rb.booking_id = b.id
      WHERE b.hotel_id = hotel_id_param
        AND b.status IN ('confirmed', 'checked_in')
        AND (
          (b.check_in_date <= check_out_date AND b.check_out_date > check_in_date)
        )
    );
END;
$$;
