
-- Insert sample hotels across various locations
INSERT INTO public.hotels (name, location, description, price_per_night, amenities, images, rating, reviews_count, total_rooms, available_rooms) VALUES
-- Mumbai Hotels
('The Grand Palace Mumbai', 'Mumbai, Maharashtra', 'Luxury hotel in the heart of Mumbai with stunning city views and world-class amenities.', 15000, ARRAY['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Room Service'], ARRAY['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800'], 4.8, 342, 150, 12),
('Mumbai Business Suites', 'Mumbai, Maharashtra', 'Modern business hotel perfect for corporate travelers with excellent connectivity.', 8500, ARRAY['WiFi', 'Business Center', 'Gym', 'Restaurant'], ARRAY['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'], 4.2, 156, 80, 8),

-- Delhi Hotels
('Imperial Heritage Delhi', 'New Delhi, Delhi', 'Historic luxury hotel blending colonial charm with modern comfort in central Delhi.', 12000, ARRAY['WiFi', 'Pool', 'Spa', 'Restaurant', 'Concierge', 'Valet Parking'], ARRAY['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800'], 4.6, 289, 120, 15),
('Delhi Metro Inn', 'New Delhi, Delhi', 'Budget-friendly hotel near metro stations with clean rooms and basic amenities.', 3500, ARRAY['WiFi', 'AC', 'Restaurant'], ARRAY['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'], 4.0, 98, 60, 18),

-- Goa Hotels
('Beachside Paradise Resort', 'Goa', 'Tropical beachfront resort with direct beach access and water sports facilities.', 9500, ARRAY['Beach Access', 'Pool', 'Water Sports', 'Restaurant', 'Bar', 'WiFi'], ARRAY['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'], 4.7, 445, 90, 22),
('Goa Heritage Villa', 'Goa', 'Charming Portuguese-style villa hotel with authentic Goan architecture and cuisine.', 6800, ARRAY['WiFi', 'Pool', 'Restaurant', 'Cultural Tours'], ARRAY['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'], 4.4, 167, 45, 6),

-- Nasik Hotels
('Nasik Wine Country Resort', 'Nasik, Maharashtra', 'Elegant resort in the heart of wine country with vineyard tours and wine tasting.', 7200, ARRAY['WiFi', 'Pool', 'Wine Tasting', 'Restaurant', 'Spa'], ARRAY['https://images.unsplash.com/photo-1549294413-26f195200c16?w=800', 'https://images.unsplash.com/photo-1587985064135-0366536eab42?w=800'], 4.5, 234, 75, 14),
('Nasik Business Hotel', 'Nasik, Maharashtra', 'Modern business hotel with conference facilities and comfortable accommodations.', 4500, ARRAY['WiFi', 'Business Center', 'Restaurant', 'Gym'], ARRAY['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'], 4.1, 89, 55, 11),

-- Bangalore Hotels
('Bangalore Tech Park Hotel', 'Bangalore, Karnataka', 'Contemporary hotel in the IT corridor with state-of-the-art facilities for tech professionals.', 8900, ARRAY['WiFi', 'Business Center', 'Gym', 'Pool', 'Restaurant'], ARRAY['https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'], 4.3, 312, 100, 19),
('Garden City Retreat', 'Bangalore, Karnataka', 'Peaceful hotel surrounded by lush gardens offering a serene escape from city life.', 6200, ARRAY['WiFi', 'Garden', 'Restaurant', 'Spa'], ARRAY['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'], 4.6, 203, 70, 9),

-- Jaipur Hotels
('Rajputana Palace Jaipur', 'Jaipur, Rajasthan', 'Magnificent palace hotel showcasing royal Rajasthani heritage and luxury.', 11500, ARRAY['WiFi', 'Pool', 'Spa', 'Cultural Shows', 'Restaurant', 'Heritage Tours'], ARRAY['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800'], 4.9, 567, 85, 7),
('Pink City Budget Inn', 'Jaipur, Rajasthan', 'Affordable accommodation in the heart of the Pink City with easy access to major attractions.', 2800, ARRAY['WiFi', 'AC', 'Restaurant'], ARRAY['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'], 3.8, 145, 40, 13),

-- Kerala Hotels
('Backwater Luxury Resort', 'Kerala', 'Exclusive resort on the backwaters offering houseboat experiences and Ayurvedic treatments.', 13200, ARRAY['Backwater Access', 'Spa', 'Ayurveda', 'Restaurant', 'Boat Rides', 'WiFi'], ARRAY['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'], 4.8, 389, 65, 5),
('Spice Garden Hotel', 'Kerala', 'Boutique hotel in spice plantations offering nature walks and authentic Kerala cuisine.', 5600, ARRAY['WiFi', 'Nature Walks', 'Restaurant', 'Spice Tours'], ARRAY['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'], 4.4, 176, 35, 8),

-- Chennai Hotels
('Marina Bay Grand', 'Chennai, Tamil Nadu', 'Upscale beachfront hotel overlooking Marina Beach with excellent seafood restaurants.', 9800, ARRAY['Beach View', 'Pool', 'Restaurant', 'Gym', 'WiFi'], ARRAY['https://images.unsplash.com/photo-1549294413-26f195200c16?w=800', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800'], 4.5, 298, 110, 16),
('Chennai Express Lodge', 'Chennai, Tamil Nadu', 'Convenient hotel near railway station and airport with comfortable rooms.', 4200, ARRAY['WiFi', 'Restaurant', 'Airport Shuttle'], ARRAY['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'], 4.0, 124, 65, 21),

-- Pune Hotels
('Pune Hills Resort', 'Pune, Maharashtra', 'Hill station resort offering cool climate and panoramic views of the Western Ghats.', 7800, ARRAY['Mountain View', 'Pool', 'Restaurant', 'Trekking', 'WiFi'], ARRAY['https://images.unsplash.com/photo-1587985064135-0366536eab42?w=800', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'], 4.6, 267, 80, 12),
('IT Hub Hotel Pune', 'Pune, Maharashtra', 'Modern hotel in the IT district with corporate amenities and meeting facilities.', 6500, ARRAY['WiFi', 'Business Center', 'Gym', 'Restaurant'], ARRAY['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'], 4.2, 187, 90, 17);
