
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

    console.log('Sending confirmation email to:', email);
    console.log('Confirmation URL:', confirmationUrl);

    // Enhanced email template with better navigation and confirmation design
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirm Your Airbnb Clone+ Account</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * { 
          margin: 0; 
          padding: 0; 
          box-sizing: border-box; 
        }
        
        body { 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6; 
          color: #1f2937; 
          background-color: #f9fafb;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        
        .email-wrapper {
          width: 100%;
          background-color: #f9fafb;
          padding: 40px 20px;
        }
        
        .email-container { 
          max-width: 600px; 
          margin: 0 auto; 
          background-color: #ffffff; 
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .header { 
          background: linear-gradient(135deg, #ff385c 0%, #e91e63 100%);
          color: white; 
          padding: 48px 40px; 
          text-align: center; 
          position: relative;
        }
        
        .logo-container {
          position: relative;
          z-index: 1;
          margin-bottom: 24px;
        }
        
        .logo {
          width: 80px;
          height: 80px;
          background-color: rgba(255,255,255,0.15);
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          font-size: 36px;
        }
        
        .company-name { 
          font-size: 36px; 
          font-weight: 700; 
          margin-bottom: 8px;
          letter-spacing: -0.5px;
          position: relative;
          z-index: 1;
        }
        
        .tagline {
          font-size: 18px;
          opacity: 0.9;
          font-weight: 400;
          position: relative;
          z-index: 1;
        }
        
        .content { 
          padding: 48px 40px; 
        }
        
        .greeting {
          font-size: 28px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 24px;
          line-height: 1.3;
        }
        
        .message {
          font-size: 16px;
          line-height: 1.7;
          color: #4b5563;
          margin-bottom: 32px;
        }
        
        .message strong {
          color: #111827;
          font-weight: 600;
        }
        
        .cta-container {
          text-align: center;
          margin: 40px 0;
        }
        
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #ff385c 0%, #e91e63 100%);
          color: white;
          padding: 18px 36px;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 16px;
          letter-spacing: 0.5px;
          box-shadow: 0 8px 20px rgba(255, 56, 92, 0.3);
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }
        
        .navigation-notice {
          background: linear-gradient(135deg, #e0f2fe 0%, #f3e5f5 100%);
          border: 1px solid #81d4fa;
          border-radius: 12px;
          padding: 24px;
          margin: 32px 0;
          text-align: center;
        }
        
        .navigation-notice h4 {
          color: #1565c0;
          margin-bottom: 12px;
          font-size: 18px;
          font-weight: 600;
        }
        
        .navigation-notice p {
          color: #1976d2;
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 16px;
        }
        
        .feature-list {
          list-style: none;
          padding: 0;
          margin: 16px 0;
        }
        
        .feature-list li {
          color: #1976d2;
          font-size: 14px;
          margin: 8px 0;
          padding-left: 20px;
          position: relative;
        }
        
        .feature-list li:before {
          content: "✨";
          position: absolute;
          left: 0;
        }
        
        .security-notice {
          background: #fef3c7;
          border: 1px solid #f59e0b;
          border-radius: 12px;
          padding: 20px;
          margin: 32px 0;
        }
        
        .security-notice h4 {
          color: #92400e;
          margin-bottom: 8px;
          font-size: 16px;
          font-weight: 600;
        }
        
        .security-notice p {
          color: #92400e;
          font-size: 14px;
          line-height: 1.6;
        }
        
        .backup-link {
          background: #f3f4f6;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 16px;
          margin: 24px 0;
          font-size: 14px;
          word-break: break-all;
        }
        
        .footer {
          background-color: #111827;
          color: #9ca3af;
          padding: 40px;
          text-align: center;
        }
        
        .footer-logo {
          margin-bottom: 16px;
          font-size: 24px;
          font-weight: 700;
          color: #ff385c;
        }
        
        .footer-description {
          font-size: 16px;
          margin-bottom: 24px;
          color: #d1d5db;
        }
        
        .footer-legal {
          font-size: 12px;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #374151;
          color: #6b7280;
          line-height: 1.6;
        }
        
        @media only screen and (max-width: 600px) {
          .email-wrapper {
            padding: 20px 10px;
          }
          
          .header {
            padding: 32px 24px;
          }
          
          .content {
            padding: 32px 24px;
          }
          
          .company-name {
            font-size: 28px;
          }
          
          .greeting {
            font-size: 24px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="email-container">
          <!-- Header -->
          <div class="header">
            <div class="logo-container">
              <div class="logo">🏠</div>
            </div>
            <div class="company-name">Airbnb Clone+</div>
            <div class="tagline">Your Gateway to Extraordinary Stays</div>
          </div>

          <!-- Content -->
          <div class="content">
            <div class="greeting">Welcome${fullName ? `, ${fullName}` : ''}! 🎉</div>
            
            <div class="message">
              Thank you for joining <strong>Airbnb Clone+</strong>! We're thrilled to have you as part of our growing community of travelers and hosts who believe in creating unforgettable experiences.
            </div>

            <div class="message">
              To activate your account and start exploring our enhanced platform with improved navigation and features, please confirm your email address by clicking the button below:
            </div>

            <div class="cta-container">
              <a href="${confirmationUrl}" class="cta-button">
                ✅ Confirm Email & Get Started
              </a>
            </div>

            <!-- Enhanced Navigation Features Notice -->
            <div class="navigation-notice">
              <h4>🚀 What's New in Airbnb Clone+</h4>
              <p>
                After confirming your email, you'll have access to our enhanced platform with new features:
              </p>
              <ul class="feature-list">
                <li>Improved navigation menu for easy browsing</li>
                <li>Enhanced search functionality</li>
                <li>Personalized user dashboard</li>
                <li>Mobile-friendly responsive design</li>
                <li>Quick access to all platform features</li>
              </ul>
              <p>
                <strong>Your account will be fully activated once you confirm your email!</strong>
              </p>
            </div>

            <!-- Security Notice -->
            <div class="security-notice">
              <h4>🔒 Having trouble with the button?</h4>
              <p>
                If the confirmation button doesn't work, copy and paste this secure link into your browser:
              </p>
              <div class="backup-link">
                ${confirmationUrl}
              </div>
            </div>

            <div class="message">
              <strong>Important:</strong> This confirmation link will expire in 24 hours for your security. If you didn't create an account with Airbnb Clone+, please disregard this email.
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <div class="footer-logo">Airbnb Clone+</div>
            <div class="footer-description">
              Connecting travelers with extraordinary experiences since 2024
            </div>
            
            <div class="footer-legal">
              <p>This email was sent to <strong>${email}</strong></p>
              <p style="margin-top: 8px;">
                © 2024 Airbnb Clone+. All rights reserved.<br>
                You're receiving this because you created an account with us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>`;

    // Send the email using Resend
    const emailResponse = await resend.emails.send({
      from: "Airbnb Clone+ <onboarding@resend.dev>",
      to: [email],
      subject: "🏠 Confirm Your Airbnb Clone+ Account - Enhanced Navigation Awaits!",
      html: htmlContent,
    });

    console.log('Email sent successfully:', emailResponse);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Enhanced confirmation email sent successfully',
      emailId: emailResponse.id
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
