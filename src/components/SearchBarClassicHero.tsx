
import { useRef, useEffect, useState } from 'react';
import { MapPin, Calendar, Users, Search, Plane, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocationSuggestions } from '@/hooks/useLocationSuggestions';
import LocationSuggestions from '@/components/LocationSuggestions';

interface SearchBarClassicHeroProps {
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

const SearchBarClassicHero = ({
  location,
  checkIn,
  checkOut,
  guests,
  onLocationChange,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  onSubmit
}: SearchBarClassicHeroProps) => {
  const [activeTab, setActiveTab] = useState<'hotels' | 'flights'>('hotels');
  const [destination, setDestination] = useState('');
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
      {/* Tab Navigation */}
      <div className="flex mb-4 bg-gray-100 rounded-xl p-1">
        <button
          type="button"
          onClick={() => setActiveTab('hotels')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'hotels'
              ? 'bg-white text-rose-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Building2 className="h-4 w-4" />
          <span>Hotels</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('flights')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'flights'
              ? 'bg-white text-rose-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Plane className="h-4 w-4" />
          <span>Flights</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-200">
        {/* Location/From Input - Full width on mobile */}
        <div className="flex-1 relative" ref={suggestionRef}>
          <div className="flex items-center space-x-3 px-4 sm:px-6 py-4 sm:py-5 border-b sm:border-b-0 sm:border-r border-gray-200 min-h-[70px] sm:min-h-[80px]">
            <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="block text-xs sm:text-sm text-gray-500 mb-1 font-medium">
                {activeTab === 'hotels' ? 'Where' : 'From'}
              </label>
              <Input
                type="text"
                placeholder={activeTab === 'hotels' ? 'Search destinations' : 'Departure city'}
                value={location}
                onChange={handleLocationInputChange}
                onFocus={() => location.length >= 2 && setShowSuggestions(true)}
                className="border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm sm:text-base font-medium bg-transparent w-full"
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

        {/* Destination Input for Flights */}
        {activeTab === 'flights' && (
          <div className="flex-1">
            <div className="flex items-center space-x-3 px-4 sm:px-6 py-4 sm:py-5 border-b sm:border-b-0 sm:border-r border-gray-200 min-h-[70px] sm:min-h-[80px]">
              <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <label className="block text-xs sm:text-sm text-gray-500 mb-1 font-medium">To</label>
                <Input
                  type="text"
                  placeholder="Destination city"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm sm:text-base font-medium bg-transparent w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Check-in/Departure Date - Full width on mobile */}
        <div className="flex-1">
          <div className="flex items-center space-x-3 px-4 sm:px-6 py-4 sm:py-5 border-b sm:border-b-0 sm:border-r border-gray-200 min-h-[70px] sm:min-h-[80px]">
            <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="block text-xs sm:text-sm text-gray-500 mb-1 font-medium">
                {activeTab === 'hotels' ? 'Check in' : 'Departure'}
              </label>
              <Input
                type="date"
                value={checkIn}
                onChange={(e) => onCheckInChange(e.target.value)}
                className="border-0 p-0 text-gray-900 focus:ring-0 text-sm sm:text-base font-medium bg-transparent w-full"
              />
            </div>
          </div>
        </div>

        {/* Check-out/Return Date - Full width on mobile */}
        <div className="flex-1">
          <div className="flex items-center space-x-3 px-4 sm:px-6 py-4 sm:py-5 border-b sm:border-b-0 sm:border-r border-gray-200 min-h-[70px] sm:min-h-[80px]">
            <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="block text-xs sm:text-sm text-gray-500 mb-1 font-medium">
                {activeTab === 'hotels' ? 'Check out' : 'Return'}
              </label>
              <Input
                type="date"
                value={checkOut}
                onChange={(e) => onCheckOutChange(e.target.value)}
                className="border-0 p-0 text-gray-900 focus:ring-0 text-sm sm:text-base font-medium bg-transparent w-full"
              />
            </div>
          </div>
        </div>

        {/* Guests/Passengers - Full width on mobile */}
        <div className="flex-1">
          <div className="flex items-center space-x-3 px-4 sm:px-6 py-4 sm:py-5 border-b sm:border-b-0 sm:border-r border-gray-200 min-h-[70px] sm:min-h-[80px]">
            <Users className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="block text-xs sm:text-sm text-gray-500 mb-1 font-medium">
                {activeTab === 'hotels' ? 'Guests' : 'Passengers'}
              </label>
              <Input
                type="number"
                placeholder={activeTab === 'hotels' ? 'Add guests' : 'Add passengers'}
                value={guests}
                onChange={(e) => onGuestsChange(e.target.value)}
                className="border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm sm:text-base font-medium bg-transparent w-full"
                min="1"
              />
            </div>
          </div>
        </div>

        {/* Search Button - Full width on mobile, right-aligned on desktop */}
        <div className="flex items-center justify-center sm:justify-end p-4 sm:p-6">
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <Search className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBarClassicHero;
