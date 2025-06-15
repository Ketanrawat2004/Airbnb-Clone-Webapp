
-- Add Razorpay support to bookings table
ALTER TABLE public.bookings 
ADD COLUMN razorpay_order_id TEXT,
ADD COLUMN razorpay_payment_id TEXT;

-- Add indexes for faster lookups
CREATE INDEX idx_bookings_razorpay_order_id ON public.bookings(razorpay_order_id);
CREATE INDEX idx_bookings_razorpay_payment_id ON public.bookings(razorpay_payment_id);

-- Add comments
COMMENT ON COLUMN public.bookings.razorpay_order_id IS 'Razorpay order ID for tracking payments';
COMMENT ON COLUMN public.bookings.razorpay_payment_id IS 'Razorpay payment ID after successful payment';
