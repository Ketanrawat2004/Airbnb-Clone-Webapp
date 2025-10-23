import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Train, Calendar, MapPin, Users, ArrowRight, Clock, IndianRupee } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const TrainSection = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    if (from && to && date) {
      const params = new URLSearchParams({
        from,
        to,
        date
      });
      navigate(`/train-results?${params.toString()}`);
    }
  };

  const popularRoutes = [
    { from: 'Delhi', to: 'Mumbai', duration: '16h', price: '₹850' },
    { from: 'Mumbai', to: 'Bangalore', duration: '24h', price: '₹1200' },
    { from: 'Delhi', to: 'Kolkata', duration: '18h', price: '₹950' },
    { from: 'Chennai', to: 'Hyderabad', duration: '14h', price: '₹750' }
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-orange-50 via-white to-orange-50 mt-6">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-4 md:mb-6">
            <Train className="h-8 w-8 md:h-10 md:w-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
            Book Train Tickets
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Travel across India with comfort and convenience
          </p>
        </motion.div>

        {/* Search Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-5xl mx-auto mb-8 md:mb-12"
        >
          <Card className="p-4 md:p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              {/* From */}
              <div className="space-y-2">
                <Label htmlFor="train-from" className="text-sm font-semibold text-gray-700 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-orange-500" />
                  From
                </Label>
                <Input
                  id="train-from"
                  placeholder="Delhi"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="h-12 md:h-14 text-base border-2 focus:border-orange-500"
                />
              </div>

              {/* To */}
              <div className="space-y-2">
                <Label htmlFor="train-to" className="text-sm font-semibold text-gray-700 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-orange-500" />
                  To
                </Label>
                <Input
                  id="train-to"
                  placeholder="Mumbai"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="h-12 md:h-14 text-base border-2 focus:border-orange-500"
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="train-date" className="text-sm font-semibold text-gray-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                  Journey Date
                </Label>
                <Input
                  id="train-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="h-12 md:h-14 text-base border-2 focus:border-orange-500"
                />
              </div>

              {/* Search Button */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-transparent select-none hidden md:block">
                  Search
                </Label>
                <Button
                  onClick={handleSearch}
                  className="w-full h-12 md:h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Train className="h-5 w-5 mr-2" />
                  Search Trains
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Popular Routes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center text-gray-800">
            Popular Train Routes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularRoutes.map((route, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="p-4 md:p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-orange-500 bg-white">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="font-bold text-base md:text-lg text-gray-800 mb-1">{route.from}</div>
                      <div className="flex items-center text-orange-500 my-2">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                      <div className="font-bold text-base md:text-lg text-gray-800">{route.to}</div>
                    </div>
                    <Train className="h-8 w-8 text-orange-500" />
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mt-3 pt-3 border-t">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {route.duration}
                    </div>
                    <div className="flex items-center font-semibold text-orange-600">
                      {route.price}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 md:mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="text-center p-4 md:p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-orange-100 rounded-full mb-3 md:mb-4">
                <Train className="h-6 w-6 md:h-8 md:w-8 text-orange-600" />
              </div>
              <h4 className="font-bold text-base md:text-lg mb-2">IRCTC Authorized</h4>
              <p className="text-sm text-gray-600">Book tickets directly through official IRCTC partner</p>
            </div>
            <div className="text-center p-4 md:p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-orange-100 rounded-full mb-3 md:mb-4">
                <IndianRupee className="h-6 w-6 md:h-8 md:w-8 text-orange-600" />
              </div>
              <h4 className="font-bold text-base md:text-lg mb-2">Best Prices</h4>
              <p className="text-sm text-gray-600">Get the best deals on train bookings</p>
            </div>
            <div className="text-center p-4 md:p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-orange-100 rounded-full mb-3 md:mb-4">
                <Clock className="h-6 w-6 md:h-8 md:w-8 text-orange-600" />
              </div>
              <h4 className="font-bold text-base md:text-lg mb-2">24/7 Support</h4>
              <p className="text-sm text-gray-600">Round the clock customer assistance</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainSection;
