
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
    const checkInDate = new Date(booking.check_in_date).toLocaleDateString();
    const checkOutDate = new Date(booking.check_out_date).toLocaleDateString();
    const bookingDate = new Date(booking.created_at).toLocaleDateString();

    // Calculate nights
    const nights = Math.ceil(
      (new Date(booking.check_out_date).getTime() - new Date(booking.check_in_date).getTime()) 
      / (1000 * 3600 * 24)
    );

    // Generate HTML content for PDF
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Booking Receipt</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
        .hotel-name { font-size: 24px; font-weight: bold; color: #2c5aa0; }
        .receipt-title { font-size: 18px; margin-top: 10px; }
        .booking-details { margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 5px 0; }
        .detail-label { font-weight: bold; }
        .total-section { border-top: 2px solid #333; margin-top: 20px; padding-top: 15px; }
        .total-amount { font-size: 20px; font-weight: bold; color: #2c5aa0; }
        .facilities { margin: 20px 0; }
        .facility-list { list-style: none; padding: 0; }
        .facility-item { background: #f5f5f5; margin: 5px 0; padding: 8px 12px; border-radius: 4px; }
        .rules { margin: 20px 0; font-size: 12px; color: #666; }
        .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="hotel-name">${hotel.name}</div>
        <div>${hotel.location}</div>
        <div class="receipt-title">BOOKING RECEIPT</div>
      </div>

      <div class="booking-details">
        <div class="detail-row">
          <span class="detail-label">Booking ID:</span>
          <span>${booking.id}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Guest Name:</span>
          <span>${profile?.full_name || 'Guest'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Booking Date:</span>
          <span>${bookingDate}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Check-in Date:</span>
          <span>${checkInDate}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Check-out Date:</span>
          <span>${checkOutDate}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Number of Nights:</span>
          <span>${nights}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Number of Guests:</span>
          <span>${booking.guests}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Room Rate per Night:</span>
          <span>$${((booking.total_amount / 100) / nights).toFixed(2)}</span>
        </div>
      </div>

      <div class="total-section">
        <div class="detail-row">
          <span class="detail-label">Subtotal (${nights} nights):</span>
          <span>$${(booking.total_amount / 100).toFixed(2)}</span>
        </div>
        <div class="detail-row total-amount">
          <span>Total Amount Paid:</span>
          <span>$${(booking.total_amount / 100).toFixed(2)}</span>
        </div>
      </div>

      ${hotel.facilities && hotel.facilities.length > 0 ? `
      <div class="facilities">
        <h3>Hotel Facilities</h3>
        <ul class="facility-list">
          ${hotel.facilities.map(facility => `<li class="facility-item">• ${facility}</li>`).join('')}
        </ul>
      </div>
      ` : ''}

      ${hotel.rules_and_regulations && hotel.rules_and_regulations.length > 0 ? `
      <div class="rules">
        <h4>Hotel Rules & Regulations</h4>
        <ul>
          ${hotel.rules_and_regulations.map(rule => `<li>${rule}</li>`).join('')}
        </ul>
      </div>
      ` : ''}

      <div class="footer">
        <p>Thank you for choosing ${hotel.name}!</p>
        <p>For any questions, please contact us at our reception.</p>
        <p>This is an electronic receipt. Please present this at check-in.</p>
      </div>
    </body>
    </html>`;

    // Return the HTML content (in a real implementation, you'd convert this to PDF using a service like Puppeteer)
    // For now, we'll just log the success and return a success response
    console.log('PDF receipt generated for booking:', booking_id);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Receipt generated successfully',
      html_content: htmlContent // This would normally be a PDF binary
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
