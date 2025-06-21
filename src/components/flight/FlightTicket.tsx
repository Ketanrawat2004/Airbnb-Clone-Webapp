
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
      
      // Create a printable version
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const ticketHTML = generateTicketHTML();
        printWindow.document.write(ticketHTML);
        printWindow.document.close();
        
        // Wait for images and styles to load
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
        // Fallback to clipboard
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
          <title>Flight Ticket - ${bookingId}</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Arial', sans-serif; 
              line-height: 1.6;
              color: #333;
              background: #f8fafc;
              padding: 20px;
            }
            .ticket { 
              background: white;
              border: 2px solid #2563eb; 
              border-radius: 16px; 
              padding: 30px; 
              max-width: 800px; 
              margin: 0 auto;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            }
            .header { 
              text-align: center; 
              border-bottom: 2px dashed #2563eb; 
              padding-bottom: 25px; 
              margin-bottom: 25px;
              background: linear-gradient(135deg, #3b82f6, #06b6d4);
              color: white;
              margin: -30px -30px 25px -30px;
              padding: 30px;
              border-radius: 14px 14px 0 0;
            }
            .header h1 { font-size: 28px; margin-bottom: 8px; }
            .header h2 { font-size: 20px; margin-bottom: 5px; }
            .flight-info { 
              display: grid;
              grid-template-columns: 1fr auto 1fr;
              gap: 20px;
              align-items: center;
              margin: 25px 0;
              padding: 20px;
              background: #f8fafc;
              border-radius: 12px;
            }
            .flight-location { text-align: center; }
            .flight-location h3 { font-size: 24px; margin-bottom: 8px; color: #1e40af; }
            .flight-location p { margin: 4px 0; color: #64748b; }
            .flight-center { 
              text-align: center; 
              padding: 0 20px;
              border-left: 2px solid #e2e8f0;
              border-right: 2px solid #e2e8f0;
            }
            .flight-center h3 { color: #2563eb; margin-bottom: 5px; }
            .passenger-info { margin: 25px 0; }
            .passenger-info h3 { 
              color: #1e40af; 
              margin-bottom: 15px; 
              font-size: 18px;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .passenger-card { 
              background: #f1f5f9; 
              padding: 15px; 
              border-radius: 8px; 
              margin: 10px 0;
              border-left: 4px solid #3b82f6;
            }
            .booking-details { 
              background: #eff6ff; 
              padding: 20px; 
              border-radius: 12px; 
              margin: 20px 0;
            }
            .booking-details h3 { 
              color: #1e40af; 
              margin-bottom: 15px;
              font-size: 18px;
            }
            .detail-grid { 
              display: grid; 
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
              gap: 20px; 
            }
            .detail-item { display: flex; justify-content: space-between; margin: 8px 0; }
            .detail-item strong { color: #374151; }
            .important-notes { 
              background: #fef3c7; 
              border: 1px solid #f59e0b;
              border-radius: 8px; 
              padding: 20px; 
              margin: 20px 0; 
            }
            .important-notes h4 { color: #92400e; margin-bottom: 12px; }
            .important-notes ul { padding-left: 20px; }
            .important-notes li { margin: 8px 0; color: #92400e; }
            .qr-section { 
              text-align: center; 
              border-top: 2px dashed #d1d5db; 
              padding-top: 20px; 
              margin-top: 20px;
            }
            .status-badge { 
              background: #10b981; 
              color: white; 
              padding: 6px 12px; 
              border-radius: 20px; 
              font-size: 14px; 
              font-weight: bold;
            }
            @media print { 
              body { background: white; padding: 10px; }
              .ticket { box-shadow: none; border: 1px solid #ccc; }
            }
            @media (max-width: 768px) {
              .flight-info { grid-template-columns: 1fr; gap: 15px; }
              .flight-center { border: none; border-top: 2px solid #e2e8f0; border-bottom: 2px solid #e2e8f0; padding: 15px 0; }
              .detail-grid { grid-template-columns: 1fr; }
            }
          </style>
        </head>
        <body>
          <div class="ticket">
            <div class="header">
              <h1>✈️ Flight E-Ticket</h1>
              <h2>Booking ID: ${bookingId}</h2>
              <p>Issued on: ${new Date().toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
              <div style="margin-top: 10px;">
                <span class="status-badge">Confirmed ✅</span>
              </div>
            </div>
            
            <div class="flight-info">
              <div class="flight-location">
                <h3>📍 ${flightData.from}</h3>
                <p><strong>Date:</strong> ${flightData.departureDate}</p>
                <p><strong>Time:</strong> ${flightData.departureTime || '20:00'}</p>
                <p><strong>Terminal:</strong> T3</p>
              </div>

              <div class="flight-center">
                <h3>✈️ ${flightData.airline}</h3>
                <p><strong>Flight:</strong> ${flightData.flightNumber || 'AI 2809'}</p>
                <p><strong>Aircraft:</strong> ${flightData.aircraft || 'Boeing 777'}</p>
                <p><strong>Duration:</strong> ${flightData.duration || '3h 0m'}</p>
              </div>

              <div class="flight-location">
                <h3>📍 ${flightData.to}</h3>
                <p><strong>Date:</strong> ${flightData.departureDate}</p>
                <p><strong>Time:</strong> ${flightData.arrivalTime || '23:00'}</p>
                <p><strong>Terminal:</strong> T2</p>
              </div>
            </div>
            
            <div class="passenger-info">
              <h3>👥 Passenger Details</h3>
              ${passengerData.map((passenger, index) => `
                <div class="passenger-card">
                  <strong>Passenger ${index + 1}:</strong> ${passenger.title} ${passenger.firstName} ${passenger.lastName}<br>
                  <strong>📧 Email:</strong> ${passenger.email}<br>
                  <strong>📱 Phone:</strong> ${passenger.phone}<br>
                  ${passenger.nationality ? `<strong>🌍 Nationality:</strong> ${passenger.nationality}<br>` : ''}
                  ${passenger.passportNumber ? `<strong>📄 Passport:</strong> ${passenger.passportNumber}` : ''}
                </div>
              `).join('')}
            </div>
            
            <div class="booking-details">
              <h3>💳 Payment & Booking Details</h3>
              <div class="detail-grid">
                <div>
                  <div class="detail-item">
                    <span>Booking Date:</span>
                    <strong>${new Date().toLocaleDateString('en-IN')}</strong>
                  </div>
                  <div class="detail-item">
                    <span>Contact Phone:</span>
                    <strong>${contactInfo.phone}</strong>
                  </div>
                  <div class="detail-item">
                    <span>Contact Email:</span>
                    <strong>${contactInfo.email}</strong>
                  </div>
                </div>
                <div>
                  <div class="detail-item">
                    <span>Total Amount:</span>
                    <strong style="color: #059669; font-size: 18px;">₹${totalAmount.toLocaleString()}</strong>
                  </div>
                  <div class="detail-item">
                    <span>Payment ID:</span>
                    <strong style="font-size: 12px;">${paymentId || 'DEMO_PAYMENT'}</strong>
                  </div>
                  <div class="detail-item">
                    <span>Status:</span>
                    <strong style="color: #059669;">Confirmed ✅</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="important-notes">
              <h4>⚠️ Important Travel Information</h4>
              <ul>
                <li>Please carry a valid photo ID for domestic flights or passport for international flights</li>
                <li>Web check-in opens 48 hours before departure</li>
                <li>Arrive at airport at least 2 hours before domestic flights, 3 hours for international</li>
                <li>Baggage allowance: 15kg check-in + 7kg cabin baggage</li>
                <li>Report to airport at least 45 minutes before domestic flights</li>
              </ul>
            </div>

            <div class="qr-section">
              <div style="font-size: 18px; margin-bottom: 10px;">📱 Show this ticket at airport</div>
              <div style="color: #6b7280; font-size: 14px;">
                Booking Reference: <strong>${bookingId}</strong>
              </div>
              <div style="margin-top: 15px; color: #6b7280; font-size: 12px;">
                Generated by Airbnb Clone+ • ${new Date().toLocaleString()}
              </div>
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
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Download className="h-4 w-4" />
          <span>{isDownloading ? 'Generating...' : 'Download Ticket'}</span>
        </Button>
      </motion.div>

      {/* Digital Ticket */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        whileHover={{ scale: 1.01 }}
      >
        <Card className="border-2 border-blue-200 shadow-2xl bg-gradient-to-br from-white to-blue-50/30 overflow-hidden">
          <CardContent className="p-0">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Plane className="h-8 w-8" />
                  </motion.div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">Flight E-Ticket</h1>
                    <p className="text-blue-100">Booking Confirmed ✅</p>
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-lg sm:text-xl font-bold">{bookingId}</div>
                  <div className="text-sm text-blue-100">Booking ID</div>
                </div>
              </div>
            </motion.div>

            {/* Flight Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 border-b-2 border-dashed border-gray-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-center mb-2">
                    <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-semibold text-gray-700">From</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">{flightData.from}</div>
                  <div className="text-sm text-gray-600">{flightData.departureDate}</div>
                  <div className="text-sm text-gray-600">{flightData.departureTime || '20:00'}</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center justify-center border-l-0 lg:border-l-2 border-r-0 lg:border-r-2 border-t-2 lg:border-t-0 border-b-2 lg:border-b-0 border-gray-200 py-4 lg:py-0"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Plane className="h-6 w-6 text-blue-600" />
                    <div className="font-bold text-lg">{flightData.airline}</div>
                  </div>
                  <div className="text-sm text-gray-600">Flight {flightData.flightNumber || 'AI 2809'}</div>
                  <div className="text-sm text-gray-600">Duration: {flightData.duration || '3h 0m'}</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-center mb-2">
                    <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-semibold text-gray-700">To</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">{flightData.to}</div>
                  <div className="text-sm text-gray-600">{flightData.departureDate}</div>
                  <div className="text-sm text-gray-600">{flightData.arrivalTime || '23:00'}</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Passenger Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="p-6 border-b border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Passenger Details
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <AnimatePresence>
                  {passengerData.map((passenger, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="bg-gradient-to-r from-gray-50 to-blue-50/50 p-4 rounded-lg border hover:shadow-md transition-all duration-200"
                    >
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
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Booking Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="p-6 bg-gradient-to-r from-gray-50 to-blue-50/30"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                      <span className="text-xs">{contactInfo.email}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Payment Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Amount:</span>
                      <span className="font-bold text-lg text-green-600">₹{totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment ID:</span>
                      <span className="text-xs font-mono">{paymentId || 'DEMO_PAYMENT'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-green-600 font-semibold"
                      >
                        Confirmed ✅
                      </motion.span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Important Notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="p-6 bg-amber-50 border-t"
            >
              <h4 className="font-semibold text-amber-900 mb-3">⚠️ Important Information</h4>
              <div className="text-sm text-amber-800 space-y-2">
                <p>• Please carry a valid photo ID for domestic flights or passport for international flights</p>
                <p>• Web check-in opens 48 hours before departure</p>
                <p>• Arrive at airport at least 2 hours before domestic flights, 3 hours for international</p>
                <p>• Baggage allowance: 15kg check-in + 7kg cabin baggage</p>
              </div>
            </motion.div>

            {/* QR Code Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="p-4 text-center border-t border-dashed border-gray-300"
            >
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <QrCode className="h-5 w-5" />
                <span className="text-sm">Show this ticket at airport for quick check-in</span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Booking Reference: {bookingId}
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default FlightTicket;
