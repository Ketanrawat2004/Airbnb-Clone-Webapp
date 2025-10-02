import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, ArrowLeftRight } from 'lucide-react';
import { indianCities } from '@/data/indianCities';

const BusSearchForm = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const filteredFromCities = indianCities.filter(city =>
    city.name.toLowerCase().includes(from.toLowerCase())
  );

  const filteredToCities = indianCities.filter(city =>
    city.name.toLowerCase().includes(to.toLowerCase())
  );

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (from && to && date) {
      navigate(`/bus-results?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}`);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Label htmlFor="from">From City</Label>
          <Input
            id="from"
            type="text"
            placeholder="Enter city"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            onFocus={() => setShowFromSuggestions(true)}
            onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
            required
          />
          {showFromSuggestions && from && filteredFromCities.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-auto">
              {filteredFromCities.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => {
                    setFrom(city.name);
                    setShowFromSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  {city.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-end justify-center">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleSwap}
            className="mb-1"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative">
          <Label htmlFor="to">To City</Label>
          <Input
            id="to"
            type="text"
            placeholder="Enter city"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            onFocus={() => setShowToSuggestions(true)}
            onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
            required
          />
          {showToSuggestions && to && filteredToCities.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-auto">
              {filteredToCities.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => {
                    setTo(city.name);
                    setShowToSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  {city.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Journey Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={minDate}
            required
          />
        </div>

        <div className="flex items-end">
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
          >
            <Search className="h-4 w-4 mr-2" />
            Search Buses
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BusSearchForm;