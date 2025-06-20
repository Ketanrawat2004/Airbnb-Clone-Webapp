
import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Country {
  code: string;
  name: string;
  flag: string;
}

const countries: Country[] = [
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲' },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭' },
  { code: 'LA', name: 'Laos', flag: '🇱🇦' },
  { code: 'BT', name: 'Bhutan', flag: '🇧🇹' },
  { code: 'MV', name: 'Maldives', flag: '🇲🇻' }
];

interface CountryAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CountryAutocomplete = ({ value, onChange, placeholder = "Select nationality" }: CountryAutocompleteProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
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

  const filterCountries = (query: string) => {
    if (!query) {
      setFilteredCountries(countries);
      return;
    }

    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(query.toLowerCase()) ||
      country.code.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    filterCountries(inputValue);
    setShowSuggestions(true);
  };

  const handleCountrySelect = (country: Country) => {
    onChange(country.name);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    filterCountries(value);
    setShowSuggestions(true);
  };

  return (
    <div className="relative" ref={suggestionsRef}>
      <div className="relative">
        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          className="pl-10 pr-10"
        />
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {showSuggestions && filteredCountries.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto mt-1">
          {filteredCountries.map((country) => (
            <div
              key={country.code}
              onClick={() => handleCountrySelect(country)}
              className="p-3 hover:bg-gray-50 cursor-pointer flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
            >
              <span className="text-lg">{country.flag}</span>
              <span className="font-medium text-gray-900">{country.name}</span>
              <span className="text-sm text-gray-500 ml-auto">{country.code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryAutocomplete;
