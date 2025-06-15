
-- Add more budget hotels from different Indian cities for the cheap rates section
INSERT INTO public.hotels (name, location, description, price_per_night, amenities, images, rating, reviews_count, total_rooms, available_rooms) VALUES

-- Agra Hotels (1-2 rupees)
('Budget Stay Agra', 'Agra, Uttar Pradesh', 'Affordable accommodation near Taj Mahal with basic amenities and clean rooms.', 150, ARRAY['WiFi', 'AC', 'Restaurant'], ARRAY['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'], 3.8, 28, 15, 12),
('Taj View Lodge', 'Agra, Uttar Pradesh', 'Budget lodge with views of the Taj Mahal at unbeatable prices.', 200, ARRAY['WiFi', 'Restaurant', 'Tour Desk'], ARRAY['https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800'], 4.0, 35, 18, 15),

-- Varanasi Hotels (1-2 rupees)
('Ganga View Budget Inn', 'Varanasi, Uttar Pradesh', 'Simple accommodation with views of the holy Ganges river.', 120, ARRAY['WiFi', 'Restaurant'], ARRAY['https://images.unsplash.com/photo-1549294413-26f195200c16?w=800'], 3.9, 42, 12, 10),
('Holy City Lodge', 'Varanasi, Uttar Pradesh', 'Peaceful budget stay in the spiritual city of Varanasi.', 180, ARRAY['WiFi', 'AC', 'Temple Tours'], ARRAY['https://images.unsplash.com/photo-1556909205-36add2637c74?w=800'], 4.1, 31, 14, 11),

-- Rishikesh Hotels (1-2 rupees)
('River Side Budget Stay', 'Rishikesh, Uttarakhand', 'Budget accommodation by the Ganges perfect for yoga enthusiasts.', 150, ARRAY['WiFi', 'Yoga Classes', 'Restaurant'], ARRAY['https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800'], 4.2, 38, 10, 8),
('Mountain View Lodge', 'Rishikesh, Uttarakhand', 'Affordable stay with mountain views and spiritual ambiance.', 190, ARRAY['WiFi', 'Meditation Area', 'Restaurant'], ARRAY['https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800'], 3.7, 25, 16, 13),

-- Pushkar Hotels (1-2 rupees)
('Desert Budget Inn', 'Pushkar, Rajasthan', 'Simple accommodation in the holy city of Pushkar.', 130, ARRAY['WiFi', 'Restaurant', 'Camel Safari'], ARRAY['https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800'], 3.8, 29, 12, 9),
('Lake View Budget Stay', 'Pushkar, Rajasthan', 'Affordable hotel near Pushkar Lake with basic amenities.', 170, ARRAY['WiFi', 'AC', 'Restaurant'], ARRAY['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'], 4.0, 33, 15, 12),

-- Hampi Hotels (1-2 rupees)
('Heritage Budget Lodge', 'Hampi, Karnataka', 'Budget stay amidst ancient ruins and historical monuments.', 140, ARRAY['WiFi', 'Restaurant', 'Heritage Tours'], ARRAY['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'], 3.9, 27, 11, 8),
('Ruins View Inn', 'Hampi, Karnataka', 'Simple accommodation with views of Hampi ruins.', 160, ARRAY['WiFi', 'Bicycle Rental', 'Restaurant'], ARRAY['https://images.unsplash.com/photo-1549294413-26f195200c16?w=800'], 4.1, 22, 13, 10),

-- Mcleod Ganj Hotels (1-2 rupees)
('Mountain Budget Stay', 'Mcleod Ganj, Himachal Pradesh', 'Affordable accommodation in the Dalai Lama residence area.', 180, ARRAY['WiFi', 'Restaurant', 'Mountain View'], ARRAY['https://images.unsplash.com/photo-1587985064135-0366536eab42?w=800'], 4.0, 34, 14, 11),
('Tibetan Budget Inn', 'Mcleod Ganj, Himachal Pradesh', 'Simple stay with Tibetan culture and mountain views.', 200, ARRAY['WiFi', 'AC', 'Cultural Tours'], ARRAY['https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800'], 3.8, 26, 12, 9),

-- Alleppey Hotels (2 rupees)
('Backwater Budget Stay', 'Alleppey, Kerala', 'Affordable accommodation near famous Kerala backwaters.', 220, ARRAY['WiFi', 'Backwater Access', 'Restaurant'], ARRAY['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'], 4.2, 41, 16, 13),

-- Manali Hotels (2 rupees)
('Snow View Budget Inn', 'Manali, Himachal Pradesh', 'Budget accommodation with snow-capped mountain views.', 240, ARRAY['WiFi', 'Restaurant', 'Mountain View'], ARRAY['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'], 3.9, 37, 18, 15),

-- Kodaikanal Hotels (2 rupees)
('Hill Station Budget Lodge', 'Kodaikanal, Tamil Nadu', 'Simple stay in the beautiful hill station of Kodaikanal.', 230, ARRAY['WiFi', 'Restaurant', 'Lake View'], ARRAY['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'], 4.0, 30, 14, 11),

-- Darjeeling Hotels (2 rupees)
('Tea Garden Budget Stay', 'Darjeeling, West Bengal', 'Affordable accommodation with tea garden views.', 210, ARRAY['WiFi', 'Restaurant', 'Tea Garden Tours'], ARRAY['https://images.unsplash.com/photo-1549294413-26f195200c16?w=800'], 4.1, 32, 15, 12),

-- Haridwar Hotels (1 rupee)
('Ganga Ghat Budget Inn', 'Haridwar, Uttarakhand', 'Simple accommodation near the holy Ganges ghats.', 110, ARRAY['WiFi', 'Restaurant'], ARRAY['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'], 3.7, 24, 10, 8);
