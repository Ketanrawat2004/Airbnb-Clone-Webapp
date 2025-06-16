
-- Create a table to store the visitor count
CREATE TABLE public.visitor_counter (
  id INTEGER PRIMARY KEY DEFAULT 1,
  visit_count BIGINT NOT NULL DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert initial record
INSERT INTO public.visitor_counter (id, visit_count) 
VALUES (1, 0) 
ON CONFLICT (id) DO NOTHING;

-- Create function to increment visitor count
CREATE OR REPLACE FUNCTION public.increment_visitor_count()
RETURNS TABLE(visit_count BIGINT)
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.visitor_counter 
  SET visit_count = visit_count + 1, 
      last_updated = now() 
  WHERE id = 1;
  
  RETURN QUERY 
  SELECT public.visitor_counter.visit_count 
  FROM public.visitor_counter 
  WHERE id = 1;
END;
$$;

-- Make the table publicly readable (no RLS needed for this use case)
ALTER TABLE public.visitor_counter ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read the visitor count
CREATE POLICY "Everyone can view visitor count" 
  ON public.visitor_counter 
  FOR SELECT 
  USING (true);
