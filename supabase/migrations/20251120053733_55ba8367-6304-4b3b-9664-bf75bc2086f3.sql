-- Fix cleanup_expired_otps
CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS void
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  DELETE FROM public.otp_codes 
  WHERE expires_at < now() - interval '1 day';
END;
$function$;

-- Fix sync_featured_reviews_to_testimonials
CREATE OR REPLACE FUNCTION public.sync_featured_reviews_to_testimonials()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  IF NEW.is_featured = true AND (OLD.is_featured IS NULL OR OLD.is_featured = false) THEN
    INSERT INTO public.testimonials (
      guest_name,
      guest_location,
      rating,
      review_text,
      hotel_id,
      room_type,
      stay_date,
      is_verified,
      is_featured
    ) VALUES (
      NEW.guest_name,
      NEW.guest_location,
      NEW.rating,
      NEW.review_text,
      NEW.hotel_id,
      NEW.room_type,
      NEW.stay_date,
      NEW.is_verified,
      true
    );
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Fix search_hotels
CREATE OR REPLACE FUNCTION public.search_hotels(search_location text)
RETURNS TABLE(
  id uuid,
  name text,
  location text,
  description text,
  price_per_night integer,
  amenities text[],
  images text[],
  rating numeric,
  reviews_count integer,
  total_rooms integer,
  available_rooms integer,
  created_at timestamp with time zone
)
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  RETURN QUERY
  SELECT h.id, h.name, h.location, h.description, h.price_per_night, 
         h.amenities, h.images, h.rating, h.reviews_count, 
         h.total_rooms, h.available_rooms, h.created_at
  FROM public.hotels h
  WHERE h.location ILIKE '%' || search_location || '%'
     OR to_tsvector('english', h.location) @@ plainto_tsquery('english', search_location)
  ORDER BY h.rating DESC, h.reviews_count DESC;
END;
$function$;

-- Fix generate_otp
CREATE OR REPLACE FUNCTION public.generate_otp(user_name text)
RETURNS TABLE(otp_code text, expires_at timestamp with time zone)
LANGUAGE plpgsql
SET search_path = public
AS $function$
DECLARE
  generated_otp TEXT;
  expiry_time TIMESTAMP WITH TIME ZONE;
BEGIN
  generated_otp := LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  expiry_time := now() + interval '10 minutes';
  
  INSERT INTO public.otp_codes (name, otp_code, expires_at)
  VALUES (user_name, generated_otp, expiry_time);
  
  RETURN QUERY SELECT generated_otp, expiry_time;
END;
$function$;

-- Fix increment_visitor_count
CREATE OR REPLACE FUNCTION public.increment_visitor_count()
RETURNS TABLE(visit_count bigint)
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  UPDATE public.visitor_counter 
  SET visit_count = visitor_counter.visit_count + 1, 
      last_updated = now() 
  WHERE id = 1;
  
  RETURN QUERY 
  SELECT visitor_counter.visit_count 
  FROM public.visitor_counter 
  WHERE visitor_counter.id = 1;
END;
$function$;

-- Fix get_available_rooms
CREATE OR REPLACE FUNCTION public.get_available_rooms(
  hotel_id_param uuid,
  check_in_date date,
  check_out_date date
)
RETURNS TABLE(
  id uuid,
  room_number text,
  room_type text,
  max_occupancy integer,
  price_per_night integer,
  amenities text[]
)
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  RETURN QUERY
  SELECT r.id, r.room_number, r.room_type, r.max_occupancy, r.price_per_night, r.amenities
  FROM public.rooms r
  WHERE r.hotel_id = hotel_id_param
    AND r.is_available = true
    AND r.id NOT IN (
      SELECT rb.room_id
      FROM public.room_bookings rb
      JOIN public.bookings b ON rb.booking_id = b.id
      WHERE b.hotel_id = hotel_id_param
        AND b.status IN ('confirmed', 'checked_in')
        AND (
          (b.check_in_date <= check_out_date AND b.check_out_date > check_in_date)
        )
    );
END;
$function$;

-- Fix validate_coupon
CREATE OR REPLACE FUNCTION public.validate_coupon(
  coupon_code_param text,
  booking_amount_param integer
)
RETURNS TABLE(
  valid boolean,
  discount_amount integer,
  coupon_id uuid,
  message text
)
LANGUAGE plpgsql
SET search_path = public
AS $function$
DECLARE
  coupon_record RECORD;
  calculated_discount INTEGER;
BEGIN
  SELECT * INTO coupon_record
  FROM public.coupons
  WHERE code = coupon_code_param
    AND is_active = true
    AND valid_from <= now()
    AND valid_until > now();

  IF coupon_record IS NULL THEN
    RETURN QUERY SELECT false, 0, NULL::UUID, 'Invalid or expired coupon code';
    RETURN;
  END IF;

  IF coupon_record.usage_limit IS NOT NULL AND coupon_record.usage_count >= coupon_record.usage_limit THEN
    RETURN QUERY SELECT false, 0, NULL::UUID, 'Coupon usage limit exceeded';
    RETURN;
  END IF;

  IF booking_amount_param < coupon_record.min_booking_amount THEN
    RETURN QUERY SELECT false, 0, NULL::UUID, 'Minimum booking amount not met';
    RETURN;
  END IF;

  IF coupon_record.discount_type = 'percentage' THEN
    calculated_discount := (booking_amount_param * coupon_record.discount_value) / 100;
    IF coupon_record.max_discount_amount IS NOT NULL AND calculated_discount > coupon_record.max_discount_amount THEN
      calculated_discount := coupon_record.max_discount_amount;
    END IF;
  ELSE
    calculated_discount := coupon_record.discount_value;
  END IF;

  IF calculated_discount > booking_amount_param THEN
    calculated_discount := booking_amount_param;
  END IF;

  RETURN QUERY SELECT true, calculated_discount, coupon_record.id, 'Coupon applied successfully';
END;
$function$;

-- Fix validate_otp
CREATE OR REPLACE FUNCTION public.validate_otp(
  user_name text,
  provided_otp text
)
RETURNS TABLE(valid boolean, message text)
LANGUAGE plpgsql
SET search_path = public
AS $function$
DECLARE
  otp_record RECORD;
BEGIN
  SELECT * INTO otp_record
  FROM public.otp_codes
  WHERE name = user_name 
    AND otp_code = provided_otp
    AND expires_at > now()
    AND is_used = false
  ORDER BY created_at DESC
  LIMIT 1;
  
  IF otp_record IS NULL THEN
    RETURN QUERY SELECT false, 'Invalid or expired OTP code';
    RETURN;
  END IF;
  
  UPDATE public.otp_codes 
  SET is_used = true 
  WHERE id = otp_record.id;
  
  RETURN QUERY SELECT true, 'OTP validated successfully';
END;
$function$;