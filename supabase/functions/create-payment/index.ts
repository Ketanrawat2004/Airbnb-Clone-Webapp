
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
  console.log('Payment function called with method:', req.method);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting payment creation process...');

    // Check for required environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");

    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
      throw new Error("Missing Supabase configuration");
    }

    if (!stripeSecretKey) {
      throw new Error("Stripe secret key is not configured. Please add STRIPE_SECRET_KEY to edge function secrets.");
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
    
    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    console.log('Stripe initialized');

    // Check for existing customer
    const customers = await stripe.customers.list({ 
      email: user.email, 
      limit: 1 
    });
    
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log('Found existing customer:', customerId);
    } else {
      console.log('No existing customer found');
    }

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

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentData.total_amount,
      currency: 'inr', // Changed to INR since amounts are in paise
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

    console.log('Payment intent created:', paymentIntent.id);

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "inr", // Changed to INR
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

    console.log('Checkout session created:', session.id);

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
        stripe_session_id: session.id,
        payment_intent_id: paymentIntent.id,
        payment_status: 'pending',
        status: 'pending',
      });

    if (bookingError) {
      console.error('Error creating booking:', bookingError);
      throw new Error(`Failed to create booking: ${bookingError.message}`);
    }

    console.log('Booking created successfully');

    const response = { 
      url: session.url,
      session_id: session.id 
    };

    console.log('Returning response:', response);

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Payment creation error:', error);
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
