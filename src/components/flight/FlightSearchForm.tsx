
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane, Calendar, Users, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const FlightSearchForm = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState('one-way');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState('1');

  const handleSwapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleSearch = () => {
    if (!fromLocation || !toLocation || !departureDate) {
      alert('Please fill in all required fields');
      return;
    }

    const searchParams = new URLSearchParams({
      from: fromLocation,
      to: toLocation,
      departure: departureDate,
      passengers: passengers,
      tripType: tripType
    });

    if (tripType === 'round-trip' && returnDate) {
      searchParams.set('return', returnDate);
    }

    navigate(`/flights?${searchParams.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl mx-auto"
    >
      <Card className="overflow-hidden shadow-2xl border-0 bg-white/95 backdrop-blur-lg">
        <CardContent className="p-6 md:p-8">
          {/* Trip Type Selection */}
          <div className="mb-6">
            <RadioGroup
              value={tripType}
              onValueChange={setTripType}
              className="flex flex-wrap gap-6"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* From Location */}
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-2 block">From</Label>
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Departure city"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex items-end justify-center">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleSwapLocations}
                className="h-12 w-12 rounded-full border-gray-300 hover:border-blue-500 hover:bg-blue-50"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
            </div>

            {/* To Location */}
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-2 block">To</Label>
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 rotate-90" />
                <Input
                  type="text"
                  placeholder="Destination city"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Passengers */}
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Passengers</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="number"
                  min="1"
                  max="9"
                  placeholder="1"
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Departure Date */}
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Departure Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* Return Date */}
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Return Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  disabled={tripType === 'one-way'}
                  className="pl-10 h-12 border-gray-300 focus:border-blue-500 disabled:bg-gray-100"
                  min={departureDate || new Date().toISOString().split('T')[0]}
                />
              </div>
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
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FlightSearchForm;
