import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Train, Calendar, User, Phone, CreditCard, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ModernTrainTicketProps {
  booking: {
    id: string;
    train_data: any;
    passenger_data: any[];
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

const ModernTrainTicket = ({ booking, showActions = true }: ModernTrainTicketProps) => {
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
              <title>Train E-Ticket - ${booking.id}</title>
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
                  background: linear-gradient(135deg, #f97316, #ea580c);
                  color: white;
                  padding: 24px;
                  text-align: center;
                  position: relative;
                }
                .railway-logo {
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
                .train-details {
                  margin: 24px 0;
                  padding: 20px;
                  background: #fff7ed;
                  border-radius: 8px;
                  border: 1px solid #fed7aa;
                }
                .train-name {
                  font-size: 20px;
                  font-weight: bold;
                  color: #1a1a1a;
                  margin-bottom: 8px;
                }
                .train-number {
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
                .station-info {
                  text-align: center;
                }
                .station-code {
                  font-size: 32px;
                  font-weight: bold;
                  color: #1a1a1a;
                }
                .station-name {
                  color: #666;
                  font-size: 14px;
                  margin-top: 4px;
                }
                .journey-arrow {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  color: #f97316;
                }
                .arrow-line {
                  width: 100px;
                  height: 2px;
                  background: #f97316;
                  position: relative;
                }
                .arrow-line:after {
                  content: '';
                  position: absolute;
                  right: -6px;
                  top: -4px;
                  border: 5px solid transparent;
                  border-left: 8px solid #f97316;
                }
                .time-details {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 20px;
                  margin: 24px 0;
                  padding: 20px;
                  background: #fef3c7;
                  border-radius: 8px;
                  border: 1px solid #fde68a;
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
                    PNR: ${booking.id.slice(-8).toUpperCase()}<br>
                    Booking ID: ${booking.id.slice(0, 8).toUpperCase()}<br>
                    (Booked on ${new Date(booking.created_at).toLocaleDateString('en-IN')})
                  </div>
                  <div class="railway-logo">🚂 INDIAN RAILWAYS</div>
                  <div class="ticket-title">Electronic Reservation Slip</div>
                  <div style="position: absolute; top: 50%; right: 100px; transform: translateY(-50%);">
                    <div class="status-confirmed">CONFIRMED</div>
                  </div>
                </div>

                <div class="content">
                  <div class="train-details">
                    <div class="train-name">${booking.train_data?.trainName || 'Express Train'}</div>
                    <div class="train-number">Train No: ${booking.train_data?.trainNumber || '12345'} | Class: ${booking.train_data?.class || 'SL'}</div>
                  </div>

                  <div class="journey-details">
                    <div class="station-info">
                      <div class="station-code">${booking.train_data?.from || 'DEL'}</div>
                      <div class="station-name">${booking.train_data?.from || 'New Delhi'}</div>
                    </div>
                    <div class="journey-arrow">
                      <div style="font-size: 12px; color: #666; margin-bottom: 8px;">🚂 ${booking.train_data?.duration || '12h 30m'}</div>
                      <div class="arrow-line"></div>
                    </div>
                    <div class="station-info">
                      <div class="station-code">${booking.train_data?.to || 'MUM'}</div>
                      <div class="station-name">${booking.train_data?.to || 'Mumbai'}</div>
                    </div>
                  </div>

                  <div class="time-details">
                    <div class="time-block">
                      <div class="time-label">Departure</div>
                      <div class="time-value">${booking.train_data?.departureTime || '14:30'}</div>
                      <div class="date-value">${formatDate(booking.train_data?.date || new Date().toISOString())}</div>
                    </div>
                    <div class="time-block">
                      <div class="time-label">Arrival</div>
                      <div class="time-value">${booking.train_data?.arrivalTime || '03:00'}</div>
                      <div class="date-value">${formatDate(booking.train_data?.date || new Date().toISOString())}</div>
                    </div>
                  </div>

                  <div class="passenger-info">
                    <div class="passenger-header">Passenger Details</div>
                    ${booking.passenger_data?.map((passenger: any, index: number) => `
                      <div class="passenger-details">
                        <div class="passenger-item">
                          <span class="passenger-label">Passenger ${index + 1}:</span>
                          <span class="passenger-value">${passenger.name || 'N/A'}</span>
                        </div>
                        <div class="passenger-item">
                          <span class="passenger-label">Age:</span>
                          <span class="passenger-value">${passenger.age || 'N/A'}</span>
                        </div>
                        <div class="passenger-item">
                          <span class="passenger-label">Gender:</span>
                          <span class="passenger-value">${passenger.gender || 'N/A'}</span>
                        </div>
                        <div class="passenger-item">
                          <span class="passenger-label">Berth:</span>
                          <span class="passenger-value">${passenger.berthPreference || 'No Preference'}</span>
                        </div>
                      </div>
                    `).join('') || ''}
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
                      <li>Reach the station at least 20 minutes before departure</li>
                      <li>Boarding station: ${booking.train_data?.from || 'N/A'}</li>
                      <li>Contact: ${booking.contact_info?.mobile || 'N/A'}</li>
                      <li>This is a confirmed booking. Have a safe journey!</li>
                    </ul>
                  </div>

                  <div style="text-align: center; padding: 16px; background: #f1f5f9; border-radius: 8px; font-size: 12px; color: #666;">
                    For assistance, contact IRCTC Helpline: 139 | Email: care@irctc.co.in
                  </div>
                </div>
              </div>
            </body>
          </html>
        `);
        
        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
          toast.success('Train ticket generated successfully!');
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
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div>
            <h3 className="font-bold text-lg">{booking.train_data?.trainName || 'Express Train'}</h3>
            <p className="text-orange-100 text-sm">Train No: {booking.train_data?.trainNumber || 'N/A'}</p>
          </div>
          <div className="text-right text-xs">
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
        {/* Journey Route */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 p-3 md:p-4 bg-orange-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold">{booking.train_data?.from || 'DEL'}</div>
            <div className="text-xs text-gray-600">{booking.train_data?.departureTime || '14:30'}</div>
          </div>
          <div className="text-center flex flex-col justify-center">
            <Train className="h-5 w-5 md:h-6 md:w-6 mx-auto text-orange-500" />
            <div className="text-xs text-gray-500 mt-1">{booking.train_data?.duration || '12h 30m'}</div>
          </div>
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold">{booking.train_data?.to || 'MUM'}</div>
            <div className="text-xs text-gray-600">{booking.train_data?.arrivalTime || '03:00'}</div>
          </div>
        </div>

        {/* Passenger Info */}
        <div className="space-y-2">
          <div className="text-sm font-semibold text-gray-700">Passengers:</div>
          {booking.passenger_data?.map((passenger: any, index: number) => (
            <div key={index} className="flex flex-wrap gap-2 text-sm bg-gray-50 p-2 rounded">
              <span className="font-medium">{passenger.name}</span>
              <span className="text-gray-600">• Age: {passenger.age}</span>
              <span className="text-gray-600">• {passenger.gender}</span>
              <span className="text-gray-600">• {passenger.berthPreference}</span>
            </div>
          ))}
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
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
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

export default ModernTrainTicket;
