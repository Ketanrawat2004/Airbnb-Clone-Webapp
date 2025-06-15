
-- Create a table to store OTP codes
CREATE TABLE public.otp_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_used BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add index for faster lookups
CREATE INDEX idx_otp_codes_name_code ON public.otp_codes(name, otp_code);
CREATE INDEX idx_otp_codes_expires_at ON public.otp_codes(expires_at);

-- Function to generate and store OTP
CREATE OR REPLACE FUNCTION public.generate_otp(user_name TEXT)
RETURNS TABLE(otp_code TEXT, expires_at TIMESTAMP WITH TIME ZONE)
LANGUAGE plpgsql
AS $$
DECLARE
  generated_otp TEXT;
  expiry_time TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Generate 6-digit OTP
  generated_otp := LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  
  -- Set expiry to 10 minutes from now
  expiry_time := now() + interval '10 minutes';
  
  -- Insert new OTP (invalidate old ones by not deleting but relying on expiry)
  INSERT INTO public.otp_codes (name, otp_code, expires_at)
  VALUES (user_name, generated_otp, expiry_time);
  
  RETURN QUERY SELECT generated_otp, expiry_time;
END;
$$;

-- Function to validate OTP
CREATE OR REPLACE FUNCTION public.validate_otp(user_name TEXT, provided_otp TEXT)
RETURNS TABLE(valid BOOLEAN, message TEXT)
LANGUAGE plpgsql
AS $$
DECLARE
  otp_record RECORD;
BEGIN
  -- Find the most recent unused OTP for the user
  SELECT * INTO otp_record
  FROM public.otp_codes
  WHERE name = user_name 
    AND otp_code = provided_otp
    AND expires_at > now()
    AND is_used = false
  ORDER BY created_at DESC
  LIMIT 1;
  
  -- Check if OTP exists and is valid
  IF otp_record IS NULL THEN
    RETURN QUERY SELECT false, 'Invalid or expired OTP code';
    RETURN;
  END IF;
  
  -- Mark OTP as used
  UPDATE public.otp_codes 
  SET is_used = true 
  WHERE id = otp_record.id;
  
  RETURN QUERY SELECT true, 'OTP validated successfully';
END;
$$;

-- Clean up expired OTPs (optional, for maintenance)
CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM public.otp_codes 
  WHERE expires_at < now() - interval '1 day';
END;
$$;
