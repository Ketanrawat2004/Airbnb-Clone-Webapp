import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Train, Clock, IndianRupee, ArrowRight } from 'lucide-react';
import { generateRandomTrains } from '@/utils/trainGenerator';
import { motion } from 'framer-motion';

const TrainResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';
  
  const [trains] = useState(() => generateRandomTrains(from, to, date));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Available Trains</h1>
          <p className="text-gray-600">
            {from} <ArrowRight className="inline h-4 w-4 mx-2" /> {to} | {new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>

        <div className="grid gap-4">
          {trains.map((train, index) => (
            <motion.div
              key={train.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Train className="h-5 w-5 text-rose-500" />
                      <h3 className="font-bold text-lg">{train.name}</h3>
                      <span className="text-sm text-gray-500">#{train.number}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-2xl font-bold">{train.departure}</p>
                        <p className="text-sm text-gray-600">{from}</p>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center">
                        <Clock className="h-4 w-4 text-gray-400 mb-1" />
                        <p className="text-sm text-gray-600">{train.duration}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold">{train.arrival}</p>
                        <p className="text-sm text-gray-600">{to}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {train.class.map((cls) => (
                        <span
                          key={cls}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                          {cls}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-green-600 mt-2">
                      {train.availableSeats} seats available
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 md:w-48">
                    <div className="flex items-center gap-1">
                      <IndianRupee className="h-5 w-5" />
                      <span className="text-2xl font-bold">{train.price}</span>
                      <span className="text-sm text-gray-500">onwards</span>
                    </div>
                    
                    <Button
                      onClick={() => navigate(`/train-booking?trainNumber=${train.number}&from=${from}&to=${to}&date=${date}&price=${train.price}`)}
                      className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {trains.length === 0 && (
          <div className="text-center py-12">
            <Train className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600">No trains found for this route</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default TrainResults;