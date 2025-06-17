
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
  coupon_data?: any;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting payment creation process');

    // Environment variables check
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    console.log('Environment check:', {
      supabaseUrl: !!supabaseUrl,
      supabaseAnonKey: !!supabaseAnonKey,
      supabaseServiceKey: !!supabaseServiceKey,
      razorpayKeyId: !!razorpayKeyId,
      razorpayKeySecret: !!razorpayKeySecret,
    });

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

    const paymentData: PaymentRequest = await req.json();
    console.log('Payment data received:', {
      hotel_id: paymentData.hotel_id,
      total_amount: paymentData.total_amount,
      guests: paymentData.guests,
    });

    const finalAmount = paymentData.total_amount;

    // Create Razorpay order
    const orderData = {
      amount: finalAmount,
      currency: 'INR',
      receipt: `booking_${Date.now()}`,
      notes: {
        hotel_id: paymentData.hotel_id,
        user_id: user.id,
      },
    };

    console.log('Creating Razorpay order:', orderData);

    const auth = btoa(`${razorpayKeyId}:${razorpayKeySecret}`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

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

    console.log('Razorpay response status:', razorpayResponse.status);

    if (!razorpayResponse.ok) {
      const errorText = await razorpayResponse.text();
      console.error('Razorpay error:', errorText);
      throw new Error(`Razorpay error: ${errorText}`);
    }

    const razorpayOrder = await razorpayResponse.json();
    console.log('Razorpay order created:', razorpayOrder.id);

    // Store booking data using service role
    const supabaseService = createClient(supabaseUrl, supabaseServiceKey);
    
    const bookingData = {
      user_id: user.id,
      hotel_id: paymentData.hotel_id,
      check_in_date: paymentData.check_in_date,
      check_out_date: paymentData.check_out_date,
      guests: paymentData.guests,
      total_amount: finalAmount,
      base_amount: finalAmount,
      discount_amount: paymentData.coupon_data?.discountAmount || 0,
      guest_phone: paymentData.guest_phone,
      razorpay_order_id: razorpayOrder.id,
      payment_status: 'pending',
      status: 'pending',
      guest_list: paymentData.guest_list,
      coupon_code: paymentData.coupon_data?.code || null,
    };

    console.log('Creating booking with data:', bookingData);

    const { error: bookingError } = await supabaseService
      .from('bookings')
      .insert(bookingData);

    if (bookingError) {
      console.error('Booking creation error:', bookingError);
      throw new Error('Booking creation failed');
    }

    console.log('Booking created successfully');

    // Get hotel name
    const { data: hotel } = await supabaseClient
      .from('hotels')
      .select('name')
      .eq('id', paymentData.hotel_id)
      .single();

    const response = { 
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key_id: razorpayKeyId,
      hotel_name: hotel?.name || 'Hotel',
      user_email: user.email,
      user_name: `${paymentData.guest_details?.firstName || ''} ${paymentData.guest_details?.lastName || ''}`.trim() || 'Guest',
      guest_phone: paymentData.guest_phone,
    };

    console.log('Returning response:', response);

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Payment creation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Payment setup failed';
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: error instanceof Error ? error.stack : 'Unknown error'
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
