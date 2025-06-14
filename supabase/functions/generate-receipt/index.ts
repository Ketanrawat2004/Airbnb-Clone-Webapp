
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { booking_id } = await req.json();

    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get booking details with user profile
    const { data: booking, error } = await supabaseService
      .from('bookings')
      .select(`
        *,
        hotels:hotel_id (name, location, facilities, rules_and_regulations),
        profiles:user_id (full_name)
      `)
      .eq('id', booking_id)
      .single();

    if (error || !booking) {
      throw new Error('Booking not found');
    }

    const hotel = booking.hotels;
    const profile = booking.profiles;
    const checkInDate = new Date(booking.check_in_date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const checkOutDate = new Date(booking.check_out_date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const bookingDate = new Date(booking.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Calculate nights
    const nights = Math.ceil(
      (new Date(booking.check_out_date).getTime() - new Date(booking.check_in_date).getTime()) 
      / (1000 * 3600 * 24)
    );

    // Generate professional HTML content for email
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation - ${hotel.name}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          background-color: #f8f9fa;
        }
        .email-container { 
          max-width: 600px; 
          margin: 0 auto; 
          background-color: #ffffff; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .header { 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white; 
          padding: 30px 40px; 
          text-align: center; 
        }
        .logo-section {
          margin-bottom: 20px;
        }
        .logo {
          width: 80px;
          height: 80px;
          background-color: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .company-name { 
          font-size: 28px; 
          font-weight: bold; 
          margin-bottom: 5px;
          letter-spacing: 1px;
        }
        .company-tagline {
          font-size: 14px;
          opacity: 0.9;
          font-style: italic;
        }
        .owner-info {
          margin-top: 15px;
          font-size: 14px;
          opacity: 0.8;
        }
        .confirmation-badge {
          background-color: #28a745;
          color: white;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 16px;
          font-weight: bold;
          margin: 20px 0;
          display: inline-block;
        }
        .content { 
          padding: 40px; 
        }
        .booking-summary {
          background-color: #f8f9fa;
          border-left: 4px solid #667eea;
          padding: 25px;
          margin: 25px 0;
          border-radius: 0 8px 8px 0;
        }
        .hotel-info {
          display: flex;
          align-items: center;
          margin-bottom: 25px;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .hotel-image {
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          font-weight: bold;
          margin-right: 20px;
        }
        .hotel-details h3 {
          color: #667eea;
          font-size: 20px;
          margin-bottom: 5px;
        }
        .hotel-location {
          color: #666;
          font-size: 14px;
        }
        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin: 25px 0;
        }
        .detail-item {
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 6px;
        }
        .detail-label {
          font-size: 12px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        .detail-value {
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }
        .price-breakdown {
          background-color: #667eea;
          color: white;
          padding: 25px;
          border-radius: 8px;
          margin: 25px 0;
        }
        .price-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 14px;
        }
        .total-amount {
          border-top: 2px solid rgba(255,255,255,0.3);
          padding-top: 15px;
          margin-top: 15px;
          font-size: 20px;
          font-weight: bold;
        }
        .facilities-section {
          margin: 30px 0;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          color: #667eea;
          margin-bottom: 15px;
          border-bottom: 2px solid #f0f0f0;
          padding-bottom: 8px;
        }
        .facilities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 10px;
        }
        .facility-item {
          background-color: #e8f4f8;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 12px;
          text-align: center;
          color: #667eea;
          font-weight: 500;
        }
        .important-info {
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 8px;
          padding: 20px;
          margin: 25px 0;
        }
        .important-info h4 {
          color: #856404;
          margin-bottom: 10px;
        }
        .important-info ul {
          color: #856404;
          padding-left: 20px;
        }
        .contact-info {
          background-color: #f8f9fa;
          padding: 25px;
          border-radius: 8px;
          margin: 25px 0;
          text-align: center;
        }
        .footer {
          background-color: #2c3e50;
          color: white;
          padding: 30px;
          text-align: center;
        }
        .footer-logo {
          margin-bottom: 15px;
        }
        .social-links {
          margin: 20px 0;
        }
        .social-links a {
          color: #3498db;
          text-decoration: none;
          margin: 0 10px;
        }
        @media (max-width: 600px) {
          .content { padding: 20px; }
          .detail-grid { grid-template-columns: 1fr; }
          .hotel-info { flex-direction: column; text-align: center; }
          .hotel-image { margin-right: 0; margin-bottom: 15px; }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <!-- Header -->
        <div class="header">
          <div class="logo-section">
            <div class="logo">KR</div>
            <div class="company-name">Ketan Rawat Hotels</div>
            <div class="company-tagline">Your Premier Hospitality Experience</div>
            <div class="owner-info">Managed by Ketan Rawat</div>
          </div>
          <div class="confirmation-badge">✓ BOOKING CONFIRMED</div>
        </div>

        <!-- Content -->
        <div class="content">
          <!-- Hotel Information -->
          <div class="hotel-info">
            <div class="hotel-image">${hotel.name.charAt(0)}</div>
            <div class="hotel-details">
              <h3>${hotel.name}</h3>
              <div class="hotel-location">📍 ${hotel.location}</div>
            </div>
          </div>

          <!-- Booking Summary -->
          <div class="booking-summary">
            <h2 style="color: #667eea; margin-bottom: 20px;">Booking Summary</h2>
            
            <div class="detail-grid">
              <div class="detail-item">
                <div class="detail-label">Booking ID</div>
                <div class="detail-value">#${booking.id.substring(0, 8).toUpperCase()}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Guest Name</div>
                <div class="detail-value">${booking.guest_name || profile?.full_name || 'Guest'}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Booking Date</div>
                <div class="detail-value">${bookingDate}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Phone Number</div>
                <div class="detail-value">${booking.guest_phone || 'Not provided'}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Check-in Date</div>
                <div class="detail-value">${checkInDate}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Check-out Date</div>
                <div class="detail-value">${checkOutDate}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Duration</div>
                <div class="detail-value">${nights} ${nights === 1 ? 'Night' : 'Nights'}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Number of Guests</div>
                <div class="detail-value">${booking.guests} ${booking.guests === 1 ? 'Guest' : 'Guests'}</div>
              </div>
            </div>
          </div>

          <!-- Price Breakdown -->
          <div class="price-breakdown">
            <h3 style="margin-bottom: 15px;">Payment Summary</h3>
            <div class="price-row">
              <span>Room Rate (per night)</span>
              <span>$${((booking.total_amount / 100) / nights).toFixed(2)}</span>
            </div>
            <div class="price-row">
              <span>Number of Nights</span>
              <span>× ${nights}</span>
            </div>
            <div class="price-row">
              <span>Subtotal</span>
              <span>$${(booking.total_amount / 100).toFixed(2)}</span>
            </div>
            <div class="total-amount">
              <div class="price-row" style="font-size: 20px; margin-bottom: 0;">
                <span>Total Amount Paid</span>
                <span>$${(booking.total_amount / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>

          ${hotel.facilities && hotel.facilities.length > 0 ? `
          <!-- Hotel Facilities -->
          <div class="facilities-section">
            <h3 class="section-title">🏨 Hotel Facilities & Amenities</h3>
            <div class="facilities-grid">
              ${hotel.facilities.map(facility => `<div class="facility-item">${facility}</div>`).join('')}
            </div>
          </div>
          ` : ''}

          ${hotel.rules_and_regulations && hotel.rules_and_regulations.length > 0 ? `
          <!-- Important Information -->
          <div class="important-info">
            <h4>📋 Important Hotel Policies</h4>
            <ul>
              ${hotel.rules_and_regulations.map(rule => `<li>${rule}</li>`).join('')}
            </ul>
          </div>
          ` : ''}

          <!-- Check-in Instructions -->
          <div class="important-info">
            <h4>🔑 Check-in Instructions</h4>
            <ul>
              <li>Check-in time: 3:00 PM onwards</li>
              <li>Check-out time: 11:00 AM</li>
              <li>Please carry a valid government-issued photo ID</li>
              <li>Present this booking confirmation at the reception</li>
              <li>Early check-in subject to availability</li>
            </ul>
          </div>

          <!-- Contact Information -->
          <div class="contact-info">
            <h3 style="color: #667eea; margin-bottom: 15px;">Need Assistance?</h3>
            <p><strong>Hotel Contact:</strong> Available at hotel reception</p>
            <p><strong>Booking Support:</strong> Contact Ketan Rawat</p>
            <p><strong>Emergency:</strong> 24/7 hotel front desk</p>
            <p style="margin-top: 15px; font-size: 12px; color: #666;">
              For any changes or cancellations, please contact us at least 24 hours before check-in.
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <div class="footer-logo">
            <strong>Ketan Rawat Hotels</strong>
          </div>
          <p>Thank you for choosing us for your stay!</p>
          <p style="font-size: 12px; margin-top: 15px; opacity: 0.8;">
            This is an automated confirmation email. Please save this for your records.
          </p>
          <div class="social-links">
            <span style="color: #bdc3c7;">Follow us: </span>
            <a href="#">Website</a> | 
            <a href="#">Facebook</a> | 
            <a href="#">Instagram</a>
          </div>
          <p style="font-size: 10px; margin-top: 20px; opacity: 0.6;">
            © 2024 Ketan Rawat Hotels. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>`;

    console.log('Professional receipt generated for booking:', booking_id);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Professional receipt generated successfully',
      html_content: htmlContent
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Receipt generation error:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
