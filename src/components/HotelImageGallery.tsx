
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';

interface HotelImageGalleryProps {
  images: string[];
  hotelName: string;
  isInWishlist: boolean;
  onToggleWishlist: () => void;
}

const HotelImageGallery = ({ images, hotelName, isInWishlist, onToggleWishlist }: HotelImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (images) {
      setCurrentImageIndex((prev) => 
        prev === images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="relative mb-6 sm:mb-8">
      <div className="aspect-video sm:aspect-[16/10] lg:aspect-video rounded-lg overflow-hidden bg-gray-200">
        {images && images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex]}
              alt={hotelName}
              className="w-full h-full object-cover"
            />
            {images.length > 1 && (
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
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No images available
          </div>
        )}
      </div>

      {/* Image Indicators */}
      {images && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
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
