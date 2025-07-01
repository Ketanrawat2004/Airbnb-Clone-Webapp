
import { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface City {
  name: string;
  code: string;
  airport: string;
  country: string;
}

interface CityAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const CityAutocomplete = ({ value, onChange, placeholder }: CityAutocompleteProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Popular Indian cities with airports
  const cities: City[] = [
    { name: 'Mumbai', code: 'BOM', airport: 'Chhatrapati Shivaji International', country: 'India' },
    { name: 'Delhi', code: 'DEL', airport: 'Indira Gandhi International', country: 'India' },
    { name: 'Bangalore', code: 'BLR', airport: 'Kempegowda International', country: 'India' },
    { name: 'Chennai', code: 'MAA', airport: 'Chennai International', country: 'India' },
    { name: 'Kolkata', code: 'CCU', airport: 'Netaji Subhash Chandra Bose', country: 'India' },
    { name: 'Hyderabad', code: 'HYD', airport: 'Rajiv Gandhi International', country: 'India' },
    { name: 'Pune', code: 'PNQ', airport: 'Pune Airport', country: 'India' },
    { name: 'Ahmedabad', code: 'AMD', airport: 'Sardar Vallabhbhai Patel International', country: 'India' },
    { name: 'Jaipur', code: 'JAI', airport: 'Jaipur International', country: 'India' },
    { name: 'Kochi', code: 'COK', airport: 'Cochin International', country: 'India' },
    { name: 'Goa', code: 'GOI', airport: 'Goa International', country: 'India' },
    { name: 'Lucknow', code: 'LKO', airport: 'Chaudhary Charan Singh International', country: 'India' },
    { name: 'Chandigarh', code: 'IXC', airport: 'Chandigarh Airport', country: 'India' },
    { name: 'Thiruvananthapuram', code: 'TRV', airport: 'Trivandrum International', country: 'India' },
    { name: 'Bhubaneswar', code: 'BBI', airport: 'Biju Patnaik International', country: 'India' },
    // International cities
    { name: 'Dubai', code: 'DXB', airport: 'Dubai International', country: 'UAE' },
    { name: 'Singapore', code: 'SIN', airport: 'Singapore Changi', country: 'Singapore' },
    { name: 'London', code: 'LHR', airport: 'Heathrow Airport', country: 'UK' },
    { name: 'New York', code: 'JFK', airport: 'John F. Kennedy International', country: 'USA' },
    { name: 'Bangkok', code: 'BKK', airport: 'Suvarnabhumi Airport', country: 'Thailand' },
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
      const filtered = cities.filter(
        city =>
          city.name.toLowerCase().includes(inputValue.toLowerCase()) ||
          city.code.toLowerCase().includes(inputValue.toLowerCase()) ||
          city.airport.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleCitySelect = (city: City) => {
    onChange(`${city.name} (${city.code})`);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    if (value.length >= 1) {
      const filtered = cities.filter(
        city =>
          city.name.toLowerCase().includes(value.toLowerCase()) ||
          city.code.toLowerCase().includes(value.toLowerCase()) ||
          city.airport.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowSuggestions(true);
    } else {
      // Show popular destinations when focused with empty input
      setFilteredCities(cities.slice(0, 10));
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

      {showSuggestions && filteredCities.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto mt-1">
          {filteredCities.map((city, index) => (
            <div
              key={`${city.code}-${index}`}
              onClick={() => handleCitySelect(city)}
              className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">
                    {city.name} ({city.code})
                  </div>
                  <div className="text-sm text-gray-600">{city.airport}</div>
                </div>
                <div className="text-xs text-gray-500">{city.country}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityAutocomplete;
