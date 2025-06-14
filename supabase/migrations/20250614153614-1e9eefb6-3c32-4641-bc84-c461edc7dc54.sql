
-- Insert hotels for major global destinations
INSERT INTO public.hotels (name, location, description, price_per_night, amenities, images, rating, reviews_count, total_rooms, available_rooms) VALUES

-- London, UK
('The London Royal', 'London, United Kingdom', 'Luxury hotel in central London with views of the Thames and Big Ben.', 25000, ARRAY['WiFi', 'Concierge', 'Room Service', 'Spa', 'Restaurant', 'Business Center'], ARRAY['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800'], 4.7, 456, 120, 8),
('London Budget Inn', 'London, United Kingdom', 'Affordable accommodation near major attractions and transport links.', 8500, ARRAY['WiFi', 'Breakfast'], ARRAY['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'], 4.0, 234, 60, 15),

-- Paris, France
('Parisian Palace Hotel', 'Paris, France', 'Elegant hotel near the Eiffel Tower with classic French sophistication.', 22000, ARRAY['WiFi', 'Restaurant', 'Spa', 'Concierge', 'Room Service'], ARRAY['https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800'], 4.8, 389, 95, 6),
('Montmartre Boutique', 'Paris, France', 'Charming boutique hotel in the artistic Montmartre district.', 12000, ARRAY['WiFi', 'Restaurant', 'Art Gallery'], ARRAY['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'], 4.5, 167, 45, 12),

-- New York, USA
('Manhattan Grand Hotel', 'New York, USA', 'Iconic skyscraper hotel in the heart of Manhattan with city views.', 28000, ARRAY['WiFi', 'Gym', 'Restaurant', 'Business Center', 'Concierge'], ARRAY['https://images.unsplash.com/photo-1549294413-26f195200c16?w=800', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'], 4.6, 567, 200, 18),
('Brooklyn Bridge Inn', 'New York, USA', 'Modern hotel with stunning views of Brooklyn Bridge and Manhattan skyline.', 18000, ARRAY['WiFi', 'Restaurant', 'Gym', 'Rooftop Bar'], ARRAY['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'], 4.4, 298, 85, 11),

-- Tokyo, Japan
('Tokyo Imperial Hotel', 'Tokyo, Japan', 'Traditional Japanese luxury hotel blending modern comfort with cultural heritage.', 24000, ARRAY['WiFi', 'Spa', 'Restaurant', 'Tea Ceremony', 'Concierge'], ARRAY['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800'], 4.9, 423, 150, 9),
('Shibuya Modern Suites', 'Tokyo, Japan', 'Contemporary hotel in bustling Shibuya district with high-tech amenities.', 16000, ARRAY['WiFi', 'Restaurant', 'High-Tech Rooms', 'Convenience Store'], ARRAY['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'], 4.3, 312, 100, 14),

-- Sydney, Australia
('Sydney Harbour Grand', 'Sydney, Australia', 'Waterfront hotel with spectacular views of Sydney Opera House and Harbour Bridge.', 21000, ARRAY['WiFi', 'Pool', 'Restaurant', 'Spa', 'Harbor Views'], ARRAY['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'], 4.7, 445, 180, 16),
('Bondi Beach Resort', 'Sydney, Australia', 'Beachside resort just steps away from the famous Bondi Beach.', 15000, ARRAY['Beach Access', 'Pool', 'Surf Lessons', 'Restaurant', 'WiFi'], ARRAY['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'], 4.5, 234, 75, 13),

-- Dubai, UAE
('Dubai Luxury Towers', 'Dubai, UAE', 'Ultra-modern luxury hotel in downtown Dubai with world-class amenities.', 32000, ARRAY['WiFi', 'Pool', 'Spa', 'Shopping Mall Access', 'Fine Dining'], ARRAY['https://images.unsplash.com/photo-1549294413-26f195200c16?w=800', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'], 4.8, 389, 250, 22),
('Desert Oasis Resort', 'Dubai, UAE', 'Desert resort offering traditional Arabian hospitality with modern luxury.', 19000, ARRAY['Desert Safari', 'Spa', 'Pool', 'Restaurant', 'WiFi'], ARRAY['https://images.unsplash.com/photo-1587985064135-0366536eab42?w=800'], 4.6, 156, 90, 8),

-- Cape Town, South Africa
('Table Mountain Lodge', 'Cape Town, South Africa', 'Boutique hotel with breathtaking views of Table Mountain and the Atlantic Ocean.', 14000, ARRAY['Mountain Views', 'Pool', 'Restaurant', 'Wine Tasting', 'WiFi'], ARRAY['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'], 4.7, 267, 65, 10),
('Waterfront Marina Hotel', 'Cape Town, South Africa', 'Modern hotel at the V&A Waterfront with easy access to attractions and dining.', 11000, ARRAY['Marina Views', 'Restaurant', 'Shopping Access', 'WiFi'], ARRAY['https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800'], 4.4, 198, 80, 17),

-- Singapore
('Marina Bay Luxury', 'Singapore', 'Iconic hotel overlooking Marina Bay with infinity pool and world-class dining.', 26000, ARRAY['Infinity Pool', 'Fine Dining', 'Spa', 'Shopping Access', 'WiFi'], ARRAY['https://images.unsplash.com/photo-1549294413-26f195200c16?w=800', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'], 4.9, 512, 200, 12),
('Chinatown Heritage Hotel', 'Singapore', 'Boutique hotel in historic Chinatown blending heritage charm with modern comfort.', 13000, ARRAY['Heritage Tours', 'Restaurant', 'Cultural Experience', 'WiFi'], ARRAY['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'], 4.3, 145, 55, 9),

-- Bangkok, Thailand
('Bangkok Royal Palace Hotel', 'Bangkok, Thailand', 'Luxurious hotel near the Grand Palace with traditional Thai hospitality.', 12000, ARRAY['Thai Spa', 'Restaurant', 'Cultural Tours', 'Pool', 'WiFi'], ARRAY['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800'], 4.6, 334, 120, 15),
('Khao San Backpacker Inn', 'Bangkok, Thailand', 'Budget-friendly accommodation in the heart of the backpacker district.', 2500, ARRAY['WiFi', 'Common Area', 'Tours'], ARRAY['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'], 4.1, 189, 40, 18),

-- Rome, Italy
('Roman Empire Hotel', 'Rome, Italy', 'Historic hotel near the Colosseum with classical Italian elegance.', 18000, ARRAY['Historic Location', 'Restaurant', 'Spa', 'Cultural Tours', 'WiFi'], ARRAY['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800'], 4.7, 423, 90, 7),
('Trastevere Boutique', 'Rome, Italy', 'Charming hotel in the vibrant Trastevere neighborhood with authentic Roman atmosphere.', 13500, ARRAY['Local Experience', 'Restaurant', 'WiFi'], ARRAY['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'], 4.4, 167, 35, 11);
