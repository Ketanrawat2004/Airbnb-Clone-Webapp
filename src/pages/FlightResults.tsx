
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, Clock, Users, Calendar, Filter, SortAsc } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FlightResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('price');

  const fromLocation = searchParams.get('from') || '';
  const toLocation = searchParams.get('to') || '';
  const departureDate = searchParams.get('departure') || '';
  const passengers = searchParams.get('passengers') || '1';
  const tripType = searchParams.get('tripType') || 'one-way';

  // Generate demo flights based on search parameters
  const generateFlights = () => {
    const airlines = [
      { name: 'Air India', logo: '🇮🇳', code: 'AI' },
      { name: 'SpiceJet', logo: '🌶️', code: 'SG' },
      { name: 'IndiGo', logo: '💙', code: 'IN' },
      { name: 'Vistara', logo: '✈️', code: 'UK' },
      { name: 'GoAir', logo: '🔵', code: 'GO' }
    ];

    const aircraft = ['Boeing 737', 'Airbus A320', 'Boeing 777', 'Airbus A350'];
    
    return airlines.map((airline, index) => {
      const basePrice = 3500 + (index * 500) + Math.floor(Math.random() * 2000);
      const departureHour = 6 + (index * 3);
      const arrivalHour = departureHour + 2 + Math.floor(Math.random() * 2);
      
      return {
        id: `${airline.code}${100 + index}`,
        airline: airline.name,
        logo: airline.logo,
        from: fromLocation,
        to: toLocation,
        departure: `${String(departureHour).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        arrival: `${String(arrivalHour).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        duration: `${2 + Math.floor(Math.random() * 2)}h ${Math.floor(Math.random() * 60)}m`,
        price: basePrice,
        type: Math.random() > 0.3 ? 'Non-stop' : '1 Stop',
        aircraft: aircraft[Math.floor(Math.random() * aircraft.length)],
        class: index === 3 ? 'Premium Economy' : 'Economy',
        seats: Math.floor(Math.random() * 50) + 10,
        departureDate,
        passengers
      };
    });
  };

  const flights = generateFlights();
  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'duration') return a.duration.localeCompare(b.duration);
    if (sortBy === 'departure') return a.departure.localeCompare(b.departure);
    return 0;
  });

  const handleFlightSelect = (flight: any) => {
    navigate('/flight-booking', { state: { flightData: flight } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-25 to-blue-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative py-16 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center text-white max-w-4xl mx-auto">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl md:text-5xl font-bold mb-4"
              >
                Flight Search Results
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl"
              >
                {fromLocation} → {toLocation} • {departureDate} • {passengers} Passenger{parseInt(passengers) > 1 ? 's' : ''}
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Filters and Sort */}
        <section className="py-6 border-b bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-900">
                  Found <span className="text-blue-600">{flights.length} flights</span>
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <SortAsc className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-900">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white"
                >
                  <option value="price">Price</option>
                  <option value="duration">Duration</option>
                  <option value="departure">Departure Time</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Flight Results */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="space-y-4">
              {sortedFlights.map((flight, index) => (
                <motion.div
                  key={flight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                        onClick={() => handleFlightSelect(flight)}>
                    <CardContent className="p-0">
                      <div className="flex flex-col lg:flex-row">
                        {/* Flight Info */}
                        <div className="flex-1 p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                            <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                              <div className="text-2xl">{flight.logo}</div>
                              <div>
                                <h3 className="font-bold text-lg text-gray-900">{flight.airline}</h3>
                                <p className="text-sm text-gray-600">{flight.id} • {flight.aircraft}</p>
                              </div>
                            </div>
                            <Badge variant="secondary">
                              {flight.type}
                            </Badge>
                          </div>
                          
                          {/* Route and Time */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                            {/* Departure */}
                            <div className="text-center sm:text-left">
                              <div className="text-2xl font-bold text-gray-900">{flight.departure}</div>
                              <div className="text-sm text-gray-600">{flight.from}</div>
                            </div>
                            
                            {/* Duration */}
                            <div className="text-center">
                              <div className="flex items-center justify-center space-x-2 mb-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <div className="flex-1 h-0.5 bg-blue-200"></div>
                                <Plane className="h-4 w-4 text-blue-500" />
                                <div className="flex-1 h-0.5 bg-blue-200"></div>
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              </div>
                              <div className="text-sm font-medium text-gray-700">{flight.duration}</div>
                            </div>
                            
                            {/* Arrival */}
                            <div className="text-center sm:text-right">
                              <div className="text-2xl font-bold text-gray-900">{flight.arrival}</div>
                              <div className="text-sm text-gray-600">{flight.to}</div>
                            </div>
                          </div>
                          
                          {/* Additional Info */}
                          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{flight.seats} seats left</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Badge variant="outline">{flight.class}</Badge>
                            </div>
                          </div>
                        </div>
                        
                        {/* Price and Book */}
                        <div className="bg-gray-50 lg:bg-transparent p-6 lg:p-6 lg:w-48 flex lg:flex-col items-center lg:items-end justify-between lg:justify-center border-t lg:border-t-0 lg:border-l">
                          <div className="text-center lg:text-right mb-4 lg:mb-6">
                            <div className="text-3xl font-bold text-blue-600">₹{flight.price.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">per person</div>
                          </div>
                          <Button 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                            onClick={() => handleFlightSelect(flight)}
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FlightResults;
