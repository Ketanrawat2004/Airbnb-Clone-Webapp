import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, MapPin, Calendar, User, Phone, Mail, Bed, CreditCard, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ModernHotelTicketProps {
  booking: {
    id: string;
    guest_name: string;
    guest_phone?: string;
    guest_age?: number;
    guest_gender?: string;
    guest_nationality?: string;
    check_in_date: string;
    check_out_date: string;
    guests: number;
    total_amount: number;
    created_at: string;
    status: string;
    payment_status: string;
    room_type?: string;
    coupon_code?: string;
    guest_list?: any[];
  };
  hotel: {
    id: string;
    name: string;
    location: string;
    address?: string;
    phone?: string;
    email?: string;
    check_in_time: string;
    check_out_time: string;
  };
  showActions?: boolean;
}

const ModernHotelTicket = ({ booking, hotel, showActions = true }: ModernHotelTicketProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const calculateNights = () => {
    const checkIn = new Date(booking.check_in_date);
    const checkOut = new Date(booking.check_out_date);
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  };

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
              <title>Booking Voucher - ${booking.id}</title>
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { 
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
                  background: #f8fafc;
                  padding: 20px;
                  line-height: 1.5;
                }
                .voucher {
                  max-width: 800px;
                  margin: 0 auto;
                  background: white;
                  border-radius: 12px;
                  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                  overflow: hidden;
                }
                .header {
                  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
                  color: white;
                  padding: 24px;
                  text-align: center;
                  position: relative;
                }
                .logo {
                  font-size: 24px;
                  font-weight: bold;
                  margin-bottom: 8px;
                }
                .voucher-title {
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
                .hotel-section {
                  margin-bottom: 24px;
                }
                .hotel-name {
                  font-size: 24px;
                  font-weight: bold;
                  margin-bottom: 8px;
                  color: #1a1a1a;
                }
                .hotel-address {
                  color: #666;
                  margin-bottom: 12px;
                }
                .contact-info {
                  display: flex;
                  gap: 20px;
                  font-size: 14px;
                  color: #007bff;
                }
                .stay-details {
                  display: grid;
                  grid-template-columns: 1fr 1fr 1fr;
                  gap: 20px;
                  margin: 24px 0;
                  padding: 20px;
                  background: #f8fafc;
                  border-radius: 8px;
                  border: 1px solid #e2e8f0;
                }
                .detail-block {
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
                .guest-info {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 20px;
                  margin: 24px 0;
                  padding: 20px;
                  background: #f8fafc;
                  border-radius: 8px;
                  border: 1px solid #e2e8f0;
                }
                .info-group {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 8px;
                  padding: 8px 0;
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
                .room-section {
                  margin: 24px 0;
                  padding: 20px;
                  background: #fff5f5;
                  border-radius: 8px;
                  border: 1px solid #fed7d7;
                }
                .amount-section {
                  text-align: center;
                  margin: 24px 0;
                  padding: 20px;
                  background: linear-gradient(135deg, #667eea, #764ba2);
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
                  color: #8b5cf6;
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
                  color: #8b5cf6;
                  font-weight: bold;
                }
                .support-info {
                  text-align: center;
                  padding: 16px;
                  background: #f1f5f9;
                  border-radius: 8px;
                  font-size: 12px;
                  color: #666;
                }
                @media print {
                  body { background: white; padding: 0; }
                  .voucher { box-shadow: none; }
                }
              </style>
            </head>
            <body>
              <div class="voucher">
                <div class="header">
                  <div class="booking-info">
                    Booking ID: ${booking.id.slice(0, 8).toUpperCase()}<br>
                    PNR: ${booking.id.slice(-8).toUpperCase()}<br>
                    (Booked on ${new Date(booking.created_at).toLocaleDateString('en-IN')})
                  </div>
                  <div class="logo">AirBnB Clone</div>
                  <div class="voucher-title">Booking Voucher</div>
                  <div style="position: absolute; top: 50%; right: 100px; transform: translateY(-50%);">
                    <div class="status-confirmed">CONFIRMED</div>
                  </div>
                </div>

                <div class="content">
                  <div class="hotel-section">
                    <div class="hotel-name">${hotel.name}</div>
                    <div class="hotel-address">${hotel.address || hotel.location}</div>
                    <div class="contact-info">
                      <span>📞 ${hotel.phone || '+91 9876543210'}</span>
                      <span>✉️ ${hotel.email || 'info@hotel.com'}</span>
                    </div>
                  </div>

                  <div class="stay-details">
                    <div class="detail-block">
                      <div class="detail-label">${calculateNights()}-Night Stay</div>
                    </div>
                    <div class="detail-block">
                      <div class="detail-label">Check-in</div>
                      <div class="detail-value">${formatDate(booking.check_in_date)}</div>
                      <div style="font-size: 12px; color: #666;">After ${hotel.check_in_time}</div>
                    </div>
                    <div class="detail-block">
                      <div class="detail-label">Check-out</div>
                      <div class="detail-value">${formatDate(booking.check_out_date)}</div>
                      <div style="font-size: 12px; color: #666;">Before ${hotel.check_out_time}</div>
                    </div>
                  </div>

                  <div class="guest-info">
                    <div>
                      <div class="info-group">
                        <span class="info-label">${booking.guests} Guest${booking.guests > 1 ? 's' : ''}</span>
                        <span class="info-value">Mr. ${booking.guest_name} (Primary Guest)</span>
                      </div>
                      <div style="margin-top: 12px; font-size: 14px; color: #666;">
                        ${booking.guest_name}<br>
                        ${booking.guest_phone || 'Phone not provided'}
                      </div>
                    </div>
                    <div>
                      <div class="info-group">
                        <span class="info-label">1 BED(s)</span>
                        <span class="info-value">${booking.room_type || 'Standard Room'}</span>
                      </div>
                      <div style="margin-top: 12px; font-size: 14px; color: #666;">
                        🛏️ 1 ${booking.room_type || 'Double Bed'}<br>
                        🍽️ Breakfast included
                      </div>
                    </div>
                  </div>

                  <div class="amount-section">
                    <div class="amount-label">Paid Amount</div>
                    <div class="amount-value">INR ${booking.total_amount.toLocaleString('en-IN')}</div>
                    <div style="font-size: 14px; opacity: 0.9;">
                      ${booking.coupon_code ? `You saved INR 101 (Coupon: ${booking.coupon_code})` : 'Paid with Payment Gateway'}
                    </div>
                  </div>

                  <div style="background: #fee2e2; border: 1px solid #fca5a5; border-radius: 8px; padding: 12px; margin: 20px 0; text-align: center; color: #dc2626; font-weight: 500;">
                    ❌ This booking is non-refundable. You will not get a refund if you cancel this booking.
                  </div>

                  <div class="important-info">
                    <div class="important-title">Important Information</div>
                    <ul class="important-list">
                      <li>Passport, Aadhar, Driving License and Govt. ID are accepted as ID proof(s). Local ids not allowed</li>
                      <li>GST invoice can be collected directly from the property</li>
                      <li>Couple Friendly</li>
                      <li>Check-in time: ${hotel.check_in_time} | Check-out time: ${hotel.check_out_time}</li>
                    </ul>
                  </div>

                  <div class="support-info">
                    AirBnB Clone Support<br>
                    📞 +91124 4628747 / +91124 5045105 (India Fixed Line)
                  </div>
                </div>
              </div>
            </body>
          </html>
        `);
        
        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
          toast.success('Ticket generated successfully!');
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
    const newWindow = window.open(`/ticket-download?bookingId=${booking.id}&type=hotel`, '_blank');
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
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 relative">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{hotel.name}</h3>
            <p className="text-orange-100 text-sm">{hotel.location}</p>
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
        {/* Stay Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-xs text-gray-500 uppercase tracking-wide">{calculateNights()}-Night Stay</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 uppercase tracking-wide">Check-in</div>
            <div className="font-semibold">{formatDate(booking.check_in_date)}</div>
            <div className="text-xs text-gray-500">After {hotel.check_in_time}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 uppercase tracking-wide">Check-out</div>
            <div className="font-semibold">{formatDate(booking.check_out_date)}</div>
            <div className="text-xs text-gray-500">Before {hotel.check_out_time}</div>
          </div>
        </div>

        {/* Guest Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                <User className="h-4 w-4 inline mr-1" />
                {booking.guests} Guest{booking.guests > 1 ? 's' : ''}
              </span>
              <span className="font-semibold">Mr. {booking.guest_name}</span>
            </div>
            <div className="text-xs text-gray-500">
              {booking.guest_phone && (
                <div className="flex items-center">
                  <Phone className="h-3 w-3 mr-1" />
                  {booking.guest_phone}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                <Bed className="h-4 w-4 inline mr-1" />
                1 BED(s)
              </span>
              <span className="font-semibold">{booking.room_type || 'Standard Room'}</span>
            </div>
            <div className="text-xs text-gray-500">
              🛏️ 1 Double Bed • 🍽️ Breakfast included
            </div>
          </div>
        </div>

        {/* Amount */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-lg text-center">
          <div className="text-sm opacity-90">Paid Amount</div>
          <div className="text-2xl font-bold">INR {booking.total_amount.toLocaleString('en-IN')}</div>
          {booking.coupon_code && (
            <div className="text-xs opacity-90">You saved with coupon: {booking.coupon_code}</div>
          )}
        </div>

        {/* Important Info */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <Info className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-yellow-800">
              <strong>Non-refundable booking.</strong> Valid ID required at check-in.
            </div>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={viewTicket}
              variant="outline"
              className="flex-1 flex items-center justify-center space-x-2 border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              <Eye className="h-4 w-4" />
              <span>View Ticket</span>
            </Button>
            <Button
              onClick={generatePDF}
              disabled={isDownloading}
              className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
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

export default ModernHotelTicket;