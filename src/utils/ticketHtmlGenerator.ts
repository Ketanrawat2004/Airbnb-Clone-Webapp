
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
    <html lang="en">
      <head>
        <title>Flight E-Ticket - ${bookingId}</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
          }
          
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%);
            padding: 1rem;
            line-height: 1.5;
            color: #374151;
          }
          
          .ticket-container {
            max-width: 64rem;
            margin: 0 auto;
            background: white;
            border-radius: 0.75rem;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
          
          /* Header Section */
          .airline-header {
            background: linear-gradient(135deg, #dc2626, #b91c1c);
            color: white;
            padding: 1.5rem 2rem;
            position: relative;
            overflow: hidden;
          }
          
          .airline-header::before {
            content: '';
            position: absolute;
            top: -3rem;
            right: -3rem;
            width: 6rem;
            height: 6rem;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
          }
          
          .airline-header h1 {
            font-size: 2rem;
            font-weight: 800;
            letter-spacing: 0.1em;
            margin-bottom: 0.5rem;
            position: relative;
            z-index: 10;
          }
          
          .header-subtitle {
            display: flex;
            align-items: center;
            font-size: 0.875rem;
            opacity: 0.9;
            position: relative;
            z-index: 10;
          }
          
          .plane-icon {
            width: 1.25rem;
            height: 1.25rem;
            margin-right: 0.5rem;
          }
          
          /* Passenger Info Section */
          .passenger-info {
            background: #fffbeb;
            border-left: 4px solid #f59e0b;
            padding: 1rem 1.5rem;
          }
          
          .passenger-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .passenger-name {
            font-size: 1.125rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 0.5rem;
          }
          
          .booking-ref {
            background: #fde68a;
            padding: 0.5rem 0.75rem;
            border-radius: 0.25rem;
            font-weight: 700;
            display: inline-block;
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
          }
          
          .ticket-number {
            font-size: 0.875rem;
            color: #6b7280;
          }
          
          .issuing-office {
            text-align: left;
            color: #6b7280;
            font-size: 0.875rem;
            line-height: 1.4;
          }
          
          /* Flight Details Section */
          .flight-details {
            padding: 1.5rem;
          }
          
          .itinerary-header {
            background: #f3f4f6;
            padding: 1rem 1.5rem;
            font-weight: 700;
            font-size: 1rem;
            color: #374151;
            text-align: center;
            margin-bottom: 1rem;
            border-radius: 0.5rem;
          }
          
          .disclaimer-text {
            font-size: 0.75rem;
            color: #6b7280;
            line-height: 1.4;
            margin-bottom: 1.5rem;
            text-align: justify;
          }
          
          /* Flight Route */
          .flight-route {
            display: grid;
            grid-template-columns: 2fr 1fr 2fr;
            gap: 1rem;
            align-items: center;
            background: #f9fafb;
            padding: 1.5rem;
            border-radius: 0.5rem;
            margin-bottom: 1.5rem;
            text-align: center;
          }
          
          .route-city {
            font-size: 1.125rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 0.25rem;
          }
          
          .route-airport {
            font-size: 0.875rem;
            color: #6b7280;
            margin-bottom: 0.25rem;
          }
          
          .route-terminal {
            font-size: 0.75rem;
            color: #9ca3af;
          }
          
          .flight-info {
            text-align: center;
          }
          
          .flight-number {
            font-size: 1.125rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
          }
          
          .plane-graphic {
            width: 1.5rem;
            height: 1.5rem;
            margin: 0 auto;
            color: #dc2626;
          }
          
          /* Times Section */
          .times-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin: 1.5rem 0;
            text-align: center;
          }
          
          .time-block {
            padding: 1rem;
            background: #fafafa;
            border-radius: 0.5rem;
          }
          
          .time {
            font-size: 1.5rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 0.25rem;
          }
          
          .date {
            font-size: 0.875rem;
            color: #6b7280;
            margin-bottom: 0.25rem;
          }
          
          .time-label {
            font-size: 0.75rem;
            color: #9ca3af;
            text-transform: uppercase;
            font-weight: 600;
          }
          
          /* Additional Info Section */
          .additional-info {
            padding: 1.5rem;
            background: #f9fafb;
            border-top: 1px solid #e5e7eb;
          }
          
          .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
            gap: 2rem;
            margin-bottom: 1.5rem;
          }
          
          .info-column {
            space-y: 0.75rem;
          }
          
          .info-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 0;
            border-bottom: 1px solid #e5e7eb;
          }
          
          .info-item:last-child {
            border-bottom: none;
          }
          
          .info-label {
            font-weight: 500;
            color: #374151;
          }
          
          .info-value {
            font-weight: 600;
            color: #111827;
          }
          
          .status-confirmed {
            color: #059669;
          }
          
          .total-amount {
            color: #059669;
            font-size: 1.125rem;
          }
          
          /* Important Notes */
          .important-notes {
            background: #fffbeb;
            border: 1px solid #f59e0b;
            border-radius: 0.5rem;
            padding: 1rem;
            margin-top: 1.5rem;
          }
          
          .notes-title {
            color: #92400e;
            margin-bottom: 0.75rem;
            font-weight: 600;
            font-size: 0.875rem;
          }
          
          .notes-list {
            font-size: 0.75rem;
            color: #92400e;
            line-height: 1.6;
          }
          
          .notes-list p {
            margin-bottom: 0.25rem;
          }
          
          /* Mobile Responsive */
          @media (max-width: 768px) {
            body {
              padding: 0.5rem;
            }
            
            .ticket-container {
              border-radius: 0.5rem;
            }
            
            .airline-header {
              padding: 1rem 1.5rem;
            }
            
            .airline-header h1 {
              font-size: 1.5rem;
            }
            
            .passenger-info {
              padding: 1rem;
            }
            
            .passenger-grid {
              grid-template-columns: 1fr;
              text-align: left;
            }
            
            .issuing-office {
              text-align: left;
              margin-top: 1rem;
            }
            
            .flight-details {
              padding: 1rem;
            }
            
            .flight-route {
              grid-template-columns: 1fr;
              gap: 1rem;
              padding: 1rem;
            }
            
            .times-section {
              grid-template-columns: 1fr;
              gap: 1rem;
            }
            
            .info-grid {
              grid-template-columns: 1fr;
              gap: 1rem;
            }
            
            .additional-info {
              padding: 1rem;
            }
          }
          
          @media (min-width: 769px) {
            .passenger-grid {
              grid-template-columns: 2fr 1fr;
              align-items: start;
            }
            
            .issuing-office {
              text-align: right;
            }
          }
          
          /* Print Styles */
          @media print {
            body {
              background: white;
              padding: 0;
            }
            
            .ticket-container {
              box-shadow: none;
              max-width: none;
            }
            
            .airline-header::before {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="ticket-container">
          <!-- Airline Header -->
          <div class="airline-header">
            <h1>AIR INDIA</h1>
            <div class="header-subtitle">
              <svg class="plane-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
              </svg>
              Electronic Ticket
            </div>
          </div>
          
          <!-- Passenger Information -->
          <div class="passenger-info">
            <div class="passenger-grid">
              <div>
                <div class="passenger-name">
                  PASSENGER: ${passengerData[0]?.firstName?.toUpperCase() || 'PASSENGER'} ${passengerData[0]?.lastName?.toUpperCase() || 'NAME'} ${passengerData[0]?.title?.toUpperCase() || 'MR'} (ADT)
                </div>
                <div class="booking-ref">BOOKING REFERENCE: ${bookingId.toUpperCase()}</div>
                <div class="ticket-number">TICKET NUMBER: ${Math.random().toString().slice(2, 15)}</div>
              </div>
              <div class="issuing-office">
                <strong>Issuing office:</strong><br>
                STAFF ON DUTY DEL OFFICE, TR220123680,<br>
                DELHI<br>
                <strong>Date of issue:</strong> ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </div>
            </div>
          </div>

          <!-- Flight Details -->
          <div class="flight-details">
            <div class="itinerary-header">
              ELECTRONIC TICKET ITINERARY / RECEIPT
            </div>
            
            <div class="disclaimer-text">
              You must present this receipt along with a valid photo identification, mentioned at the time of booking, to enter the airport. 
              We seek your attention to make a note of our Terms and Conditions of Contract at www.airindia.com
            </div>

            <!-- Flight Route -->
            <div class="flight-route">
              <div>
                <div class="route-city">${flightData.from || 'Delhi'}</div>
                <div class="route-airport">${flightData.from === 'Delhi' ? 'INDIRA GANDHI INTL' : 'INTERNATIONAL'}</div>
                <div class="route-terminal">Terminal: ${Math.floor(Math.random() * 3) + 1}</div>
              </div>
              
              <div class="flight-info">
                <div class="flight-number">${flightData.flightNumber || 'AI121'}</div>
                <svg class="plane-graphic" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                </svg>
              </div>
              
              <div>
                <div class="route-city">${flightData.to || 'Mumbai'}</div>
                <div class="route-airport">${flightData.to === 'Frankfurt' ? 'FRANKFURT INTL' : 'INTERNATIONAL'}</div>
                <div class="route-terminal">Terminal: ${Math.floor(Math.random() * 3) + 1}</div>
              </div>
            </div>

            <!-- Times -->
            <div class="times-section">
              <div class="time-block">
                <div class="time">${flightData.departureTime || '14:00'}</div>
                <div class="date">
                  ${new Date(flightData.departureDate).toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </div>
                <div class="time-label">Departure</div>
              </div>
              <div class="time-block">
                <div class="time">${flightData.arrivalTime || '18:00'}</div>
                <div class="date">
                  ${new Date(flightData.departureDate).toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </div>
                <div class="time-label">Arrival</div>
              </div>
            </div>
          </div>

          <!-- Additional Information -->
          <div class="additional-info">
            <div class="info-grid">
              <div class="info-column">
                <div class="info-item">
                  <span class="info-label">Class:</span>
                  <span class="info-value">Y</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Baggage:</span>
                  <span class="info-value">2PC</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Fare basis:</span>
                  <span class="info-value">ID00S1</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Flight duration:</span>
                  <span class="info-value">${flightData.duration || '08:30'}</span>
                </div>
              </div>
              <div class="info-column">
                <div class="info-item">
                  <span class="info-label">Operated by:</span>
                  <span class="info-value">AIR INDIA</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Marketed by:</span>
                  <span class="info-value">AIR INDIA</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Booking status:</span>
                  <span class="info-value status-confirmed">CONFIRMED</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Total Amount:</span>
                  <span class="info-value total-amount">₹${totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <!-- Important Information -->
            <div class="important-notes">
              <h4 class="notes-title">Important Travel Information:</h4>
              <div class="notes-list">
                <p>• Please carry a valid photo ID for domestic flights or passport for international flights</p>
                <p>• Web check-in opens 48 hours before departure</p>
                <p>• Arrive at airport at least 2 hours before domestic flights, 3 hours for international</p>
                <p>• Contact: ${contactInfo.phone} | ${contactInfo.email}</p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};
