
-- Add support for storing multiple guests in bookings
ALTER TABLE public.bookings 
ADD COLUMN guest_list jsonb DEFAULT '[]'::jsonb;

-- Add comment to explain the guest_list structure
COMMENT ON COLUMN public.bookings.guest_list IS 'Array of guest objects with structure: [{"title": "Mr", "firstName": "John", "lastName": "Doe", "age": 30, "gender": "male"}]';

-- Create index for faster JSON queries on guest_list
CREATE INDEX idx_bookings_guest_list ON public.bookings USING gin(guest_list);

-- Update existing bookings to include guest_list based on existing guest data
UPDATE public.bookings 
SET guest_list = jsonb_build_array(
  jsonb_build_object(
    'title', COALESCE(SPLIT_PART(guest_name, ' ', 1), 'Mr'),
    'firstName', COALESCE(SPLIT_PART(guest_name, ' ', 2), 'Guest'),
    'lastName', COALESCE(SPLIT_PART(guest_name, ' ', 3), 'Name'),
    'age', COALESCE(guest_age, 25),
    'gender', COALESCE(guest_gender, 'prefer_not_to_say')
  )
)
WHERE guest_name IS NOT NULL AND guest_list = '[]'::jsonb;
