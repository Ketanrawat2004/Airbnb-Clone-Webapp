import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

interface SearchBarProps {
  onSearch?: (location: string) => void;
  variant?: 'default' | 'hero' | 'classic-hero';
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
          // Get the current session to check if user is authenticated
          const { data: { session } } = await supabase.auth.getSession();
          
          // Query hotels table with proper error handling
          const query = supabase
            .from('hotels')
            .select('location')
            .ilike('location', `%${location.trim()}%`)
            .limit(10);

          const { data, error } = await query;

          if (error) {
            console.warn('Error fetching location suggestions:', error.message);
            // Handle the case where RLS might be blocking the query
            if (error.message.includes('RLS') || error.message.includes('policy')) {
              console.info('Note: Location suggestions require authentication for full functionality');
            }
            setLocationSuggestions([]);
            setShowSuggestions(false);
          } else if (data) {
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
          console.warn('Unexpected error fetching location suggestions:', error);
          setLocationSuggestions([]);
          setShowSuggestions(false);
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

  if (variant === 'classic-hero') {
    return (
      <form onSubmit={handleSubmit} className="flex flex-1 items-center gap-2 w-full">
        {/* Location */}
        <div className="flex-1 flex items-center gap-2 px-2 py-2 sm:py-3">
          <MapPin className="h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Where are you"
            className="rounded-md bg-gray-100 border-0 text-gray-700 placeholder:text-gray-400 px-3 py-2 w-full focus:ring-0 focus:outline-none focus:bg-white min-w-[100px] max-w-full"
            value={location}
            onChange={handleLocationChange}
            onFocus={() => location.length >= 2 && setShowSuggestions(true)}
          />
        </div>
        {/* Check-in */}
        <div className="flex-1 flex items-center gap-2 px-2 py-2 sm:py-3 border-l border-gray-200">
          <Calendar className="h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="dd-mm-yyyy"
            className="rounded-md bg-gray-100 border-0 text-gray-700 placeholder:text-gray-400 px-3 py-2 w-full focus:ring-0 focus:outline-none focus:bg-white min-w-[90px] max-w-full"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            inputMode="text"
          />
        </div>
        {/* Check-out */}
        <div className="flex-1 flex items-center gap-2 px-2 py-2 sm:py-3 border-l border-gray-200">
          <Calendar className="h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="dd-mm-yyyy"
            className="rounded-md bg-gray-100 border-0 text-gray-700 placeholder:text-gray-400 px-3 py-2 w-full focus:ring-0 focus:outline-none focus:bg-white min-w-[90px] max-w-full"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            inputMode="text"
          />
        </div>
        {/* Guests */}
        <div className="flex-1 flex items-center gap-2 px-2 py-2 sm:py-3 border-l border-gray-200">
          <Users className="h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Guests"
            className="rounded-md bg-gray-100 border-0 text-gray-700 placeholder:text-gray-400 px-3 py-2 w-full focus:ring-0 focus:outline-none focus:bg-white min-w-[50px] max-w-full"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            inputMode="numeric"
            min="1"
          />
        </div>
        {/* Search Button */}
        <div className="pl-2 flex-shrink-0">
          <Button type="submit" className="bg-[#f65073] hover:bg-[#db3358] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md transition">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </form>
    );
  }

  if (variant === 'hero') {
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center">
          {/* Location Input */}
          <div className="flex-1 relative" ref={suggestionRef}>
            <div className="flex items-center space-x-3 px-4 py-3 sm:py-4 border-b sm:border-b-0 sm:border-r border-gray-200">
              <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Where are you going?</label>
                <Input
                  type="text"
                  placeholder="Search destinations"
                  value={location}
                  onChange={handleLocationChange}
                  onFocus={() => location.length >= 2 && setShowSuggestions(true)}
                  className="border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm font-medium"
                />
              </div>
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

          {/* Check-in Date */}
          <div className="flex-1">
            <div className="flex items-center space-x-3 px-4 py-3 sm:py-4 border-b sm:border-b-0 sm:border-r border-gray-200">
              <Calendar className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Check in</label>
                <Input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="border-0 p-0 text-gray-900 focus:ring-0 text-sm font-medium"
                />
              </div>
            </div>
          </div>

          {/* Check-out Date */}
          <div className="flex-1">
            <div className="flex items-center space-x-3 px-4 py-3 sm:py-4 border-b sm:border-b-0 sm:border-r border-gray-200">
              <Calendar className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Check out</label>
                <Input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="border-0 p-0 text-gray-900 focus:ring-0 text-sm font-medium"
                />
              </div>
            </div>
          </div>

          {/* Guests */}
          <div className="flex-1">
            <div className="flex items-center space-x-3 px-4 py-3 sm:py-4">
              <Users className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Guests</label>
                <Input
                  type="number"
                  placeholder="Add guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm font-medium"
                  min="1"
                />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-center sm:justify-end px-4 py-2 sm:px-2">
            <Button type="submit" className="bg-rose-500 hover:bg-rose-600 rounded-full p-3 w-12 h-12 flex items-center justify-center">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
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
