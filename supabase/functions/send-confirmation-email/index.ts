
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
    const { email, confirmationUrl, fullName } = await req.json();

    // Professional email template for Airbnb Clone+
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Airbnb Clone+ - Confirm Your Email</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          background-color: #f8f9fa;
        }
        .email-container { 
          max-width: 600px; 
          margin: 0 auto; 
          background-color: #ffffff; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .header { 
          background: linear-gradient(135deg, #ff385c 0%, #e91e63 100%);
          color: white; 
          padding: 40px; 
          text-align: center; 
        }
        .logo {
          width: 60px;
          height: 60px;
          background-color: rgba(255,255,255,0.2);
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          font-size: 24px;
        }
        .company-name { 
          font-size: 32px; 
          font-weight: bold; 
          margin-bottom: 8px;
          letter-spacing: 1px;
        }
        .tagline {
          font-size: 16px;
          opacity: 0.9;
          font-style: italic;
        }
        .content { 
          padding: 40px; 
        }
        .greeting {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          margin-bottom: 20px;
        }
        .message {
          font-size: 16px;
          line-height: 1.6;
          color: #666;
          margin-bottom: 30px;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #ff385c 0%, #e91e63 100%);
          color: white;
          padding: 16px 32px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
          font-size: 16px;
          margin: 20px 0;
          box-shadow: 0 4px 12px rgba(255, 56, 92, 0.3);
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(255, 56, 92, 0.4);
        }
        .features {
          background-color: #f8f9fa;
          padding: 30px;
          border-radius: 12px;
          margin: 30px 0;
        }
        .features h3 {
          color: #ff385c;
          margin-bottom: 15px;
          font-size: 20px;
        }
        .features ul {
          list-style: none;
          padding: 0;
        }
        .features li {
          padding: 8px 0;
          color: #666;
          position: relative;
          padding-left: 25px;
        }
        .features li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #28a745;
          font-weight: bold;
        }
        .footer {
          background-color: #2c3e50;
          color: white;
          padding: 30px;
          text-align: center;
        }
        .footer-logo {
          margin-bottom: 15px;
          font-size: 20px;
          font-weight: bold;
        }
        .social-links {
          margin: 20px 0;
        }
        .social-links a {
          color: #3498db;
          text-decoration: none;
          margin: 0 10px;
        }
        .help-section {
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 8px;
          padding: 20px;
          margin: 25px 0;
        }
        .help-section h4 {
          color: #856404;
          margin-bottom: 10px;
        }
        .help-section p {
          color: #856404;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <!-- Header -->
        <div class="header">
          <div class="logo">🏠</div>
          <div class="company-name">Airbnb Clone+</div>
          <div class="tagline">Find Your Perfect Stay</div>
        </div>

        <!-- Content -->
        <div class="content">
          <div class="greeting">Welcome${fullName ? `, ${fullName}` : ''}! 🎉</div>
          
          <div class="message">
            Thank you for joining <strong>Airbnb Clone+</strong>! We're excited to have you as part of our community of travelers and hosts.
          </div>

          <div class="message">
            To complete your registration and start exploring amazing places to stay around the world, please confirm your email address by clicking the button below:
          </div>

          <div style="text-align: center; margin: 40px 0;">
            <a href="${confirmationUrl}" class="cta-button">
              Confirm Your Email Address
            </a>
          </div>

          <!-- Features Section -->
          <div class="features">
            <h3>What you can do with Airbnb Clone+:</h3>
            <ul>
              <li>Browse thousands of unique accommodations</li>
              <li>Book instantly with secure payments</li>
              <li>Read reviews from verified guests</li>
              <li>Get 24/7 customer support</li>
              <li>Manage your bookings easily</li>
              <li>Discover local experiences</li>
            </ul>
          </div>

          <!-- Help Section -->
          <div class="help-section">
            <h4>🔗 Trouble with the confirmation link?</h4>
            <p>
              If the button above doesn't work, copy and paste this link into your browser:<br>
              <strong>${confirmationUrl}</strong>
            </p>
          </div>

          <div class="message">
            This confirmation link will expire in 24 hours. If you didn't create an account with us, you can safely ignore this email.
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <div class="footer-logo">Airbnb Clone+</div>
          <p>Your trusted platform for unique travel experiences</p>
          <div class="social-links">
            <span style="color: #bdc3c7;">Follow us: </span>
            <a href="#">Website</a> | 
            <a href="#">Facebook</a> | 
            <a href="#">Instagram</a> | 
            <a href="#">Twitter</a>
          </div>
          <p style="font-size: 12px; margin-top: 20px; opacity: 0.8;">
            This email was sent to ${email}. If you no longer wish to receive these emails, you can unsubscribe at any time.
          </p>
          <p style="font-size: 10px; margin-top: 15px; opacity: 0.6;">
            © 2024 Airbnb Clone+. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>`;

    console.log('Professional confirmation email template generated for:', email);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Confirmation email template generated successfully',
      html_content: htmlContent
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Email template generation error:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
