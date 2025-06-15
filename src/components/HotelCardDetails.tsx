
import { Star, MapPin, Clock, Phone } from 'lucide-react';

interface HotelCardDetailsProps {
  name: string;
  location: string;
  description: string;
  rating: number;
  reviewsCount: number;
  starRating?: number;
  checkInTime?: string;
  phone?: string;
  amenities: string[];
}

const HotelCardDetails = ({
  name,
  location,
  description,
  rating,
  reviewsCount,
  starRating,
  checkInTime,
  phone,
  amenities
}: HotelCardDetailsProps) => {
  return (
    <div className="p-3 sm:p-4">
      <div className="flex items-start justify-between mb-1 gap-2">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">
            {name}
          </h3>
          {starRating && (
            <div className="flex items-center mt-1">
              {Array.from({ length: starRating }, (_, i) => (
                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-1 text-xs sm:text-sm flex-shrink-0">
          <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{rating}</span>
          <span className="text-gray-500 hidden sm:inline">({reviewsCount})</span>
        </div>
      </div>
      
      <div className="flex items-center text-gray-600 text-xs sm:text-sm mb-2">
        <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
        <span className="truncate">{location}</span>
      </div>

      {/* Additional Info */}
      <div className="space-y-1 mb-3 text-xs text-gray-600">
        {checkInTime && (
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>Check-in: {checkInTime}</span>
          </div>
        )}
        {phone && (
          <div className="flex items-center">
            <Phone className="h-3 w-3 mr-1" />
            <span className="truncate">{phone}</span>
          </div>
        )}
      </div>

      <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2 hidden sm:block">{description}</p>

      {/* Amenities - Show fewer on mobile */}
      <div className="flex flex-wrap gap-1 mb-3">
        {amenities.slice(0, 2).map((amenity, index) => (
          <span key={index} className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            {amenity}
          </span>
        ))}
        {amenities.length > 2 && (
          <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            +{amenities.length - 2} more
          </span>
        )}
      </div>
    </div>
  );
};

export default HotelCardDetails;
