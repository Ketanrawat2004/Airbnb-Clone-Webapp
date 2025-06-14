
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
    const { booking_id, phone } = await req.json();

    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get booking details
    const { data: booking, error } = await supabaseService
      .from('bookings')
      .select(`
        *,
        hotels:hotel_id (name, location, facilities, rules_and_regulations)
      `)
      .eq('id', booking_id)
      .single();

    if (error || !booking) {
      throw new Error('Booking not found');
    }

    const hotel = booking.hotels;
    const checkInDate = new Date(booking.check_in_date).toLocaleDateString();
    const checkOutDate = new Date(booking.check_out_date).toLocaleDateString();

    const message = `🏨 Booking Confirmed! 

Hotel: ${hotel.name}
Location: ${hotel.location}
Check-in: ${checkInDate}
Check-out: ${checkOutDate}
Guests: ${booking.guests}
Total: $${(booking.total_amount / 100).toFixed(2)}

Facilities: ${hotel.facilities?.slice(0, 3).join(', ')}${hotel.facilities?.length > 3 ? '...' : ''}

Your booking receipt will be sent via email shortly.

Thank you for choosing us!`;

    // Using Twilio for SMS (you would need to add TWILIO credentials as secrets)
    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const fromNumber = Deno.env.get('TWILIO_PHONE_NUMBER');

    if (!accountSid || !authToken || !fromNumber) {
      console.log('SMS credentials not configured, skipping SMS');
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'SMS credentials not configured' 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const auth = btoa(`${accountSid}:${authToken}`);
    
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: phone,
          From: fromNumber,
          Body: message,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Twilio error:', errorData);
      throw new Error('Failed to send SMS');
    }

    const result = await response.json();
    console.log('SMS sent successfully:', result.sid);

    return new Response(JSON.stringify({ 
      success: true, 
      message_sid: result.sid 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('SMS error:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
