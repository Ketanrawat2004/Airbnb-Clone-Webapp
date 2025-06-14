
-- Add phone number to bookings table for SMS notifications
ALTER TABLE public.bookings 
ADD COLUMN guest_phone text,
ADD COLUMN payment_intent_id text,
ADD COLUMN payment_status text DEFAULT 'pending';

-- Create index for faster lookups
CREATE INDEX idx_bookings_payment_intent ON public.bookings(payment_intent_id);
CREATE INDEX idx_bookings_user_id ON public.bookings(user_id);

-- Add RLS policies for bookings table
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to view their own bookings
CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

-- Policy to allow users to insert their own bookings  
CREATE POLICY "Users can create own bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy to allow edge functions to update bookings (for payment confirmation)
CREATE POLICY "Service role can update bookings" ON public.bookings
  FOR UPDATE USING (true);
