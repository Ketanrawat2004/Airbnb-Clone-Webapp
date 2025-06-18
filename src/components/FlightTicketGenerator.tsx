
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Plane, Clock, MapPin, User, Calendar, Ticket } from 'lucide-react';

interface FlightTicketData {
  bookingReference: string;
  passengerName: string;
  flightNumber: string;
  airline: string;
  departure: {
    city: string;
    airport: string;
    code: string;
    time: string;
    date: string;
    terminal?: string;
    gate?: string;
  };
  arrival: {
    city: string;
    airport: string;
    code: string;
    time: string;
    date: string;
    terminal?: string;
    gate?: string;
  };
  seatNumber: string;
  class: string;
  duration: string;
  aircraft: string;
  totalAmount: number;
  bookingDate: string;
  passengerPhone: string;
  passengerEmail: string;
}

interface FlightTicketGeneratorProps {
  flightData: FlightTicketData;
}

const FlightTicketGenerator = ({ flightData }: FlightTicketGeneratorProps) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  const downloadTicket = () => {
    if (ticketRef.current) {
      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Flight Ticket - ${flightData.bookingReference}</title>
              <style>
                body { 
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                  margin: 0; 
                  padding: 20px; 
                  background: #f5f5f5;
                }
                .ticket { 
                  background: white; 
                  max-width: 800px; 
                  margin: 0 auto; 
                  border-radius: 12px;
                  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                  overflow: hidden;
                }
                .ticket-header {
                  background: linear-gradient(135deg, #e11d48, #f43f5e);
                  color: white;
                  padding: 20px;
                  text-align: center;
                }
                .ticket-body {
                  padding: 30px;
                }
                .flight-info {
                  display: grid;
                  grid-template-columns: 1fr auto 1fr;
                  gap: 20px;
                  align-items: center;
                  margin: 20px 0;
                  padding: 20px;
                  background: #f8fafc;
                  border-radius: 8px;
                }
                .location {
                  text-align: center;
                }
                .city-code {
                  font-size: 2rem;
                  font-weight: bold;
                  color: #1e293b;
                }
                .city-name {
                  color: #64748b;
                  margin-top: 5px;
                }
                .flight-path {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-direction: column;
                  color: #64748b;
                }
                .details-grid {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                  gap: 20px;
                  margin: 20px 0;
                }
                .detail-item {
                  padding: 15px;
                  border: 1px solid #e2e8f0;
                  border-radius: 8px;
                  background: #ffffff;
                }
                .detail-label {
                  font-size: 0.875rem;
                  color: #64748b;
                  margin-bottom: 5px;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                }
                .detail-value {
                  font-weight: 600;
                  color: #1e293b;
                }
                .barcode {
                  text-align: center;
                  margin: 20px 0;
                  padding: 20px;
                  background: #f1f5f9;
                  border-radius: 8px;
                }
                .barcode-lines {
                  font-family: 'Courier New', monospace;
                  font-size: 2rem;
                  letter-spacing: 2px;
                  color: #1e293b;
                }
                @media print {
                  body { background: white; padding: 0; }
                  .no-print { display: none; }
                }
              </style>
            </head>
            <body>
              ${ticketRef.current.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div ref={ticketRef} className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Plane className="h-8 w-8" />
            <h1 className="text-2xl md:text-3xl font-bold">Flight Ticket</h1>
          </div>
          <p className="text-rose-100">Booking Reference: {flightData.bookingReference}</p>
        </div>

        {/* Ticket Body */}
        <div className="p-6 md:p-8">
          {/* Passenger Information */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <User className="h-5 w-5 mr-2 text-rose-500" />
              Passenger Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold text-gray-900">{flightData.passengerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-900">{flightData.passengerPhone}</p>
              </div>
            </div>
          </div>

          {/* Flight Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <Plane className="h-5 w-5 mr-2 text-rose-500" />
              Flight Details
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center bg-gray-50 p-6 rounded-xl">
              {/* Departure */}
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {flightData.departure.code}
                </div>
                <div className="text-gray-600 mb-2">{flightData.departure.city}</div>
                <div className="text-sm text-gray-500">{flightData.departure.airport}</div>
                <div className="mt-3">
                  <div className="text-xl font-semibold text-gray-900">{flightData.departure.time}</div>
                  <div className="text-sm text-gray-600">{flightData.departure.date}</div>
                </div>
                {flightData.departure.terminal && (
                  <div className="text-sm text-gray-500 mt-2">Terminal {flightData.departure.terminal}</div>
                )}
              </div>

              {/* Flight Path */}
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                  <div className="w-12 h-px bg-gray-300"></div>
                  <Plane className="h-5 w-5 text-rose-500" />
                  <div className="w-12 h-px bg-gray-300"></div>
                </div>
                <div className="text-sm text-gray-500">{flightData.duration}</div>
                <div className="text-sm font-medium text-gray-700">{flightData.flightNumber}</div>
                <div className="text-xs text-gray-500">{flightData.airline}</div>
              </div>

              {/* Arrival */}
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {flightData.arrival.code}
                </div>
                <div className="text-gray-600 mb-2">{flightData.arrival.city}</div>
                <div className="text-sm text-gray-500">{flightData.arrival.airport}</div>
                <div className="mt-3">
                  <div className="text-xl font-semibold text-gray-900">{flightData.arrival.time}</div>
                  <div className="text-sm text-gray-600">{flightData.arrival.date}</div>
                </div>
                {flightData.arrival.terminal && (
                  <div className="text-sm text-gray-500 mt-2">Terminal {flightData.arrival.terminal}</div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Seat</div>
              <div className="font-semibold text-gray-900">{flightData.seatNumber}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Class</div>
              <div className="font-semibold text-gray-900">{flightData.class}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Aircraft</div>
              <div className="font-semibold text-gray-900">{flightData.aircraft}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Total Paid</div>
              <div className="font-semibold text-rose-600">₹{flightData.totalAmount.toLocaleString('en-IN')}</div>
            </div>
          </div>

          {/* Barcode Section */}
          <div className="text-center bg-gray-50 p-6 rounded-lg mb-6">
            <div className="text-sm text-gray-600 mb-3">Boarding Pass Barcode</div>
            <div className="font-mono text-2xl tracking-widest text-gray-900 mb-2">
              |||||| |||| ||||| || |||||| |||| |||||
            </div>
            <div className="text-xs text-gray-500">{flightData.bookingReference}</div>
          </div>

          {/* Important Information */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-yellow-800 mb-2">Important Information</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Please arrive at the airport at least 2 hours before departure</li>
              <li>• Check-in closes 45 minutes before departure</li>
              <li>• Valid photo ID required for boarding</li>
              <li>• This is a dummy ticket for demonstration purposes only</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 text-center text-sm text-gray-600">
          <p>Booking Date: {flightData.bookingDate} | Contact: support@airbnbclone.com</p>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center mt-6">
        <Button onClick={downloadTicket} className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3">
          <Download className="h-5 w-5 mr-2" />
          Download Ticket
        </Button>
      </div>
    </div>
  );
};

export default FlightTicketGenerator;
