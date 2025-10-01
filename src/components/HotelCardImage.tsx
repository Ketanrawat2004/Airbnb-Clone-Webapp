
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import HotelVerificationBadge from './HotelVerificationBadge';

interface HotelCardImageProps {
  images: string[];
  hotelName: string;
  propertyType?: string;
  availableRooms: number;
  isInWishlist: boolean;
  onToggleWishlist: (e: React.MouseEvent) => void;
  onCardClick: () => void;
  isVerified?: boolean;
  hotelId?: string;
}

// Default hotel images using reliable Unsplash photos
const DEFAULT_HOTEL_IMAGES = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1520637836862-4d197d17c50a?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop"
];

const HotelCardImage = ({ 
  images, 
  hotelName, 
  propertyType,
  availableRooms,
  isInWishlist,
  onToggleWishlist,
  onCardClick,
  isVerified = true, // Default to verified for existing hotels
  hotelId
}: HotelCardImageProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  // Use default images if no images provided or if images fail to load
  const validImages = images && images.length > 0 ? images : DEFAULT_HOTEL_IMAGES;
  const workingImages = validImages.filter((_, index) => !imageErrors.has(index));
  const displayImages = workingImages.length > 0 ? workingImages : DEFAULT_HOTEL_IMAGES;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set([...prev, index]));
  };

  return (
    <div 
      className="relative overflow-hidden rounded-t-lg aspect-square sm:aspect-[4/3]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onCardClick}
    >
      <img
        src={displayImages[currentImageIndex]}
        alt={hotelName}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        onError={() => handleImageError(currentImageIndex)}
        loading="lazy"
      />
      
      {/* Navigation Arrows - Hidden on mobile */}
      {displayImages.length > 1 && isHovered && (
        <>
          <Button
            variant="secondary"
            size="sm"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full w-6 h-6 sm:w-8 sm:h-8 p-0 bg-white/80 hover:bg-white shadow-md hidden sm:flex items-center justify-center"
            onClick={prevImage}
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full w-6 h-6 sm:w-8 sm:h-8 p-0 bg-white/80 hover:bg-white shadow-md hidden sm:flex items-center justify-center"
            onClick={nextImage}
          >
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </>
      )}

      {/* Image Indicators */}
      {displayImages.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {displayImages.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}

      {/* Wishlist Button */}
      <Button
        variant="secondary"
        size="sm"
        className="absolute top-2 right-2 rounded-full w-6 h-6 sm:w-8 sm:h-8 p-0 bg-white/80 hover:bg-white shadow-md"
        onClick={onToggleWishlist}
      >
        <Heart
          className={`h-3 w-3 sm:h-4 sm:w-4 ${
            isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'
          }`}
        />
      </Button>

      {/* Property Type Badge */}
      {propertyType && (
        <Badge className="absolute top-2 left-2 bg-blue-500 text-white text-xs">
          {propertyType}
        </Badge>
      )}

      {/* Verification Badge */}
      {isVerified && hotelId && (
        <div className="absolute top-10 left-2">
          <HotelVerificationBadge
            isVerified={isVerified}
            hotelName={hotelName}
            hotelId={hotelId}
          />
        </div>
      )}

      {/* Availability Badge */}
      {availableRooms > 0 && (
        <div className="absolute bottom-8 left-2 bg-green-500 text-white text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
          <span className="hidden sm:inline">{availableRooms} rooms available</span>
          <span className="sm:hidden">{availableRooms} rooms</span>
        </div>
      )}
    </div>
  );
};

export default HotelCardImage;
