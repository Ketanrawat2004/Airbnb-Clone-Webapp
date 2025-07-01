
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Download, QrCode, Calendar, Clock, MapPin, User, Phone, Mail, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
  const [isSharing, setIsSharing] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      toast.loading('Generating your ticket...');
      
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const ticketHTML = generateTicketHTML();
        printWindow.document.write(ticketHTML);
        printWindow.document.close();
        
        printWindow.onload = () => {
          setTimeout(() => {
            printWindow.print();
            toast.success('Ticket generated successfully!');
          }, 500);
        };
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to generate ticket. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Flight Ticket - ${bookingId}`,
          text: `Flight from ${flightData.from} to ${flightData.to} on ${flightData.departureDate}`,
          url: window.location.href,
        });
        toast.success('Ticket details shared successfully!');
      } else {
        await navigator.clipboard.writeText(
          `Flight Ticket ${bookingId}\nFrom: ${flightData.from}\nTo: ${flightData.to}\nDate: ${flightData.departureDate}\nBooking: ${window.location.href}`
        );
        toast.success('Ticket details copied to clipboard!');
      }
    } catch (error) {
      console.error('Share error:', error);
      toast.error('Failed to share ticket details.');
    } finally {
      setIsSharing(false);
    }
  };

  const generateTicketHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Flight E-Ticket - ${bookingId}</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Arial', sans-serif; 
              background: #f5f5f5;
              padding: 20px;
            }
            .ticket-container {
              max-width: 800px;
              margin: 0 auto;
              background: white;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            }
            .airline-header {
              background: linear-gradient(135deg, #dc2626, #b91c1c);
              color: white;
              padding: 20px;
              position: relative;
              overflow: hidden;
            }
            .airline-header::before {
              content: '';
              position: absolute;
              top: -10px;
              right: -10px;
              width: 100px;
              height: 100px;
              background: rgba(255,255,255,0.1);
              border-radius: 50%;
            }
            .airline-logo {
              font-size: 28px;
              font-weight: bold;
              letter-spacing: 2px;
              margin-bottom: 5px;
            }
            .passenger-info {
              background: #fff3cd;
              padding: 15px 20px;
              border-left: 4px solid #ffc107;
            }
            .passenger-name {
              font-size: 18px;
              font-weight: bold;
              color: #333;
              margin-bottom: 5px;
            }
            .booking-ref {
              background: #fff3cd;
              padding: 8px 12px;
              border-radius: 4px;
              font-weight: bold;
              display: inline-block;
              margin-bottom: 5px;
            }
            .ticket-number {
              font-size: 14px;
              color: #666;
            }
            .issuing-office {
              text-align: right;
              color: #666;
            }
            .itinerary-header {
              background: #e9ecef;
              padding: 15px 20px;
              font-weight: bold;
              font-size: 16px;
              color: #333;
              border-bottom: 2px solid #dee2e6;
            }
            .flight-details {
              padding: 20px;
              background: #f8f9fa;
            }
            .flight-row {
              display: grid;
              grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
              gap: 20px;
              align-items: center;
              padding: 15px 0;
              border-bottom: 1px solid #dee2e6;
            }
            .flight-row:last-child {
              border-bottom: none;
            }
            .route-info h3 {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .route-info p {
              font-size: 14px;
              color: #666;
              margin: 2px 0;
            }
            .flight-code {
              font-weight: bold;
              font-size: 16px;
            }
            .time {
              font-size: 18px;
              font-weight: bold;
              color: #333;
            }
            .date {
              font-size: 14px;
              color: #666;
            }
            .barcode-section {
              text-align: right;
              padding: 20px;
            }
            .barcode-placeholder {
              width: 120px;
              height: 60px;
              background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMTIwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjYwIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjQiIHdpZHRoPSIxIiBoZWlnaHQ9IjYwIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjciIHdpZHRoPSIzIiBoZWlnaHQ9IjYwIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSI2MCIgZmlsbD0iYmxhY2siLz48L3N2Zz4=') repeat-x;
              margin-left: auto;
            }
            .additional-info {
              padding: 20px;
              background: #f8f9fa;
              border-top: 1px solid #dee2e6;
            }
            .class-info {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 15px;
              margin-bottom: 20px;
            }
            .info-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 8px 0;
              border-bottom: 1px solid #eee;
            }
            .info-item:last-child {
              border-bottom: none;
            }
            .important-notes {
              background: #fff3cd;
              border: 1px solid #ffc107;
              border-radius: 6px;
              padding: 15px;
              margin-top: 20px;
            }
            .important-notes h4 {
              color: #856404;
              margin-bottom: 10px;
              font-size: 14px;
            }
            .important-notes p {
              font-size: 12px;
              color: #856404;
              line-height: 1.5;
            }
            @media (max-width: 768px) {
              body { padding: 10px; }
              .flight-row {
                grid-template-columns: 1fr;
                gap: 10px;
                text-align: center;
              }
              .class-info {
                grid-template-columns: 1fr;
              }
              .airline-logo {
                font-size: 24px;
              }
            }
          </style>
        </head>
        <body>
          <div class="ticket-container">
            <!-- Airline Header -->
            <div class="airline-header">
              <div class="airline-logo">AIR INDIA</div>
            </div>
            
            <!-- Passenger Information -->
            <div class="passenger-info">
              <div class="passenger-name">
                PASSENGER: ${passengerData[0]?.firstName?.toUpperCase() || 'PASSENGER'} ${passengerData[0]?.lastName?.toUpperCase() || 'NAME'} ${passengerData[0]?.title?.toUpperCase() || 'MR'} (ADT)
              </div>
              <div class="booking-ref">BOOKING REFERENCE: ${bookingId.toUpperCase()}</div>
              <div class="ticket-number">TICKET NUMBER: ${Math.random().toString().slice(2, 15)}</div>
              <div class="issuing-office">
                <strong>Issuing office:</strong><br>
                STAFF ON DUTY DEL OFFICE, TR220123680,<br>
                DELHI<br>
                <strong>Date of issue:</strong> ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/\\s/g, '')}
              </div>
            </div>

            <!-- Itinerary Header -->
            <div class="itinerary-header">
              ELECTRONIC TICKET ITINERARY / RECEIPT
            </div>
            
            <div class="additional-info">
              <p style="font-size: 12px; margin-bottom: 15px; line-height: 1.4;">
                You must present this receipt along with a valid photo identification, mentioned at the time of booking, to enter the airport. We seek your attention to make a note of our Terms and Conditions of Contract at www.airindia.com
              </p>
              <p style="font-size: 12px; margin-bottom: 20px; line-height: 1.4;">
                Web check-in is not permitted for Air India codeshare flight segments operated by Air Asia. Passenger has to get the check-in done for such flights at the Air Asia airport check-in counters.
              </p>
            </div>

            <!-- Flight Details -->
            <div class="flight-details">
              <div class="flight-row" style="background: #e9ecef; font-weight: bold; padding: 10px 0;">
                <div>From</div>
                <div>To</div>
                <div>Flight</div>
                <div>Departure</div>
                <div>Arrival</div>
              </div>
              
              <div class="flight-row">
                <div class="route-info">
                  <h3>${flightData.from} ${flightData.from === 'Delhi' ? 'INDIRA GANDHI INTL' : 'INTERNATIONAL'}</h3>
                  <p>Terminal: ${Math.floor(Math.random() * 3) + 1}</p>
                </div>
                <div class="route-info">
                  <h3>${flightData.to} ${flightData.to === 'Frankfurt' ? 'FRANKFURT INTL' : 'INTERNATIONAL'}</h3>
                  <p>Terminal: ${Math.floor(Math.random() * 3) + 1}</p>
                </div>
                <div class="flight-code">
                  ${flightData.flightNumber || 'AI121'}
                </div>
                <div>
                  <div class="time">${flightData.departureTime || '14:00'}</div>
                  <div class="date">${new Date(flightData.departureDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/\\s/g, '')}</div>
                </div>
                <div>
                  <div class="time">${flightData.arrivalTime || '18:00'}</div>
                  <div class="date">${new Date(flightData.departureDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/\\s/g, '')}</div>
                </div>
              </div>
            </div>

            <!-- Class and Booking Information -->
            <div class="additional-info">
              <div class="class-info">
                <div>
                  <div class="info-item">
                    <span><strong>Class:</strong></span>
                    <span>Y</span>
                  </div>
                  <div class="info-item">
                    <span><strong>Baggage:</strong></span>
                    <span>2PC</span>
                  </div>
                  <div class="info-item">
                    <span><strong>Fare basis:</strong></span>
                    <span>ID00S1</span>
                  </div>
                  <div class="info-item">
                    <span><strong>Flight duration:</strong></span>
                    <span>${flightData.duration || '08:30'}</span>
                  </div>
                </div>
                <div>
                  <div class="info-item">
                    <span><strong>Operated by:</strong></span>
                    <span>AIR INDIA</span>
                  </div>
                  <div class="info-item">
                    <span><strong>Marketed by:</strong></span>
                    <span>AIR INDIA</span>
                  </div>
                  <div class="info-item">
                    <span><strong>Booking status:</strong></span>
                    <span>RQ</span>
                  </div>
                  <div class="info-item">
                    <span><strong>Total Amount:</strong></span>
                    <span>₹${totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <!-- Barcode Section -->
              <div class="barcode-section">
                <div class="barcode-placeholder"></div>
              </div>
            </div>

            <!-- Important Information -->
            <div class="important-notes">
              <h4>Important Travel Information:</h4>
              <p>
                • Please carry a valid photo ID for domestic flights or passport for international flights<br>
                • Web check-in opens 48 hours before departure<br>
                • Arrive at airport at least 2 hours before domestic flights, 3 hours for international<br>
                • Contact: ${contactInfo.phone} | ${contactInfo.email}
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto space-y-6 px-4"
    >
      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-3 justify-end"
      >
        <Button
          onClick={handleShare}
          disabled={isSharing}
          variant="outline"
          className="flex items-center space-x-2 hover:bg-blue-50 transition-all duration-200"
        >
          <Share2 className="h-4 w-4" />
          <span>{isSharing ? 'Sharing...' : 'Share Ticket'}</span>
        </Button>
        
        <Button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Download className="h-4 w-4" />
          <span>{isDownloading ? 'Generating...' : 'Download Ticket'}</span>
        </Button>
      </motion.div>

      {/* Digital Ticket Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Air India Header */}
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

        {/* Passenger Information */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="font-bold text-lg text-gray-900 mb-2">
                PASSENGER: {passengerData[0]?.firstName?.toUpperCase() || 'PASSENGER'} {passengerData[0]?.lastName?.toUpperCase() || 'NAME'} {passengerData[0]?.title?.toUpperCase() || 'MR'} (ADT)
              </div>
              <div className="bg-yellow-200 inline-block px-3 py-1 rounded font-bold text-sm mb-2">
                BOOKING REFERENCE: {bookingId.toUpperCase()}
              </div>
              <div className="text-sm text-gray-600">
                TICKET NUMBER: {Math.random().toString().slice(2, 15)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                <strong>Issuing office:</strong><br />
                STAFF ON DUTY DEL OFFICE, TR220123680,<br />
                DELHI<br />
                <strong>Date of issue:</strong> {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>

        {/* Flight Details */}
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

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Class:</span>
                <span>Y</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Baggage:</span>
                <span>2PC</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Fare basis:</span>
                <span>ID00S1</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Flight duration:</span>
                <span>{flightData.duration || '08:30'}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Operated by:</span>
                <span>AIR INDIA</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Marketed by:</span>
                <span>AIR INDIA</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Booking status:</span>
                <span className="text-green-600 font-semibold">CONFIRMED</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Total Amount:</span>
                <span className="font-bold text-lg text-green-600">₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-3">Important Travel Information:</h4>
            <div className="text-sm text-yellow-700 space-y-1">
              <p>• Please carry a valid photo ID for domestic flights or passport for international flights</p>
              <p>• Web check-in opens 48 hours before departure</p>
              <p>• Arrive at airport at least 2 hours before domestic flights, 3 hours for international</p>
              <p>• Contact: {contactInfo.phone} | {contactInfo.email}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FlightTicket;
