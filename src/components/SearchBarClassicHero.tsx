
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabNavigation from '@/components/search/TabNavigation';
import LocationInput from '@/components/search/LocationInput';
import DateInput from '@/components/search/DateInput';
import GuestInput from '@/components/search/GuestInput';
import SearchButton from '@/components/search/SearchButton';
import FlightSearchHome from '@/components/flight/FlightSearchHome';

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

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'flights') {
      // Don't navigate anywhere for flights, let FlightSearchHome handle it
      return;
    } else {
      // Handle hotel search
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmitForm} className="w-full">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'flights' ? (
        <FlightSearchHome />
      ) : (
        <div className="flex flex-col sm:flex-row bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-200">
          <LocationInput
            value={location}
            onChange={onLocationChange}
            label="Where"
            placeholder="Search hotels or destinations"
            variant="hotel"
          />

          <DateInput
            value={checkIn}
            onChange={onCheckInChange}
            label="Check in"
          />

          <DateInput
            value={checkOut}
            onChange={onCheckOutChange}
            label="Check out"
          />

          <GuestInput
            value={guests}
            onChange={onGuestsChange}
            label="Guests"
            placeholder="Add guests"
          />

          <SearchButton onSubmit={() => handleSubmitForm(new Event('submit') as any)} />
        </div>
      )}
    </form>
  );
};

export default SearchBarClassicHero;
