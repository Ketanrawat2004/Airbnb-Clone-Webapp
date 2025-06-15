
import { useRef, useEffect } from 'react';
import { MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocationSuggestions } from '@/hooks/useLocationSuggestions';
import LocationSuggestions from '@/components/LocationSuggestions';

interface SearchBarDefaultProps {
  location: string;
  onLocationChange: (value: string) => void;
  onSubmit: () => void;
}

const SearchBarDefault = ({ location, onLocationChange, onSubmit }: SearchBarDefaultProps) => {
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
    <form onSubmit={handleSubmitForm} className="flex items-center space-x-2">
      <div className="relative flex-1" ref={suggestionRef}>
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search destinations..."
          value={location}
          onChange={handleLocationInputChange}
          onFocus={() => location.length >= 2 && setShowSuggestions(true)}
          className="pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-rose-500 focus:ring-rose-500 text-sm sm:text-base"
        />
        {showSuggestions && (
          <LocationSuggestions
            suggestions={locationSuggestions}
            isLoading={isLoadingSuggestions}
            onSelect={handleLocationSelect}
          />
        )}
      </div>
      <Button type="submit" size="sm" className="bg-rose-500 hover:bg-rose-600 rounded-full">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default SearchBarDefault;
