
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Download, QrCode, Calendar, Clock, MapPin, User, Phone, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FlightTicketProps {
  bookingId: string;
  flightData: any;
  passengerData: any[];
  contactInfo: any;
  totalAmount: number;
  paymentId?: string;
}

const FlightTicket = ({ bookingId, flightData, passengerData, contactInfo, totalAmount, paymentId }: FlightTicketProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Create a printable version
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const ticketHTML = generateTicketHTML();
        printWindow.document.write(ticketHTML);
        printWindow.document.close();
        printWindow.print();
      }
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const generateTicketHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Flight Ticket - ${bookingId}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .ticket { border: 2px solid #2563eb; border-radius: 12px; padding: 20px; max-width: 800px; margin: 0 auto; }
            .header { text-align: center; border-bottom: 2px dashed #2563eb; padding-bottom: 20px; margin-bottom: 20px; }
            .flight-info { display: flex; justify-content: space-between; margin: 20px 0; }
            .passenger-info { margin: 20px 0; }
            .booking-details { background: #f3f4f6; padding: 10px; border-radius: 8px; margin: 10px 0; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="ticket">
            <div class="header">
              <h1>✈️ Flight E-Ticket</h1>
              <h2>Booking ID: ${bookingId}</h2>
              <p>Issued on: ${new Date().toLocaleDateString()}</p>
            </div>
            
            <div class="flight-info">
              <div>
                <h3>📍 From: ${flightData.from}</h3>
                <p>Departure: ${flightData.departureDate}</p>
                <p>Time: ${flightData.departureTime || '20:00'}</p>
              </div>
              <div style="text-align: center;">
                <h3>✈️ ${flightData.airline}</h3>
                <p>Flight: ${flightData.flightNumber || 'AI 2809'}</p>
              </div>
              <div style="text-align: right;">
                <h3>📍 To: ${flightData.to}</h3>
                <p>Arrival: ${flightData.departureDate}</p>
                <p>Time: ${flightData.arrivalTime || '23:00'}</p>
              </div>
            </div>
            
            <div class="passenger-info">
              <h3>👥 Passenger Details</h3>
              ${passengerData.map((passenger, index) => `
                <div class="booking-details">
                  <strong>Passenger ${index + 1}:</strong> ${passenger.title} ${passenger.firstName} ${passenger.lastName}<br>
                  <strong>Email:</strong> ${passenger.email}<br>
                  <strong>Phone:</strong> ${passenger.phone}
                </div>
              `).join('')}
            </div>
            
            <div class="booking-details">
              <h3>💳 Payment Details</h3>
              <p><strong>Total Amount:</strong> ₹${totalAmount.toLocaleString()}</p>
              <p><strong>Payment ID:</strong> ${paymentId || 'DEMO_PAYMENT'}</p>
              <p><strong>Status:</strong> Confirmed ✅</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p><strong>Important:</strong> Please carry a valid photo ID for domestic flights or passport for international flights.</p>
              <p>Check-in opens 2 hours before departure. Arrive at airport at least 2 hours before domestic flights.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto space-y-6 px-4"
    >
      {/* Download Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
        >
          <Download className="h-4 w-4" />
          <span>{isDownloading ? 'Generating...' : 'Download Ticket'}</span>
        </Button>
      </div>

      {/* Digital Ticket */}
      <Card className="border-2 border-blue-200 shadow-xl">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Plane className="h-8 w-8" />
                <div>
                  <h1 className="text-2xl font-bold">Flight E-Ticket</h1>
                  <p className="text-blue-100">Booking Confirmed ✅</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{bookingId}</div>
                <div className="text-sm text-blue-100">Booking ID</div>
              </div>
            </div>
          </div>

          {/* Flight Information */}
          <div className="p-6 border-b-2 border-dashed border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-semibold text-gray-700">From</span>
                </div>
                <div className="text-xl font-bold text-gray-900">{flightData.from}</div>
                <div className="text-sm text-gray-600">{flightData.departureDate}</div>
                <div className="text-sm text-gray-600">{flightData.departureTime || '20:00'}</div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center space-x-2 mb-2">
                  <Plane className="h-6 w-6 text-blue-600" />
                  <div className="font-bold text-lg">{flightData.airline}</div>
                </div>
                <div className="text-sm text-gray-600">Flight {flightData.flightNumber || 'AI 2809'}</div>
                <div className="text-sm text-gray-600">Duration: 3h 0m</div>
              </div>

              <div>
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-semibold text-gray-700">To</span>
                </div>
                <div className="text-xl font-bold text-gray-900">{flightData.to}</div>
                <div className="text-sm text-gray-600">{flightData.departureDate}</div>
                <div className="text-sm text-gray-600">{flightData.arrivalTime || '23:00'}</div>
              </div>
            </div>
          </div>

          {/* Passenger Information */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Passenger Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {passengerData.map((passenger, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-semibold text-gray-900 mb-2">
                    Passenger {index + 1}: {passenger.title} {passenger.firstName} {passenger.lastName}
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {passenger.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {passenger.phone}
                    </div>
                    {passenger.nationality && (
                      <div>Nationality: {passenger.nationality}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Details */}
          <div className="p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Booking Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Booking Date:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contact Phone:</span>
                    <span>{contactInfo.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contact Email:</span>
                    <span>{contactInfo.email}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Payment Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-bold text-lg">₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment ID:</span>
                    <span className="text-xs">{paymentId || 'DEMO_PAYMENT'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-600 font-semibold">Confirmed ✅</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="p-6 bg-blue-50 border-t">
            <h4 className="font-semibold text-blue-900 mb-3">Important Information</h4>
            <div className="text-sm text-blue-800 space-y-2">
              <p>• Please carry a valid photo ID for domestic flights or passport for international flights</p>
              <p>• Web check-in opens 48 hours before departure</p>
              <p>• Arrive at airport at least 2 hours before domestic flights, 3 hours for international</p>
              <p>• Baggage allowance: 15kg check-in + 7kg cabin baggage</p>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="p-4 text-center border-t border-dashed border-gray-300">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <QrCode className="h-5 w-5" />
              <span className="text-sm">Scan QR code at airport for quick check-in</span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Booking Reference: {bookingId}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FlightTicket;
