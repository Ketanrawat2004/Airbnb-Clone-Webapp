
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import EmailOTPVerification from './EmailOTPVerification';

interface SignUpFormProps {
  onSuccess: () => void;
  disabled?: boolean;
}

const SignUpForm = ({ onSuccess, disabled = false }: SignUpFormProps) => {
  const { generateEmailOTP } = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'signup' | 'otp'>('signup');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.fullName) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const { error } = await generateEmailOTP(formData.email, formData.fullName);

      if (error) {
        console.log('Generate OTP error:', error);
        if (error.message?.includes('already registered') || error.message?.includes('already exists')) {
          toast.error('An account with this email already exists. Please try signing in instead.');
        } else {
          toast.error(error.message || 'Failed to send verification code');
        }
      } else {
        toast.success('Verification code sent! Please check your email (including spam folder).');
        setStep('otp');
      }
    } catch (error) {
      console.error('Error generating OTP:', error);
      toast.error('Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep('signup');
  };

  if (step === 'otp') {
    return (
      <EmailOTPVerification
        email={formData.email}
        fullName={formData.fullName}
        password={formData.password}
        onSuccess={onSuccess}
        onBack={handleBack}
      />
    );
  }

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleInputChange}
          required
          disabled={loading || disabled}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          required
          disabled={loading || disabled}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Create a password (min. 6 characters)"
          value={formData.password}
          onChange={handleInputChange}
          required
          disabled={loading || disabled}
          className="w-full"
          minLength={6}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading || disabled}>
        {loading ? 'Sending code...' : 'Send Verification Code'}
      </Button>

      <p className="text-sm text-muted-foreground text-center px-2 leading-relaxed">
        We'll send a 6-digit verification code to your email address. The code expires in 1 minute.
      </p>
    </form>
  );
};

export default SignUpForm;
