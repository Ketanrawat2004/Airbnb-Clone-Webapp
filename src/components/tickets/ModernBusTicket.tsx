import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Bus, Calendar, User, Phone, CreditCard, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ModernBusTicketProps {
  booking: {
    id: string;
    bus_data: any;
    passenger_data: any;
    contact_info: any;
    total_amount: number;
    created_at: string;
    payment_status: string;
    status: string;
    coins_used?: number;
    actual_amount_paid?: number;
  };
  showActions?: boolean;
}

const ModernBusTicket = ({ booking, showActions = true }: ModernBusTicketProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
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
              <title>Bus E-Ticket - ${booking.id}</title>
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
                  background: linear-gradient(135deg, #0ea5e9, #0284c7);
                  color: white;
                  padding: 24px;
                  text-align: center;
                  position: relative;
                }
                .operator-logo {
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
                .bus-details {
                  margin: 24px 0;
                  padding: 20px;
                  background: #f0f9ff;
                  border-radius: 8px;
                  border: 1px solid #bae6fd;
                }
                .operator-name {
                  font-size: 20px;
                  font-weight: bold;
                  color: #1a1a1a;
                  margin-bottom: 8px;
                }
                .bus-type {
                  color: #666;
                  font-size: 14px;
                }
                .journey-details {
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
                .stop-info {
                  text-align: center;
                }
                .stop-name {
                  font-size: 24px;
                  font-weight: bold;
                  color: #1a1a1a;
                }
                .stop-time {
                  color: #666;
                  font-size: 14px;
                  margin-top: 4px;
                }
                .journey-arrow {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  color: #0ea5e9;
                }
                .arrow-line {
                  width: 100px;
                  height: 2px;
                  background: #0ea5e9;
                  position: relative;
                }
                .arrow-line:after {
                  content: '';
                  position: absolute;
                  right: -6px;
                  top: -4px;
                  border: 5px solid transparent;
                  border-left: 8px solid #0ea5e9;
                }
                .passenger-info {
                  margin: 24px 0;
                  padding: 20px;
                  background: #f8fafc;
                  border-radius: 8px;
                  border: 1px solid #e2e8f0;
                }
                .info-row {
                  display: flex;
                  justify-content: space-between;
                  padding: 12px 0;
                  border-bottom: 1px solid #e2e8f0;
                }
                .info-label {
                  color: #666;
                  font-weight: 500;
                }
                .info-value {
                  color: #1a1a1a;
                  font-weight: 600;
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
                    Ticket ID: ${booking.id.slice(0, 8).toUpperCase()}<br>
                    Booking No: ${booking.id.slice(-8).toUpperCase()}<br>
                    (Booked on ${new Date(booking.created_at).toLocaleDateString('en-IN')})
                  </div>
                  <div class="operator-logo">🚌 ${booking.bus_data?.operator || 'Bus Service'}</div>
                  <div class="ticket-title">Electronic Bus Ticket</div>
                  <div style="position: absolute; top: 50%; right: 100px; transform: translateY(-50%);">
                    <div class="status-confirmed">CONFIRMED</div>
                  </div>
                </div>

                <div class="content">
                  <div class="bus-details">
                    <div class="operator-name">${booking.bus_data?.operator || 'Bus Operator'}</div>
                    <div class="bus-type">Bus ID: ${booking.bus_data?.busId || 'BUS001'} | Type: ${booking.bus_data?.type || 'A/C Seater'}</div>
                  </div>

                  <div class="journey-details">
                    <div class="stop-info">
                      <div class="stop-name">${booking.bus_data?.from || 'Departure'}</div>
                      <div class="stop-time">${booking.bus_data?.departureTime || '10:00 AM'}</div>
                      <div class="stop-time">${formatDate(booking.bus_data?.date || new Date().toISOString())}</div>
                    </div>
                    <div class="journey-arrow">
                      <div style="font-size: 12px; color: #666; margin-bottom: 8px;">🚌 ${booking.bus_data?.duration || '6h 30m'}</div>
                      <div class="arrow-line"></div>
                    </div>
                    <div class="stop-info">
                      <div class="stop-name">${booking.bus_data?.to || 'Arrival'}</div>
                      <div class="stop-time">${booking.bus_data?.arrivalTime || '04:30 PM'}</div>
                      <div class="stop-time">${formatDate(booking.bus_data?.date || new Date().toISOString())}</div>
                    </div>
                  </div>

                  <div class="passenger-info">
                    <div class="info-row">
                      <span class="info-label">Passenger Name:</span>
                      <span class="info-value">${booking.passenger_data?.name || 'N/A'}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">Age:</span>
                      <span class="info-value">${booking.passenger_data?.age || 'N/A'}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">Gender:</span>
                      <span class="info-value">${booking.passenger_data?.gender || 'N/A'}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">Seat Number:</span>
                      <span class="info-value">${booking.passenger_data?.seatNumber || 'N/A'}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">Mobile:</span>
                      <span class="info-value">${booking.passenger_data?.mobile || 'N/A'}</span>
                    </div>
                    <div class="info-row" style="border-bottom: none;">
                      <span class="info-label">Email:</span>
                      <span class="info-value">${booking.passenger_data?.email || 'N/A'}</span>
                    </div>
                  </div>

                  <div class="amount-section">
                    <div class="amount-label">Total Amount Paid</div>
                    <div class="amount-value">₹${(booking.actual_amount_paid || booking.total_amount).toLocaleString('en-IN')}</div>
                    ${booking.coins_used ? `<div style="font-size: 14px; opacity: 0.9;">BNB Coins Used: ${booking.coins_used}</div>` : ''}
                  </div>

                  <div class="important-info">
                    <div class="important-title">Important Instructions</div>
                    <ul class="important-list">
                      <li>Please carry a valid photo ID proof during the journey</li>
                      <li>Report at boarding point at least 15 minutes before departure</li>
                      <li>Boarding Point: ${booking.bus_data?.from || 'N/A'}</li>
                      <li>Dropping Point: ${booking.bus_data?.to || 'N/A'}</li>
                      <li>Contact: ${booking.passenger_data?.mobile || 'N/A'}</li>
                      <li>This is a confirmed booking. Have a safe journey!</li>
                    </ul>
                  </div>

                  <div style="text-align: center; padding: 16px; background: #f1f5f9; border-radius: 8px; font-size: 12px; color: #666;">
                    For assistance, contact Bus Operator Helpline or visit their website
                  </div>
                </div>
              </div>
            </body>
          </html>
        `);
        
        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
          toast.success('Bus ticket generated successfully!');
        }, 500);
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to generate ticket. Please try again.');
    } finally {
      setIsDownloading(false);
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
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white p-4 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div>
            <h3 className="font-bold text-lg">{booking.bus_data?.operator || 'Bus Service'}</h3>
            <p className="text-sky-100 text-sm">Bus ID: {booking.bus_data?.busId || 'N/A'}</p>
          </div>
          <div className="text-right text-xs">
            <div>Ticket: {booking.id.slice(0, 8).toUpperCase()}</div>
            <Badge className="mt-1 bg-green-500 hover:bg-green-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              CONFIRMED
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Journey Route */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 p-3 md:p-4 bg-sky-50 rounded-lg">
          <div className="text-center">
            <div className="text-base md:text-xl font-bold">{booking.bus_data?.from || 'Departure'}</div>
            <div className="text-xs text-gray-600">{booking.bus_data?.departureTime || '10:00 AM'}</div>
          </div>
          <div className="text-center flex flex-col justify-center">
            <Bus className="h-5 w-5 md:h-6 md:w-6 mx-auto text-sky-500" />
            <div className="text-xs text-gray-500 mt-1">{booking.bus_data?.duration || '6h 30m'}</div>
          </div>
          <div className="text-center">
            <div className="text-base md:text-xl font-bold">{booking.bus_data?.to || 'Arrival'}</div>
            <div className="text-xs text-gray-600">{booking.bus_data?.arrivalTime || '04:30 PM'}</div>
          </div>
        </div>

        {/* Passenger Info */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span className="text-gray-600">Passenger:</span>
            <span className="font-semibold">{booking.passenger_data?.name || 'N/A'}</span>
          </div>
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span className="text-gray-600">Seat Number:</span>
            <span className="font-semibold">{booking.passenger_data?.seatNumber || 'N/A'}</span>
          </div>
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span className="text-gray-600">Contact:</span>
            <span className="font-semibold">{booking.passenger_data?.mobile || 'N/A'}</span>
          </div>
        </div>

        {/* Amount */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 md:p-4 rounded-lg text-center">
          <div className="text-xs md:text-sm opacity-90">Total Paid</div>
          <div className="text-xl md:text-2xl font-bold">₹{(booking.actual_amount_paid || booking.total_amount).toLocaleString('en-IN')}</div>
          {booking.coins_used && booking.coins_used > 0 && (
            <div className="text-xs opacity-90">BNB Coins Used: {booking.coins_used}</div>
          )}
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={generatePDF}
              disabled={isDownloading}
              className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700"
            >
              <Download className="h-4 w-4 mr-2" />
              {isDownloading ? 'Generating...' : 'Download Ticket'}
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ModernBusTicket;
