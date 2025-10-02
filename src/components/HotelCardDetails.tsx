
import { Star, MapPin, Clock, Phone, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className="p-5 min-h-[200px] flex flex-col">
      {/* Name and Rating */}
      <div className="flex items-start justify-between mb-3 gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-lg line-clamp-1 mb-2">
            {name}
          </h3>
          {starRating && (
            <div className="flex items-center gap-0.5 mb-2">
              {Array.from({ length: starRating }, (_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 text-sm flex-shrink-0 bg-yellow-50 px-2 py-1 rounded-lg">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-bold text-gray-900">{rating}</span>
          <span className="text-gray-600">({reviewsCount})</span>
        </div>
      </div>
      
      {/* Location */}
      <div className="flex items-center justify-between text-gray-600 text-sm mb-3">
        <div className="flex items-center flex-1 min-w-0 gap-1">
          <MapPin className="h-4 w-4 flex-shrink-0 text-gray-500" />
          <span className="truncate font-medium">{location}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            const encodedLocation = encodeURIComponent(location);
            window.open(`https://maps.google.com/maps?q=${encodedLocation}`, '_blank');
          }}
          className="p-2 h-8 w-8 hover:bg-blue-50 text-blue-600 flex-shrink-0 rounded-lg"
        >
          <Map className="h-4 w-4" />
        </Button>
      </div>

      {/* Check-in Time */}
      {checkInTime && (
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
          <Clock className="h-4 w-4 flex-shrink-0 text-gray-500" />
          <span>Check-in: {checkInTime}</span>
        </div>
      )}

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1 leading-relaxed">{description}</p>

      {/* Amenities */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {amenities.slice(0, 2).map((amenity, index) => (
          <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg font-medium">
            {amenity}
          </span>
        ))}
        {amenities.length > 2 && (
          <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg font-medium">
            +{amenities.length - 2} more
          </span>
        )}
      </div>
    </div>
  );
};

export default HotelCardDetails;
