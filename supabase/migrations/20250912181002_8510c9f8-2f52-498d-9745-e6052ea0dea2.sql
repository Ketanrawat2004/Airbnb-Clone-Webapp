-- Enable realtime for visitor_counter table
ALTER TABLE public.visitor_counter REPLICA IDENTITY FULL;

-- Add visitor_counter to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.visitor_counter;