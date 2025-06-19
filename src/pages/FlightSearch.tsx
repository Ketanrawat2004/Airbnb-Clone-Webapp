
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Clock, MapPin, Users, Calendar, Filter, SortAsc } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const FlightSearch = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('price');
  const [filterBy, setFilterBy] = useState('all');

  // Demo flight data
  const flights = [
    {
      id: 'AI101',
      airline: 'Air India',
      logo: '🇮🇳',
      from: 'Delhi (DEL)',
      to: 'Mumbai (BOM)',
      departure: '06:00',
      arrival: '08:30',
      duration: '2h 30m',
      price: 4500,
      type: 'Non-stop',
      aircraft: 'Boeing 737',
      class: 'Economy',
      seats: 45
    },
    {
      id: 'SG205',
      airline: 'SpiceJet',
      logo: '🌶️',
      from: 'Delhi (DEL)',
      to: 'Mumbai (BOM)',
      departure: '09:15',
      arrival: '11:45',
      duration: '2h 30m',
      price: 3800,
      type: 'Non-stop',
      aircraft: 'Boeing 737 MAX',
      class: 'Economy',
      seats: 32
    },
    {
      id: 'IN301',
      airline: 'IndiGo',
      logo: '💙',
      from: 'Delhi (DEL)',
      to: 'Mumbai (BOM)',
      departure: '14:20',
      arrival: '16:50',
      duration: '2h 30m',
      price: 4200,
      type: 'Non-stop',
      aircraft: 'Airbus A320',
      class: 'Economy',
      seats: 28
    },
    {
      id: 'UK505',
      airline: 'Vistara',
      logo: '✈️',
      from: 'Delhi (DEL)',
      to: 'Mumbai (BOM)',
      departure: '18:30',
      arrival: '21:00',
      duration: '2h 30m',
      price: 5200,
      type: 'Non-stop',
      aircraft: 'Airbus A321',
      class: 'Premium Economy',
      seats: 18
    },
    {
      id: 'AI203',
      airline: 'Air India',
      logo: '🇮🇳',
      from: 'Delhi (DEL)',
      to: 'Mumbai (BOM)',
      departure: '21:45',
      arrival: '00:15+1',
      duration: '2h 30m',
      price: 4100,
      type: 'Non-stop',
      aircraft: 'Boeing 787',
      class: 'Economy',
      seats: 52
    }
  ];

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'duration') return a.duration.localeCompare(b.duration);
    if (sortBy === 'departure') return a.departure.localeCompare(b.departure);
    return 0;
  });

  const handleFlightSelect = (flightId: string) => {
    navigate(`/flight/${flightId}`);
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
                Delhi → Mumbai • Today • 1 Passenger
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
                <span className="font-medium text-gray-900">Filters:</span>
                <div className="flex flex-wrap gap-2">
                  {['all', 'non-stop', 'morning', 'afternoon', 'evening'].map((filter) => (
                    <Button
                      key={filter}
                      variant={filterBy === filter ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterBy(filter)}
                      className="capitalize"
                    >
                      {filter.replace('-', ' ')}
                    </Button>
                  ))}
                </div>
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
            <div className="mb-6">
              <p className="text-gray-600">
                Found <span className="font-semibold text-blue-600">{flights.length} flights</span> for your search
              </p>
            </div>
            
            <div className="space-y-4">
              {sortedFlights.map((flight, index) => (
                <motion.div
                  key={flight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                        onClick={() => handleFlightSelect(flight.id)}>
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
                            <Badge variant="secondary" className="self-start sm:self-center">
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
                            onClick={() => handleFlightSelect(flight.id)}
                          >
                            Select Flight
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

export default FlightSearch;
