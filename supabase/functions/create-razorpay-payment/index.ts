
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
    // Environment variables check
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

    // Fast authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Authentication required");
    }

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    const token = authHeader.replace("Bearer ", "");
    
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
    if (authError || !user?.email) {
      throw new Error("Authentication failed");
    }

    const paymentData: PaymentRequest = await req.json();
    const finalAmount = paymentData.total_amount;

    // Optimized Razorpay order creation - minimal payload
    const orderData = {
      amount: finalAmount,
      currency: 'INR',
      receipt: `booking_${Date.now()}`,
      notes: {
        hotel_id: paymentData.hotel_id,
        user_id: user.id,
      },
    };

    const auth = btoa(`${razorpayKeyId}:${razorpayKeySecret}`);
    
    // Create Razorpay order with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

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
      throw new Error(`Razorpay error: ${errorText}`);
    }

    const razorpayOrder = await razorpayResponse.json();

    // Store minimal booking data using service role
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

    const { error: bookingError } = await supabaseService
      .from('bookings')
      .insert(bookingData);

    if (bookingError) {
      console.error('Booking creation error:', bookingError);
      throw new Error('Booking creation failed');
    }

    // Get hotel name quickly - only name needed
    const { data: hotel } = await supabaseClient
      .from('hotels')
      .select('name')
      .eq('id', paymentData.hotel_id)
      .single();

    // Return minimal response for faster processing
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

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Payment creation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Payment setup failed';
    
    return new Response(JSON.stringify({ 
      error: errorMessage
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
