
import { Plane } from 'lucide-react';

interface FlightTicketDetailsProps {
  flightData: any;
}

const FlightTicketDetails = ({ flightData }: FlightTicketDetailsProps) => {
  return (
    <div className="p-4 sm:p-6">
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="font-bold text-lg mb-4 text-center">ELECTRONIC TICKET ITINERARY / RECEIPT</h2>
        
        <div className="text-xs text-gray-600 mb-4 leading-relaxed">
          You must present this receipt along with a valid photo identification, mentioned at the time of booking, to enter the airport. 
          We seek your attention to make a note of our Terms and Conditions of Contract at www.airindia.com
        </div>

        {/* Flight Route */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 text-center border-t border-gray-300 pt-4">
          <div className="lg:col-span-2">
            <div className="font-bold text-lg">{flightData.from}</div>
            <div className="text-sm text-gray-600">
              {flightData.from === 'Delhi' ? 'INDIRA GANDHI INTL' : 'INTERNATIONAL'}
            </div>
            <div className="text-xs text-gray-500">Terminal: {Math.floor(Math.random() * 3) + 1}</div>
          </div>
          
          <div className="flex justify-center items-center">
            <div className="text-center">
              <div className="font-bold text-lg">{flightData.flightNumber || 'AI121'}</div>
              <Plane className="h-6 w-6 mx-auto text-red-600" />
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="font-bold text-lg">{flightData.to}</div>
            <div className="text-sm text-gray-600">
              {flightData.to === 'Frankfurt' ? 'FRANKFURT INTL' : 'INTERNATIONAL'}
            </div>
            <div className="text-xs text-gray-500">Terminal: {Math.floor(Math.random() * 3) + 1}</div>
          </div>
        </div>

        {/* Times */}
        <div className="grid grid-cols-2 gap-4 mt-6 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">{flightData.departureTime || '14:00'}</div>
            <div className="text-sm text-gray-600">
              {new Date(flightData.departureDate).toLocaleDateString('en-GB', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </div>
            <div className="text-xs text-gray-500">Departure</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{flightData.arrivalTime || '18:00'}</div>
            <div className="text-sm text-gray-600">
              {new Date(flightData.departureDate).toLocaleDateString('en-GB', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </div>
            <div className="text-xs text-gray-500">Arrival</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightTicketDetails;
