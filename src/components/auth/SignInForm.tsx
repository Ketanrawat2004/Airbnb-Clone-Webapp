
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface SignInFormProps {
  onSuccess: () => void;
  disabled?: boolean;
}

const SignInForm = ({ onSuccess, disabled = false }: SignInFormProps) => {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(formData.email, formData.password);

    if (error) {
      console.log('Sign in error:', error);

      // Handle specific error cases
      if (error.message.includes('Email not confirmed')) {
        toast.error('Please check your email and click the confirmation link before signing in. Check your spam folder if you don\'t see it.');
      } else if (error.message.includes('Invalid login credentials')) {
        toast.error('Invalid email or password. Please check your credentials and try again.');
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success('Successfully signed in to Airbnb Clone+!');
      onSuccess();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
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
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          required
          disabled={loading || disabled}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading || disabled}>
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>

      <p className="text-sm text-gray-600 text-center">
        If you just signed up, please check your email and click the confirmation link first.
      </p>
    </form>
  );
};

export default SignInForm;
