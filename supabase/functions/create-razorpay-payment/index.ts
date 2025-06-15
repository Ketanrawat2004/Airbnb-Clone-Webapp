
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  hotel_id: string;
  check_in_date: string;
  check_out_date: string;
  guests: number;
  guest_phone: string;
  total_amount: number;
  guest_details: any;
  guest_list: any[];
}

serve(async (req) => {
  console.log('Razorpay payment function called with method:', req.method);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting Razorpay payment creation process...');

    // Check for required environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
      throw new Error("Missing Supabase configuration");
    }

    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error("Razorpay credentials are not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to edge function secrets.");
    }

    console.log('Environment variables verified');

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

    // Get authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    console.log('Authenticating user...');
    
    const { data, error: authError } = await supabaseClient.auth.getUser(token);
    if (authError) {
      console.error('Authentication error:', authError);
      throw new Error(`Authentication failed: ${authError.message}`);
    }

    const user = data.user;
    if (!user?.email) {
      throw new Error("User not authenticated or email not available");
    }

    console.log('User authenticated:', user.id, user.email);

    const paymentData: PaymentRequest = await req.json();
    console.log('Payment data received:', paymentData);

    // Get hotel details
    const { data: hotel, error: hotelError } = await supabaseClient
      .from('hotels')
      .select('name, location')
      .eq('id', paymentData.hotel_id)
      .single();

    if (hotelError || !hotel) {
      console.error('Hotel fetch error:', hotelError);
      throw new Error("Hotel not found");
    }

    console.log('Hotel found:', hotel.name);

    // Create Razorpay order
    const orderData = {
      amount: paymentData.total_amount, // Amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        hotel_id: paymentData.hotel_id,
        hotel_name: hotel.name,
        user_id: user.id,
        check_in: paymentData.check_in_date,
        check_out: paymentData.check_out_date,
        guests: paymentData.guests.toString(),
        guest_phone: paymentData.guest_phone,
      },
    };

    const auth = btoa(`${razorpayKeyId}:${razorpayKeySecret}`);
    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!razorpayResponse.ok) {
      const errorText = await razorpayResponse.text();
      throw new Error(`Razorpay API error: ${errorText}`);
    }

    const razorpayOrder = await razorpayResponse.json();
    console.log('Razorpay order created:', razorpayOrder.id);

    // Store booking in database using service role key
    const supabaseService = createClient(supabaseUrl, supabaseServiceKey);

    const { error: bookingError } = await supabaseService
      .from('bookings')
      .insert({
        user_id: user.id,
        hotel_id: paymentData.hotel_id,
        check_in_date: paymentData.check_in_date,
        check_out_date: paymentData.check_out_date,
        guests: paymentData.guests,
        total_amount: paymentData.total_amount,
        guest_phone: paymentData.guest_phone,
        razorpay_order_id: razorpayOrder.id,
        payment_status: 'pending',
        status: 'pending',
        guest_list: paymentData.guest_list || [],
      });

    if (bookingError) {
      console.error('Error creating booking:', bookingError);
      throw new Error(`Failed to create booking: ${bookingError.message}`);
    }

    console.log('Booking created successfully');

    const response = { 
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key_id: razorpayKeyId,
      hotel_name: hotel.name,
      user_email: user.email,
      user_name: paymentData.guest_details?.firstName + ' ' + paymentData.guest_details?.lastName || 'Guest',
      guest_phone: paymentData.guest_phone,
    };

    console.log('Returning response:', response);

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Razorpay payment creation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: error instanceof Error ? error.stack : undefined 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
