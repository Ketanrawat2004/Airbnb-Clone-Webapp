
-- Insert a 1 rupee hotel in Bhopal, Madhya Pradesh
INSERT INTO public.hotels (name, location, description, price_per_night, amenities, images, rating, reviews_count, total_rooms, available_rooms) VALUES
('Budget Stay Bhopal', 'Bhopal, Madhya Pradesh', 'Ultra-affordable accommodation in the heart of Bhopal with basic amenities and friendly service.', 100, ARRAY['WiFi', 'AC', 'Restaurant'], ARRAY['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'], 3.5, 47, 25, 20);
