interface Train {
  number: string;
  name: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  class: string[];
  price: number;
  availableSeats: number;
}

const trainTypes = ['Rajdhani', 'Shatabdi', 'Duronto', 'Garib Rath', 'Express', 'Superfast', 'Mail'];
const classes = ['1A', '2A', '3A', 'SL', 'CC', '2S'];

export const generateRandomTrains = (from: string, to: string, date: string): Train[] => {
  const trains: Train[] = [];
  const count = Math.floor(Math.random() * 8) + 5; // 5-12 trains

  for (let i = 0; i < count; i++) {
    const trainNumber = `${Math.floor(Math.random() * 90000) + 10000}`;
    const trainType = trainTypes[Math.floor(Math.random() * trainTypes.length)];
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 60);
    const durationHours = Math.floor(Math.random() * 20) + 4;
    
    const departureTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    const arrivalHour = (hour + durationHours) % 24;
    const arrivalTime = `${arrivalHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    
    const basePrice = Math.floor(Math.random() * 2000) + 500;
    const availableClasses = classes.slice(0, Math.floor(Math.random() * 4) + 2);

    trains.push({
      number: trainNumber,
      name: `${trainType} Express`,
      from,
      to,
      departure: departureTime,
      arrival: arrivalTime,
      duration: `${durationHours}h ${Math.floor(Math.random() * 60)}m`,
      class: availableClasses,
      price: basePrice,
      availableSeats: Math.floor(Math.random() * 100) + 20
    });
  }

  return trains.sort((a, b) => a.departure.localeCompare(b.departure));
};