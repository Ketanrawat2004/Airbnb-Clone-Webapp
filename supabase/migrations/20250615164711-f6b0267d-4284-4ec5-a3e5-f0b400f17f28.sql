
-- Add testimonials table for guest reviews
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name TEXT NOT NULL,
  guest_location TEXT,
  hotel_id UUID REFERENCES public.hotels(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  stay_date DATE,
  room_type TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add wishlist table for user favorites
CREATE TABLE public.wishlists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  hotel_id UUID REFERENCES public.hotels(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, hotel_id)
);

-- Enable RLS for testimonials (public read, admin write for now)
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view testimonials" 
  ON public.testimonials 
  FOR SELECT 
  TO public 
  USING (true);

-- Enable RLS for wishlists (users can only see their own)
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own wishlist" 
  ON public.wishlists 
  FOR SELECT 
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can add to their wishlist" 
  ON public.wishlists 
  FOR INSERT 
  WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can remove from their wishlist" 
  ON public.wishlists 
  FOR DELETE 
  USING (auth.uid()::text = user_id::text);

-- Add more detailed columns to hotels table
ALTER TABLE public.hotels 
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS website TEXT,
ADD COLUMN IF NOT EXISTS check_in_time TEXT DEFAULT '2:00 PM',
ADD COLUMN IF NOT EXISTS check_out_time TEXT DEFAULT '11:00 AM',
ADD COLUMN IF NOT EXISTS languages_spoken TEXT[] DEFAULT ARRAY['English', 'Hindi'],
ADD COLUMN IF NOT EXISTS property_type TEXT DEFAULT 'Hotel',
ADD COLUMN IF NOT EXISTS star_rating INTEGER DEFAULT 3 CHECK (star_rating >= 1 AND star_rating <= 5),
ADD COLUMN IF NOT EXISTS year_built INTEGER,
ADD COLUMN IF NOT EXISTS year_renovated INTEGER,
ADD COLUMN IF NOT EXISTS total_floors INTEGER,
ADD COLUMN IF NOT EXISTS parking_available BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS pets_allowed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS smoking_allowed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS business_center BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS fitness_center BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS spa_services BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS restaurant_on_site BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS room_service BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS concierge_service BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS laundry_service BOOLEAN DEFAULT true;

-- Insert sample testimonials
INSERT INTO public.testimonials (guest_name, guest_location, hotel_id, rating, review_text, stay_date, room_type, is_verified, is_featured) VALUES
('Rajesh Kumar', 'Delhi', (SELECT id FROM hotels WHERE name LIKE '%Bhopal%' LIMIT 1), 5, 'Exceptional service and beautiful rooms. The staff went above and beyond to make our stay memorable. Highly recommended for both business and leisure travelers.', '2024-05-15', 'Deluxe Room', true, true),
('Priya Sharma', 'Mumbai', (SELECT id FROM hotels WHERE name LIKE '%Jamshedpur%' LIMIT 1), 4, 'Great location and clean facilities. The breakfast was delicious and the front desk staff was very helpful. Will definitely stay here again.', '2024-05-20', 'Standard Room', true, true),
('Vikram Singh', 'Bangalore', (SELECT id FROM hotels WHERE name LIKE '%Lucknow%' LIMIT 1), 5, 'Outstanding hospitality! The rooms were spacious and well-appointed. The hotel exceeded our expectations in every way.', '2024-06-01', 'Suite', true, true),
('Anita Joshi', 'Pune', (SELECT id FROM hotels WHERE name LIKE '%Chennai%' LIMIT 1), 4, 'Comfortable stay with modern amenities. The location is perfect for exploring the city. Staff was courteous and professional.', '2024-06-10', 'Deluxe Room', true, false),
('Suresh Patel', 'Ahmedabad', (SELECT id FROM hotels WHERE name LIKE '%Surat%' LIMIT 1), 5, 'Fantastic experience! From check-in to check-out, everything was smooth. The room was spotless and the view was amazing.', '2024-06-15', 'Premium Room', true, true);

-- Insert more hotels across Indian cities
INSERT INTO public.hotels (name, location, description, price_per_night, amenities, facilities, rules_and_regulations, images, rating, reviews_count, available_rooms, total_rooms, address, phone, email, website, property_type, star_rating, year_built, total_floors, parking_available, business_center, fitness_center, restaurant_on_site, spa_services) VALUES

-- Goa Hotels
('Taj Exotica Resort & Spa', 'Goa', 'Luxury beachfront resort with world-class amenities and stunning ocean views. Perfect for romantic getaways and family vacations.', 1200000, ARRAY['Free WiFi', 'Swimming Pool', 'Spa', 'Beach Access', 'Restaurant', 'Bar', 'Room Service', 'Gym'], ARRAY['Business Center', 'Conference Rooms', 'Parking', 'Airport Shuttle', 'Laundry Service'], ARRAY['Check-in: 3:00 PM', 'Check-out: 11:00 AM', 'No smoking in rooms', 'Pets not allowed'], ARRAY['https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], 4.8, 1247, 15, 50, 'Calangute Beach, North Goa, Goa 403516', '+91-832-6687777', 'reservations@tajgoa.com', 'https://www.tajhotels.com', 'Resort', 5, 1998, 3, true, true, true, true, true),

('Alila Diwa Goa', 'Goa', 'Contemporary resort offering modern comfort amidst traditional Goan charm. Features rice field views and premium facilities.', 950000, ARRAY['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Kids Club'], ARRAY['Business Center', 'Event Spaces', 'Parking', 'Shuttle Service'], ARRAY['Check-in: 2:00 PM', 'Check-out: 12:00 PM', 'No pets allowed'], ARRAY['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], 4.6, 892, 8, 35, 'Majorda Beach, South Goa, Goa 403713', '+91-832-2746800', 'diwa@alilahotels.com', 'https://www.alilahotels.com', 'Resort', 5, 2006, 4, true, true, true, true, true),

-- Rajasthan Hotels
('Umaid Bhawan Palace', 'Jodhpur, Rajasthan', 'One of the world''s largest private residences, now a luxury heritage hotel offering royal experiences and breathtaking architecture.', 2500000, ARRAY['Free WiFi', 'Swimming Pool', 'Spa', 'Museum', 'Restaurant', 'Bar', 'Room Service', 'Butler Service'], ARRAY['Business Center', 'Event Spaces', 'Parking', 'Airport Transfer', 'Vintage Car Tours'], ARRAY['Check-in: 2:00 PM', 'Check-out: 12:00 PM', 'Formal dress code for dinner', 'No pets in heritage areas'], ARRAY['https://images.unsplash.com/photo-1594736797933-d0402ba981c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], 4.9, 1567, 5, 25, 'Circuit House Road, Jodhpur, Rajasthan 342006', '+91-291-2510101', 'umaidbhawan@tajhotels.com', 'https://www.tajhotels.com', 'Palace Hotel', 5, 1943, 4, true, true, true, true, true),

('The Oberoi Udaivilas', 'Udaipur, Rajasthan', 'Magnificent palace hotel overlooking Lake Pichola, featuring intricate architecture and unparalleled luxury in the City of Lakes.', 1800000, ARRAY['Free WiFi', 'Swimming Pool', 'Spa', 'Lake Views', 'Restaurant', 'Bar', 'Butler Service'], ARRAY['Business Center', 'Wedding Venues', 'Parking', 'Boat Service'], ARRAY['Check-in: 3:00 PM', 'Check-out: 12:00 PM', 'Smart casual dress code'], ARRAY['https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], 4.9, 2134, 3, 18, 'Haridasji Ki Magri, Udaipur, Rajasthan 313001', '+91-294-2433300', 'reservations@oberoihotels.com', 'https://www.oberoihotels.com', 'Palace Hotel', 5, 2002, 3, true, true, true, true, true),

-- Kerala Hotels
('Kumarakom Lake Resort', 'Kumarakom, Kerala', 'Luxury lakeside resort in Kerala backwaters offering traditional houseboats, Ayurvedic spa treatments, and authentic local experiences.', 850000, ARRAY['Free WiFi', 'Swimming Pool', 'Spa', 'Backwater Views', 'Restaurant', 'Houseboat', 'Ayurveda Center'], ARRAY['Business Center', 'Event Spaces', 'Parking', 'Boat Transfers'], ARRAY['Check-in: 2:00 PM', 'Check-out: 11:00 AM', 'Eco-friendly practices encouraged'], ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], 4.7, 1423, 12, 40, 'Kumarakom North P.O, Kottayam, Kerala 686563', '+91-481-2524900', 'reservations@kumarakomlakeresort.in', 'https://www.kumarakomlakeresort.in', 'Resort', 5, 1995, 2, true, true, true, true, true),

('Marari Beach Resort', 'Mararikulam, Kerala', 'Beachfront eco-resort offering sustainable luxury with traditional Kerala architecture and pristine beach access.', 650000, ARRAY['Free WiFi', 'Swimming Pool', 'Beach Access', 'Spa', 'Restaurant', 'Yoga Center'], ARRAY['Business Center', 'Event Spaces', 'Parking', 'Bicycle Rental'], ARRAY['Check-in: 2:00 PM', 'Check-out: 12:00 PM', 'Sustainable tourism practices'], ARRAY['https://images.unsplash.com/photo-1520637836862-4d197d17c97a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], 4.5, 987, 18, 55, 'Mararikulam North, Alappuzha, Kerala 688549', '+91-478-2863801', 'marari@cghearth.com', 'https://www.cghearth.com', 'Beach Resort', 4, 2000, 2, true, false, true, true, true),

-- Himachal Pradesh Hotels
('Wildflower Hall Shimla', 'Shimla, Himachal Pradesh', 'Luxury mountain resort offering panoramic Himalayan views, world-class spa facilities, and colonial charm in the hill station of Shimla.', 1150000, ARRAY['Free WiFi', 'Swimming Pool', 'Spa', 'Mountain Views', 'Restaurant', 'Bar', 'Gym', 'Hiking Trails'], ARRAY['Business Center', 'Conference Rooms', 'Parking', 'Airport Transfer'], ARRAY['Check-in: 3:00 PM', 'Check-out: 12:00 PM', 'Mountain weather clothing recommended'], ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], 4.8, 1876, 7, 32, 'Chharabra, Shimla, Himachal Pradesh 171012', '+91-177-2648585', 'shimla@oberoihotels.com', 'https://www.oberoihotels.com', 'Mountain Resort', 5, 1925, 3, true, true, true, true, true),

-- Uttarakhand Hotels
('Ananda in the Himalayas', 'Rishikesh, Uttarakhand', 'World-renowned wellness retreat and spa resort nestled in the Himalayan foothills, offering holistic healing and spiritual experiences.', 1350000, ARRAY['Free WiFi', 'Swimming Pool', 'Spa', 'Yoga Studio', 'Restaurant', 'Meditation Center', 'Ayurveda Center'], ARRAY['Business Center', 'Event Spaces', 'Parking', 'Helicopter Transfers'], ARRAY['Check-in: 2:00 PM', 'Check-out: 12:00 PM', 'Wellness programs mandatory', 'No alcohol on premises'], ARRAY['https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], 4.9, 2456, 4, 24, 'The Palace Estate, Narendra Nagar, Tehri Garhwal, Uttarakhand 249175', '+91-1378-227500', 'reservations@anandaspa.com', 'https://www.anandaspa.com', 'Wellness Resort', 5, 2000, 3, true, true, true, true, true),

-- Punjab Hotels
('Hyatt Regency Amritsar', 'Amritsar, Punjab', 'Modern luxury hotel near the Golden Temple, offering contemporary comfort with easy access to the city''s spiritual and cultural attractions.', 450000, ARRAY['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Room Service'], ARRAY['Business Center', 'Conference Rooms', 'Parking', 'Airport Shuttle'], ARRAY['Check-in: 3:00 PM', 'Check-out: 12:00 PM', 'Respectful dress code near temple'], ARRAY['https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], 4.4, 1234, 22, 65, 'Plot No 5 & 6, District Shopping Complex, Ranjit Avenue, Amritsar, Punjab 143001', '+91-183-5066666', 'amritsar@hyatt.com', 'https://www.hyatt.com', 'Hotel', 5, 2018, 8, true, true, true, true, true),

-- Andhra Pradesh Hotels
('Taj Falaknuma Palace', 'Hyderabad, Andhra Pradesh', 'Opulent Nizam palace converted into a luxury hotel, showcasing royal heritage with modern amenities and panoramic city views.', 1650000, ARRAY['Free WiFi', 'Swimming Pool', 'Spa', 'Palace Tours', 'Restaurant', 'Bar', 'Butler Service'], ARRAY['Business Center', 'Event Spaces', 'Parking', 'Vintage Car Collection'], ARRAY['Check-in: 3:00 PM', 'Check-out: 12:00 PM', 'Formal dress code for some areas'], ARRAY['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], 4.8, 1789, 6, 20, 'Engine Bowli, Falaknuma, Hyderabad, Telangana 500053', '+91-40-66298585', 'falaknuma@tajhotels.com', 'https://www.tajhotels.com', 'Palace Hotel', 5, 1894, 4, true, true, true, true, true);
