
-- Add discount and coupon functionality
CREATE TABLE public.coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount')),
  discount_value INTEGER NOT NULL, -- percentage (1-100) or amount in paise
  min_booking_amount INTEGER DEFAULT 0, -- minimum booking amount to apply coupon
  max_discount_amount INTEGER, -- maximum discount amount for percentage coupons
  valid_from TIMESTAMPTZ NOT NULL DEFAULT now(),
  valid_until TIMESTAMPTZ NOT NULL,
  usage_limit INTEGER, -- total usage limit
  usage_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add applied coupons tracking
CREATE TABLE public.booking_coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
  coupon_id UUID REFERENCES public.coupons(id) ON DELETE CASCADE NOT NULL,
  discount_amount INTEGER NOT NULL, -- actual discount applied in paise
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(booking_id)
);

-- Update bookings table to include discount information
ALTER TABLE public.bookings 
ADD COLUMN discount_amount INTEGER DEFAULT 0,
ADD COLUMN coupon_code TEXT,
ADD COLUMN room_type TEXT,
ADD COLUMN base_amount INTEGER;

-- Enable RLS for new tables
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_coupons ENABLE ROW LEVEL SECURITY;

-- Policies for coupons (public read for active coupons)
CREATE POLICY "Anyone can view active coupons" ON public.coupons
  FOR SELECT USING (is_active = true AND valid_until > now());

-- Policies for booking_coupons
CREATE POLICY "Users can view their own booking coupons" ON public.booking_coupons
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.bookings b 
      WHERE b.id = booking_coupons.booking_id 
      AND b.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create their own booking coupons" ON public.booking_coupons
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.bookings b 
      WHERE b.id = booking_coupons.booking_id 
      AND b.user_id = auth.uid()
    )
  );

-- Insert sample coupons
INSERT INTO public.coupons (code, discount_type, discount_value, min_booking_amount, max_discount_amount, valid_until, usage_limit) VALUES
('WELCOME10', 'percentage', 10, 500000, 200000, '2025-12-31 23:59:59', 1000),
('SAVE500', 'fixed_amount', 50000, 100000, NULL, '2025-12-31 23:59:59', 500),
('FIRST20', 'percentage', 20, 300000, 500000, '2025-12-31 23:59:59', 100),
('HOLIDAY15', 'percentage', 15, 200000, 300000, '2025-12-31 23:59:59', 200);

-- Function to validate and apply coupon
CREATE OR REPLACE FUNCTION validate_coupon(
  coupon_code_param TEXT,
  booking_amount_param INTEGER
)
RETURNS TABLE (
  valid BOOLEAN,
  discount_amount INTEGER,
  coupon_id UUID,
  message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
  coupon_record RECORD;
  calculated_discount INTEGER;
BEGIN
  -- Find the coupon
  SELECT * INTO coupon_record
  FROM public.coupons
  WHERE code = coupon_code_param
    AND is_active = true
    AND valid_from <= now()
    AND valid_until > now();

  -- Check if coupon exists
  IF coupon_record IS NULL THEN
    RETURN QUERY SELECT false, 0, NULL::UUID, 'Invalid or expired coupon code';
    RETURN;
  END IF;

  -- Check usage limit
  IF coupon_record.usage_limit IS NOT NULL AND coupon_record.usage_count >= coupon_record.usage_limit THEN
    RETURN QUERY SELECT false, 0, NULL::UUID, 'Coupon usage limit exceeded';
    RETURN;
  END IF;

  -- Check minimum booking amount
  IF booking_amount_param < coupon_record.min_booking_amount THEN
    RETURN QUERY SELECT false, 0, NULL::UUID, 'Minimum booking amount not met';
    RETURN;
  END IF;

  -- Calculate discount
  IF coupon_record.discount_type = 'percentage' THEN
    calculated_discount := (booking_amount_param * coupon_record.discount_value) / 100;
    -- Apply maximum discount limit for percentage coupons
    IF coupon_record.max_discount_amount IS NOT NULL AND calculated_discount > coupon_record.max_discount_amount THEN
      calculated_discount := coupon_record.max_discount_amount;
    END IF;
  ELSE
    calculated_discount := coupon_record.discount_value;
  END IF;

  -- Ensure discount doesn't exceed booking amount
  IF calculated_discount > booking_amount_param THEN
    calculated_discount := booking_amount_param;
  END IF;

  RETURN QUERY SELECT true, calculated_discount, coupon_record.id, 'Coupon applied successfully';
END;
$$;
