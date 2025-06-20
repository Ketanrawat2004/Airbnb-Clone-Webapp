
import { useState, useRef, useEffect } from 'react';
import { MapPin, Building2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

interface Hotel {
  id: string;
  name: string;
  location: string;
  city?: string; // Make city optional since we're not selecting it from the database
  rating: number;
  image_url: string;
}

interface HotelAutocompleteProps {
  value: string;
  onChange: (value: string, hotelData?: Hotel) => void;
  placeholder: string;
}

const HotelAutocomplete = ({ value, onChange, placeholder }: HotelAutocompleteProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchHotelsAndCities = async (query: string) => {
    if (query.length < 2) {
      setHotels([]);
      setCities([]);
      return;
    }

    setLoading(true);
    try {
      // Search hotels
      const { data: hotelData } = await supabase
        .from('hotels')
        .select('id, name, location, rating, image_url')
        .or(`name.ilike.%${query}%,location.ilike.%${query}%`)
        .limit(8);

      // Extract unique cities
      const uniqueCities = [...new Set(
        (hotelData || []).map(hotel => {
          const cityMatch = hotel.location.split(',')[0].trim();
          return cityMatch;
        })
      )].filter(city => city.toLowerCase().includes(query.toLowerCase()));

      setHotels(hotelData || []);
      setCities(uniqueCities.slice(0, 5));
    } catch (error) {
      console.error('Error searching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    searchHotelsAndCities(inputValue);
    setShowSuggestions(true);
  };

  const handleHotelSelect = (hotel: Hotel) => {
    onChange(`${hotel.name}, ${hotel.location}`, hotel);
    setShowSuggestions(false);
  };

  const handleCitySelect = (city: string) => {
    onChange(city);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    if (value.length >= 2) {
      searchHotelsAndCities(value);
      setShowSuggestions(true);
    }
  };

  return (
    <div className="relative" ref={suggestionsRef}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          className="pl-10 h-12 border-gray-300 focus:border-blue-500"
        />
      </div>

      {showSuggestions && (hotels.length > 0 || cities.length > 0) && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto mt-1">
          {loading && (
            <div className="p-3 text-center text-gray-500">Searching...</div>
          )}
          
          {cities.length > 0 && (
            <div className="border-b border-gray-100">
              <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                Cities
              </div>
              {cities.map((city, index) => (
                <div
                  key={`city-${index}`}
                  onClick={() => handleCitySelect(city)}
                  className="p-3 hover:bg-gray-50 cursor-pointer flex items-center space-x-3"
                >
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">{city}</div>
                    <div className="text-sm text-gray-600">All hotels in {city}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {hotels.length > 0 && (
            <div>
              <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                Hotels
              </div>
              {hotels.map((hotel) => (
                <div
                  key={hotel.id}
                  onClick={() => handleHotelSelect(hotel)}
                  className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-start space-x-3">
                    <Building2 className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{hotel.name}</div>
                      <div className="text-sm text-gray-600">{hotel.location}</div>
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < hotel.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">{hotel.rating}/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HotelAutocomplete;
