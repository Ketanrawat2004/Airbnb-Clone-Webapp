
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

import hotel1 from '@/assets/hotel-1.jpg';
import hotel2 from '@/assets/hotel-2.jpg';
import hotel3 from '@/assets/hotel-3.jpg';
import hotel4 from '@/assets/hotel-4.jpg';
import hotel5 from '@/assets/hotel-5.jpg';

// Default hotel images using generated images
const DEFAULT_HOTEL_IMAGES = [hotel1, hotel2, hotel3, hotel4, hotel5];

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
      className="relative overflow-hidden rounded-t-2xl aspect-[4/3]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onCardClick}
    >
      <img
        src={displayImages[currentImageIndex]}
        alt={hotelName}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={() => handleImageError(currentImageIndex)}
        loading="lazy"
      />
      
      {/* Navigation Arrows */}
      {displayImages.length > 1 && isHovered && (
        <>
          <Button
            variant="secondary"
            size="sm"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 rounded-full w-8 h-8 p-0 bg-white/90 hover:bg-white shadow-lg transition-all duration-200"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full w-8 h-8 p-0 bg-white/90 hover:bg-white shadow-lg transition-all duration-200"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Image Indicators */}
      {displayImages.length > 1 && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
          {displayImages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-white w-6' : 'bg-white/60'
              }`}
            />
          ))}
        </div>
      )}

      {/* Wishlist Button */}
      <Button
        variant="secondary"
        size="sm"
        className="absolute top-3 right-3 rounded-full w-10 h-10 p-0 bg-white/90 hover:bg-white shadow-lg transition-all duration-200"
        onClick={onToggleWishlist}
      >
        <Heart
          className={`h-5 w-5 transition-all duration-200 ${
            isInWishlist ? 'fill-pink-500 text-pink-500' : 'text-gray-600'
          }`}
        />
      </Button>

      {/* Hotel Badge */}
      <Badge className="absolute top-3 left-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-3 py-1.5 rounded-lg shadow-lg">
        Hotel
      </Badge>

      {/* Verification Badge */}
      {isVerified && (
        <Badge className="absolute top-14 left-3 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1">
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Verified
        </Badge>
      )}

      {/* Availability Badge */}
      {availableRooms > 0 && (
        <div className="absolute bottom-3 left-3 bg-green-500 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg">
          {availableRooms} rooms available
        </div>
      )}
    </div>
  );
};

export default HotelCardImage;
