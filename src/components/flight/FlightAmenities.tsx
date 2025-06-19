
import { Check, Wifi, Monitor, Utensils, Coffee, Luggage, Armchair } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FlightAmenities = () => {
  const amenities = [
    { icon: Wifi, name: 'Wi-Fi', available: true },
    { icon: Monitor, name: 'Entertainment', available: true },
    { icon: Utensils, name: 'Meals', available: true },
    { icon: Coffee, name: 'Beverages', available: true },
    { icon: Luggage, name: '20kg Baggage', available: true },
    { icon: Armchair, name: 'Reclining Seats', available: true }
  ];

  return (
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
  );
};

export default FlightAmenities;
