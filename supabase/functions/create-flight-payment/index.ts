
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
    console.log('Starting flight payment creation process');

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get the authenticated user
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;

    if (!user) {
      throw new Error("User not authenticated");
    }

    console.log('User authenticated:', user.id);

    const { flight_data, passenger_data, contact_info, total_amount } = await req.json();

    console.log('Flight payment data received:', {
      flight_route: `${flight_data.from} → ${flight_data.to}`,
      total_amount,
      passengers: passenger_data.length
    });

    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error("Razorpay keys not configured");
    }

    // Create Razorpay order
    const receipt = `flight_${Date.now()}`;
    const amount = total_amount * 100; // Convert to paise

    const orderData = {
      amount: amount,
      currency: "INR",
      receipt: receipt,
      notes: {
        flight_from: flight_data.from,
        flight_to: flight_data.to,
        user_id: user.id,
        booking_type: "flight"
      }
    };

    console.log('Creating Razorpay order:', orderData);

    const authString = btoa(`${razorpayKeyId}:${razorpayKeySecret}`);
    
    const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${authString}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!razorpayResponse.ok) {
      const errorText = await razorpayResponse.text();
      console.error('Razorpay API error:', errorText);
      throw new Error(`Razorpay API error: ${errorText}`);
    }

    const order = await razorpayResponse.json();
    console.log('Razorpay order created:', order.id);

    // Use service role key to bypass RLS for creating flight booking
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const flightBookingData = {
      user_id: user.id,
      booking_type: "flight",
      flight_data: flight_data,
      passenger_data: passenger_data,
      contact_info: contact_info,
      total_amount: total_amount,
      razorpay_order_id: order.id,
      payment_status: "pending",
      status: "pending",
      created_at: new Date().toISOString()
    };

    console.log('Creating flight booking with data:', flightBookingData);

    const { data: bookingData, error: bookingError } = await supabaseService
      .from('flight_bookings')
      .insert([flightBookingData])
      .select()
      .single();

    if (bookingError) {
      console.error('Flight booking creation error:', bookingError);
      throw new Error('Flight booking creation failed');
    }

    console.log('Flight booking created successfully:', bookingData.id);

    const response = {
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: razorpayKeyId,
      flight_booking_id: bookingData.id
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error('Flight payment creation error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
