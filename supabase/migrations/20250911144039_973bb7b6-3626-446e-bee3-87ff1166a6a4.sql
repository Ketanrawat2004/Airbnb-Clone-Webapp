-- Ensure otp_codes table exists with required columns
CREATE TABLE IF NOT EXISTS public.otp_codes (
  id BIGSERIAL PRIMARY KEY,
  email TEXT,
  name TEXT,
  otp_code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  is_used BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS) to prevent direct access
ALTER TABLE public.otp_codes ENABLE ROW LEVEL SECURITY;

-- Helpful index for lookups
CREATE INDEX IF NOT EXISTS idx_otp_codes_email_created ON public.otp_codes (email, created_at DESC);

-- Make generate_email_otp run with elevated privileges and ensure non-repeating OTPs
CREATE OR REPLACE FUNCTION public.generate_email_otp(user_email text, user_name text)
RETURNS TABLE(otp_code text, expires_at timestamp with time zone)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $$
DECLARE
  generated_otp TEXT;
  expiry_time TIMESTAMPTZ;
  last_otp TEXT;
  tries INT := 0;
BEGIN
  -- Generate 6-digit OTP and ensure it differs from the last OTP sent to this email
  LOOP
    generated_otp := LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');

    SELECT oc.otp_code INTO last_otp
    FROM public.otp_codes oc
    WHERE oc.email = user_email
    ORDER BY oc.created_at DESC
    LIMIT 1;

    IF generated_otp <> COALESCE(last_otp, '') THEN
      EXIT;
    END IF;

    tries := tries + 1;
    IF tries > 5 THEN
      -- Fallback to avoid infinite loop: tweak by +1 mod 1,000,000
      generated_otp := LPAD(((FLOOR(RANDOM() * 1000000)::INT + 1) % 1000000)::TEXT, 6, '0');
      EXIT;
    END IF;
  END LOOP;

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

-- Make validate_email_otp run with elevated privileges
CREATE OR REPLACE FUNCTION public.validate_email_otp(user_email text, provided_otp text)
RETURNS TABLE(valid boolean, message text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
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