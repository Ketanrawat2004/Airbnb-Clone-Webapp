import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Plane, Calendar, User, Phone, CreditCard, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ModernFlightTicketProps {
  booking: {
    id: string;
    flight_data: any;
    passenger_data: any[];
    contact_info: any;
    total_amount: number;
    created_at: string;
    payment_status: string;
    status: string;
  };
  showActions?: boolean;
}

const ModernFlightTicket = ({ booking, showActions = true }: ModernFlightTicketProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    if (!time) return 'TBD';
    return time;
  };

  const generatePDF = () => {
    setIsDownloading(true);
    
    try {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Flight E-Ticket - ${booking.id}</title>
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { 
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
                  background: #f8fafc;
                  padding: 20px;
                  line-height: 1.5;
                }
                .ticket {
                  max-width: 800px;
                  margin: 0 auto;
                  background: white;
                  border-radius: 12px;
                  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                  overflow: hidden;
                }
                .header {
                  background: linear-gradient(135deg, #3b82f6, #1e40af);
                  color: white;
                  padding: 24px;
                  text-align: center;
                  position: relative;
                }
                .airline-logo {
                  font-size: 24px;
                  font-weight: bold;
                  margin-bottom: 8px;
                }
                .ticket-title {
                  font-size: 18px;
                  opacity: 0.9;
                }
                .booking-info {
                  position: absolute;
                  top: 20px;
                  right: 20px;
                  text-align: right;
                  font-size: 12px;
                }
                .content {
                  padding: 24px;
                }
                .flight-route {
                  display: grid;
                  grid-template-columns: 1fr auto 1fr;
                  gap: 20px;
                  align-items: center;
                  margin: 24px 0;
                  padding: 20px;
                  background: #f8fafc;
                  border-radius: 8px;
                  border: 1px solid #e2e8f0;
                }
                .city-info {
                  text-align: center;
                }
                .city-code {
                  font-size: 32px;
                  font-weight: bold;
                  color: #1a1a1a;
                }
                .city-name {
                  color: #666;
                  font-size: 14px;
                  margin-top: 4px;
                }
                .flight-arrow {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  color: #3b82f6;
                }
                .arrow-line {
                  width: 100px;
                  height: 2px;
                  background: #3b82f6;
                  position: relative;
                }
                .arrow-line:after {
                  content: '';
                  position: absolute;
                  right: -6px;
                  top: -4px;
                  border: 5px solid transparent;
                  border-left: 8px solid #3b82f6;
                }
                .flight-time {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 20px;
                  margin: 24px 0;
                  padding: 20px;
                  background: #f0f9ff;
                  border-radius: 8px;
                  border: 1px solid #bae6fd;
                }
                .time-block {
                  text-align: center;
                }
                .time-label {
                  font-size: 12px;
                  color: #666;
                  margin-bottom: 4px;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                }
                .time-value {
                  font-size: 24px;
                  font-weight: bold;
                  color: #1a1a1a;
                }
                .date-value {
                  font-size: 14px;
                  color: #666;
                  margin-top: 4px;
                }
                .passenger-info {
                  margin: 24px 0;
                  padding: 20px;
                  background: #f8fafc;
                  border-radius: 8px;
                  border: 1px solid #e2e8f0;
                }
                .passenger-header {
                  font-weight: bold;
                  color: #1a1a1a;
                  margin-bottom: 16px;
                  border-bottom: 1px solid #e2e8f0;
                  padding-bottom: 8px;
                }
                .passenger-details {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                  gap: 16px;
                }
                .passenger-item {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 8px 0;
                  border-bottom: 1px solid #f1f5f9;
                }
                .passenger-label {
                  color: #666;
                  font-weight: 500;
                }
                .passenger-value {
                  color: #1a1a1a;
                  font-weight: 600;
                }
                .flight-details {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                  gap: 16px;
                  margin: 24px 0;
                }
                .detail-card {
                  padding: 16px;
                  border: 1px solid #e2e8f0;
                  border-radius: 8px;
                  background: white;
                  text-align: center;
                }
                .detail-label {
                  font-size: 12px;
                  color: #666;
                  margin-bottom: 4px;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                }
                .detail-value {
                  font-weight: bold;
                  color: #1a1a1a;
                }
                .amount-section {
                  text-align: center;
                  margin: 24px 0;
                  padding: 20px;
                  background: linear-gradient(135deg, #10b981, #059669);
                  color: white;
                  border-radius: 8px;
                }
                .amount-label {
                  font-size: 14px;
                  opacity: 0.9;
                }
                .amount-value {
                  font-size: 32px;
                  font-weight: bold;
                  margin: 8px 0;
                }
                .status-confirmed {
                  background: #10b981;
                  color: white;
                  padding: 8px 16px;
                  border-radius: 20px;
                  font-size: 12px;
                  font-weight: bold;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                }
                .important-info {
                  background: #fef3cd;
                  border: 1px solid #ffd60a;
                  border-radius: 8px;
                  padding: 16px;
                  margin: 24px 0;
                }
                .important-title {
                  font-weight: bold;
                  color: #d97706;
                  margin-bottom: 12px;
                }
                .important-list {
                  list-style: none;
                  font-size: 14px;
                  color: #666;
                }
                .important-list li {
                  margin-bottom: 6px;
                  padding-left: 16px;
                  position: relative;
                }
                .important-list li:before {
                  content: "•";
                  position: absolute;
                  left: 0;
                  color: #d97706;
                  font-weight: bold;
                }
                .barcode-section {
                  text-align: center;
                  margin: 24px 0;
                  padding: 20px;
                  background: #f1f5f9;
                  border-radius: 8px;
                }
                .barcode {
                  font-family: 'Courier New', monospace;
                  font-size: 24px;
                  letter-spacing: 2px;
                  color: #1a1a1a;
                  margin: 12px 0;
                }
                @media print {
                  body { background: white; padding: 0; }
                  .ticket { box-shadow: none; }
                }
              </style>
            </head>
            <body>
              <div class="ticket">
                <div class="header">
                  <div class="booking-info">
                    Booking ID: ${booking.id.slice(0, 8).toUpperCase()}<br>
                    PNR: ${booking.id.slice(-8).toUpperCase()}<br>
                    (Booked on ${new Date(booking.created_at).toLocaleDateString('en-IN')})
                  </div>
                  <div class="airline-logo">✈️ AIR INDIA</div>
                  <div class="ticket-title">Electronic Ticket</div>
                  <div style="position: absolute; top: 50%; right: 100px; transform: translateY(-50%);">
                    <div class="status-confirmed">CONFIRMED</div>
                  </div>
                </div>

                <div class="content">
                  <div class="flight-route">
                    <div class="city-info">
                      <div class="city-code">${booking.flight_data?.from || 'DEL'}</div>
                      <div class="city-name">${booking.flight_data?.fromCity || 'New Delhi'}</div>
                    </div>
                    <div class="flight-arrow">
                      <div style="font-size: 12px; color: #666; margin-bottom: 8px;">✈️ ${booking.flight_data?.flightNumber || 'AI 101'}</div>
                      <div class="arrow-line"></div>
                      <div style="font-size: 12px; color: #666; margin-top: 8px;">${booking.flight_data?.duration || '2h 30m'}</div>
                    </div>
                    <div class="city-info">
                      <div class="city-code">${booking.flight_data?.to || 'BOM'}</div>
                      <div class="city-name">${booking.flight_data?.toCity || 'Mumbai'}</div>
                    </div>
                  </div>

                  <div class="flight-time">
                    <div class="time-block">
                      <div class="time-label">Departure</div>
                      <div class="time-value">${formatTime(booking.flight_data?.departureTime || '14:30')}</div>
                      <div class="date-value">${formatDate(booking.flight_data?.departureDate || new Date().toISOString())}</div>
                    </div>
                    <div class="time-block">
                      <div class="time-label">Arrival</div>
                      <div class="time-value">${formatTime(booking.flight_data?.arrivalTime || '17:00')}</div>
                      <div class="date-value">${formatDate(booking.flight_data?.arrivalDate || new Date().toISOString())}</div>
                    </div>
                  </div>

                  <div class="passenger-info">
                    <div class="passenger-header">Passenger Information</div>
                    ${booking.passenger_data?.map((passenger: any, index: number) => `
                      <div class="passenger-details">
                        <div class="passenger-item">
                          <span class="passenger-label">Passenger ${index + 1}:</span>
                          <span class="passenger-value">${passenger.firstName} ${passenger.lastName}</span>
                        </div>
                        <div class="passenger-item">
                          <span class="passenger-label">Seat:</span>
                          <span class="passenger-value">${passenger.seatNumber || '12A'}</span>
                        </div>
                        <div class="passenger-item">
                          <span class="passenger-label">Class:</span>
                          <span class="passenger-value">Economy</span>
                        </div>
                        <div class="passenger-item">
                          <span class="passenger-label">Baggage:</span>
                          <span class="passenger-value">15 KG</span>
                        </div>
                      </div>
                    `).join('') || `
                      <div class="passenger-details">
                        <div class="passenger-item">
                          <span class="passenger-label">Passenger 1:</span>
                          <span class="passenger-value">${booking.contact_info?.firstName || 'John'} ${booking.contact_info?.lastName || 'Doe'}</span>
                        </div>
                        <div class="passenger-item">
                          <span class="passenger-label">Seat:</span>
                          <span class="passenger-value">12A</span>
                        </div>
                        <div class="passenger-item">
                          <span class="passenger-label">Class:</span>
                          <span class="passenger-value">Economy</span>
                        </div>
                        <div class="passenger-item">
                          <span class="passenger-label">Baggage:</span>
                          <span class="passenger-value">15 KG</span>
                        </div>
                      </div>
                    `}
                  </div>

                  <div class="flight-details">
                    <div class="detail-card">
                      <div class="detail-label">Flight</div>
                      <div class="detail-value">${booking.flight_data?.flightNumber || 'AI 101'}</div>
                    </div>
                    <div class="detail-card">
                      <div class="detail-label">Aircraft</div>
                      <div class="detail-value">${booking.flight_data?.aircraft || 'A320'}</div>
                    </div>
                    <div class="detail-card">
                      <div class="detail-label">Terminal</div>
                      <div class="detail-value">${booking.flight_data?.terminal || 'T3'}</div>
                    </div>
                    <div class="detail-card">
                      <div class="detail-label">Gate</div>
                      <div class="detail-value">${booking.flight_data?.gate || 'B12'}</div>
                    </div>
                  </div>

                  <div class="amount-section">
                    <div class="amount-label">Total Amount Paid</div>
                    <div class="amount-value">₹${booking.total_amount.toLocaleString('en-IN')}</div>
                    <div style="font-size: 14px; opacity: 0.9;">Includes all taxes and fees</div>
                  </div>

                  <div class="important-info">
                    <div class="important-title">Important Travel Information</div>
                    <ul class="important-list">
                      <li>Please carry a valid photo ID for domestic flights or passport for international flights</li>
                      <li>Web check-in opens 48 hours before departure</li>
                      <li>Arrive at airport at least 2 hours before domestic flights, 3 hours for international</li>
                      <li>Contact: ${booking.contact_info?.phone || '+91 9876543210'} | ${booking.contact_info?.email || 'passenger@email.com'}</li>
                      <li>This is a demo booking for demonstration purposes only</li>
                    </ul>
                  </div>

                  <div class="barcode-section">
                    <div style="font-size: 14px; color: #666; margin-bottom: 8px;">E-Ticket Barcode</div>
                    <div class="barcode">|||||| |||| ||||| || |||||| |||| |||||</div>
                    <div style="font-size: 12px; color: #666;">${booking.id.slice(0, 8).toUpperCase()}</div>
                  </div>

                  <div style="text-align: center; padding: 16px; background: #f1f5f9; border-radius: 8px; font-size: 12px; color: #666;">
                    For assistance, contact Air India at +91-124-2641407 or visit airindia.in
                  </div>
                </div>
              </div>
            </body>
          </html>
        `);
        
        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
          toast.success('Flight ticket generated successfully!');
        }, 500);
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to generate ticket. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const viewTicket = () => {
    const newWindow = window.open(`/ticket-download/${booking.id}?type=flight`, '_blank');
    if (newWindow) {
      newWindow.focus();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 relative">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg flex items-center">
              <Plane className="h-5 w-5 mr-2" />
              {booking.flight_data?.from || 'DEL'} → {booking.flight_data?.to || 'BOM'}
            </h3>
            <p className="text-blue-100 text-sm">
              Flight {booking.flight_data?.flightNumber || 'AI 101'} • {booking.flight_data?.airline || 'Air India'}
            </p>
          </div>
          <div className="text-right text-xs">
            <div>Booking ID: {booking.id.slice(0, 8).toUpperCase()}</div>
            <div>PNR: {booking.id.slice(-8).toUpperCase()}</div>
            <Badge className="mt-1 bg-green-500 hover:bg-green-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              CONFIRMED
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Flight Route */}
        <div className="grid grid-cols-3 gap-4 items-center p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{booking.flight_data?.from || 'DEL'}</div>
            <div className="text-xs text-gray-500">{booking.flight_data?.fromCity || 'New Delhi'}</div>
          </div>
          <div className="text-center">
            <Plane className="h-6 w-6 text-blue-500 mx-auto mb-1" />
            <div className="text-xs text-gray-500">{booking.flight_data?.duration || '2h 30m'}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{booking.flight_data?.to || 'BOM'}</div>
            <div className="text-xs text-gray-500">{booking.flight_data?.toCity || 'Mumbai'}</div>
          </div>
        </div>

        {/* Flight Times */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-xs text-gray-500 uppercase tracking-wide">Departure</div>
            <div className="text-lg font-bold">{formatTime(booking.flight_data?.departureTime || '14:30')}</div>
            <div className="text-xs text-gray-500">{formatDate(booking.flight_data?.departureDate || new Date().toISOString())}</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-xs text-gray-500 uppercase tracking-wide">Arrival</div>
            <div className="text-lg font-bold">{formatTime(booking.flight_data?.arrivalTime || '17:00')}</div>
            <div className="text-xs text-gray-500">{formatDate(booking.flight_data?.arrivalDate || new Date().toISOString())}</div>
          </div>
        </div>

        {/* Passenger Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              <User className="h-4 w-4 inline mr-1" />
              Passengers
            </span>
            <span className="font-semibold">
              {booking.passenger_data?.length || 1} Passenger{(booking.passenger_data?.length || 1) > 1 ? 's' : ''}
            </span>
          </div>
          {booking.passenger_data?.length > 0 ? (
            <div className="text-xs text-gray-500 space-y-1">
              {booking.passenger_data.map((passenger: any, index: number) => (
                <div key={index} className="flex justify-between">
                  <span>{passenger.firstName} {passenger.lastName}</span>
                  <span>Seat: {passenger.seatNumber || '12A'}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-gray-500">
              <div className="flex justify-between">
                <span>{booking.contact_info?.firstName || 'John'} {booking.contact_info?.lastName || 'Doe'}</span>
                <span>Seat: 12A</span>
              </div>
            </div>
          )}
          {booking.contact_info?.phone && (
            <div className="text-xs text-gray-500 flex items-center">
              <Phone className="h-3 w-3 mr-1" />
              {booking.contact_info.phone}
            </div>
          )}
        </div>

        {/* Amount */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-lg text-center">
          <div className="text-sm opacity-90">Total Amount Paid</div>
          <div className="text-2xl font-bold">₹{booking.total_amount.toLocaleString('en-IN')}</div>
          <div className="text-xs opacity-90">Includes all taxes and fees</div>
        </div>

        {/* Important Info */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <Info className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-yellow-800">
              <strong>Check-in required.</strong> Arrive 2 hours early for domestic flights. Valid ID required.
            </div>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={viewTicket}
              variant="outline"
              className="flex-1 flex items-center justify-center space-x-2 border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <Eye className="h-4 w-4" />
              <span>View Ticket</span>
            </Button>
            <Button
              onClick={generatePDF}
              disabled={isDownloading}
              className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              <Download className="h-4 w-4" />
              <span>{isDownloading ? 'Generating...' : 'Download PDF'}</span>
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ModernFlightTicket;