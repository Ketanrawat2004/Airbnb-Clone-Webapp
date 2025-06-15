
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';

interface HotelImageGalleryProps {
  images: string[];
  hotelName: string;
  isInWishlist: boolean;
  onToggleWishlist: () => void;
}

// Default hotel images using reliable Unsplash photos
const DEFAULT_HOTEL_IMAGES = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1520637836862-4d197d17c50a?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&h=800&fit=crop"
];

const HotelImageGallery = ({ images, hotelName, isInWishlist, onToggleWishlist }: HotelImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  // Use default images if no images provided or if images fail to load
  const validImages = images && images.length > 0 ? images : DEFAULT_HOTEL_IMAGES;
  const workingImages = validImages.filter((_, index) => !imageErrors.has(index));
  const displayImages = workingImages.length > 0 ? workingImages : DEFAULT_HOTEL_IMAGES;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set([...prev, index]));
  };

  return (
    <div className="relative mb-6 sm:mb-8">
      <div className="aspect-video sm:aspect-[16/10] lg:aspect-video rounded-lg overflow-hidden bg-gray-200">
        <img
          src={displayImages[currentImageIndex]}
          alt={hotelName}
          className="w-full h-full object-cover"
          onError={() => handleImageError(currentImageIndex)}
          loading="lazy"
        />
        {displayImages.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="sm"
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0 bg-white/80 hover:bg-white shadow-md"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0 bg-white/80 hover:bg-white shadow-md"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </>
        )}
      </div>

      {/* Image Indicators */}
      {displayImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {displayImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
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
        className="absolute top-2 sm:top-4 right-2 sm:right-4 rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0 bg-white/80 hover:bg-white shadow-md"
        onClick={onToggleWishlist}
      >
        <Heart
          className={`h-4 w-4 sm:h-5 sm:w-5 ${
            isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'
          }`}
        />
      </Button>
    </div>
  );
};

export default HotelImageGallery;
