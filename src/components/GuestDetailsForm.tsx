
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, User, Mail, Phone } from 'lucide-react';

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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(guestDetails, agreeToTerms);
  };

  const isFormValid = guestDetails.firstName && guestDetails.lastName && 
                     guestDetails.email && guestDetails.phone && agreeToTerms;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Guest Details</h3>
      
      {/* Booking For */}
      <div className="space-y-3">
        <RadioGroup value={bookingFor} onValueChange={setBookingFor}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="myself" id="myself" />
            <label htmlFor="myself" className="text-sm font-medium">Myself</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="someone-else" id="someone-else" />
            <label htmlFor="someone-else" className="text-sm font-medium">Someone Else</label>
          </div>
        </RadioGroup>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title and Name */}
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-3">
            <Label htmlFor="title">TITLE</Label>
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
          
          <div className="col-span-4">
            <Label htmlFor="firstName">FULL NAME</Label>
            <Input
              id="firstName"
              placeholder="First Name"
              value={guestDetails.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              required
            />
          </div>
          
          <div className="col-span-5">
            <Label htmlFor="lastName" className="sr-only">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Last Name"
              value={guestDetails.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              required
              className="mt-6"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="flex items-center space-x-1">
            <Mail className="h-4 w-4" />
            <span>EMAIL ADDRESS</span>
            <span className="text-xs text-gray-500">(Booking voucher will be sent to this email ID)</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Email ID"
            value={guestDetails.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>

        {/* Mobile Number */}
        <div>
          <Label htmlFor="phone" className="flex items-center space-x-1">
            <Phone className="h-4 w-4" />
            <span>MOBILE NUMBER</span>
          </Label>
          <div className="grid grid-cols-3 gap-2">
            <Select value={guestDetails.countryCode} onValueChange={(value) => handleInputChange('countryCode', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+91">+91</SelectItem>
                <SelectItem value="+1">+1</SelectItem>
                <SelectItem value="+44">+44</SelectItem>
                <SelectItem value="+61">+61</SelectItem>
              </SelectContent>
            </Select>
            <Input
              id="phone"
              placeholder="Phone Number"
              value={guestDetails.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required
              className="col-span-2"
            />
          </div>
        </div>

        {/* GST Details (Optional) */}
        <div className="flex items-center space-x-2">
          <Checkbox id="gst" />
          <Label htmlFor="gst" className="text-sm">
            Enter GST Details <span className="text-gray-500">(Optional)</span>
          </Label>
        </div>

        {/* Add Guest Option */}
        <Button type="button" variant="ghost" className="text-blue-500 p-0 h-auto">
          <Plus className="h-4 w-4 mr-1" />
          Add Guest
        </Button>

        {/* Terms Agreement */}
        <div className="flex items-start space-x-2 pt-4">
          <Checkbox 
            id="terms" 
            checked={agreeToTerms}
            onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
          />
          <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
            By proceeding, I agree to MakeMyTrip's{' '}
            <a href="#" className="text-blue-500 underline">User Agreement</a>
          </Label>
        </div>

        {/* Pay Now Button */}
        <Button 
          type="submit" 
          disabled={!isFormValid || loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg py-6"
        >
          {loading ? 'Processing...' : 'PAY NOW'}
        </Button>
      </form>
    </div>
  );
};

export default GuestDetailsForm;
