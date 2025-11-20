-- Fix get_public_host_submissions to include search_path
CREATE OR REPLACE FUNCTION public.get_public_host_submissions()
RETURNS TABLE(
  id uuid,
  property_name text,
  property_type text,
  address text,
  city text,
  state text,
  description text,
  bedrooms text,
  bathrooms text,
  max_guests text,
  price_per_night integer,
  amenities text[],
  images text[],
  status text,
  is_verified boolean,
  created_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    hs.id,
    hs.property_name,
    hs.property_type,
    hs.address,
    hs.city,
    hs.state,
    hs.description,
    hs.bedrooms,
    hs.bathrooms,
    hs.max_guests,
    hs.price_per_night,
    hs.amenities,
    hs.images,
    hs.status,
    hs.is_verified,
    hs.created_at
  FROM public.host_submissions hs
  WHERE hs.status = 'approved'
  ORDER BY hs.created_at DESC;
END;
$function$;

-- Fix handle_new_user to use proper search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$function$;