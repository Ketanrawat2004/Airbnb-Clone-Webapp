
-- Fix the ambiguous column reference in the increment_visitor_count function
CREATE OR REPLACE FUNCTION public.increment_visitor_count()
RETURNS TABLE(visit_count bigint)
LANGUAGE plpgsql
AS $$
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
$$;
