
import { useState } from 'react';
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  price_per_night: number;
  amenities: string[];
  images: string[];
  rating: number;
  reviews_count: number;
}

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard = ({ hotel }: HotelCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === hotel.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? hotel.images.length - 1 : prev - 1
    );
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const pricePerNight = hotel.price_per_night / 100; // Convert from cents

  return (
    <Card 
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-sm hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        {/* Image Gallery */}
        <div className="relative overflow-hidden rounded-t-lg aspect-square">
          <img
            src={hotel.images[currentImageIndex]}
            alt={hotel.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Navigation Arrows */}
          {hotel.images.length > 1 && isHovered && (
            <>
              <Button
                variant="secondary"
                size="sm"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full w-8 h-8 p-0 bg-white/80 hover:bg-white shadow-md"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full w-8 h-8 p-0 bg-white/80 hover:bg-white shadow-md"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Image Indicators */}
          {hotel.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {hotel.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Like Button */}
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-2 right-2 rounded-full w-8 h-8 p-0 bg-white/80 hover:bg-white shadow-md"
            onClick={toggleLike}
          >
            <Heart
              className={`h-4 w-4 ${
                isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </Button>
        </div>

        {/* Hotel Details */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-900 truncate flex-1 mr-2">
              {hotel.name}
            </h3>
            <div className="flex items-center space-x-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{hotel.rating}</span>
              <span className="text-gray-500">({hotel.reviews_count})</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-2">{hotel.location}</p>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{hotel.description}</p>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1 mb-3">
            {hotel.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-semibold">${pricePerNight}</span>
              <span className="text-gray-600 text-sm ml-1">/ night</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
