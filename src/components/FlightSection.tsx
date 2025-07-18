import { motion } from 'framer-motion';
import { Plane, Calendar, Users, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FlightSearchHome from '@/components/flight/FlightSearchHome';
import { useNavigate } from 'react-router-dom';

const FlightSection = () => {
  const navigate = useNavigate();

  const popularRoutes = [
    {
      from: 'Mumbai',
      to: 'Delhi',
      fromCode: 'BOM',
      toCode: 'DEL',
      duration: '2h 15m',
      price: '₹4,999',
      airline: 'IndiGo',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80'
    },
    {
      from: 'Bangalore',
      to: 'Goa',
      fromCode: 'BLR',
      toCode: 'GOI',
      duration: '1h 30m',
      price: '₹3,799',
      airline: 'SpiceJet',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80'
    },
    {
      from: 'Delhi',
      to: 'Jaipur',
      fromCode: 'DEL',
      toCode: 'JAI',
      duration: '1h 20m',
      price: '₹2,999',
      airline: 'Air India',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80'
    },
    {
      from: 'Chennai',
      to: 'Hyderabad',
      fromCode: 'MAA',
      toCode: 'HYD',
      duration: '1h 45m',
      price: '₹3,499',
      airline: 'Vistara',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const handleRouteClick = (route: any) => {
    const searchParams = new URLSearchParams({
      from: route.from,
      to: route.to,
      departure: new Date().toISOString().split('T')[0],
      passengers: '1',
      tripType: 'one-way'
    });
    navigate(`/flight-results?${searchParams.toString()}`);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Enhanced Background Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(14,165,233,0.08),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(59,130,246,0.06),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(14,165,233,0.02)_49%,rgba(14,165,233,0.02)_51%,transparent_52%)] bg-[length:60px_60px]"></div>
      
      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 3, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-16 right-12 w-24 h-24 bg-gradient-to-br from-sky-200/30 to-blue-300/30 rounded-full blur-xl"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
        className="absolute bottom-24 left-8 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-cyan-300/20 rounded-full blur-2xl"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block p-3 bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 rounded-2xl mb-6 sm:mb-8 shadow-2xl"
          >
            <div className="bg-white rounded-xl px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5">
              <span className="text-sky-600 text-sm sm:text-base font-bold tracking-wider uppercase whitespace-nowrap flex items-center">
                ✈️ Flight Booking
              </span>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 leading-tight px-2"
          >
            <span className="bg-gradient-to-r from-sky-700 via-blue-600 to-cyan-700 bg-clip-text text-transparent block">
              Fly High with
            </span>
            <span className="block text-gray-800 mt-2 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">Best Flight Deals</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed px-4"
          >
            Discover unbeatable flight deals to destinations worldwide. Compare prices, choose your preferred airline, 
            and book with confidence for your next adventure.
          </motion.p>
        </motion.div>

        {/* Flight Search Component */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-20"
        >
          <FlightSearchHome />
        </motion.div>

        {/* Popular Routes */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Popular Flight Routes
            </h3>
            <p className="text-gray-600 text-lg">
              Discover trending destinations with amazing deals
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoutes.map((route, index) => (
              <motion.div
                key={`${route.from}-${route.to}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="group cursor-pointer transition-all duration-500 border-0 shadow-lg hover:shadow-2xl bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden hover:scale-[1.02] relative"
                  onClick={() => handleRouteClick(route)}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={route.image} 
                      alt={`${route.from} to ${route.to}`}
                      className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/70 to-white/50"></div>
                  </div>

                  <CardContent className="p-6 relative z-10">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{route.fromCode}</p>
                          <p className="text-sm text-gray-600">{route.from}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex items-center justify-center">
                            <Plane className="h-4 w-4 text-white rotate-45" />
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </div>
                        
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{route.toCode}</p>
                          <p className="text-sm text-gray-600">{route.to}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{route.duration}</span>
                        </div>
                        <div className="text-gray-600">
                          {route.airline}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-green-600">
                          {route.price}
                        </p>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg"
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
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            onClick={() => navigate('/flights')}
            className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plane className="h-5 w-5 mr-2" />
            Explore All Flights
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FlightSection;