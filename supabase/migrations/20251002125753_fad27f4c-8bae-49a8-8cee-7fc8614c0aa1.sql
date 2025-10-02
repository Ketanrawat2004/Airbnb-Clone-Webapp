-- Create user_coins table for BNB coins system
CREATE TABLE IF NOT EXISTS public.user_coins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  balance INTEGER NOT NULL DEFAULT 0,
  total_earned INTEGER NOT NULL DEFAULT 0,
  total_spent INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create train_bookings table
CREATE TABLE IF NOT EXISTS public.train_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  train_data JSONB NOT NULL,
  passenger_data JSONB NOT NULL,
  contact_info JSONB NOT NULL,
  total_amount INTEGER NOT NULL,
  coins_used INTEGER DEFAULT 0,
  actual_amount_paid INTEGER NOT NULL,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  status TEXT NOT NULL DEFAULT 'pending',
  booking_type TEXT NOT NULL DEFAULT 'train',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bus_bookings table
CREATE TABLE IF NOT EXISTS public.bus_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  bus_data JSONB NOT NULL,
  passenger_data JSONB NOT NULL,
  contact_info JSONB NOT NULL,
  total_amount INTEGER NOT NULL,
  coins_used INTEGER DEFAULT 0,
  actual_amount_paid INTEGER NOT NULL,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  status TEXT NOT NULL DEFAULT 'pending',
  booking_type TEXT NOT NULL DEFAULT 'bus',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create game_scores table
CREATE TABLE IF NOT EXISTS public.game_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  game_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  coins_earned INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_coins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.train_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bus_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_scores ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_coins
CREATE POLICY "Users can view their own coins" ON public.user_coins
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own coins record" ON public.user_coins
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own coins" ON public.user_coins
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for train_bookings
CREATE POLICY "Users can view their own train bookings" ON public.train_bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own train bookings" ON public.train_bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own train bookings" ON public.train_bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for bus_bookings
CREATE POLICY "Users can view their own bus bookings" ON public.bus_bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bus bookings" ON public.bus_bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bus bookings" ON public.bus_bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for game_scores
CREATE POLICY "Users can view their own game scores" ON public.game_scores
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own game scores" ON public.game_scores
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_user_coins_updated_at
  BEFORE UPDATE ON public.user_coins
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_train_bookings_updated_at
  BEFORE UPDATE ON public.train_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bus_bookings_updated_at
  BEFORE UPDATE ON public.bus_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();