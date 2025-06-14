
import { MapPin } from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  location: string;
  price_per_night: number;
  images: string[];
  available_rooms: number;
  facilities: string[];
  rules_and_regulations: string[];
}

interface HotelInfoProps {
  hotel: Hotel;
}

const HotelInfo = ({ hotel }: HotelInfoProps) => {
  return (
    <div className="flex space-x-3">
      <img
        src={hotel.images[0]}
        alt={hotel.name}
        className="w-16 h-16 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{hotel.name}</h3>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-3 w-3 mr-1" />
          {hotel.location}
        </div>
        <p className="text-sm text-gray-600">
          ${(hotel.price_per_night / 100).toFixed(2)} per night
        </p>
      </div>
    </div>
  );
};

export default HotelInfo;
