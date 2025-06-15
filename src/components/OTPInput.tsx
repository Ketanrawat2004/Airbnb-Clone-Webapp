
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface OTPInputProps {
  onSuccess: () => void;
}

const OTPInput = ({ onSuccess }: OTPInputProps) => {
  const { generateOTP, validateOTP, loading } = useAuth();
  const [step, setStep] = useState<'name' | 'otp'>('name');
  const [name, setName] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [expiresAt, setExpiresAt] = useState<string | null>(null);

  const handleGenerateOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    const { error, expiresAt: expiry } = await generateOTP(name.trim());
    
    if (error) {
      console.log('Generate OTP error:', error);
      toast.error(error.message || 'Failed to generate OTP');
    } else {
      setExpiresAt(expiry || null);
      setStep('otp');
      toast.success('OTP code generated! Check the console for your code (in production, this would be sent via SMS/email)');
      console.log('🔐 OTP Generated for', name, '- Check the database or logs for the actual code');
    }
  };

  const handleValidateOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otpCode.length !== 6) {
      toast.error('Please enter a complete 6-digit OTP code');
      return;
    }

    const { error } = await validateOTP(name, otpCode);
    
    if (error) {
      console.log('Validate OTP error:', error);
      toast.error(error.message || 'Invalid or expired OTP code');
    } else {
      toast.success(`Welcome, ${name}! You have successfully signed in with OTP.`);
      onSuccess();
    }
  };

  const handleOTPChange = (value: string) => {
    setOtpCode(value);
    
    // Auto-submit when 6 digits are entered
    if (value.length === 6) {
      setTimeout(() => {
        handleValidateOTP({ preventDefault: () => {} } as React.FormEvent);
      }, 100);
    }
  };

  const handleBack = () => {
    setStep('name');
    setOtpCode('');
  };

  if (step === 'name') {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Quick Sign In</h3>
          <p className="text-sm text-gray-600">Enter your name to receive an OTP code</p>
        </div>
        
        <form onSubmit={handleGenerateOTP} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Generating OTP...' : 'Get OTP Code'}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Enter OTP Code</h3>
        <p className="text-sm text-gray-600">
          Enter the 6-digit code for <strong>{name}</strong>
        </p>
        {expiresAt && (
          <p className="text-xs text-gray-500 mt-1">
            Code expires at {new Date(expiresAt).toLocaleTimeString()}
          </p>
        )}
      </div>
      
      <form onSubmit={handleValidateOTP} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="otp">OTP Code</Label>
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otpCode}
              onChange={handleOTPChange}
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
          <Button type="submit" className="w-full" disabled={loading || otpCode.length !== 6}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </Button>
          
          <Button type="button" variant="outline" className="w-full" onClick={handleBack}>
            Back to Name Entry
          </Button>
        </div>
      </form>
      
      <div className="text-center">
        <p className="text-xs text-gray-500">
          💡 In development: Check the browser console or database for the actual OTP code
        </p>
      </div>
    </div>
  );
};

export default OTPInput;
