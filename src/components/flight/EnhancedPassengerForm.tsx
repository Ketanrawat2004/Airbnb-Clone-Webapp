
import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, Calendar, MapPin, Globe, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface PassengerInfo {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  gstNumber?: string;
  hasGst: boolean;
}

interface EnhancedPassengerFormProps {
  passengerCount: number;
  flightData: any;
  onSubmit: (passengers: PassengerInfo[], contactInfo: any) => void;
}

const countries = [
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+1', name: 'USA', flag: '🇺🇸' },
  { code: '+44', name: 'UK', flag: '🇬🇧' },
  { code: '+971', name: 'UAE', flag: '🇦🇪' },
  { code: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: '+60', name: 'Malaysia', flag: '🇲🇾' },
  { code: '+66', name: 'Thailand', flag: '🇹🇭' },
];

const nationalities = [
  'Indian', 'American', 'British', 'Canadian', 'Australian', 
  'German', 'French', 'Japanese', 'Chinese', 'Singaporean',
  'Malaysian', 'Thai', 'Emirates', 'Saudi Arabian', 'Other'
];

const EnhancedPassengerForm = ({ passengerCount, flightData, onSubmit }: EnhancedPassengerFormProps) => {
  const [passengers, setPassengers] = useState<PassengerInfo[]>(
    Array(passengerCount).fill(null).map(() => ({
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      countryCode: '+91',
      dateOfBirth: '',
      nationality: '',
      passportNumber: '',
      gstNumber: '',
      hasGst: false
    }))
  );

  const [contactInfo, setContactInfo] = useState({
    countryCode: '+91',
    phone: '',
    email: '',
    hasGst: false,
    gstNumber: ''
  });

  const isInternationalFlight = () => {
    if (!flightData?.from || !flightData?.to) return false;
    
    const indianCities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Kochi', 'Goa', 'Lucknow', 'Chandigarh', 'Thiruvananthapuram', 'Bhubaneswar'];
    const fromCity = flightData.from.split('(')[0].trim();
    const toCity = flightData.to.split('(')[0].trim();
    
    const isFromIndia = indianCities.some(city => fromCity.includes(city));
    const isToIndia = indianCities.some(city => toCity.includes(city));
    
    return !(isFromIndia && isToIndia);
  };

  const handlePassengerChange = (index: number, field: keyof PassengerInfo, value: string | boolean) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    setPassengers(updatedPassengers);
  };

  const handleSubmit = () => {
    // Validate required fields
    const isValid = passengers.every(passenger => 
      passenger.title && passenger.firstName && passenger.lastName && 
      passenger.email && passenger.phone && passenger.dateOfBirth &&
      (!isInternationalFlight() || (passenger.nationality && passenger.passportNumber))
    ) && contactInfo.phone && contactInfo.email;

    if (!isValid) {
      alert('Please fill in all required fields');
      return;
    }

    onSubmit(passengers, contactInfo);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 max-w-4xl mx-auto"
    >
      {/* Flight Info Header */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
        <div className="flex items-center justify-between text-sm">
          <div className="font-medium text-blue-800">
            {flightData?.from} → {flightData?.to}
          </div>
          <div className="text-blue-600">
            {flightData?.departureDate} • {passengerCount} passenger{passengerCount > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Important Information */}
      {isInternationalFlight() && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-orange-800 flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Important Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-orange-700">
            <p className="flex items-start">
              <span className="font-medium mr-2">✓</span>
              Check travel guidelines and baggage information below
            </p>
            <p className="flex items-start">
              <span className="font-medium mr-2">⚠️</span>
              Passport required for international travel
            </p>
          </CardContent>
        </Card>
      )}

      {/* Contact Information */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardTitle className="text-blue-800">Booking details will be sent to</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Country Code</Label>
              <Select value={contactInfo.countryCode} onValueChange={(value) => setContactInfo(prev => ({ ...prev, countryCode: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => (
                    <SelectItem key={country.code} value={country.code}>
                      <span className="flex items-center space-x-2">
                        <span>{country.flag}</span>
                        <span>{country.name}({country.code})</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Mobile No</Label>
              <Input
                type="tel"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                className="mt-1"
                placeholder="Enter mobile number"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Email</Label>
              <Input
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1"
                placeholder="Enter email address"
              />
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasGst"
                checked={contactInfo.hasGst}
                onCheckedChange={(checked) => setContactInfo(prev => ({ ...prev, hasGst: !!checked }))}
              />
              <Label htmlFor="hasGst" className="text-sm">I have a GST number (Optional)</Label>
            </div>
            
            {contactInfo.hasGst && (
              <Input
                type="text"
                value={contactInfo.gstNumber}
                onChange={(e) => setContactInfo(prev => ({ ...prev, gstNumber: e.target.value }))}
                placeholder="Enter GST number"
                className="max-w-md"
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Passenger Details */}
      {passengers.map((passenger, index) => (
        <Card key={index} className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <User className="h-5 w-5" />
              <span>Passenger {index + 1}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Title *</Label>
                <Select 
                  value={passenger.title} 
                  onValueChange={(value) => handlePassengerChange(index, 'title', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mr">Mr</SelectItem>
                    <SelectItem value="Ms">Ms</SelectItem>
                    <SelectItem value="Mrs">Mrs</SelectItem>
                    <SelectItem value="Dr">Dr</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">First Name *</Label>
                <Input
                  type="text"
                  value={passenger.firstName}
                  onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                  className="mt-1"
                  placeholder="First name"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Last Name *</Label>
                <Input
                  type="text"
                  value={passenger.lastName}
                  onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                  className="mt-1"
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Email *</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    value={passenger.email}
                    onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                    className="pl-10"
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Phone *</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="tel"
                    value={passenger.phone}
                    onChange={(e) => handlePassengerChange(index, 'phone', e.target.value)}
                    className="pl-10"
                    placeholder="Phone number"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Date of Birth *</Label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="date"
                    value={passenger.dateOfBirth}
                    onChange={(e) => handlePassengerChange(index, 'dateOfBirth', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {isInternationalFlight() && (
                <>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Nationality *</Label>
                    <Select 
                      value={passenger.nationality} 
                      onValueChange={(value) => handlePassengerChange(index, 'nationality', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        {nationalities.map(nationality => (
                          <SelectItem key={nationality} value={nationality}>{nationality}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Passport Number *</Label>
                    <div className="relative mt-1">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        value={passenger.passportNumber}
                        onChange={(e) => handlePassengerChange(index, 'passportNumber', e.target.value)}
                        className="pl-10"
                        placeholder="Passport number"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-center pt-6">
        <Button
          onClick={handleSubmit}
          className="px-12 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Continue to Payment
        </Button>
      </div>
    </motion.div>
  );
};

export default EnhancedPassengerForm;
