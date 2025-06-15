
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import BookingModal from '@/components/BookingModal';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Wifi, Car, Coffee, Utensils, ArrowLeft, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

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

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchHotel = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('hotels')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching hotel:', error);
          navigate('/');
        } else {
          setHotel({
            ...data,
            available_rooms: data.available_rooms || 0
          });
        }
      } catch (error) {
        console.error('Error fetching hotel:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id, navigate]);

  const nextImage = () => {
    if (hotel) {
      setCurrentImageIndex((prev) => 
        prev === hotel.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (hotel) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? hotel.images.length - 1 : prev - 1
      );
    }
  };

  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes('wifi') || lowerAmenity.includes('internet')) return <Wifi className="h-4 w-4" />;
    if (lowerAmenity.includes('parking') || lowerAmenity.includes('car')) return <Car className="h-4 w-4" />;
    if (lowerAmenity.includes('coffee') || lowerAmenity.includes('breakfast')) return <Coffee className="h-4 w-4" />;
    if (lowerAmenity.includes('restaurant') || lowerAmenity.includes('dining')) return <Utensils className="h-4 w-4" />;
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Hotel not found</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const pricePerNight = hotel.price_per_night / 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>

        {/* Hotel Images */}
        <div className="relative mb-8">
          <div className="aspect-video rounded-lg overflow-hidden bg-gray-200">
            {hotel.images && hotel.images.length > 0 ? (
              <>
                <img
                  src={hotel.images[currentImageIndex]}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                {hotel.images.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full w-10 h-10 p-0 bg-white/80 hover:bg-white shadow-md"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full w-10 h-10 p-0 bg-white/80 hover:bg-white shadow-md"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-5 w-5" />
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
          {hotel.images && hotel.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {hotel.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${
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
            className="absolute top-4 right-4 rounded-full w-10 h-10 p-0 bg-white/80 hover:bg-white shadow-md"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart
              className={`h-5 w-5 ${
                isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </Button>
        </div>

        {/* Hotel Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{hotel.rating}</span>
                      <span className="text-gray-500">({hotel.reviews_count} reviews)</span>
                    </div>
                  </div>
                </div>
                {hotel.available_rooms > 0 && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {hotel.available_rooms} rooms available
                  </Badge>
                )}
              </div>
              
              <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
            </div>

            {/* Amenities */}
            {hotel.amenities && hotel.amenities.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-700">
                      {getAmenityIcon(amenity)}
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Facilities */}
            {hotel.facilities && hotel.facilities.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Facilities</h2>
                <div className="flex flex-wrap gap-2">
                  {hotel.facilities.map((facility, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {facility}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Rules and Regulations */}
            {hotel.rules_and_regulations && hotel.rules_and_regulations.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Rules & Regulations</h2>
                <ul className="space-y-2">
                  {hotel.rules_and_regulations.map((rule, index) => (
                    <li key={index} className="text-gray-700 text-sm flex items-start space-x-2">
                      <span className="text-rose-500 mt-1">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900">
                  ₹{pricePerNight.toLocaleString('en-IN')}
                </div>
                <div className="text-gray-600">per night</div>
              </div>
              
              <Button 
                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 text-lg font-semibold"
                onClick={() => setBookingModalOpen(true)}
              >
                Reserve Now
              </Button>
              
              <p className="text-center text-gray-500 text-sm mt-4">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        hotel={hotel}
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
      />
      
      <ChatBot />
      <Footer />
    </div>
  );
};

export default HotelDetail;
