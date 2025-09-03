
import HotelImageGallery from '@/components/HotelImageGallery';
import HotelBasicInfo from '@/components/HotelBasicInfo';
import HotelContactDetails from '@/components/HotelContactDetails';
import HotelAmenities from '@/components/HotelAmenities';
import HotelServices from '@/components/HotelServices';
import HotelFacilities from '@/components/HotelFacilities';
import HotelRules from '@/components/HotelRules';
import HotelBookingCard from '@/components/HotelBookingCard';

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

interface HotelDetailContentProps {
  hotel: Hotel;
  isInWishlist: boolean;
  onToggleWishlist: () => void;
  onReserveClick: () => void;
}

const HotelDetailContent = ({ 
  hotel, 
  isInWishlist, 
  onToggleWishlist, 
  onReserveClick 
}: HotelDetailContentProps) => {
  const pricePerNight = Math.round(hotel.price_per_night / 100);

  return (
    <>
      <HotelImageGallery
        images={hotel.images}
        hotelName={hotel.name}
        isInWishlist={isInWishlist}
        onToggleWishlist={onToggleWishlist}
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
          onReserveClick={onReserveClick}
        />
      </div>
    </>
  );
};

export default HotelDetailContent;
