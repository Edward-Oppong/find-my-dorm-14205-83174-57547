-- Create function to update timestamps (if it doesn't exist)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create hostel_applications table for managing hostel listings
CREATE TABLE public.hostel_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  price DECIMAL NOT NULL,
  rating DECIMAL,
  image_url TEXT,
  description TEXT,
  amenities TEXT[],
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.hostel_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit applications
CREATE POLICY "Anyone can submit hostel applications" 
ON public.hostel_applications 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to view applications (for admin dashboard)
CREATE POLICY "Anyone can view hostel applications" 
ON public.hostel_applications 
FOR SELECT 
USING (true);

-- Allow anyone to update applications (for admin approval)
CREATE POLICY "Anyone can update hostel applications" 
ON public.hostel_applications 
FOR UPDATE 
USING (true);

-- Create hostels table for approved listings
CREATE TABLE public.hostels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID REFERENCES public.hostel_applications(id),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  price DECIMAL NOT NULL,
  rating DECIMAL,
  image_url TEXT,
  description TEXT,
  amenities TEXT[],
  longitude DECIMAL,
  latitude DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.hostels ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view approved hostels
CREATE POLICY "Anyone can view hostels" 
ON public.hostels 
FOR SELECT 
USING (true);

-- Allow anyone to insert hostels (for admin approval process)
CREATE POLICY "Anyone can insert hostels" 
ON public.hostels 
FOR INSERT 
WITH CHECK (true);

-- Create trigger for automatic timestamp updates on hostel_applications
CREATE TRIGGER update_hostel_applications_updated_at
BEFORE UPDATE ON public.hostel_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for automatic timestamp updates on hostels
CREATE TRIGGER update_hostels_updated_at
BEFORE UPDATE ON public.hostels
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();