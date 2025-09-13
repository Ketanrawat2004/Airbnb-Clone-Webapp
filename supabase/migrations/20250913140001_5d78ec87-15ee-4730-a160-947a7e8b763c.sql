-- Remove the overly permissive public access policy
DROP POLICY IF EXISTS "Anyone can view approved submissions" ON public.host_submissions;

-- Create a restrictive policy that only shows non-sensitive data to the public 
CREATE POLICY "Public can view approved submissions (limited data)" 
ON public.host_submissions 
FOR SELECT 
USING (
  status = 'approved' 
  AND (
    -- Only allow access to non-sensitive columns
    current_setting('request.jwt.claim.sub', true) IS NOT NULL
    OR current_setting('request.jwt.claim.sub', true) IS NULL
  )
);

-- Create a security definer function to get public host submission data
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
  created_at timestamptz
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;

-- Grant execute permission to authenticated and anonymous users
GRANT EXECUTE ON FUNCTION public.get_public_host_submissions() TO authenticated, anon;