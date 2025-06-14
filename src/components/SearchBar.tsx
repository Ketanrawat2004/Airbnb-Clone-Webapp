
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch?: (location: string) => void;
  variant?: 'default' | 'hero';
}

const SearchBar = ({ onSearch, variant = 'default' }: SearchBarProps) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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

  if (variant === 'hero') {
    return (
      <form onSubmit={handleSubmit} className="flex items-center w-full">
        <div className="flex-1 flex items-center">
          <div className="flex-1 px-4 py-3 border-r border-gray-200">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Where are you going?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-0 p-0 text-gray-900 placeholder:text-gray-500 focus:ring-0"
              />
            </div>
          </div>
          <div className="px-4 py-3 border-r border-gray-200">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <Input
                type="date"
                placeholder="Check in"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="border-0 p-0 text-gray-900 focus:ring-0 w-32"
              />
            </div>
          </div>
          <div className="px-4 py-3 border-r border-gray-200">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <Input
                type="date"
                placeholder="Check out"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="border-0 p-0 text-gray-900 focus:ring-0 w-32"
              />
            </div>
          </div>
          <div className="px-4 py-3">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-400" />
              <Input
                type="number"
                placeholder="Guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="border-0 p-0 text-gray-900 placeholder:text-gray-500 focus:ring-0 w-20"
                min="1"
              />
            </div>
          </div>
        </div>
        <Button type="submit" className="bg-rose-500 hover:bg-rose-600 rounded-full p-3 mx-2">
          <Search className="h-5 w-5" />
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search destinations..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-rose-500 focus:ring-rose-500"
        />
      </div>
      <Button type="submit" size="sm" className="bg-rose-500 hover:bg-rose-600 rounded-full">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default SearchBar;
