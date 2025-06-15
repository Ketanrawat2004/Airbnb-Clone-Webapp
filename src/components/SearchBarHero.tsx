
import { useRef, useEffect } from 'react';
import { MapPin, Calendar, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocationSuggestions } from '@/hooks/useLocationSuggestions';
import LocationSuggestions from '@/components/LocationSuggestions';

interface SearchBarHeroProps {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  onLocationChange: (value: string) => void;
  onCheckInChange: (value: string) => void;
  onCheckOutChange: (value: string) => void;
  onGuestsChange: (value: string) => void;
  onSubmit: () => void;
}

const SearchBarHero = ({
  location,
  checkIn,
  checkOut,
  guests,
  onLocationChange,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  onSubmit
}: SearchBarHeroProps) => {
  const { locationSuggestions, showSuggestions, setShowSuggestions, isLoadingSuggestions } = useLocationSuggestions(location);
  const suggestionRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowSuggestions]);

  const handleLocationSelect = (selectedLocation: string) => {
    onLocationChange(selectedLocation);
    setShowSuggestions(false);
  };

  const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onLocationChange(e.target.value);
    if (e.target.value.length >= 2) {
      setShowSuggestions(true);
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmitForm} className="w-full">
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
                onChange={handleLocationInputChange}
                onFocus={() => location.length >= 2 && setShowSuggestions(true)}
                className="border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm font-medium"
              />
            </div>
          </div>
          {showSuggestions && (
            <LocationSuggestions
              suggestions={locationSuggestions}
              isLoading={isLoadingSuggestions}
              onSelect={handleLocationSelect}
            />
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
                onChange={(e) => onCheckInChange(e.target.value)}
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
                onChange={(e) => onCheckOutChange(e.target.value)}
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
                onChange={(e) => onGuestsChange(e.target.value)}
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
};

export default SearchBarHero;
