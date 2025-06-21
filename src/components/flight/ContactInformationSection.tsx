
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Phone, Mail, MapPin } from 'lucide-react';

interface ContactInfo {
  countryCode: string;
  phone: string;
  email: string;
  hasGst: boolean;
  gstNumber: string;
}

interface ContactInformationSectionProps {
  contactInfo: ContactInfo;
  onContactInfoChange: (info: ContactInfo) => void;
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

const ContactInformationSection = ({ contactInfo, onContactInfoChange }: ContactInformationSectionProps) => {
  const updateContactInfo = (field: keyof ContactInfo, value: string | boolean) => {
    onContactInfoChange({ ...contactInfo, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={{ y: -2 }}
    >
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
          <CardTitle className="text-blue-800 flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Mail className="h-5 w-5" />
            </motion.div>
            <span>Booking details will be sent to</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Country Code */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="space-y-2"
            >
              <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Country Code</span>
              </Label>
              <Select 
                value={contactInfo.countryCode} 
                onValueChange={(value) => updateContactInfo('countryCode', value)}
              >
                <SelectTrigger className="h-12 border-2 hover:border-blue-300 focus:border-blue-500 transition-colors duration-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => (
                    <SelectItem key={country.code} value={country.code}>
                      <span className="flex items-center space-x-2">
                        <span>{country.flag}</span>
                        <span>{country.name} ({country.code})</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            {/* Mobile No */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="space-y-2"
            >
              <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>Mobile No</span>
              </Label>
              <div className="relative">
                <Input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => updateContactInfo('phone', e.target.value)}
                  className="h-12 border-2 hover:border-blue-300 focus:border-blue-500 transition-all duration-200 pl-4"
                  placeholder="Enter mobile number"
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="space-y-2"
            >
              <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </Label>
              <Input
                type="email"
                value={contactInfo.email}
                onChange={(e) => updateContactInfo('email', e.target.value)}
                className="h-12 border-2 hover:border-blue-300 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter email address"
              />
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="space-y-4 pt-4 border-t border-gray-100"
          >
            <div className="flex items-center space-x-3">
              <Checkbox
                id="hasGst"
                checked={contactInfo.hasGst}
                onCheckedChange={(checked) => updateContactInfo('hasGst', !!checked)}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <Label htmlFor="hasGst" className="text-sm font-medium text-gray-700 cursor-pointer">
                I have a GST number (Optional)
              </Label>
            </div>
            
            {contactInfo.hasGst && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <Input
                  type="text"
                  value={contactInfo.gstNumber}
                  onChange={(e) => updateContactInfo('gstNumber', e.target.value)}
                  placeholder="Enter GST number"
                  className="h-12 border-2 hover:border-blue-300 focus:border-blue-500 transition-all duration-200 max-w-md"
                />
              </motion.div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactInformationSection;
