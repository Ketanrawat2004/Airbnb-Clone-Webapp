
import { Plane } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FlightTimelineProps {
  flight: {
    departure: string;
    arrival: string;
    from: string;
    to: string;
    duration: string;
    type: string;
    terminal: string;
    gate: string;
  };
}

const FlightTimeline = ({ flight }: FlightTimelineProps) => {
  return (
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
  );
};

export default FlightTimeline;
