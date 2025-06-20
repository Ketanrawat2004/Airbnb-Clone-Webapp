
import { motion } from 'framer-motion';
import { User, Phone, Mail, Calendar, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CountryAutocomplete from './CountryAutocomplete';

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

interface PassengerDetailsSectionProps {
  passengers: PassengerInfo[];
  onPassengerChange: (index: number, field: keyof PassengerInfo, value: string | boolean) => void;
  isInternationalFlight: boolean;
}

const PassengerDetailsSection = ({ 
  passengers, 
  onPassengerChange, 
  isInternationalFlight 
}: PassengerDetailsSectionProps) => {
  return (
    <>
      {passengers.map((passenger, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
        >
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardTitle className="flex items-center space-x-2 text-blue-800">
                <User className="h-5 w-5" />
                <span>Passenger {index + 1}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Title *</Label>
                  <Select 
                    value={passenger.title} 
                    onValueChange={(value) => onPassengerChange(index, 'title', value)}
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
                    onChange={(e) => onPassengerChange(index, 'firstName', e.target.value)}
                    className="mt-1"
                    placeholder="First name"
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <Label className="text-sm font-medium text-gray-700">Last Name *</Label>
                  <Input
                    type="text"
                    value={passenger.lastName}
                    onChange={(e) => onPassengerChange(index, 'lastName', e.target.value)}
                    className="mt-1"
                    placeholder="Last name"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Email *</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      value={passenger.email}
                      onChange={(e) => onPassengerChange(index, 'email', e.target.value)}
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
                      onChange={(e) => onPassengerChange(index, 'phone', e.target.value)}
                      className="pl-10"
                      placeholder="Phone number"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Date of Birth *</Label>
                  <div className="relative mt-1">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="date"
                      value={passenger.dateOfBirth}
                      onChange={(e) => onPassengerChange(index, 'dateOfBirth', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                {isInternationalFlight && (
                  <>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Nationality *</Label>
                      <div className="mt-1">
                        <CountryAutocomplete
                          value={passenger.nationality}
                          onChange={(value) => onPassengerChange(index, 'nationality', value)}
                          placeholder="Select nationality"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2 lg:col-span-1">
                      <Label className="text-sm font-medium text-gray-700">Passport Number *</Label>
                      <div className="relative mt-1">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="text"
                          value={passenger.passportNumber}
                          onChange={(e) => onPassengerChange(index, 'passportNumber', e.target.value)}
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
        </motion.div>
      ))}
    </>
  );
};

export default PassengerDetailsSection;
