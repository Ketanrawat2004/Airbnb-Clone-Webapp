
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import FlightInfoHeader from './FlightInfoHeader';
import InternationalTravelAlert from './InternationalTravelAlert';
import ContactInformationSection from './ContactInformationSection';
import PassengerDetailsSection from './PassengerDetailsSection';

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

  const internationalFlight = isInternationalFlight();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 max-w-4xl mx-auto px-4"
    >
      <FlightInfoHeader flightData={flightData} passengerCount={passengerCount} />

      {internationalFlight && <InternationalTravelAlert />}

      <ContactInformationSection 
        contactInfo={contactInfo}
        onContactInfoChange={setContactInfo}
      />

      <PassengerDetailsSection
        passengers={passengers}
        onPassengerChange={handlePassengerChange}
        isInternationalFlight={internationalFlight}
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex justify-center pt-6"
      >
        <Button
          onClick={handleSubmit}
          className="w-full sm:w-auto px-12 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Continue to Payment
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default EnhancedPassengerForm;
