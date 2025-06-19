
import { CreditCard, Shield, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface BookingSummaryProps {
  flight: {
    id: string;
    airline: string;
    from: string;
    to: string;
    duration: string;
    price: number;
  };
  selectedSeat: string;
  selectedMeal: string;
  calculateTotalPrice: () => number;
  onBooking: () => void;
}

const BookingSummary = ({ 
  flight, 
  selectedSeat, 
  selectedMeal, 
  calculateTotalPrice, 
  onBooking 
}: BookingSummaryProps) => {
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

  return (
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
          onClick={onBooking}
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
  );
};

export default BookingSummary;
