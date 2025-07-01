
import { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HotelLocation {
  name: string;
  type: string;
  hotels: number;
}

interface HotelAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const HotelAutocomplete = ({ value, onChange, placeholder }: HotelAutocompleteProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<HotelLocation[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Popular hotel destinations
  const hotelLocations: HotelLocation[] = [
    { name: 'Mumbai', type: 'City', hotels: 250 },
    { name: 'Delhi', type: 'City', hotels: 180 },
    { name: 'Bangalore', type: 'City', hotels: 120 },
    { name: 'Goa', type: 'State', hotels: 95 },
    { name: 'Jaipur', type: 'City', hotels: 85 },
    { name: 'Chennai', type: 'City', hotels: 75 },
    { name: 'Hyderabad', type: 'City', hotels: 70 },
    { name: 'Kolkata', type: 'City', hotels: 65 },
    { name: 'Pune', type: 'City', hotels: 60 },
    { name: 'Agra', type: 'City', hotels: 55 },
    { name: 'Udaipur', type: 'City', hotels: 45 },
    { name: 'Shimla', type: 'City', hotels: 40 },
    { name: 'Manali', type: 'City', hotels: 38 },
    { name: 'Rishikesh', type: 'City', hotels: 35 },
    { name: 'Varanasi', type: 'City', hotels: 32 },
    { name: 'Amritsar', type: 'City', hotels: 30 },
    { name: 'Kochi', type: 'City', hotels: 28 },
    { name: 'Mysore', type: 'City', hotels: 25 },
    { name: 'Jodhpur', type: 'City', hotels: 22 },
    { name: 'Darjeeling', type: 'City', hotels: 20 },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    if (inputValue.length >= 1) {
      const filtered = hotelLocations.filter(
        location =>
          location.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredLocations(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleLocationSelect = (location: HotelLocation) => {
    onChange(location.name);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    if (value.length >= 1) {
      const filtered = hotelLocations.filter(
        location =>
          location.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered);
      setShowSuggestions(true);
    } else {
      // Show popular destinations when focused with empty input
      setFilteredLocations(hotelLocations.slice(0, 8));
      setShowSuggestions(true);
    }
  };

  return (
    <div className="relative w-full" ref={suggestionsRef}>
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        className="border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm sm:text-base font-medium bg-transparent w-full"
      />

      {showSuggestions && filteredLocations.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto mt-1">
          {filteredLocations.map((location, index) => (
            <div
              key={`${location.name}-${index}`}
              onClick={() => handleLocationSelect(location)}
              className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {location.name}
                    </div>
                    <div className="text-sm text-gray-600">{location.type}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {location.hotels} hotels
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelAutocomplete;
