
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FlightHeader from '@/components/flight/FlightHeader';
import FlightTimeline from '@/components/flight/FlightTimeline';
import FlightAmenities from '@/components/flight/FlightAmenities';
import FlightSeats from '@/components/flight/FlightSeats';
import FlightMeals from '@/components/flight/FlightMeals';
import FlightBaggage from '@/components/flight/FlightBaggage';
import BookingSummary from '@/components/flight/BookingSummary';

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

  const seatOptions = [
    { id: 'economy', name: 'Economy', price: 0 },
    { id: 'premium', name: 'Premium Economy', price: 1500 },
    { id: 'business', name: 'Business Class', price: 8500 }
  ];

  const mealOptions = [
    { id: 'veg', name: 'Vegetarian', price: 0 },
    { id: 'non-veg', name: 'Non-Vegetarian', price: 250 },
    { id: 'vegan', name: 'Vegan', price: 150 },
    { id: 'jain', name: 'Jain Vegetarian', price: 200 }
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FlightHeader flight={flight} />
        </motion.div>

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
                <FlightTimeline flight={flight} />
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
                    <FlightAmenities />
                  </TabsContent>
                  
                  <TabsContent value="seats" className="mt-6">
                    <FlightSeats 
                      selectedSeat={selectedSeat}
                      onSeatSelect={setSelectedSeat}
                    />
                  </TabsContent>
                  
                  <TabsContent value="meals" className="mt-6">
                    <FlightMeals 
                      selectedMeal={selectedMeal}
                      onMealSelect={setSelectedMeal}
                    />
                  </TabsContent>
                  
                  <TabsContent value="baggage" className="mt-6">
                    <FlightBaggage />
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
                <BookingSummary 
                  flight={flight}
                  selectedSeat={selectedSeat}
                  selectedMeal={selectedMeal}
                  calculateTotalPrice={calculateTotalPrice}
                  onBooking={handleBooking}
                />
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
