
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

interface SearchBarProps {
  onSearch?: (location: string) => void;
  variant?: 'default' | 'hero';
}

interface LocationSuggestion {
  location: string;
  count: number;
}

const SearchBar = ({ onSearch, variant = 'default' }: SearchBarProps) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLocationSuggestions = async () => {
      if (location.trim().length >= 2) {
        setIsLoadingSuggestions(true);
        try {
          const { data, error } = await supabase
            .from('hotels')
            .select('location')
            .ilike('location', `%${location.trim()}%`)
            .limit(10);

          if (error) {
            console.error('Error fetching location suggestions:', error);
          } else {
            // Group by location and count occurrences
            const locationMap = new Map<string, number>();
            data.forEach(hotel => {
              const loc = hotel.location;
              locationMap.set(loc, (locationMap.get(loc) || 0) + 1);
            });

            const suggestions = Array.from(locationMap.entries())
              .map(([location, count]) => ({ location, count }))
              .sort((a, b) => b.count - a.count)
              .slice(0, 5);

            setLocationSuggestions(suggestions);
            setShowSuggestions(suggestions.length > 0);
          }
        } catch (error) {
          console.error('Error fetching location suggestions:', error);
        } finally {
          setIsLoadingSuggestions(false);
        }
      } else {
        setLocationSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(fetchLocationSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [location]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    
    // Create search parameters
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', guests);
    
    // Navigate to search results
    navigate(`/search?${params.toString()}`);
    
    // Call the optional onSearch callback
    if (onSearch) {
      onSearch(location);
    }
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setShowSuggestions(false);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    if (e.target.value.length >= 2) {
      setShowSuggestions(true);
    }
  };

  if (variant === 'hero') {
    return (
      <form onSubmit={handleSubmit} className="flex items-center w-full">
        <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center">
          <div className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border-b sm:border-b-0 sm:border-r border-gray-200 relative" ref={suggestionRef}>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Where are you going?"
                value={location}
                onChange={handleLocationChange}
                onFocus={() => location.length >= 2 && setShowSuggestions(true)}
                className="border-0 p-0 text-gray-900 placeholder:text-gray-500 focus:ring-0 text-sm sm:text-base"
              />
            </div>
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                {isLoadingSuggestions ? (
                  <div className="p-3 text-gray-500 text-sm">Searching locations...</div>
                ) : locationSuggestions.length > 0 ? (
                  locationSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleLocationSelect(suggestion.location)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-2 border-b border-gray-100 last:border-b-0"
                    >
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900 text-sm">{suggestion.location}</span>
                      <span className="text-gray-500 text-xs ml-auto">
                        {suggestion.count} {suggestion.count === 1 ? 'property' : 'properties'}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="p-3 text-gray-500 text-sm">No locations found</div>
                )}
              </div>
            )}
          </div>
          <div className="px-3 sm:px-4 py-2 sm:py-3 border-b sm:border-b-0 sm:border-r border-gray-200">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <Input
                type="date"
                placeholder="Check in"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="border-0 p-0 text-gray-900 focus:ring-0 w-20 sm:w-32 text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="px-3 sm:px-4 py-2 sm:py-3 border-b sm:border-b-0 sm:border-r border-gray-200">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <Input
                type="date"
                placeholder="Check out"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="border-0 p-0 text-gray-900 focus:ring-0 w-20 sm:w-32 text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="px-3 sm:px-4 py-2 sm:py-3">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <Input
                type="number"
                placeholder="Guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="border-0 p-0 text-gray-900 placeholder:text-gray-500 focus:ring-0 w-16 sm:w-20 text-sm sm:text-base"
                min="1"
              />
            </div>
          </div>
        </div>
        <Button type="submit" className="bg-rose-500 hover:bg-rose-600 rounded-full p-2 sm:p-3 mx-1 sm:mx-2">
          <Search className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <div className="relative flex-1" ref={suggestionRef}>
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search destinations..."
          value={location}
          onChange={handleLocationChange}
          onFocus={() => location.length >= 2 && setShowSuggestions(true)}
          className="pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-rose-500 focus:ring-rose-500 text-sm sm:text-base"
        />
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto mt-1">
            {isLoadingSuggestions ? (
              <div className="p-3 text-gray-500 text-sm">Searching locations...</div>
            ) : locationSuggestions.length > 0 ? (
              locationSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleLocationSelect(suggestion.location)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-2 border-b border-gray-100 last:border-b-0"
                >
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900 text-sm">{suggestion.location}</span>
                  <span className="text-gray-500 text-xs ml-auto">
                    {suggestion.count} {suggestion.count === 1 ? 'property' : 'properties'}
                  </span>
                </button>
              ))
            ) : (
              <div className="p-3 text-gray-500 text-sm">No locations found</div>
            )}
          </div>
        )}
      </div>
      <Button type="submit" size="sm" className="bg-rose-500 hover:bg-rose-600 rounded-full">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default SearchBar;
