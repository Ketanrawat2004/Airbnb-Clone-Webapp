
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardTitle className="text-blue-800">Booking details will be sent to</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Country Code</Label>
              <Select 
                value={contactInfo.countryCode} 
                onValueChange={(value) => updateContactInfo('countryCode', value)}
              >
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
                onChange={(e) => updateContactInfo('phone', e.target.value)}
                className="mt-1"
                placeholder="Enter mobile number"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <Label className="text-sm font-medium text-gray-700">Email</Label>
              <Input
                type="email"
                value={contactInfo.email}
                onChange={(e) => updateContactInfo('email', e.target.value)}
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
                onCheckedChange={(checked) => updateContactInfo('hasGst', !!checked)}
              />
              <Label htmlFor="hasGst" className="text-sm">I have a GST number (Optional)</Label>
            </div>
            
            {contactInfo.hasGst && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <Input
                  type="text"
                  value={contactInfo.gstNumber}
                  onChange={(e) => updateContactInfo('gstNumber', e.target.value)}
                  placeholder="Enter GST number"
                  className="max-w-md"
                />
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactInformationSection;
