
import { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

interface HotelLocation {
  name: string;
  type: string;
  hotels: number;
  id?: string;
}

interface HotelAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const HotelAutocomplete = ({ value, onChange, placeholder }: HotelAutocompleteProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<HotelLocation[]>([]);
  const [availableProperties, setAvailableProperties] = useState<HotelLocation[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Load available properties from database
  useEffect(() => {
    const loadAvailableProperties = async () => {
      try {
        const { data: hotels, error } = await supabase
          .from('hotels')
          .select('id, name, location')
          .limit(50);

        if (error) {
          console.error('Error loading hotels:', error);
          return;
        }

        // Create location map with hotel counts
        const locationMap = new Map<string, { count: number; hotels: string[] }>();
        const hotelMap = new Map<string, { location: string; id: string }>();

        hotels?.forEach(hotel => {
          // Add to location map
          if (!locationMap.has(hotel.location)) {
            locationMap.set(hotel.location, { count: 0, hotels: [] });
          }
          const locationData = locationMap.get(hotel.location)!;
          locationData.count++;
          locationData.hotels.push(hotel.name);

          // Add to hotel map
          hotelMap.set(hotel.name, { location: hotel.location, id: hotel.id });
        });

        const properties: HotelLocation[] = [];

        // Add locations
        locationMap.forEach((data, location) => {
          properties.push({
            name: location,
            type: 'City',
            hotels: data.count
          });
        });

        // Add individual hotels
        hotelMap.forEach((data, hotelName) => {
          properties.push({
            name: hotelName,
            type: 'Hotel',
            hotels: 1,
            id: data.id
          });
        });

        setAvailableProperties(properties);
      } catch (error) {
        console.error('Error loading available properties:', error);
        // Fallback to static data
        setAvailableProperties([
          { name: 'Mumbai', type: 'City', hotels: 25 },
          { name: 'Delhi', type: 'City', hotels: 18 },
          { name: 'Bangalore', type: 'City', hotels: 12 },
          { name: 'Goa', type: 'State', hotels: 9 },
          { name: 'Jaipur', type: 'City', hotels: 8 },
        ]);
      }
    };

    loadAvailableProperties();
  }, []);

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

    if (inputValue.length >= 2) {
      const filtered = availableProperties.filter(
        property =>
          property.name.toLowerCase().includes(inputValue.toLowerCase())
      ).slice(0, 8);
      
      setFilteredLocations(filtered);
      setShowSuggestions(true);

      // Auto-select first match if typing 3+ characters and there's an exact match
      if (inputValue.length >= 3 && filtered.length > 0) {
        const exactMatch = filtered.find(property => 
          property.name.toLowerCase().startsWith(inputValue.toLowerCase())
        );
        if (exactMatch) {
          // Small delay to show the suggestion before auto-selecting
          setTimeout(() => {
            onChange(exactMatch.name);
            setShowSuggestions(false);
          }, 500);
        }
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const handleLocationSelect = (location: HotelLocation) => {
    onChange(location.name);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    if (value.length >= 2) {
      const filtered = availableProperties.filter(
        property =>
          property.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8);
      setFilteredLocations(filtered);
      setShowSuggestions(true);
    } else {
      // Show popular destinations when focused with empty input
      setFilteredLocations(availableProperties.slice(0, 8));
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
                  {location.hotels} {location.hotels === 1 ? 'hotel' : 'hotels'}
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
