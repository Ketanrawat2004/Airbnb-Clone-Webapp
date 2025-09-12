-- Enable Row Level Security on otp_codes table
ALTER TABLE public.otp_codes ENABLE ROW LEVEL SECURITY;

-- Create restrictive policies to prevent direct access
-- Since our functions use SECURITY DEFINER, they can bypass these policies
-- but direct queries from users will be blocked

-- Deny all direct SELECT access (functions handle validation internally)
CREATE POLICY "No direct read access to OTP codes" 
ON public.otp_codes 
FOR SELECT 
USING (false);

-- Deny all direct INSERT access (only functions should create OTPs)
CREATE POLICY "No direct insert access to OTP codes" 
ON public.otp_codes 
FOR INSERT 
WITH CHECK (false);

-- Deny all direct UPDATE access (only functions should update OTPs)
CREATE POLICY "No direct update access to OTP codes" 
ON public.otp_codes 
FOR UPDATE 
USING (false);

-- Deny all direct DELETE access (only cleanup functions should delete)
CREATE POLICY "No direct delete access to OTP codes" 
ON public.otp_codes 
FOR DELETE 
USING (false);