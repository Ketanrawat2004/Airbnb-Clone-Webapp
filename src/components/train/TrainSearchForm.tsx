import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeftRight, Calendar, Train } from 'lucide-react';
import { indianCities } from '@/data/indianCities';

const TrainSearchForm = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [trainClass, setTrainClass] = useState('All Classes');
  const [quota, setQuota] = useState('GENERAL');
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  const filteredFromCities = from.length >= 2 ? indianCities.filter(city =>
    city.name.toLowerCase().includes(from.toLowerCase()) ||
    city.code.toLowerCase().includes(from.toLowerCase())
  ).slice(0, 8) : [];

  const filteredToCities = to.length >= 2 ? indianCities.filter(city =>
    city.name.toLowerCase().includes(to.toLowerCase()) ||
    city.code.toLowerCase().includes(to.toLowerCase())
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
    setFrom(`${city.name} (${city.code})`);
    setShowFromSuggestions(false);
  };

  const handleToSelect = (city: typeof indianCities[0]) => {
    setTo(`${city.name} (${city.code})`);
    setShowToSuggestions(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (from && to && date) {
      const fromCity = from.includes('(') ? from.split(' (')[0] : from;
      const toCity = to.includes('(') ? to.split(' (')[0] : to;
      navigate(`/train-results?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&date=${date}&class=${trainClass}&quota=${quota}`);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 space-y-6 border border-gray-100">
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          BOOK TRAIN TICKET
        </h2>
        <p className="text-sm md:text-base text-gray-600 mt-2">Search trains across India</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* From Station */}
        <div className="relative" ref={fromRef}>
          <Label htmlFor="from" className="text-sm font-semibold text-gray-700 mb-2 block">
            From
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
            placeholder="Enter station name or code"
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
                  <div className="text-sm text-gray-600">{city.code}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date */}
        <div>
          <Label htmlFor="date" className="text-sm font-semibold text-gray-700 mb-2 block">
            DD/MM/YYYY *
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
          title="Swap stations"
        >
          <ArrowLeftRight className="h-5 w-5 text-primary" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* To Station */}
        <div className="relative" ref={toRef}>
          <Label htmlFor="to" className="text-sm font-semibold text-gray-700 mb-2 block">
            To
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
            placeholder="Enter station name or code"
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
                  <div className="text-sm text-gray-600">{city.code}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* All Classes */}
        <div>
          <Label htmlFor="class" className="text-sm font-semibold text-gray-700 mb-2 block">
            All Classes
          </Label>
          <Select value={trainClass} onValueChange={setTrainClass}>
            <SelectTrigger className="w-full border-2 border-gray-300 focus:border-primary h-12 text-base">
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Classes">All Classes</SelectItem>
              <SelectItem value="1A">1A - First AC</SelectItem>
              <SelectItem value="2A">2A - Second AC</SelectItem>
              <SelectItem value="3A">3A - Third AC</SelectItem>
              <SelectItem value="SL">SL - Sleeper</SelectItem>
              <SelectItem value="CC">CC - AC Chair Car</SelectItem>
              <SelectItem value="2S">2S - Second Seating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quota */}
      <div>
        <Label htmlFor="quota" className="text-sm font-semibold text-gray-700 mb-2 block">
          Quota
        </Label>
        <Select value={quota} onValueChange={setQuota}>
          <SelectTrigger className="w-full border-2 border-gray-300 focus:border-primary h-12 text-base">
            <SelectValue placeholder="GENERAL" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GENERAL">GENERAL</SelectItem>
            <SelectItem value="LADIES">LADIES</SelectItem>
            <SelectItem value="LOWER BERTH">LOWER BERTH</SelectItem>
            <SelectItem value="SENIOR CITIZEN">SENIOR CITIZEN</SelectItem>
            <SelectItem value="TATKAL">TATKAL</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Additional Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="disability" />
          <label htmlFor="disability" className="text-sm font-medium text-gray-700 cursor-pointer">
            Person With Disability Concession
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="flexible" />
          <label htmlFor="flexible" className="text-sm font-medium text-gray-700 cursor-pointer">
            Flexible With Date
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="berth" />
          <label htmlFor="berth" className="text-sm font-medium text-gray-700 cursor-pointer">
            Train with Available Berth
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="railpass" />
          <label htmlFor="railpass" className="text-sm font-medium text-gray-700 cursor-pointer">
            Railway Pass Concession
          </label>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-12 md:h-14 text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
        disabled={!from || !to || !date}
      >
        <Train className="mr-2 h-5 w-5" />
        Search Trains
      </Button>
    </form>
  );
};

export default TrainSearchForm;
