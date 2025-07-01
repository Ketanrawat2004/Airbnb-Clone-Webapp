
interface TicketData {
  bookingId: string;
  flightData: any;
  passengerData: any[];
  contactInfo: any;
  totalAmount: number;
}

export const generateTicketHTML = ({ 
  bookingId, 
  flightData, 
  passengerData, 
  contactInfo, 
  totalAmount 
}: TicketData): string => {
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
