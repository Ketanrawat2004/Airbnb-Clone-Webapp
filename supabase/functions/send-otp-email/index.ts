import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OTPEmailRequest {
  email: string;
  fullName: string;
  otpCode: string;
  expiresAt: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, fullName, otpCode, expiresAt }: OTPEmailRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "Airbnb Clone+ <onboarding@resend.dev>",
      to: [email],
      subject: "Verify Your Account - OTP Code",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Account</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 600; }
            .content { padding: 40px 30px; text-align: center; }
            .otp-code { background-color: #f8f9fa; border: 2px solid #e9ecef; border-radius: 12px; padding: 20px; margin: 30px 0; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #495057; font-family: 'Courier New', monospace; }
            .timer { color: #dc3545; font-weight: 600; font-size: 16px; margin: 20px 0; }
            .footer { background-color: #f8f9fa; padding: 30px; text-align: center; color: #6c757d; font-size: 14px; }
            @media (max-width: 600px) {
              .header { padding: 30px 15px; }
              .header h1 { font-size: 24px; }
              .content { padding: 30px 20px; }
              .otp-code { font-size: 24px; letter-spacing: 4px; padding: 15px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏨 Airbnb Clone+</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Account Verification</p>
            </div>
            
            <div class="content">
              <h2 style="color: #343a40; margin-bottom: 20px;">Hi ${fullName}!</h2>
              <p style="color: #6c757d; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                To complete your account registration, please enter this verification code:
              </p>
              
              <div class="otp-code">${otpCode}</div>
              
              <div class="timer">
                ⏱️ This code expires in 1 minute
              </div>
              
              <p style="color: #6c757d; font-size: 14px; line-height: 1.6; margin-top: 30px;">
                If you didn't create an account with us, please ignore this email.
              </p>
            </div>
            
            <div class="footer">
              <p>© 2024 Airbnb Clone+. All rights reserved.</p>
              <p>This is an automated email, please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("OTP email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-otp-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);