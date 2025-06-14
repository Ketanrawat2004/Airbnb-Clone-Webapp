
import { useState } from 'react';
import { X, Wifi, Users, Bed, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

interface FilterSidebarProps {
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

const FilterSidebar = ({ onClose, onApplyFilters }: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState([50, 500]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [roomsAndBeds, setRoomsAndBeds] = useState({
    bedrooms: 0,
    bathrooms: 0,
    guests: 1
  });

  const propertyTypeOptions = [
    { id: 'house', label: 'House', icon: Building },
    { id: 'apartment', label: 'Apartment', icon: Building },
    { id: 'villa', label: 'Villa', icon: Building },
    { id: 'cabin', label: 'Cabin', icon: Building }
  ];

  const amenityOptions = [
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'pool', label: 'Pool', icon: Wifi },
    { id: 'kitchen', label: 'Kitchen', icon: Wifi },
    { id: 'parking', label: 'Free parking', icon: Wifi },
    { id: 'ac', label: 'Air conditioning', icon: Wifi },
    { id: 'heating', label: 'Heating', icon: Wifi },
    { id: 'tv', label: 'TV', icon: Wifi },
    { id: 'washer', label: 'Washer', icon: Wifi }
  ];

  const handlePropertyTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setPropertyTypes([...propertyTypes, type]);
    } else {
      setPropertyTypes(propertyTypes.filter(t => t !== type));
    }
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setAmenities([...amenities, amenity]);
    } else {
      setAmenities(amenities.filter(a => a !== amenity));
    }
  };

  const handleApplyFilters = () => {
    const filters = {
      priceRange,
      propertyTypes,
      amenities,
      roomsAndBeds
    };
    onApplyFilters(filters);
    onClose();
  };

  const clearFilters = () => {
    setPriceRange([50, 500]);
    setPropertyTypes([]);
    setAmenities([]);
    setRoomsAndBeds({ bedrooms: 0, bathrooms: 0, guests: 1 });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      {/* Overlay */}
      <div className="flex-1" onClick={onClose}></div>
      
      {/* Sidebar */}
      <div className="w-full max-w-md bg-white h-full overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Filters</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Price Range */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Price range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={1000}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}+</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Type */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Property type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {propertyTypeOptions.map((type) => (
                  <div
                    key={type.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      propertyTypes.includes(type.id)
                        ? 'border-rose-500 bg-rose-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handlePropertyTypeChange(type.id, !propertyTypes.includes(type.id))}
                  >
                    <type.icon className="h-6 w-6 mb-2" />
                    <p className="text-sm font-medium">{type.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rooms and Beds */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Rooms and beds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Bedrooms</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRoomsAndBeds(prev => ({ ...prev, bedrooms: Math.max(0, prev.bedrooms - 1) }))}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{roomsAndBeds.bedrooms}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRoomsAndBeds(prev => ({ ...prev, bedrooms: prev.bedrooms + 1 }))}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Bathrooms</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRoomsAndBeds(prev => ({ ...prev, bathrooms: Math.max(0, prev.bathrooms - 1) }))}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{roomsAndBeds.bathrooms}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRoomsAndBeds(prev => ({ ...prev, bathrooms: prev.bathrooms + 1 }))}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Guests</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRoomsAndBeds(prev => ({ ...prev, guests: Math.max(1, prev.guests - 1) }))}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{roomsAndBeds.guests}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRoomsAndBeds(prev => ({ ...prev, guests: prev.guests + 1 }))}
                  >
                    +
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {amenityOptions.map((amenity) => (
                  <div key={amenity.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity.id}
                      checked={amenities.includes(amenity.id)}
                      onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                    />
                    <label htmlFor={amenity.id} className="text-sm cursor-pointer">
                      {amenity.label}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-6 border-t">
            <Button variant="outline" className="flex-1" onClick={clearFilters}>
              Clear all
            </Button>
            <Button className="flex-1 bg-rose-500 hover:bg-rose-600" onClick={handleApplyFilters}>
              Apply filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
