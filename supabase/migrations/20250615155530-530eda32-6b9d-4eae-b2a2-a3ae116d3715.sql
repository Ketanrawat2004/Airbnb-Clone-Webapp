
-- Insert a 2 rupees test hotel in Jamshedpur, Jharkhand
INSERT INTO public.hotels 
(name, location, description, price_per_night, amenities, images, rating, reviews_count, total_rooms, available_rooms)
VALUES
('Test Budget Jamshedpur', 'Jamshedpur, Jharkhand', 'Super affordable accommodation for testing in Jamshedpur.', 200, ARRAY['WiFi', 'Breakfast'], ARRAY['https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800'], 3.7, 15, 10, 9);

-- Add more low-priced test hotels in other cities

-- Test 1 rupee hotel in Lucknow
INSERT INTO public.hotels 
(name, location, description, price_per_night, amenities, images, rating, reviews_count, total_rooms, available_rooms)
VALUES
('Test Stay Lucknow', 'Lucknow, Uttar Pradesh', 'Ultra-budget hotel in Lucknow for testing purposes.', 100, ARRAY['WiFi', 'Free Parking'], ARRAY['https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800'], 4.0, 20, 8, 7);

-- Test 1 rupee hotel in Chennai
INSERT INTO public.hotels 
(name, location, description, price_per_night, amenities, images, rating, reviews_count, total_rooms, available_rooms)
VALUES
('Test Inn Chennai', 'Chennai, Tamil Nadu', 'Test only: Ultra affordable stay.', 100, ARRAY['AC', 'WiFi'], ARRAY['https://images.unsplash.com/photo-1556909205-36add2637c74?w=800'], 3.9, 12, 12, 10);

-- Test 2 rupees hotel in Surat
INSERT INTO public.hotels 
(name, location, description, price_per_night, amenities, images, rating, reviews_count, total_rooms, available_rooms)
VALUES
('Test Hostel Surat', 'Surat, Gujarat', 'Testing hotel at a super low rate.', 200, ARRAY['WiFi', 'AC', 'Shared Kitchen'], ARRAY['https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800'], 3.8, 9, 6, 5);

-- Test 2 rupees hotel in Indore
INSERT INTO public.hotels 
(name, location, description, price_per_night, amenities, images, rating, reviews_count, total_rooms, available_rooms)
VALUES
('Test Guesthouse Indore', 'Indore, Madhya Pradesh', 'Test-priced guesthouse in Indore.', 200, ARRAY['WiFi', 'Breakfast'], ARRAY['https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800'], 4.1, 8, 7, 6);

-- Test 1 rupee hotel in Kolkata
INSERT INTO public.hotels 
(name, location, description, price_per_night, amenities, images, rating, reviews_count, total_rooms, available_rooms)
VALUES
('Test Hotel Kolkata', 'Kolkata, West Bengal', 'Extremely budget friendly for testing.', 100, ARRAY['WiFi', 'Laundry'], ARRAY['https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800'], 4.2, 11, 5, 5);
