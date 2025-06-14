
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

    // Modern, clean email template for Airbnb Clone+
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirm Your Airbnb Clone+ Account</title>
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
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
        
        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="30" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
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
        
        .features {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 32px;
          border-radius: 16px;
          margin: 32px 0;
          border: 1px solid #e2e8f0;
        }
        
        .features h3 {
          color: #ff385c;
          margin-bottom: 20px;
          font-size: 20px;
          font-weight: 600;
          text-align: center;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
          margin-top: 20px;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          padding: 12px 0;
          color: #4b5563;
          font-size: 15px;
        }
        
        .feature-icon {
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          font-size: 12px;
          color: white;
          font-weight: bold;
          flex-shrink: 0;
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
        
        .footer-links {
          margin: 24px 0;
          font-size: 14px;
        }
        
        .footer-links a {
          color: #6b7280;
          text-decoration: none;
          margin: 0 8px;
          transition: color 0.3s ease;
        }
        
        .footer-links a:hover {
          color: #ff385c;
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
          
          .features-grid {
            grid-template-columns: 1fr;
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
              To activate your account and start discovering amazing places around the world, please confirm your email address by clicking the button below:
            </div>

            <div class="cta-container">
              <a href="${confirmationUrl}" class="cta-button">
                Confirm Email & Get Started
              </a>
            </div>

            <!-- Features Section -->
            <div class="features">
              <h3>🌟 What awaits you on Airbnb Clone+</h3>
              <div class="features-grid">
                <div class="feature-item">
                  <div class="feature-icon">✓</div>
                  <span>Browse thousands of unique accommodations worldwide</span>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">✓</div>
                  <span>Book instantly with secure, encrypted payments</span>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">✓</div>
                  <span>Read authentic reviews from verified guests</span>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">✓</div>
                  <span>Access 24/7 premium customer support</span>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">✓</div>
                  <span>Manage bookings with our intuitive dashboard</span>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">✓</div>
                  <span>Discover curated local experiences</span>
                </div>
              </div>
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
            
            <div class="footer-links">
              <a href="#">Help Center</a> •
              <a href="#">Privacy Policy</a> •
              <a href="#">Terms of Service</a> •
              <a href="#">Contact Us</a>
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

    console.log('Professional confirmation email generated for:', email);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Professional confirmation email template generated successfully',
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
