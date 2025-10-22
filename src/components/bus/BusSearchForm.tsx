import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeftRight, Calendar, Bus } from 'lucide-react';
import { indianCities } from '@/data/indianCities';

const BusSearchForm = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [busType, setBusType] = useState('All Types');
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  const filteredFromCities = from.length >= 2 ? indianCities.filter(city =>
    city.name.toLowerCase().includes(from.toLowerCase())
  ).slice(0, 8) : [];

  const filteredToCities = to.length >= 2 ? indianCities.filter(city =>
    city.name.toLowerCase().includes(to.toLowerCase())
  ).slice(0, 8) : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromSuggestions(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleFromSelect = (city: typeof indianCities[0]) => {
    setFrom(city.name);
    setShowFromSuggestions(false);
  };

  const handleToSelect = (city: typeof indianCities[0]) => {
    setTo(city.name);
    setShowToSuggestions(false);
  };

  const handleSearch = () => {
    if (from && to && date) {
      const fromCity = from.includes('(') ? from.split(' (')[0] : from;
      const toCity = to.includes('(') ? to.split(' (')[0] : to;
      navigate(`/bus-results?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&date=${date}&type=${busType}`);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 space-y-6 border border-gray-100">
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
          BOOK BUS TICKET
        </h2>
        <p className="text-sm md:text-base text-gray-600 mt-2">Search and book bus tickets across India</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* From City */}
        <div className="relative" ref={fromRef}>
          <Label htmlFor="from" className="text-sm font-semibold text-gray-700 mb-2 block">
            From City
          </Label>
          <Input
            id="from"
            type="text"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setShowFromSuggestions(true);
            }}
            onFocus={() => from.length >= 2 && setShowFromSuggestions(true)}
            placeholder="Enter city name"
            className="w-full border-2 border-gray-300 focus:border-primary h-12 text-base"
          />
          {showFromSuggestions && filteredFromCities.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredFromCities.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => handleFromSelect(city)}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-medium text-gray-900">{city.name}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date */}
        <div>
          <Label htmlFor="date" className="text-sm font-semibold text-gray-700 mb-2 block">
            Journey Date *
          </Label>
          <div className="relative">
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={minDate}
              className="w-full border-2 border-gray-300 focus:border-primary h-12 text-base"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={handleSwap}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="Swap cities"
        >
          <ArrowLeftRight className="h-5 w-5 text-primary" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* To City */}
        <div className="relative" ref={toRef}>
          <Label htmlFor="to" className="text-sm font-semibold text-gray-700 mb-2 block">
            To City
          </Label>
          <Input
            id="to"
            type="text"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setShowToSuggestions(true);
            }}
            onFocus={() => to.length >= 2 && setShowToSuggestions(true)}
            placeholder="Enter city name"
            className="w-full border-2 border-gray-300 focus:border-primary h-12 text-base"
          />
          {showToSuggestions && filteredToCities.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredToCities.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => handleToSelect(city)}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-medium text-gray-900">{city.name}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bus Type */}
        <div>
          <Label htmlFor="busType" className="text-sm font-semibold text-gray-700 mb-2 block">
            Bus Type
          </Label>
          <Select value={busType} onValueChange={setBusType}>
            <SelectTrigger className="w-full border-2 border-gray-300 focus:border-primary h-12 text-base">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Types">All Types</SelectItem>
              <SelectItem value="AC Sleeper">AC Sleeper</SelectItem>
              <SelectItem value="Non-AC Sleeper">Non-AC Sleeper</SelectItem>
              <SelectItem value="AC Seater">AC Seater</SelectItem>
              <SelectItem value="Non-AC Seater">Non-AC Seater</SelectItem>
              <SelectItem value="Volvo AC">Volvo AC</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        onClick={handleSearch}
        className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 h-12 md:h-14 text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
        disabled={!from || !to || !date}
      >
        <Bus className="mr-2 h-5 w-5" />
        Search Buses
      </Button>
    </div>
  );
};

export default BusSearchForm;
