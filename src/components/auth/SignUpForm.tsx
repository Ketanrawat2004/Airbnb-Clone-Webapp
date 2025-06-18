
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface SignUpFormProps {
  onSuccess: () => void;
  disabled?: boolean;
}

const SignUpForm = ({ onSuccess, disabled = false }: SignUpFormProps) => {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    const { error } = await signUp(formData.email, formData.password, formData.fullName);

    if (error) {
      console.log('Sign up error:', error);

      if (error.message.includes('User already registered')) {
        toast.error('An account with this email already exists. Please try signing in instead.');
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success('Account created successfully! Please check your email (including spam folder) for a confirmation link. You\'ll need to click it before you can sign in.');
      onSuccess();
    }

    setLoading(false);
  };

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
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleInputChange}
          required
          disabled={loading || disabled}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading || disabled}>
        {loading ? 'Creating account...' : 'Sign Up'}
      </Button>

      <p className="text-sm text-gray-600 text-center">
        You'll receive a confirmation email after signing up. Please check your inbox and spam folder.
      </p>
    </form>
  );
};

export default SignUpForm;
