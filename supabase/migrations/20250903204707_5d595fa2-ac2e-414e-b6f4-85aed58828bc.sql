-- Create table for host submissions
CREATE TABLE public.host_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  property_type TEXT NOT NULL,
  property_name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  description TEXT,
  bedrooms TEXT NOT NULL,
  bathrooms TEXT NOT NULL,
  max_guests TEXT NOT NULL,
  price_per_night INTEGER NOT NULL,
  amenities TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  host_name TEXT NOT NULL,
  host_email TEXT NOT NULL,
  host_phone TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  is_verified BOOLEAN DEFAULT false,
  verification_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.host_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for host submissions
CREATE POLICY "Users can create their own submissions" 
ON public.host_submissions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own submissions" 
ON public.host_submissions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view approved submissions" 
ON public.host_submissions 
FOR SELECT 
USING (status = 'approved');

CREATE POLICY "Users can update their own submissions" 
ON public.host_submissions 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_host_submissions_updated_at
BEFORE UPDATE ON public.host_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();