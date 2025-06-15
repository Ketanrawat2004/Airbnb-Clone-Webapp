
import { ParkingCircle, Building, Users, Coffee, Utensils } from 'lucide-react';

interface Hotel {
  parking_available?: boolean;
  business_center?: boolean;
  fitness_center?: boolean;
  spa_services?: boolean;
  restaurant_on_site?: boolean;
  room_service?: boolean;
}

interface HotelServicesProps {
  hotel: Hotel;
}

const HotelServices = ({ hotel }: HotelServicesProps) => {
  const services = [];

  if (hotel.parking_available) {
    services.push({ icon: <ParkingCircle className="h-4 w-4 text-green-600" />, label: 'Parking Available' });
  }
  if (hotel.business_center) {
    services.push({ icon: <Building className="h-4 w-4 text-blue-600" />, label: 'Business Center' });
  }
  if (hotel.fitness_center) {
    services.push({ icon: <Users className="h-4 w-4 text-orange-600" />, label: 'Fitness Center' });
  }
  if (hotel.spa_services) {
    services.push({ icon: <Coffee className="h-4 w-4 text-purple-600" />, label: 'Spa Services' });
  }
  if (hotel.restaurant_on_site) {
    services.push({ icon: <Utensils className="h-4 w-4 text-red-600" />, label: 'Restaurant' });
  }
  if (hotel.room_service) {
    services.push({ icon: <Coffee className="h-4 w-4 text-brown-600" />, label: 'Room Service' });
  }

  if (services.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Services</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {services.map((service, index) => (
          <div key={index} className="flex items-center space-x-2 text-gray-700">
            {service.icon}
            <span className="text-sm">{service.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelServices;
