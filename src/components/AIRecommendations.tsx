import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { 
  Sparkles, 
  MapPin, 
  Star, 
  DollarSign, 
  Clock,
  TrendingUp,
  Users,
  RefreshCw
} from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'hotel' | 'destination' | 'deal';
  title: string;
  description: string;
  price?: string;
  rating?: number;
  location?: string;
  image: string;
  badge?: string;
  savings?: string;
}

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const generateRecommendations = async () => {
    setIsLoading(true);
    
    try {
      // Fetch real hotels from database
      const { data: hotels, error: hotelsError } = await supabase
        .from('hotels')
        .select('*')
        .limit(2);

      // Fetch flight bookings to suggest destinations
      const { data: flightBookings, error: flightError } = await supabase
        .from('flight_bookings')
        .select('flight_data')
        .limit(5);

      if (hotelsError) {
        console.error('Error fetching hotels:', hotelsError);
      }

      if (flightError) {
        console.error('Error fetching flight bookings:', flightError);
      }

      const newRecommendations: Recommendation[] = [];

      // Add real hotels
      if (hotels && hotels.length > 0) {
        hotels.forEach((hotel, index) => {
          newRecommendations.push({
            id: hotel.id,
            type: 'hotel',
            title: hotel.name,
            description: hotel.description || 'Experience luxury and comfort in this beautiful accommodation.',
            price: `₹${Math.round(hotel.price_per_night / 100)}/night`,
            rating: hotel.rating || 4.5,
            location: hotel.location,
            image: hotel.images?.[0] || '/lovable-uploads/4cf76ed1-188e-407a-a627-7e7f28d404c2.png',
            badge: 'AI Recommended',
            savings: index === 0 ? 'Save 25%' : undefined
          });
        });
      }

      // Add popular destinations based on flight data
      if (flightBookings && flightBookings.length > 0) {
        const destinations = new Set();
        flightBookings.forEach(booking => {
          if (booking.flight_data?.destination && !destinations.has(booking.flight_data.destination)) {
            destinations.add(booking.flight_data.destination);
            newRecommendations.push({
              id: `dest-${booking.flight_data.destination}`,
              type: 'destination',
              title: `Trending: ${booking.flight_data.destination}`,
              description: 'Popular destination based on recent bookings. Great traveler satisfaction.',
              location: booking.flight_data.destination,
              image: '/lovable-uploads/b3051839-645e-4f8b-8045-36ce18dd3695.png',
              badge: 'Trending Now'
            });
          }
        });
      }

      // Add a deal if we don't have enough recommendations
      if (newRecommendations.length < 3) {
        newRecommendations.push({
          id: 'deal-1',
          type: 'deal',
          title: 'Weekend Flash Sale',
          description: 'Limited time offer on premium hotels. Book now for exclusive savings.',
          price: 'From ₹3,999',
          location: 'Multiple Cities',
          image: '/src/assets/profile-placeholder.jpg',
          badge: 'Flash Deal',
          savings: 'Up to 40% off'
        });
      }

      setRecommendations(newRecommendations.slice(0, 3));
    } catch (error) {
      console.error('Error generating recommendations:', error);
      // Fallback to sample data
      setRecommendations([{
        id: 'fallback-1',
        type: 'deal',
        title: 'Weekend Flash Sale',
        description: 'Limited time offer on premium hotels. Book now for exclusive savings.',
        price: 'From ₹3,999',
        location: 'Multiple Cities',
        image: '/src/assets/profile-placeholder.jpg',
        badge: 'Flash Deal',
        savings: 'Up to 40% off'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateRecommendations();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center items-center space-x-3 mb-4"
          >
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
              <Sparkles className="h-8 w-8 text-white animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
              AI-Powered Recommendations
            </h2>
          </motion.div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover personalized travel suggestions powered by artificial intelligence, 
            tailored to your preferences and trending destinations.
          </p>
          
          <Button
            onClick={generateRecommendations}
            variant="outline"
            className="mt-4 border-purple-300 text-purple-600 hover:bg-purple-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-4 w-4 border-2 border-purple-600 border-t-transparent rounded-full mr-2"
              />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Generate New Recommendations
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((recommendation, index) => (
            <motion.div
              key={recommendation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass-effect border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="relative">
                  <img
                    src={recommendation.image}
                    alt={recommendation.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge 
                      className={`${
                        recommendation.type === 'hotel' 
                          ? 'bg-blue-500' 
                          : recommendation.type === 'destination'
                          ? 'bg-green-500'
                          : 'bg-orange-500'
                      } text-white`}
                    >
                      {recommendation.badge}
                    </Badge>
                  </div>
                  {recommendation.savings && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-red-500 text-white animate-pulse">
                        {recommendation.savings}
                      </Badge>
                    </div>
                  )}
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {recommendation.title}
                      </CardTitle>
                      {recommendation.location && (
                        <div className="flex items-center space-x-1 text-gray-600 mt-1">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{recommendation.location}</span>
                        </div>
                      )}
                    </div>
                    {recommendation.rating && (
                      <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{recommendation.rating}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-700">
                    {recommendation.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between">
                    {recommendation.price && (
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-600">{recommendation.price}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      {recommendation.type === 'hotel' && (
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>Popular</span>
                        </div>
                      )}
                      {recommendation.type === 'destination' && (
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-4 w-4" />
                          <span>Trending</span>
                        </div>
                      )}
                      {recommendation.type === 'deal' && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Limited Time</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300"
                    onClick={() => {
                      if (recommendation.type === 'hotel') {
                        window.location.href = '/search';
                      } else if (recommendation.type === 'destination') {
                        window.location.href = `/search?location=${encodeURIComponent(recommendation.location || '')}`;
                      } else {
                        window.location.href = '/search';
                      }
                    }}
                  >
                    {recommendation.type === 'hotel' ? 'View Hotel' : 
                     recommendation.type === 'destination' ? 'Explore Destination' : 
                     'View Deals'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* AI Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Card className="glass-effect border-white/30 shadow-xl max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2">
                <Sparkles className="h-6 w-6 text-purple-600" />
                <span>How Our AI Works</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Analyze Preferences</h3>
                  <p className="text-sm text-gray-600">
                    Our AI studies your booking history and browsing patterns
                  </p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="h-6 w-6 text-pink-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Trend Analysis</h3>
                  <p className="text-sm text-gray-600">
                    Identifies popular destinations and seasonal travel patterns
                  </p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="h-6 w-6 text-rose-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Personalized Results</h3>
                  <p className="text-sm text-gray-600">
                    Delivers tailored recommendations just for you
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AIRecommendations;