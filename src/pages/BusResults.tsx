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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Available Buses</h1>
          <p className="text-gray-600">
            {from} <ArrowRight className="inline h-4 w-4 mx-2" /> {to} | {new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>

        <div className="grid gap-4">
          {buses.map((bus, index) => (
            <motion.div
              key={bus.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Bus className="h-5 w-5 text-rose-500" />
                      <h3 className="font-bold text-lg">{bus.operator}</h3>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{bus.type}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-2xl font-bold">{bus.departure}</p>
                        <p className="text-sm text-gray-600">{from}</p>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center">
                        <Clock className="h-4 w-4 text-gray-400 mb-1" />
                        <p className="text-sm text-gray-600">{bus.duration}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold">{bus.arrival}</p>
                        <p className="text-sm text-gray-600">{to}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {bus.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs flex items-center gap-1"
                        >
                          {amenity === 'WiFi' && <Wifi className="h-3 w-3" />}
                          {amenity === 'Charging Point' && <Zap className="h-3 w-3" />}
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-green-600 mt-2">
                      {bus.availableSeats} seats available
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 md:w-48">
                    <div className="flex items-center gap-1">
                      <IndianRupee className="h-5 w-5" />
                      <span className="text-2xl font-bold">{bus.price}</span>
                    </div>
                    
                    <Button
                      onClick={() => navigate(`/bus-booking?busId=${bus.id}&operator=${bus.operator}&from=${from}&to=${to}&date=${date}&price=${bus.price}`)}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {buses.length === 0 && (
          <div className="text-center py-12">
            <Bus className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600">No buses found for this route</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default BusResults;