import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { authService } from '@/services/authService';
interface EmailOTPVerificationProps {
  email: string;
  fullName: string;
  password: string;
  onSuccess: () => void;
  onBack: () => void;
}

const EmailOTPVerification = ({ 
  email, 
  fullName, 
  password, 
  onSuccess, 
  onBack 
}: EmailOTPVerificationProps) => {
  const navigate = useNavigate();
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOTPChange = (value: string) => {
    setOtpCode(value);
    
    // Auto-submit when 6 digits are entered
    if (value.length === 6) {
      setTimeout(() => {
        handleVerifyOTP();
      }, 100);
    }
  };

  const handleVerifyOTP = async () => {
    if (otpCode.length !== 6) {
      toast.error('Please enter a complete 6-digit OTP code');
      return;
    }

    setLoading(true);
    try {
      // Validate OTP
      const { data, error } = await supabase.rpc('validate_email_otp', {
        user_email: email,
        provided_otp: otpCode
      });

      if (error) {
        console.error('OTP validation error:', error);
        toast.error('Failed to verify OTP');
        return;
      }

      const validationResult = data[0];
      
      if (!validationResult?.valid) {
        toast.error(validationResult?.message || 'Invalid OTP code');
        return;
      }

      // Try to create account (idempotent)
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: window.location.origin.includes('localhost') 
            ? 'http://localhost:8080/' 
            : `${window.location.origin}/`,
        },
      });

      if (signUpError && !/already|exists/i.test(signUpError.message)) {
        console.error('Sign up error:', signUpError);
        toast.error(signUpError.message || 'Failed to create account');
        return;
      }

      // Sign in immediately after verification (for both new and existing users)
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error('Sign in after OTP error:', signInError);
        toast.error(signInError.message || 'Failed to sign in');
        return;
      }

      toast.success(`Welcome, ${fullName}! You are now signed in.`);
      onSuccess();
      navigate('/');

    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const { error } = await authService.generateEmailOTP(email, fullName);

      if (error) {
        console.error('Generate OTP error:', error);
        toast.error('Failed to generate new OTP');
        return;
      }

      toast.success('New OTP sent to your email');
      setTimeLeft(60);
      setCanResend(false);
      setOtpCode('');

    } catch (error) {
      console.error('Error resending OTP:', error);
      toast.error('Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      <div className="text-center space-y-2">
        <h3 className="text-lg sm:text-xl font-semibold text-foreground">Verify Your Email</h3>
        <p className="text-sm text-muted-foreground px-4">
          Enter the 6-digit code sent to <strong className="text-foreground">{email}</strong>
        </p>
        
        <div className="bg-muted/50 rounded-lg p-3 mx-4">
          <div className="flex items-center justify-center space-x-2 text-sm">
            <span className="text-muted-foreground">Time remaining:</span>
            <span className={`font-mono font-bold ${timeLeft <= 10 ? 'text-destructive' : 'text-primary'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4 px-4">
        <div className="space-y-2">
          <Label htmlFor="otp" className="text-center block">Verification Code</Label>
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otpCode}
              onChange={handleOTPChange}
              disabled={loading}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
        
        <div className="space-y-2">
          <Button 
            onClick={handleVerifyOTP}
            className="w-full" 
            disabled={loading || otpCode.length !== 6}
          >
            {loading ? 'Verifying...' : 'Verify & Create Account'}
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1" 
              onClick={onBack}
              disabled={loading}
            >
              ← Back to Sign Up
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              className="flex-1"
              onClick={handleResendOTP}
              disabled={!canResend || loading}
            >
              {canResend ? 'Resend OTP' : `Resend in ${timeLeft}s`}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="text-center px-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Didn't receive the code? Check your spam folder or click "Resend OTP" after the timer expires.
        </p>
      </div>
    </div>
  );
};

export default EmailOTPVerification;