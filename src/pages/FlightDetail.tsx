import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plane, Clock, MapPin, Users, Calendar, Wifi, Coffee, 
  Monitor, Utensils, ArrowRight, Check, Shield, CreditCard,
  Luggage, Armchair, Info
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FlightDetail = () => {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const [selectedSeat, setSelectedSeat] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('');

  // Demo flight data - in real app, this would come from API
  const flightData = {
    'AI101': {
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
      aircraft: 'Boeing 737-800',
      class: 'Economy',
      seats: 45,
      gate: 'A12',
      terminal: 'Terminal 3'
    }
  };

  const flight = flightData[flightId as keyof typeof flightData] || flightData['AI101'];

  const amenities = [
    { icon: Wifi, name: 'Wi-Fi', available: true },
    { icon: Monitor, name: 'Entertainment', available: true },
    { icon: Utensils, name: 'Meals', available: true },
    { icon: Coffee, name: 'Beverages', available: true },
    { icon: Luggage, name: '20kg Baggage', available: true },
    { icon: Armchair, name: 'Reclining Seats', available: true }
  ];

  const seatOptions = [
    { id: 'economy', name: 'Economy', price: 0, features: ['Standard legroom', 'Overhead storage'] },
    { id: 'premium', name: 'Premium Economy', price: 1500, features: ['Extra legroom', 'Priority boarding', 'Enhanced meals'] },
    { id: 'business', name: 'Business Class', price: 8500, features: ['Lie-flat seats', 'Lounge access', 'Premium dining'] }
  ];

  const mealOptions = [
    { id: 'veg', name: 'Vegetarian', price: 0, description: 'Fresh vegetarian meal with seasonal vegetables' },
    { id: 'non-veg', name: 'Non-Vegetarian', price: 250, description: 'Chicken curry with rice and bread' },
    { id: 'vegan', name: 'Vegan', price: 150, description: 'Plant-based meal with organic ingredients' },
    { id: 'jain', name: 'Jain Vegetarian', price: 200, description: 'Jain-friendly meal without root vegetables' }
  ];

  const calculateTotalPrice = () => {
    let total = flight.price;
    const selectedSeatOption = seatOptions.find(s => s.id === selectedSeat);
    const selectedMealOption = mealOptions.find(m => m.id === selectedMeal);
    
    if (selectedSeatOption) total += selectedSeatOption.price;
    if (selectedMealOption) total += selectedMealOption.price;
    
    return total;
  };

  const handleBooking = () => {
    // In real app, this would handle the booking process
    navigate('/payment-success', { 
      state: { 
        type: 'flight',
        flightId: flight.id,
        price: calculateTotalPrice()
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-25 to-blue-50">
      <Header />
      
      <main className="pt-20">
        {/* Flight Header */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-8 bg-white border-b"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{flight.logo}</div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{flight.airline}</h1>
                  <p className="text-gray-600">{flight.id} • {flight.aircraft}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <Badge variant="secondary" className="text-sm py-1 px-3">
                  {flight.type}
                </Badge>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">₹{flight.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Starting price</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Flight Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Plane className="h-5 w-5 text-blue-600" />
                      <span>Flight Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-3 gap-6 items-center">
                      {/* Departure */}
                      <div className="text-center sm:text-left">
                        <div className="text-3xl font-bold text-gray-900 mb-1">{flight.departure}</div>
                        <div className="text-lg font-medium text-gray-700">{flight.from}</div>
                        <div className="text-sm text-gray-600 mt-2">{flight.terminal}</div>
                        <div className="text-sm text-gray-600">Gate: {flight.gate}</div>
                      </div>
                      
                      {/* Duration */}
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <div className="flex-1 h-1 bg-blue-200 rounded"></div>
                          <Plane className="h-5 w-5 text-blue-500" />
                          <div className="flex-1 h-1 bg-blue-200 rounded"></div>
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        </div>
                        <div className="font-semibold text-gray-700">{flight.duration}</div>
                        <div className="text-sm text-gray-600">{flight.type}</div>
                      </div>
                      
                      {/* Arrival */}
                      <div className="text-center sm:text-right">
                        <div className="text-3xl font-bold text-gray-900 mb-1">{flight.arrival}</div>
                        <div className="text-lg font-medium text-gray-700">{flight.to}</div>
                        <div className="text-sm text-gray-600 mt-2">Terminal 2</div>
                        <div className="text-sm text-gray-600">Baggage: Belt 5</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tabs for Details */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Tabs defaultValue="amenities" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                    <TabsTrigger value="seats">Seats</TabsTrigger>
                    <TabsTrigger value="meals">Meals</TabsTrigger>
                    <TabsTrigger value="baggage">Baggage</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="amenities" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>In-Flight Amenities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {amenities.map((amenity, index) => {
                            const Icon = amenity.icon;
                            return (
                              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <Icon className={`h-5 w-5 ${amenity.available ? 'text-green-600' : 'text-gray-400'}`} />
                                <span className={amenity.available ? 'text-gray-900' : 'text-gray-400'}>
                                  {amenity.name}
                                </span>
                                {amenity.available && <Check className="h-4 w-4 text-green-600 ml-auto" />}
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="seats" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Select Your Seat</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {seatOptions.map((seat) => (
                            <div 
                              key={seat.id}
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                selectedSeat === seat.id 
                                  ? 'border-blue-500 bg-blue-50' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => setSelectedSeat(seat.id)}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold text-lg">{seat.name}</h3>
                                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                                    {seat.features.map((feature, idx) => (
                                      <li key={idx} className="flex items-center space-x-2">
                                        <Check className="h-3 w-3 text-green-600" />
                                        <span>{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold text-blue-600">
                                    {seat.price === 0 ? 'Included' : `+₹${seat.price}`}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="meals" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Pre-order Your Meal</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {mealOptions.map((meal) => (
                            <div 
                              key={meal.id}
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                selectedMeal === meal.id 
                                  ? 'border-blue-500 bg-blue-50' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => setSelectedMeal(meal.id)}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold text-lg">{meal.name}</h3>
                                  <p className="text-sm text-gray-600 mt-1">{meal.description}</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold text-blue-600">
                                    {meal.price === 0 ? 'Included' : `+₹${meal.price}`}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="baggage" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Baggage Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="grid sm:grid-cols-2 gap-6">
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                              <h3 className="font-semibold text-green-800 mb-2">Cabin Baggage</h3>
                              <ul className="text-sm text-green-700 space-y-1">
                                <li>• 7 kg allowed</li>
                                <li>• 55 x 35 x 25 cm</li>
                                <li>• 1 piece included</li>
                              </ul>
                            </div>
                            
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                              <h3 className="font-semibold text-blue-800 mb-2">Check-in Baggage</h3>
                              <ul className="text-sm text-blue-700 space-y-1">
                                <li>• 20 kg included</li>
                                <li>• Additional bags: ₹1,500</li>
                                <li>• Max 32 kg per piece</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-start space-x-2">
                              <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
                              <div>
                                <h4 className="font-semibold text-yellow-800">Important Notes</h4>
                                <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                                  <li>• Liquids must be in containers ≤ 100ml</li>
                                  <li>• Electronics must be easily accessible</li>
                                  <li>• Prohibited items will be confiscated</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>

            {/* Booking Summary Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="sticky top-24"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <span>Booking Summary</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Flight Details */}
                    <div>
                      <h3 className="font-semibold mb-2">{flight.airline}</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex justify-between">
                          <span>Flight:</span>
                          <span>{flight.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Route:</span>
                          <span>{flight.from} → {flight.to}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span>{flight.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Price Breakdown */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Base Fare</span>
                        <span>₹{flight.price.toLocaleString()}</span>
                      </div>
                      
                      {selectedSeat && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Seat Upgrade</span>
                          <span>+₹{seatOptions.find(s => s.id === selectedSeat)?.price || 0}</span>
                        </div>
                      )}
                      
                      {selectedMeal && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Meal</span>
                          <span>+₹{mealOptions.find(m => m.id === selectedMeal)?.price || 0}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-sm">
                        <span>Taxes & Fees</span>
                        <span>₹{Math.round(flight.price * 0.1).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-blue-600">₹{(calculateTotalPrice() + Math.round(flight.price * 0.1)).toLocaleString()}</span>
                    </div>
                    
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                      onClick={handleBooking}
                    >
                      Book Now
                    </Button>
                    
                    {/* Security Features */}
                    <div className="pt-4 border-t">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span>Secure Payment</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-600" />
                        <span>Free Cancellation until 2 hours before departure</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FlightDetail;
