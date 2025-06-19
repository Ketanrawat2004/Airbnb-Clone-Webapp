
import { Badge } from '@/components/ui/badge';

interface FlightHeaderProps {
  flight: {
    id: string;
    airline: string;
    logo: string;
    aircraft: string;
    price: number;
    type: string;
  };
}

const FlightHeader = ({ flight }: FlightHeaderProps) => {
  return (
    <section className="py-8 bg-white border-b">
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
    </section>
  );
};

export default FlightHeader;
