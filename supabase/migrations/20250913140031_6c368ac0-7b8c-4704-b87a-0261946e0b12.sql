-- Remove the flawed public access policy completely
DROP POLICY IF EXISTS "Public can view approved submissions (limited data)" ON public.host_submissions;

-- No public access to the table - only through the secure function
-- This ensures no sensitive data can be accessed directly