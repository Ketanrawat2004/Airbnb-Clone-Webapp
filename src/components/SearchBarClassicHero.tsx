
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabNavigation from '@/components/search/TabNavigation';
import LocationInput from '@/components/search/LocationInput';
import DateInput from '@/components/search/DateInput';
import GuestInput from '@/components/search/GuestInput';
import SearchButton from '@/components/search/SearchButton';

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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'hotels' | 'flights'>('hotels');
  const [destination, setDestination] = useState('');

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'flights') {
      // Navigate to flight search with parameters
      const searchParams = new URLSearchParams();
      if (location) searchParams.set('from', location);
      if (destination) searchParams.set('to', destination);
      if (checkIn) searchParams.set('departure', checkIn);
      if (checkOut) searchParams.set('return', checkOut);
      if (guests) searchParams.set('passengers', guests);
      
      navigate(`/flights?${searchParams.toString()}`);
    } else {
      // Handle hotel search
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmitForm} className="w-full">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex flex-col sm:flex-row bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-200">
        <LocationInput
          value={location}
          onChange={onLocationChange}
          label={activeTab === 'hotels' ? 'Where' : 'From'}
          placeholder={activeTab === 'hotels' ? 'Search destinations' : 'Departure city'}
        />

        {activeTab === 'flights' && (
          <LocationInput
            value={destination}
            onChange={setDestination}
            label="To"
            placeholder="Destination city"
          />
        )}

        <DateInput
          value={checkIn}
          onChange={onCheckInChange}
          label={activeTab === 'hotels' ? 'Check in' : 'Departure'}
        />

        <DateInput
          value={checkOut}
          onChange={onCheckOutChange}
          label={activeTab === 'hotels' ? 'Check out' : 'Return'}
        />

        <GuestInput
          value={guests}
          onChange={onGuestsChange}
          label={activeTab === 'hotels' ? 'Guests' : 'Passengers'}
          placeholder={activeTab === 'hotels' ? 'Add guests' : 'Add passengers'}
        />

        <SearchButton onSubmit={() => handleSubmitForm(new Event('submit') as any)} />
      </div>
    </form>
  );
};

export default SearchBarClassicHero;
