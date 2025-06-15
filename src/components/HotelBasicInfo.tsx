
import { Star, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Hotel {
  name: string;
  location: string;
  description: string;
  rating: number;
  reviews_count: number;
  star_rating?: number;
  property_type?: string;
  available_rooms: number;
}

interface HotelBasicInfoProps {
  hotel: Hotel;
}

const HotelBasicInfo = ({ hotel }: HotelBasicInfoProps) => {
  return (
    <div>
      <div className="flex items-start justify-between mb-4 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{hotel.name}</h1>
            {hotel.star_rating && (
              <div className="flex items-center">
                {Array.from({ length: hotel.star_rating }, (_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-gray-600 space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm sm:text-base">{hotel.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-sm sm:text-base">{hotel.rating}</span>
              <span className="text-gray-500 text-sm">({hotel.reviews_count} reviews)</span>
            </div>
          </div>
          {hotel.property_type && (
            <Badge className="mt-2 bg-blue-500">{hotel.property_type}</Badge>
          )}
        </div>
        {hotel.available_rooms > 0 && (
          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs sm:text-sm">
            {hotel.available_rooms} rooms available
          </Badge>
        )}
      </div>
      
      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{hotel.description}</p>
    </div>
  );
};

export default HotelBasicInfo;
