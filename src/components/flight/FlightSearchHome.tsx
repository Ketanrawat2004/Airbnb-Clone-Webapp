
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import CityAutocomplete from '@/components/flight/CityAutocomplete';

const FlightSearchHome = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState('one-way');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState('1');

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fromCity || !toCity || !departureDate) {
      alert('Please fill in all required fields');
      return;
    }

    const searchParams = new URLSearchParams({
      from: fromCity,
      to: toCity,
      departure: departureDate,
      passengers: passengers,
      tripType: tripType
    });

    if (tripType === 'round-trip' && returnDate) {
      searchParams.set('return', returnDate);
    }

    navigate(`/flight-results?${searchParams.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-200 p-6"
    >
      {/* Trip Type Selection */}
      <div className="mb-6">
        <RadioGroup
          value={tripType}
          onValueChange={setTripType}
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="one-way" id="one-way" />
            <Label htmlFor="one-way" className="text-sm font-medium">One Way</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="round-trip" id="round-trip" />
            <Label htmlFor="round-trip" className="text-sm font-medium">Round Trip</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Search Form */}
      <div className="space-y-4">
        {/* From and To Cities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">From</Label>
            <CityAutocomplete
              value={fromCity}
              onChange={setFromCity}
              placeholder="Departure city"
            />
          </div>

          <div className="flex items-end justify-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleSwapCities}
              className="h-10 w-10 rounded-full"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">To</Label>
            <CityAutocomplete
              value={toCity}
              onChange={setToCity}
              placeholder="Destination city"
            />
          </div>
        </div>

        {/* Dates and Passengers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Departure Date</Label>
            <Input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="h-12"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Return Date</Label>
            <Input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              disabled={tripType === 'one-way'}
              className="h-12 disabled:bg-gray-100"
              min={departureDate || new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Passengers</Label>
            <Input
              type="number"
              min="1"
              max="9"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="h-12"
            />
          </div>
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plane className="h-5 w-5 mr-2" />
          Search Flights
        </Button>
      </div>
    </motion.div>
  );
};

export default FlightSearchHome;
