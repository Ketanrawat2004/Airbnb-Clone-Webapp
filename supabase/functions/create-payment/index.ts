
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
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
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;

    if (!user?.email) {
      throw new Error("User not authenticated");
    }

    const paymentData: PaymentRequest = await req.json();
    
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Check for existing customer
    const customers = await stripe.customers.list({ 
      email: user.email, 
      limit: 1 
    });
    
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Get hotel details
    const { data: hotel, error: hotelError } = await supabaseClient
      .from('hotels')
      .select('name, location')
      .eq('id', paymentData.hotel_id)
      .single();

    if (hotelError || !hotel) {
      throw new Error("Hotel not found");
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentData.total_amount,
      currency: 'usd',
      customer: customerId,
      metadata: {
        hotel_id: paymentData.hotel_id,
        hotel_name: hotel.name,
        user_id: user.id,
        check_in: paymentData.check_in_date,
        check_out: paymentData.check_out_date,
        guests: paymentData.guests.toString(),
        guest_phone: paymentData.guest_phone,
      },
    });

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Hotel Booking - ${hotel.name}`,
              description: `${hotel.location} | ${paymentData.check_in_date} to ${paymentData.check_out_date} | ${paymentData.guests} guests`,
            },
            unit_amount: paymentData.total_amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_intent_data: {
        metadata: paymentIntent.metadata,
      },
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/payment-canceled`,
    });

    // Store booking in database
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

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
        stripe_session_id: session.id,
        payment_intent_id: paymentIntent.id,
        payment_status: 'pending',
        status: 'pending',
      });

    if (bookingError) {
      console.error('Error creating booking:', bookingError);
      throw bookingError;
    }

    return new Response(JSON.stringify({ 
      url: session.url,
      session_id: session.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Payment creation error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
