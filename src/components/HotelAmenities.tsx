
import { Wifi, Car, Coffee, Utensils } from 'lucide-react';

interface HotelAmenitiesProps {
  amenities: string[];
}

const HotelAmenities = ({ amenities }: HotelAmenitiesProps) => {
  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes('wifi') || lowerAmenity.includes('internet')) return <Wifi className="h-4 w-4" />;
    if (lowerAmenity.includes('parking') || lowerAmenity.includes('car')) return <Car className="h-4 w-4" />;
    if (lowerAmenity.includes('coffee') || lowerAmenity.includes('breakfast')) return <Coffee className="h-4 w-4" />;
    if (lowerAmenity.includes('restaurant') || lowerAmenity.includes('dining')) return <Utensils className="h-4 w-4" />;
    return null;
  };

  if (!amenities || amenities.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center space-x-2 text-gray-700">
            {getAmenityIcon(amenity)}
            <span className="text-sm">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelAmenities;
