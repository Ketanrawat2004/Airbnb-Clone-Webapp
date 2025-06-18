
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Building2, Calendar, User, MapPin, Phone, Mail, Bed, Users } from 'lucide-react';

interface HotelTicketData {
  bookingReference: string;
  guestName: string;
  hotelName: string;
  hotelAddress: string;
  hotelPhone: string;
  hotelEmail: string;
  checkIn: {
    date: string;
    time: string;
  };
  checkOut: {
    date: string;
    time: string;
  };
  roomType: string;
  guests: number;
  nights: number;
  totalAmount: number;
  bookingDate: string;
  guestPhone: string;
  guestEmail: string;
  roomNumber?: string;
  amenities: string[];
  policies: string[];
}

interface HotelTicketGeneratorProps {
  hotelData: HotelTicketData;
}

const HotelTicketGenerator = ({ hotelData }: HotelTicketGeneratorProps) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  const downloadTicket = () => {
    if (ticketRef.current) {
      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Hotel Booking Confirmation - ${hotelData.bookingReference}</title>
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
                .stay-info {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 20px;
                  margin: 20px 0;
                  padding: 20px;
                  background: #f8fafc;
                  border-radius: 8px;
                }
                .check-info {
                  text-align: center;
                  padding: 15px;
                  border: 1px solid #e2e8f0;
                  border-radius: 8px;
                  background: white;
                }
                .date {
                  font-size: 1.5rem;
                  font-weight: bold;
                  color: #1e293b;
                }
                .time {
                  color: #64748b;
                  margin-top: 5px;
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
            <Building2 className="h-8 w-8" />
            <h1 className="text-2xl md:text-3xl font-bold">Hotel Booking Confirmation</h1>
          </div>
          <p className="text-rose-100">Confirmation Number: {hotelData.bookingReference}</p>
        </div>

        {/* Ticket Body */}
        <div className="p-6 md:p-8">
          {/* Guest Information */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <User className="h-5 w-5 mr-2 text-rose-500" />
              Guest Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold text-gray-900">{hotelData.guestName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-900">{hotelData.guestPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">{hotelData.guestEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Guests</p>
                <p className="font-semibold text-gray-900">{hotelData.guests} {hotelData.guests === 1 ? 'Guest' : 'Guests'}</p>
              </div>
            </div>
          </div>

          {/* Hotel Information */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-rose-500" />
              Hotel Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Hotel Name</p>
                <p className="font-semibold text-gray-900">{hotelData.hotelName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-semibold text-gray-900">{hotelData.hotelAddress}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-900">{hotelData.hotelPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">{hotelData.hotelEmail}</p>
              </div>
            </div>
          </div>

          {/* Stay Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-rose-500" />
              Stay Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl">
              {/* Check-in */}
              <div className="text-center bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-2">Check-in</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{hotelData.checkIn.date}</div>
                <div className="text-gray-600">{hotelData.checkIn.time}</div>
              </div>

              {/* Check-out */}
              <div className="text-center bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-2">Check-out</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{hotelData.checkOut.date}</div>
                <div className="text-gray-600">{hotelData.checkOut.time}</div>
              </div>
            </div>

            <div className="text-center mt-4 p-3 bg-rose-50 rounded-lg">
              <span className="text-rose-700 font-semibold">{hotelData.nights} {hotelData.nights === 1 ? 'Night' : 'Nights'}</span>
            </div>
          </div>

          {/* Room Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Room Type</div>
              <div className="font-semibold text-gray-900">{hotelData.roomType}</div>
            </div>
            {hotelData.roomNumber && (
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Room Number</div>
                <div className="font-semibold text-gray-900">{hotelData.roomNumber}</div>
              </div>
            )}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Total Amount</div>
              <div className="font-semibold text-rose-600 text-lg">₹{hotelData.totalAmount.toLocaleString('en-IN')}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Booking Date</div>
              <div className="font-semibold text-gray-900">{hotelData.bookingDate}</div>
            </div>
          </div>

          {/* Amenities */}
          {hotelData.amenities.length > 0 && (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Included Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {hotelData.amenities.map((amenity, index) => (
                  <div key={index} className="text-sm text-gray-600">• {amenity}</div>
                ))}
              </div>
            </div>
          )}

          {/* Barcode Section */}
          <div className="text-center bg-gray-50 p-6 rounded-lg mb-6">
            <div className="text-sm text-gray-600 mb-3">Booking Reference Barcode</div>
            <div className="font-mono text-2xl tracking-widest text-gray-900 mb-2">
              |||||| |||| ||||| || |||||| |||| |||||
            </div>
            <div className="text-xs text-gray-500">{hotelData.bookingReference}</div>
          </div>

          {/* Policies */}
          {hotelData.policies.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">Hotel Policies</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                {hotelData.policies.map((policy, index) => (
                  <li key={index}>• {policy}</li>
                ))}
                <li>• This is a dummy booking confirmation for demonstration purposes only</li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 text-center text-sm text-gray-600">
          <p>For assistance, contact us at support@airbnbclone.com or call +1 (555) 123-4567</p>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center mt-6">
        <Button onClick={downloadTicket} className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3">
          <Download className="h-5 w-5 mr-2" />
          Download Confirmation
        </Button>
      </div>
    </div>
  );
};

export default HotelTicketGenerator;
