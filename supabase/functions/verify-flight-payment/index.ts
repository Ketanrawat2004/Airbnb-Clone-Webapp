
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
    console.log('Starting flight payment verification');

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await req.json();

    console.log('Received flight payment verification data:', {
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      signature: !!razorpay_signature,
    });

    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!razorpayKeySecret) {
      throw new Error("Razorpay key secret not configured");
    }

    // Verify signature
    const crypto = await import("node:crypto");
    const expectedSignature = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    console.log('Signature verification:', {
      expected: expectedSignature,
      received: razorpay_signature,
      match: expectedSignature === razorpay_signature,
    });

    if (expectedSignature !== razorpay_signature) {
      throw new Error("Payment signature verification failed");
    }

    // Update flight booking status
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    console.log('Updating flight booking for order:', razorpay_order_id);

    const { data: booking, error: updateError } = await supabaseService
      .from('flight_bookings')
      .update({
        payment_status: 'paid',
        status: 'confirmed',
        razorpay_payment_id: razorpay_payment_id,
        confirmed_at: new Date().toISOString()
      })
      .eq('razorpay_order_id', razorpay_order_id)
      .select('*')
      .single();

    if (updateError) {
      console.error('Error updating flight booking:', updateError);
      throw updateError;
    }

    if (!booking) {
      throw new Error('Flight booking not found');
    }

    console.log('Flight booking updated successfully:', booking.id);

    // Generate booking ID
    const bookingId = `FL${Date.now().toString().slice(-8)}`;

    const response = { 
      success: true, 
      booking_id: bookingId,
      payment_id: razorpay_payment_id,
      flight_booking_id: booking.id
    };

    console.log('Flight payment verification successful:', response);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error('Flight payment verification error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      details: error instanceof Error ? error.stack : 'Unknown error'
    }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
