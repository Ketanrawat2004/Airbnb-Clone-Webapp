
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FlightPaymentRequest {
  flight_data: any;
  passenger_data: any[];
  contact_info: any;
  total_amount: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting flight payment creation process');

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
      throw new Error("Missing Supabase configuration");
    }

    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error("Razorpay credentials not configured");
    }

    // Authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Authentication required");
    }

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    const token = authHeader.replace("Bearer ", "");
    
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
    if (authError || !user?.email) {
      console.error('Auth error:', authError);
      throw new Error("Authentication failed");
    }

    console.log('User authenticated:', user.id);

    const paymentData: FlightPaymentRequest = await req.json();
    console.log('Flight payment data received:', {
      flight_route: `${paymentData.flight_data.from} → ${paymentData.flight_data.to}`,
      total_amount: paymentData.total_amount,
      passengers: paymentData.passenger_data.length,
    });

    // Create Razorpay order
    const orderData = {
      amount: paymentData.total_amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `flight_${Date.now()}`,
      notes: {
        flight_from: paymentData.flight_data.from,
        flight_to: paymentData.flight_data.to,
        user_id: user.id,
        booking_type: 'flight'
      },
    };

    console.log('Creating Razorpay order:', orderData);

    const auth = btoa(`${razorpayKeyId}:${razorpayKeySecret}`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!razorpayResponse.ok) {
      const errorText = await razorpayResponse.text();
      console.error('Razorpay error:', errorText);
      throw new Error(`Razorpay error: ${errorText}`);
    }

    const razorpayOrder = await razorpayResponse.json();
    console.log('Razorpay order created:', razorpayOrder.id);

    // Store flight booking data
    const supabaseService = createClient(supabaseUrl, supabaseServiceKey);
    
    const bookingData = {
      user_id: user.id,
      booking_type: 'flight',
      flight_data: paymentData.flight_data,
      passenger_data: paymentData.passenger_data,
      contact_info: paymentData.contact_info,
      total_amount: paymentData.total_amount,
      razorpay_order_id: razorpayOrder.id,
      payment_status: 'pending',
      status: 'pending',
      created_at: new Date().toISOString()
    };

    console.log('Creating flight booking with data:', bookingData);

    const { error: bookingError } = await supabaseService
      .from('flight_bookings')
      .insert(bookingData);

    if (bookingError) {
      console.error('Flight booking creation error:', bookingError);
      // Try to create table if it doesn't exist
      const { error: createTableError } = await supabaseService.rpc('create_flight_bookings_table');
      if (!createTableError) {
        // Retry insert
        const { error: retryError } = await supabaseService
          .from('flight_bookings')
          .insert(bookingData);
        if (retryError) {
          throw new Error('Flight booking creation failed');
        }
      } else {
        throw new Error('Flight booking creation failed');
      }
    }

    console.log('Flight booking created successfully');

    const response = { 
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key_id: razorpayKeyId,
      user_email: user.email,
      user_name: `${paymentData.passenger_data[0]?.firstName || ''} ${paymentData.passenger_data[0]?.lastName || ''}`.trim() || 'Passenger',
      contact_phone: paymentData.contact_info.phone,
    };

    console.log('Returning flight payment response');

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Flight payment creation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Flight payment setup failed';
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: error instanceof Error ? error.stack : 'Unknown error'
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
