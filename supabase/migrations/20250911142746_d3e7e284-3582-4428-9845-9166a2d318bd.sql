-- Create or update OTP functions for email verification
CREATE OR REPLACE FUNCTION public.generate_email_otp(user_email text, user_name text)
RETURNS TABLE(otp_code text, expires_at timestamp with time zone)
LANGUAGE plpgsql
AS $$
DECLARE
  generated_otp TEXT;
  expiry_time TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Generate 6-digit OTP
  generated_otp := LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  
  -- Set expiry to 1 minute from now
  expiry_time := now() + interval '1 minute';
  
  -- Mark previous OTPs for this email as used
  UPDATE public.otp_codes 
  SET is_used = true 
  WHERE email = user_email AND is_used = false;
  
  -- Insert new OTP
  INSERT INTO public.otp_codes (email, name, otp_code, expires_at)
  VALUES (user_email, user_name, generated_otp, expiry_time);
  
  RETURN QUERY SELECT generated_otp, expiry_time;
END;
$$;

-- Create or update OTP validation function for email verification
CREATE OR REPLACE FUNCTION public.validate_email_otp(user_email text, provided_otp text)
RETURNS TABLE(valid boolean, message text)
LANGUAGE plpgsql
AS $$
DECLARE
  otp_record RECORD;
BEGIN
  -- Find the most recent unused OTP for the email
  SELECT * INTO otp_record
  FROM public.otp_codes
  WHERE email = user_email 
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
  
  RETURN QUERY SELECT true, 'OTP verified successfully';
END;
$$;

-- Add email column to otp_codes table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'otp_codes' AND column_name = 'email') THEN
    ALTER TABLE public.otp_codes ADD COLUMN email text;
  END IF;
END $$;