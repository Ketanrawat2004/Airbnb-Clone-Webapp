
import { MapPin } from 'lucide-react';

interface LocationSuggestion {
  location: string;
  count: number;
}

interface LocationSuggestionsProps {
  suggestions: LocationSuggestion[];
  isLoading: boolean;
  onSelect: (location: string) => void;
}

const LocationSuggestions = ({ suggestions, isLoading, onSelect }: LocationSuggestionsProps) => {
  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto mt-1">
      {isLoading ? (
        <div className="p-3 text-gray-500 text-sm">Searching locations...</div>
      ) : suggestions.length > 0 ? (
        suggestions.map((suggestion, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(suggestion.location)}
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
  );
};

export default LocationSuggestions;
