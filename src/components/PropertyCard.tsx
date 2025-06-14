
import { useState } from 'react';
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  amenities: string[];
  guests: number;
  bedrooms: number;
  bathrooms: number;
  superhost: boolean;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

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
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Navigation Arrows */}
          {property.images.length > 1 && isHovered && (
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
          {property.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {property.images.map((_, index) => (
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

          {/* Superhost Badge */}
          {property.superhost && (
            <Badge className="absolute top-2 left-2 bg-white text-black hover:bg-white">
              Superhost
            </Badge>
          )}
        </div>

        {/* Property Details */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-900 truncate flex-1 mr-2">
              {property.title}
            </h3>
            <div className="flex items-center space-x-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{property.rating}</span>
              <span className="text-gray-500">({property.reviews})</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-2">{property.location}</p>
          
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <span>{property.guests} guests</span>
            <span className="mx-1">·</span>
            <span>{property.bedrooms} bedrooms</span>
            <span className="mx-1">·</span>
            <span>{property.bathrooms} bathrooms</span>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1 mb-3">
            {property.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {property.amenities.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{property.amenities.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-semibold">${property.price}</span>
              <span className="text-gray-600 text-sm ml-1">/ night</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
