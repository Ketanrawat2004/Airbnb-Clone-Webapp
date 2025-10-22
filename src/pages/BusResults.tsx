import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Bus, Clock, IndianRupee, ArrowRight, Wifi, Zap } from 'lucide-react';
import { generateRandomBuses } from '@/utils/busGenerator';
import { motion } from 'framer-motion';

const BusResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';
  
  const [buses] = useState(() => generateRandomBuses(from, to, date));

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Search Header */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6 md:mb-8 border border-green-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">Available Buses</h1>
              <div className="flex items-center gap-2 text-sm md:text-base text-gray-600">
                <span className="font-semibold">{from}</span>
                <ArrowRight className="h-4 w-4 text-green-600" />
                <span className="font-semibold">{to}</span>
                <span className="hidden sm:inline">|</span>
                <span className="text-green-600 font-medium">
                  {new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/bus-search')}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              Modify Search
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm md:text-base text-gray-600">
          <span className="font-semibold text-gray-800">{buses.length}</span> buses found
        </div>

        {/* Bus List */}
        <div className="grid gap-4 md:gap-6">
          {buses.map((bus, index) => (
            <motion.div
              key={bus.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-200 bg-white">
                <div className="p-4 md:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6">
                    {/* Bus Info */}
                    <div className="flex-1 space-y-4">
                      {/* Operator and Type */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Bus className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                          <h3 className="font-bold text-lg md:text-xl text-gray-800">{bus.operator}</h3>
                        </div>
                        <p className="text-sm md:text-base text-gray-600 font-medium">{bus.type}</p>
                      </div>
                      
                      {/* Timing Section */}
                      <div className="grid grid-cols-3 gap-2 md:gap-4 py-3 md:py-4 border-y border-gray-100">
                        <div>
                          <p className="text-xl md:text-2xl font-bold text-gray-800">{bus.departure}</p>
                          <p className="text-xs md:text-sm text-gray-600 mt-1">{from}</p>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center">
                          <Clock className="h-4 w-4 text-gray-400 mb-1" />
                          <p className="text-xs md:text-sm text-gray-600 font-medium">{bus.duration}</p>
                          <div className="w-full h-px bg-gray-300 mt-1"></div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-xl md:text-2xl font-bold text-gray-800">{bus.arrival}</p>
                          <p className="text-xs md:text-sm text-gray-600 mt-1">{to}</p>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2">
                        {bus.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="px-2 md:px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs md:text-sm flex items-center gap-1 font-medium border border-green-100"
                          >
                            {amenity === 'WiFi' && <Wifi className="h-3 w-3" />}
                            {amenity === 'Charging Point' && <Zap className="h-3 w-3" />}
                            {amenity}
                          </span>
                        ))}
                      </div>

                      {/* Seats Available */}
                      <p className="text-sm md:text-base text-green-600 font-semibold">
                        {bus.availableSeats} seats available
                      </p>
                    </div>

                    {/* Price and Booking */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 lg:gap-3 lg:w-48 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-gray-100 lg:pl-6">
                      <div className="text-left lg:text-right">
                        <p className="text-xs md:text-sm text-gray-500 mb-1">Starts from</p>
                        <div className="flex items-center gap-1 justify-start lg:justify-end">
                          <IndianRupee className="h-5 w-5 md:h-6 md:w-6 text-gray-800" />
                          <span className="text-2xl md:text-3xl font-bold text-gray-800">{bus.price}</span>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => navigate(`/bus-booking?busId=${bus.id}&operator=${bus.operator}&from=${from}&to=${to}&date=${date}&price=${bus.price}&type=${bus.type}`)}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white h-10 md:h-12 px-6 md:px-8 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full lg:w-auto"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {buses.length === 0 && (
          <div className="text-center py-12 md:py-16 bg-white rounded-xl shadow-md">
            <Bus className="h-16 w-16 md:h-20 md:w-20 mx-auto text-gray-300 mb-4" />
            <p className="text-base md:text-lg text-gray-600">No buses found for this route</p>
            <Button 
              onClick={() => navigate('/bus-search')}
              className="mt-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            >
              Try Another Search
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default BusResults;