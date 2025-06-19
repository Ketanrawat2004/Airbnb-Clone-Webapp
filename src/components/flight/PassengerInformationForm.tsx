
import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface PassengerInfo {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
}

interface PassengerInformationFormProps {
  passengerCount: number;
  onSubmit: (passengers: PassengerInfo[]) => void;
}

const PassengerInformationForm = ({ passengerCount, onSubmit }: PassengerInformationFormProps) => {
  const [passengers, setPassengers] = useState<PassengerInfo[]>(
    Array(passengerCount).fill(null).map(() => ({
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      nationality: '',
      passportNumber: ''
    }))
  );

  const handlePassengerChange = (index: number, field: keyof PassengerInfo, value: string) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    setPassengers(updatedPassengers);
  };

  const handleSubmit = () => {
    // Validate all required fields
    const isValid = passengers.every(passenger => 
      passenger.title && passenger.firstName && passenger.lastName && 
      passenger.email && passenger.phone && passenger.dateOfBirth
    );

    if (!isValid) {
      alert('Please fill in all required fields for all passengers');
      return;
    }

    onSubmit(passengers);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Passenger Information</h2>
        <p className="text-gray-600">Please provide details for all passengers</p>
      </div>

      {passengers.map((passenger, index) => (
        <Card key={index} className="overflow-hidden shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <User className="h-5 w-5" />
              <span>Passenger {index + 1}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {/* Title and Name */}
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
              <div>
                <Label className="text-sm font-medium text-gray-700">Nationality</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    value={passenger.nationality}
                    onChange={(e) => handlePassengerChange(index, 'nationality', e.target.value)}
                    className="pl-10"
                    placeholder="Nationality"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Passport Number</Label>
                <Input
                  type="text"
                  value={passenger.passportNumber}
                  onChange={(e) => handlePassengerChange(index, 'passportNumber', e.target.value)}
                  className="mt-1"
                  placeholder="Passport number"
                />
              </div>
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

export default PassengerInformationForm;
