
import { MapPin, Phone, Clock, Building, Globe } from 'lucide-react';

interface Hotel {
  address?: string;
  phone?: string;
  check_in_time?: string;
  check_out_time?: string;
  total_rooms?: number;
  website?: string;
}

interface HotelContactDetailsProps {
  hotel: Hotel;
}

const HotelContactDetails = ({ hotel }: HotelContactDetailsProps) => {
  const hasDetails = hotel.address || hotel.phone || hotel.check_in_time || hotel.check_out_time || hotel.total_rooms || hotel.website;

  if (!hasDetails) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-white rounded-lg border">
      {hotel.address && (
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-sm">{hotel.address}</span>
        </div>
      )}
      {hotel.phone && (
        <div className="flex items-center space-x-2">
          <Phone className="h-4 w-4 text-gray-500" />
          <span className="text-sm">{hotel.phone}</span>
        </div>
      )}
      {hotel.check_in_time && (
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-sm">Check-in: {hotel.check_in_time}</span>
        </div>
      )}
      {hotel.check_out_time && (
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-sm">Check-out: {hotel.check_out_time}</span>
        </div>
      )}
      {hotel.total_rooms && (
        <div className="flex items-center space-x-2">
          <Building className="h-4 w-4 text-gray-500" />
          <span className="text-sm">{hotel.total_rooms} total rooms</span>
        </div>
      )}
      {hotel.website && (
        <div className="flex items-center space-x-2">
          <Globe className="h-4 w-4 text-gray-500" />
          <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
            Visit Website
          </a>
        </div>
      )}
    </div>
  );
};

export default HotelContactDetails;
