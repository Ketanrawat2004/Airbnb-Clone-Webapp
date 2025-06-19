
import { useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLocationSuggestions } from '@/hooks/useLocationSuggestions';
import LocationSuggestions from '@/components/LocationSuggestions';

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
}

const LocationInput = ({ value, onChange, label, placeholder }: LocationInputProps) => {
  const { locationSuggestions, showSuggestions, setShowSuggestions, isLoadingSuggestions } = useLocationSuggestions(value);
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
    onChange(selectedLocation);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    if (e.target.value.length >= 2) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="flex-1 relative" ref={suggestionRef}>
      <div className="flex items-center space-x-3 px-4 sm:px-6 py-4 sm:py-5 border-b sm:border-b-0 sm:border-r border-gray-200 min-h-[70px] sm:min-h-[80px]">
        <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <label className="block text-xs sm:text-sm text-gray-500 mb-1 font-medium">
            {label}
          </label>
          <Input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            onFocus={() => value.length >= 2 && setShowSuggestions(true)}
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
  );
};

export default LocationInput;
