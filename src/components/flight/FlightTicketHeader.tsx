
import { Plane } from 'lucide-react';

const FlightTicketHeader = () => {
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -mr-12 -mt-12"></div>
      <div className="relative z-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wider">AIR INDIA</h1>
        <div className="flex items-center mt-2">
          <Plane className="h-5 w-5 mr-2" />
          <span className="text-sm opacity-90">Electronic Ticket</span>
        </div>
      </div>
    </div>
  );
};

export default FlightTicketHeader;
