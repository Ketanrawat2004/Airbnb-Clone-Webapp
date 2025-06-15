
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useWishlist = (userId?: string) => {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchWishlist = async () => {
    try {
      const { data, error } = await supabase
        .from('wishlists')
        .select('hotel_id')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching wishlist:', error);
      } else {
        setWishlistItems(data?.map(item => item.hotel_id) || []);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (hotelId: string) => {
    if (!userId) {
      toast.error('Please sign in to add to wishlist');
      return false;
    }

    try {
      const { error } = await supabase
        .from('wishlists')
        .insert({
          user_id: userId,
          hotel_id: hotelId
        });

      if (error) {
        console.error('Error adding to wishlist:', error);
        toast.error('Failed to add to wishlist');
        return false;
      } else {
        setWishlistItems(prev => [...prev, hotelId]);
        toast.success('Added to wishlist');
        return true;
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Failed to add to wishlist');
      return false;
    }
  };

  const removeFromWishlist = async (hotelId: string) => {
    if (!userId) {
      return false;
    }

    try {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', userId)
        .eq('hotel_id', hotelId);

      if (error) {
        console.error('Error removing from wishlist:', error);
        toast.error('Failed to remove from wishlist');
        return false;
      } else {
        setWishlistItems(prev => prev.filter(id => id !== hotelId));
        toast.success('Removed from wishlist');
        return true;
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove from wishlist');
      return false;
    }
  };

  const isInWishlist = (hotelId: string) => {
    return wishlistItems.includes(hotelId);
  };

  return {
    wishlistItems,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    fetchWishlist
  };
};
