
-- Add guest_list column to bookings table
ALTER TABLE public.bookings 
ADD COLUMN guest_list JSONB DEFAULT '[]'::jsonb;

-- Add comment for documentation
COMMENT ON COLUMN public.bookings.guest_list IS 'JSON array containing details of all guests for the booking';
