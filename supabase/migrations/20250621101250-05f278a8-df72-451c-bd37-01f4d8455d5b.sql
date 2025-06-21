
-- Create a table for flight bookings
CREATE TABLE public.flight_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  booking_type TEXT NOT NULL DEFAULT 'flight',
  flight_data JSONB NOT NULL,
  passenger_data JSONB NOT NULL,
  contact_info JSONB NOT NULL,
  total_amount INTEGER NOT NULL,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to ensure users can only see their own flight bookings
ALTER TABLE public.flight_bookings ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own flight bookings
CREATE POLICY "Users can view their own flight bookings" 
  ON public.flight_bookings 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own flight bookings
CREATE POLICY "Users can create their own flight bookings" 
  ON public.flight_bookings 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to UPDATE their own flight bookings
CREATE POLICY "Users can update their own flight bookings" 
  ON public.flight_bookings 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to DELETE their own flight bookings
CREATE POLICY "Users can delete their own flight bookings" 
  ON public.flight_bookings 
  FOR DELETE 
  USING (auth.uid() = user_id);
