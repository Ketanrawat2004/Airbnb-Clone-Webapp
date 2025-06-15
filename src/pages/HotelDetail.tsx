
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import BookingModal from '@/components/BookingModal';
import HotelDetailLayout from '@/components/HotelDetailLayout';
import HotelDetailContent from '@/components/HotelDetailContent';
import HotelDetailSkeleton from '@/components/HotelDetailSkeleton';
import HotelDetailError from '@/components/HotelDetailError';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/hooks/useWishlist';

interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  price_per_night: number;
  amenities: string[];
  facilities: string[];
  rules_and_regulations: string[];
  images: string[];
  rating: number;
  reviews_count: number;
  available_rooms: number;
  total_rooms?: number;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  check_in_time?: string;
  check_out_time?: string;
  property_type?: string;
  star_rating?: number;
  year_built?: number;
  year_renovated?: number;
  total_floors?: number;
  parking_available?: boolean;
  pets_allowed?: boolean;
  smoking_allowed?: boolean;
  business_center?: boolean;
  fitness_center?: boolean;
  spa_services?: boolean;
  restaurant_on_site?: boolean;
  room_service?: boolean;
  concierge_service?: boolean;
  laundry_service?: boolean;
}

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist(user?.id);
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    const fetchHotel = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('hotels')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching hotel:', error);
          navigate('/');
        } else {
          setHotel({
            ...data,
            available_rooms: data.available_rooms || 0
          });
        }
      } catch (error) {
        console.error('Error fetching hotel:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id, navigate]);

  const toggleWishlist = async () => {
    if (!hotel) return;
    if (isInWishlist(hotel.id)) {
      await removeFromWishlist(hotel.id);
    } else {
      await addToWishlist(hotel.id);
    }
  };

  const handleReserveClick = () => {
    setBookingModalOpen(true);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (loading) {
    return <HotelDetailSkeleton />;
  }

  if (!hotel) {
    return <HotelDetailError onBackToHome={handleBackToHome} />;
  }

  return (
    <>
      <HotelDetailLayout>
        <HotelDetailContent
          hotel={hotel}
          isInWishlist={isInWishlist(hotel.id)}
          onToggleWishlist={toggleWishlist}
          onReserveClick={handleReserveClick}
        />
      </HotelDetailLayout>

      <BookingModal
        hotel={hotel}
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
      />
    </>
  );
};

export default HotelDetail;
