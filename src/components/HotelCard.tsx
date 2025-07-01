import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import BookingModal from './BookingModal';
import HotelCardImage from './HotelCardImage';
import HotelCardDetails from './HotelCardDetails';
import HotelCardPricing from './HotelCardPricing';
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
  parking_available?: boolean;
  pets_allowed?: boolean;
}

interface HotelCardProps {
  hotel: Hotel;
  searchParams?: {
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  };
}

const HotelCard = ({ hotel, searchParams }: HotelCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist(user?.id);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Convert price from paise to rupees and keep it consistent
  const pricePerNight = Math.round(hotel.price_per_night / 100);

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist(hotel.id)) {
      await removeFromWishlist(hotel.id);
    } else {
      await addToWishlist(hotel.id);
    }
  };

  const handleCardClick = () => {
    navigate(`/hotel/${hotel.id}`);
  };

  const handleBookClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBookingModalOpen(true);
  };

  return (
    <>
      <Card 
        className="group cursor-pointer transition-all duration-500 border-0 shadow-lg hover:shadow-2xl bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden hover:scale-[1.02] w-full relative"
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hover Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-teal-400/20 via-cyan-400/20 to-blue-400/20 rounded-3xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
        
        <CardContent className="p-0 relative">
          <HotelCardImage
            images={hotel.images}
            hotelName={hotel.name}
            propertyType={hotel.property_type}
            availableRooms={hotel.available_rooms}
            isInWishlist={isInWishlist(hotel.id)}
            onToggleWishlist={toggleWishlist}
            onCardClick={handleCardClick}
          />
          
          <div className="p-4 sm:p-5">
            <HotelCardDetails
              name={hotel.name}
              location={hotel.location}
              description={hotel.description}
              rating={hotel.rating}
              reviewsCount={hotel.reviews_count}
              starRating={hotel.star_rating}
              checkInTime={hotel.check_in_time}
              phone={hotel.phone}
              amenities={hotel.amenities}
            />

            <HotelCardPricing
              pricePerNight={pricePerNight}
              onBookClick={handleBookClick}
            />
          </div>
        </CardContent>
      </Card>

      <BookingModal
        hotel={hotel}
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
        initialCheckIn={searchParams?.checkIn}
        initialCheckOut={searchParams?.checkOut}
        initialGuests={searchParams?.guests}
      />
    </>
  );
};

export default HotelCard;
