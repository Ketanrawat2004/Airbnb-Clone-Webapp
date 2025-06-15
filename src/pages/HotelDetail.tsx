
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import BookingModal from '@/components/BookingModal';
import BackButton from '@/components/BackButton';
import HotelImageGallery from '@/components/HotelImageGallery';
import HotelBasicInfo from '@/components/HotelBasicInfo';
import HotelContactDetails from '@/components/HotelContactDetails';
import HotelAmenities from '@/components/HotelAmenities';
import HotelServices from '@/components/HotelServices';
import HotelFacilities from '@/components/HotelFacilities';
import HotelRules from '@/components/HotelRules';
import HotelBookingCard from '@/components/HotelBookingCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Skeleton className="h-64 sm:h-96 w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Hotel not found</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const pricePerNight = hotel.price_per_night / 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="mb-4 sm:mb-6">
          <BackButton />
        </div>

        <HotelImageGallery
          images={hotel.images}
          hotelName={hotel.name}
          isInWishlist={isInWishlist(hotel.id)}
          onToggleWishlist={toggleWishlist}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <HotelBasicInfo hotel={hotel} />
            <HotelContactDetails hotel={hotel} />
            <HotelAmenities amenities={hotel.amenities} />
            <HotelServices hotel={hotel} />
            <HotelFacilities facilities={hotel.facilities} />
            <HotelRules rules={hotel.rules_and_regulations} />
          </div>

          <HotelBookingCard
            pricePerNight={pricePerNight}
            onReserveClick={() => setBookingModalOpen(true)}
          />
        </div>
      </div>

      <BookingModal
        hotel={hotel}
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
      />
      
      <ChatBot />
      <Footer />
    </div>
  );
};

export default HotelDetail;
