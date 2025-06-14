
-- Add facilities and rules columns to the hotels table
ALTER TABLE public.hotels 
ADD COLUMN facilities TEXT[],
ADD COLUMN rules_and_regulations TEXT[];

-- Update existing hotels with sample facilities and rules
UPDATE public.hotels SET 
  facilities = ARRAY['WiFi', 'Air Conditioning', 'Parking', 'Room Service', 'Concierge', 'Laundry Service'],
  rules_and_regulations = ARRAY['Check-in: 3:00 PM', 'Check-out: 11:00 AM', 'No smoking', 'No pets allowed', 'Quiet hours: 10:00 PM - 7:00 AM', 'Valid ID required at check-in']
WHERE name = 'Luxury Beachfront Villa';

UPDATE public.hotels SET 
  facilities = ARRAY['WiFi', 'Ski Equipment Rental', 'Fireplace', 'Hot Tub', 'Heated Floors', 'Mountain Gear Storage'],
  rules_and_regulations = ARRAY['Check-in: 4:00 PM', 'Check-out: 10:00 AM', 'No smoking', 'Pets allowed with fee', 'Ski boots must be stored in designated area', 'Quiet hours: 9:00 PM - 7:00 AM']
WHERE name = 'Cozy Mountain Cabin';

UPDATE public.hotels SET 
  facilities = ARRAY['WiFi', 'Fitness Center', 'Rooftop Terrace', 'Business Center', 'Valet Parking', '24/7 Front Desk'],
  rules_and_regulations = ARRAY['Check-in: 3:00 PM', 'Check-out: 12:00 PM', 'No smoking', 'No pets allowed', 'Quiet hours: 11:00 PM - 6:00 AM', 'Maximum 4 guests per room']
WHERE name = 'Modern City Loft';

UPDATE public.hotels SET 
  facilities = ARRAY['WiFi', 'Infinity Pool', 'Spa Services', 'Yoga Studio', 'Tropical Garden', 'Beachfront Access'],
  rules_and_regulations = ARRAY['Check-in: 2:00 PM', 'Check-out: 11:00 AM', 'No smoking in rooms', 'Children welcome', 'Respect local customs', 'Beach hours: 6:00 AM - 10:00 PM']
WHERE name = 'Tropical Paradise Bungalow';

UPDATE public.hotels SET 
  facilities = ARRAY['WiFi', 'Wine Cellar Tours', 'Gourmet Restaurant', 'Library', 'Gardens', 'Helicopter Pad'],
  rules_and_regulations = ARRAY['Check-in: 3:00 PM', 'Check-out: 11:00 AM', 'Dress code for dinner', 'No smoking indoors', 'Pets allowed in gardens only', 'Wine tasting by appointment']
WHERE name = 'Historic Countryside Manor';
