
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Mail, Phone } from 'lucide-react';

interface GuestDetails {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
}

interface GuestDetailsFormProps {
  onSubmit: (guestDetails: GuestDetails, agreeToTerms: boolean) => void;
  loading?: boolean;
}

const GuestDetailsForm = ({ onSubmit, loading = false }: GuestDetailsFormProps) => {
  const [bookingFor, setBookingFor] = useState('myself');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [guestDetails, setGuestDetails] = useState<GuestDetails>({
    title: 'Mr',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+91',
  });

  const handleInputChange = (field: keyof GuestDetails, value: string) => {
    setGuestDetails(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!guestDetails.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!guestDetails.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!guestDetails.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(guestDetails.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!guestDetails.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(guestDetails.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(guestDetails, agreeToTerms);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Guest Details</h3>
      
      {/* Booking For */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">I am booking for:</Label>
        <RadioGroup value={bookingFor} onValueChange={setBookingFor}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="myself" id="myself" />
            <Label htmlFor="myself" className="text-sm font-medium cursor-pointer">Myself</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="someone-else" id="someone-else" />
            <Label htmlFor="someone-else" className="text-sm font-medium cursor-pointer">Someone Else</Label>
          </div>
        </RadioGroup>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title and Name */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-3">
            <Label htmlFor="title" className="text-sm font-medium">Title</Label>
            <Select value={guestDetails.title} onValueChange={(value) => handleInputChange('title', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mr">Mr</SelectItem>
                <SelectItem value="Mrs">Mrs</SelectItem>
                <SelectItem value="Ms">Ms</SelectItem>
                <SelectItem value="Dr">Dr</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:col-span-4">
            <Label htmlFor="firstName" className="text-sm font-medium">First Name *</Label>
            <Input
              id="firstName"
              placeholder="First Name"
              value={guestDetails.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={errors.firstName ? 'border-red-500' : ''}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          
          <div className="md:col-span-5">
            <Label htmlFor="lastName" className="text-sm font-medium">Last Name *</Label>
            <Input
              id="lastName"
              placeholder="Last Name"
              value={guestDetails.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={errors.lastName ? 'border-red-500' : ''}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="flex items-center space-x-1 text-sm font-medium">
            <Mail className="h-4 w-4" />
            <span>Email Address *</span>
          </Label>
          <p className="text-xs text-gray-500 mb-2">Booking voucher will be sent to this email ID</p>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={guestDetails.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Mobile Number */}
        <div>
          <Label htmlFor="phone" className="flex items-center space-x-1 text-sm font-medium">
            <Phone className="h-4 w-4" />
            <span>Mobile Number *</span>
          </Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <Select value={guestDetails.countryCode} onValueChange={(value) => handleInputChange('countryCode', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+91">+91 (India)</SelectItem>
                <SelectItem value="+1">+1 (US)</SelectItem>
                <SelectItem value="+44">+44 (UK)</SelectItem>
                <SelectItem value="+61">+61 (Australia)</SelectItem>
              </SelectContent>
            </Select>
            <Input
              id="phone"
              placeholder="Phone Number"
              value={guestDetails.phone}
              onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, ''))}
              className={`col-span-2 ${errors.phone ? 'border-red-500' : ''}`}
              maxLength={10}
            />
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* GST Details (Optional) */}
        <div className="flex items-center space-x-2 py-2">
          <Checkbox id="gst" />
          <Label htmlFor="gst" className="text-sm cursor-pointer">
            Enter GST Details <span className="text-gray-500">(Optional)</span>
          </Label>
        </div>

        {/* Add Guest Option */}
        <Button type="button" variant="ghost" className="text-blue-500 p-0 h-auto hover:text-blue-600">
          <Plus className="h-4 w-4 mr-1" />
          Add Guest
        </Button>

        {/* Terms Agreement */}
        <div className="flex items-start space-x-2 pt-4 border-t">
          <Checkbox 
            id="terms" 
            checked={agreeToTerms}
            onCheckedChange={(checked) => {
              setAgreeToTerms(checked as boolean);
              if (errors.terms) {
                setErrors(prev => ({ ...prev, terms: '' }));
              }
            }}
          />
          <div className="flex-1">
            <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
              By proceeding, I agree to Airbnb Clone+'{' '}
              <a href="#" className="text-blue-500 underline hover:text-blue-600">User Agreement</a>
            </Label>
            {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
          </div>
        </div>

        {/* Pay Now Button */}
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg py-6 disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Processing...</span>
            </div>
          ) : (
            'PAY NOW'
          )}
        </Button>
      </form>
    </div>
  );
};

export default GuestDetailsForm;
