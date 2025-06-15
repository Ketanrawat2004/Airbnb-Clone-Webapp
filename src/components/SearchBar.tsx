
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBarDefault from '@/components/SearchBarDefault';
import SearchBarHero from '@/components/SearchBarHero';
import SearchBarClassicHero from '@/components/SearchBarClassicHero';

interface SearchBarProps {
  onSearch?: (location: string) => void;
  variant?: 'default' | 'hero' | 'classic-hero';
}

const SearchBar = ({ onSearch, variant = 'default' }: SearchBarProps) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');

  const handleSubmit = () => {
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

  if (variant === 'classic-hero') {
    return (
      <SearchBarClassicHero
        location={location}
        checkIn={checkIn}
        checkOut={checkOut}
        guests={guests}
        onLocationChange={setLocation}
        onCheckInChange={setCheckIn}
        onCheckOutChange={setCheckOut}
        onGuestsChange={setGuests}
        onSubmit={handleSubmit}
      />
    );
  }

  if (variant === 'hero') {
    return (
      <SearchBarHero
        location={location}
        checkIn={checkIn}
        checkOut={checkOut}
        guests={guests}
        onLocationChange={setLocation}
        onCheckInChange={setCheckIn}
        onCheckOutChange={setCheckOut}
        onGuestsChange={setGuests}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <SearchBarDefault
      location={location}
      onLocationChange={setLocation}
      onSubmit={handleSubmit}
    />
  );
};

export default SearchBar;
