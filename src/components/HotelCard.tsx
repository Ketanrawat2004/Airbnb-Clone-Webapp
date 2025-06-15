
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BookingModal from './BookingModal';

interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  price_per_night: number;
  amenities: string[];
  facilities: string[];
  rules_and_regulations: string[];
  images: string[];
  rating: number;
  reviews_count: number;
  available_rooms: number;
  total_rooms?: number;
}

interface HotelCardProps {
  hotel: Hotel;
  searchParams?: {
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  };
}

const HotelCard = ({ hotel, searchParams }: HotelCardProps) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

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

  const handleCardClick = () => {
    navigate(`/hotel/${hotel.id}`);
  };

  // Convert price from paise to rupees
  const pricePerNight = hotel.price_per_night / 100;

  return (
    <>
      <Card 
        className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-sm hover:scale-[1.02] w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <CardContent className="p-0">
          {/* Image Gallery */}
          <div className="relative overflow-hidden rounded-t-lg aspect-square sm:aspect-[4/3]">
            <img
              src={hotel.images[currentImageIndex]}
              alt={hotel.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            
            {/* Navigation Arrows - Hidden on mobile */}
            {hotel.images.length > 1 && isHovered && (
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
            {hotel.images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {hotel.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
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
              className="absolute top-2 right-2 rounded-full w-6 h-6 sm:w-8 sm:h-8 p-0 bg-white/80 hover:bg-white shadow-md"
              onClick={toggleLike}
            >
              <Heart
                className={`h-3 w-3 sm:h-4 sm:w-4 ${
                  isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`}
              />
            </Button>

            {/* Availability Badge */}
            {hotel.available_rooms > 0 && (
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                <span className="hidden sm:inline">{hotel.available_rooms} rooms available</span>
                <span className="sm:hidden">{hotel.available_rooms} rooms</span>
              </div>
            )}
          </div>

          {/* Hotel Details */}
          <div className="p-3 sm:p-4">
            <div className="flex items-start justify-between mb-1 gap-2">
              <h3 className="font-semibold text-gray-900 truncate flex-1 text-sm sm:text-base">
                {hotel.name}
              </h3>
              <div className="flex items-center space-x-1 text-xs sm:text-sm flex-shrink-0">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{hotel.rating}</span>
                <span className="text-gray-500 hidden sm:inline">({hotel.reviews_count})</span>
              </div>
            </div>
            
            <p className="text-gray-600 text-xs sm:text-sm mb-2 truncate">{hotel.location}</p>
            <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2 hidden sm:block">{hotel.description}</p>

            {/* Amenities - Show fewer on mobile */}
            <div className="flex flex-wrap gap-1 mb-3">
              {hotel.amenities.slice(0, 2).map((amenity, index) => (
                <span key={index} className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {amenity}
                </span>
              ))}
              {hotel.amenities.length > 2 && (
                <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  +{hotel.amenities.length - 2} more
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-base sm:text-lg font-semibold">₹{pricePerNight.toLocaleString('en-IN')}</span>
                <span className="text-gray-600 text-xs sm:text-sm ml-1">/ night</span>
              </div>
              <Button 
                size="sm" 
                className="bg-rose-500 hover:bg-rose-600 text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setBookingModalOpen(true);
                }}
              >
                Book
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <BookingModal
        hotel={hotel}
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
        initialCheckIn={searchParams?.checkIn}
        initialCheckOut={searchParams?.checkOut}
        initialGuests={searchParams?.guests}
      />
    </>
  );
};

export default HotelCard;
