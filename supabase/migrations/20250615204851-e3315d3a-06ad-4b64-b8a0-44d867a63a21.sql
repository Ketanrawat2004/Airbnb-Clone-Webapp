
-- Add cascading delete to user_reviews table to allow user deletion
ALTER TABLE public.user_reviews 
DROP CONSTRAINT IF EXISTS user_reviews_user_id_fkey;

ALTER TABLE public.user_reviews 
ADD CONSTRAINT user_reviews_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Also add cascading delete to bookings table if not already present
ALTER TABLE public.bookings 
DROP CONSTRAINT IF EXISTS bookings_user_id_fkey;

ALTER TABLE public.bookings 
ADD CONSTRAINT bookings_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add cascading delete to profiles table if not already present
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_id_fkey;

ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_id_fkey 
FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add cascading delete to wishlists table if not already present
ALTER TABLE public.wishlists 
DROP CONSTRAINT IF EXISTS wishlists_user_id_fkey;

ALTER TABLE public.wishlists 
ADD CONSTRAINT wishlists_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
