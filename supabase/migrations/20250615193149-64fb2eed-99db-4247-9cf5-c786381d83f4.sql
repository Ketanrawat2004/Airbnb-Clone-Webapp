
-- Add test hotels with specific prices (5, 10, and 15 rupees)
-- Converting rupees to paise: 5 rupees = 500 paise, 10 rupees = 1000 paise, 15 rupees = 1500 paise

-- 5 Rupee Hotels
INSERT INTO public.hotels (name, location, description, price_per_night, amenities, images, rating, reviews_count, total_rooms, available_rooms) VALUES
('Ultra Budget Delhi', 'Delhi, NCR', 'Extremely affordable accommodation in the heart of Delhi. Perfect for budget travelers.', 500, ARRAY['WiFi', 'Basic Amenities'], ARRAY['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'], 3.5, 15, 8, 6),
('Budget Stay Mumbai', 'Mumbai, Maharashtra', 'Super cheap stay near Mumbai Central with basic facilities.', 500, ARRAY['WiFi', 'Fan'], ARRAY['https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800'], 3.7, 22, 10, 8),
('Cheap Lodge Bangalore', 'Bangalore, Karnataka', 'Ultra-affordable lodge in IT city with essential amenities.', 500, ARRAY['WiFi', 'AC'], ARRAY['https://images.unsplash.com/photo-1549294413-26f195200c16?w=800'], 3.6, 18, 12, 9),

-- 10 Rupee Hotels
('Budget Inn Pune', 'Pune, Maharashtra', 'Affordable accommodation in Pune with good connectivity.', 1000, ARRAY['WiFi', 'AC', 'Restaurant'], ARRAY['https://images.unsplash.com/photo-1556909205-36add2637c74?w=800'], 4.0, 35, 15, 12),
('Economy Stay Hyderabad', 'Hyderabad, Telangana', 'Budget-friendly hotel in the City of Pearls.', 1000, ARRAY['WiFi', 'AC', 'Breakfast'], ARRAY['https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800'], 3.9, 28, 14, 11),
('Value Hotel Kolkata', 'Kolkata, West Bengal', 'Great value accommodation in the cultural capital.', 1000, ARRAY['WiFi', 'Restaurant', 'Cultural Tours'], ARRAY['https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800'], 4.1, 31, 16, 13),

-- 15 Rupee Hotels
('Premium Budget Goa', 'Goa', 'Best value hotel near Goa beaches with modern amenities.', 1500, ARRAY['WiFi', 'AC', 'Beach Access', 'Restaurant'], ARRAY['https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800'], 4.2, 42, 20, 16),
('Comfort Stay Jaipur', 'Jaipur, Rajasthan', 'Comfortable accommodation in the Pink City with heritage views.', 1500, ARRAY['WiFi', 'AC', 'Heritage Tours', 'Restaurant'], ARRAY['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'], 4.0, 38, 18, 15),
('Quality Lodge Kerala', 'Kochi, Kerala', 'Quality accommodation in Gods Own Country with backwater access.', 1500, ARRAY['WiFi', 'AC', 'Backwater Tours', 'Ayurveda Spa'], ARRAY['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'], 4.3, 45, 22, 18),
('Elite Budget Udaipur', 'Udaipur, Rajasthan', 'Premium budget stay in the City of Lakes with palace views.', 1500, ARRAY['WiFi', 'AC', 'Lake View', 'Restaurant', 'Palace Tours'], ARRAY['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'], 4.1, 40, 16, 14);
