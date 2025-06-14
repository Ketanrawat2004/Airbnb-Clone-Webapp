
-- Add guest information fields to bookings table
ALTER TABLE public.bookings 
ADD COLUMN guest_name text,
ADD COLUMN guest_age integer,
ADD COLUMN guest_gender text,
ADD COLUMN guest_nationality text;

-- Add check constraints for data validation
ALTER TABLE public.bookings 
ADD CONSTRAINT check_guest_age CHECK (guest_age > 0 AND guest_age <= 120),
ADD CONSTRAINT check_guest_gender CHECK (guest_gender IN ('male', 'female', 'other', 'prefer_not_to_say'));
