
import { useRef, useEffect, useState } from 'react';
import { MapPin, Calendar, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
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
  const { locationSuggestions, showSuggestions, setShowSuggestions, isLoadingSuggestions } = useLocationSuggestions(location);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(
    checkIn ? new Date(checkIn) : undefined
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    checkOut ? new Date(checkOut) : undefined
  );
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);

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

  const handleCheckInSelect = (date: Date | undefined) => {
    setCheckInDate(date);
    if (date) {
      onCheckInChange(format(date, 'yyyy-MM-dd'));
      // If check-out date is before check-in date, reset it
      if (checkOutDate && date >= checkOutDate) {
        setCheckOutDate(undefined);
        onCheckOutChange('');
      }
    } else {
      onCheckInChange('');
    }
    setCheckInOpen(false);
  };

  const handleCheckOutSelect = (date: Date | undefined) => {
    setCheckOutDate(date);
    if (date) {
      onCheckOutChange(format(date, 'yyyy-MM-dd'));
    } else {
      onCheckOutChange('');
    }
    setCheckOutOpen(false);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSubmit();
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <form onSubmit={handleSubmitForm} className="flex flex-1 items-center gap-2 w-full">
      {/* Location */}
      <div className="flex-1 flex items-center gap-2 px-2 py-2 sm:py-3 relative" ref={suggestionRef}>
        <MapPin className="h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Where are you"
          className="rounded-md bg-gray-100 border-0 text-gray-700 placeholder:text-gray-400 px-3 py-2 w-full focus:ring-0 focus:outline-none focus:bg-white min-w-[100px] max-w-full"
          value={location}
          onChange={handleLocationInputChange}
          onFocus={() => location.length >= 2 && setShowSuggestions(true)}
        />
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 z-50">
            <LocationSuggestions
              suggestions={locationSuggestions}
              isLoading={isLoadingSuggestions}
              onSelect={handleLocationSelect}
            />
          </div>
        )}
      </div>

      {/* Check-in */}
      <div className="flex-1 flex items-center gap-2 px-2 py-2 sm:py-3 border-l border-gray-200">
        <Calendar className="h-5 w-5 text-gray-400" />
        <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-normal px-3 py-2 h-auto bg-gray-100 hover:bg-white border-0 rounded-md min-w-[90px]",
                !checkInDate && "text-gray-400"
              )}
            >
              {checkInDate ? format(checkInDate, "dd-MM-yyyy") : "dd-mm-yyyy"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={checkInDate}
              onSelect={handleCheckInSelect}
              disabled={(date) => date < today}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Check-out */}
      <div className="flex-1 flex items-center gap-2 px-2 py-2 sm:py-3 border-l border-gray-200">
        <Calendar className="h-5 w-5 text-gray-400" />
        <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-normal px-3 py-2 h-auto bg-gray-100 hover:bg-white border-0 rounded-md min-w-[90px]",
                !checkOutDate && "text-gray-400"
              )}
            >
              {checkOutDate ? format(checkOutDate, "dd-MM-yyyy") : "dd-mm-yyyy"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={checkOutDate}
              onSelect={handleCheckOutSelect}
              disabled={(date) => date < (checkInDate || tomorrow)}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Guests */}
      <div className="flex-1 flex items-center gap-2 px-2 py-2 sm:py-3 border-l border-gray-200">
        <Users className="h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Guests"
          className="rounded-md bg-gray-100 border-0 text-gray-700 placeholder:text-gray-400 px-3 py-2 w-full focus:ring-0 focus:outline-none focus:bg-white min-w-[50px] max-w-full"
          value={guests}
          onChange={(e) => onGuestsChange(e.target.value)}
          inputMode="numeric"
          min="1"
        />
      </div>

      {/* Search Button */}
      <div className="pl-2 flex-shrink-0">
        <Button type="submit" className="bg-[#f65073] hover:bg-[#db3358] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md transition">
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default SearchBarClassicHero;
