interface Bus {
  id: string;
  operator: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  type: string;
  price: number;
  availableSeats: number;
  amenities: string[];
}

const operators = ['RedBus', 'VRL Travels', 'SRS Travels', 'Sharma Travels', 'Orange Travels', 'KPN Travels'];
const busTypes = ['AC Sleeper', 'Non-AC Sleeper', 'AC Seater', 'Non-AC Seater', 'Volvo AC', 'Multi-Axle'];
const amenities = ['WiFi', 'Charging Point', 'Water Bottle', 'Blanket', 'Pillow', 'Emergency Exit'];

export const generateRandomBuses = (from: string, to: string, date: string): Bus[] => {
  const buses: Bus[] = [];
  const count = Math.floor(Math.random() * 10) + 6; // 6-15 buses

  for (let i = 0; i < count; i++) {
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 60);
    const durationHours = Math.floor(Math.random() * 12) + 3;
    
    const departureTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    const arrivalHour = (hour + durationHours) % 24;
    const arrivalTime = `${arrivalHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const type = busTypes[Math.floor(Math.random() * busTypes.length)];
    const basePrice = Math.floor(Math.random() * 1500) + 300;
    const selectedAmenities = amenities.slice(0, Math.floor(Math.random() * 4) + 2);

    buses.push({
      id: `BUS${Math.floor(Math.random() * 10000)}`,
      operator,
      from,
      to,
      departure: departureTime,
      arrival: arrivalTime,
      duration: `${durationHours}h ${Math.floor(Math.random() * 60)}m`,
      type,
      price: basePrice,
      availableSeats: Math.floor(Math.random() * 40) + 10,
      amenities: selectedAmenities
    });
  }

  return buses.sort((a, b) => a.departure.localeCompare(b.departure));
};