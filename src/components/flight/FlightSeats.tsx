
import { Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FlightSeatsProps {
  selectedSeat: string;
  onSeatSelect: (seatId: string) => void;
}

const FlightSeats = ({ selectedSeat, onSeatSelect }: FlightSeatsProps) => {
  const seatOptions = [
    { id: 'economy', name: 'Economy', price: 0, features: ['Standard legroom', 'Overhead storage'] },
    { id: 'premium', name: 'Premium Economy', price: 1500, features: ['Extra legroom', 'Priority boarding', 'Enhanced meals'] },
    { id: 'business', name: 'Business Class', price: 8500, features: ['Lie-flat seats', 'Lounge access', 'Premium dining'] }
  ];

  return (
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
              onClick={() => onSeatSelect(seat.id)}
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
  );
};

export default FlightSeats;
