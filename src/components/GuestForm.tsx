
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Users, Sparkles, Plus, UserCheck, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Guest {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
}

interface GuestFormProps {
  guests: Guest[];
  onGuestsChange: (guests: Guest[]) => void;
  maxGuests: number;
}

const GuestForm = ({ guests, onGuestsChange, maxGuests }: GuestFormProps) => {
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});

  const addGuest = () => {
    if (guests.length >= maxGuests) return;
    
    const newGuest: Guest = {
      id: `guest-${Date.now()}`,
      title: 'Mr',
      firstName: '',
      lastName: '',
      age: '',
      gender: 'male',
    };
    
    onGuestsChange([...guests, newGuest]);
  };

  const removeGuest = (guestId: string) => {
    if (guests.length <= 1) return;
    
    const updatedGuests = guests.filter(guest => guest.id !== guestId);
    onGuestsChange(updatedGuests);
    
    const newErrors = { ...errors };
    delete newErrors[guestId];
    setErrors(newErrors);
  };

  const updateGuest = (guestId: string, field: keyof Guest, value: string) => {
    const updatedGuests = guests.map(guest =>
      guest.id === guestId ? { ...guest, [field]: value } : guest
    );
    onGuestsChange(updatedGuests);
    
    if (errors[guestId]?.[field]) {
      setErrors(prev => ({
        ...prev,
        [guestId]: { ...prev[guestId], [field]: '' }
      }));
    }
  };

  const validateGuests = () => {
    const newErrors: Record<string, Record<string, string>> = {};
    let isValid = true;

    guests.forEach(guest => {
      const guestErrors: Record<string, string> = {};

      if (!guest.firstName.trim()) {
        guestErrors.firstName = 'First name is required';
        isValid = false;
      }
      if (!guest.lastName.trim()) {
        guestErrors.lastName = 'Last name is required';
        isValid = false;
      }
      if (!guest.age.trim()) {
        guestErrors.age = 'Age is required';
        isValid = false;
      } else if (isNaN(Number(guest.age)) || Number(guest.age) < 1 || Number(guest.age) > 120) {
        guestErrors.age = 'Please enter a valid age (1-120)';
        isValid = false;
      }

      if (Object.keys(guestErrors).length > 0) {
        newErrors[guest.id] = guestErrors;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const isGuestComplete = (guest: Guest) => {
    return guest.firstName.trim() && guest.lastName.trim() && guest.age.trim() && 
           !isNaN(Number(guest.age)) && Number(guest.age) >= 1 && Number(guest.age) <= 120;
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-3 rounded-2xl shadow-xl">
            <Users className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Guest Details
            </h2>
            <p className="text-gray-600 mt-1">Add information for all travelers</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-4">
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full font-bold border-2 border-blue-200 shadow-lg">
            {guests.length} of {maxGuests} guests added
          </div>
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-3 rounded-full font-bold border-2 border-green-200 shadow-lg">
            {guests.filter(isGuestComplete).length} completed
          </div>
        </div>
      </div>

      {/* Guest Cards with Animation */}
      <AnimatePresence>
        {guests.map((guest, index) => (
          <motion.div
            key={guest.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="relative border-0 shadow-2xl bg-gradient-to-br from-white via-rose-50/30 to-pink-50/50 overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
              {/* Decorative Elements */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-rose-500 to-pink-500"></div>
              <div className="absolute top-4 right-4">
                {isGuestComplete(guest) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-full shadow-lg"
                  >
                    <UserCheck className="h-4 w-4 text-white" />
                  </motion.div>
                )}
              </div>
              
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-rose-100 to-pink-100 text-rose-800 px-4 py-2 rounded-full font-bold border-2 border-rose-200 shadow-md">
                      Guest {index + 1}
                    </div>
                    {index === 0 && (
                      <div className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 px-4 py-2 rounded-full font-bold border-2 border-amber-200 shadow-md flex items-center space-x-2">
                        <Star className="h-4 w-4" />
                        <span>Primary Guest</span>
                      </div>
                    )}
                  </CardTitle>
                  
                  {guests.length > 1 && index > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeGuest(guest.id)}
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:from-red-600 hover:to-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </motion.button>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Title and Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-3">
                    <Label className="text-sm font-bold text-gray-700 mb-2 block">Title</Label>
                    <Select 
                      value={guest.title} 
                      onValueChange={(value) => updateGuest(guest.id, 'title', value)}
                    >
                      <SelectTrigger className="h-14 rounded-xl border-2 border-gray-200 focus:border-rose-400 bg-white shadow-sm hover:shadow-md transition-all duration-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-2 border-gray-200 shadow-xl rounded-xl">
                        <SelectItem value="Mr" className="hover:bg-rose-50">Mr</SelectItem>
                        <SelectItem value="Mrs" className="hover:bg-rose-50">Mrs</SelectItem>
                        <SelectItem value="Ms" className="hover:bg-rose-50">Ms</SelectItem>
                        <SelectItem value="Dr" className="hover:bg-rose-50">Dr</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-4">
                    <Label className="text-sm font-bold text-gray-700 mb-2 block">First Name *</Label>
                    <Input
                      placeholder="Enter first name"
                      value={guest.firstName}
                      onChange={(e) => updateGuest(guest.id, 'firstName', e.target.value)}
                      className={`h-14 rounded-xl border-2 shadow-sm hover:shadow-md transition-all duration-200 ${
                        errors[guest.id]?.firstName 
                          ? 'border-red-500 focus:border-red-500 bg-red-50' 
                          : 'border-gray-200 focus:border-rose-400 bg-white'
                      }`}
                    />
                    {errors[guest.id]?.firstName && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-2 font-semibold"
                      >
                        {errors[guest.id].firstName}
                      </motion.p>
                    )}
                  </div>
                  
                  <div className="md:col-span-5">
                    <Label className="text-sm font-bold text-gray-700 mb-2 block">Last Name *</Label>
                    <Input
                      placeholder="Enter last name"
                      value={guest.lastName}
                      onChange={(e) => updateGuest(guest.id, 'lastName', e.target.value)}
                      className={`h-14 rounded-xl border-2 shadow-sm hover:shadow-md transition-all duration-200 ${
                        errors[guest.id]?.lastName 
                          ? 'border-red-500 focus:border-red-500 bg-red-50' 
                          : 'border-gray-200 focus:border-rose-400 bg-white'
                      }`}
                    />
                    {errors[guest.id]?.lastName && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-2 font-semibold"
                      >
                        {errors[guest.id].lastName}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Age and Gender Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-bold text-gray-700 mb-2 block">Age *</Label>
                    <Input
                      type="number"
                      placeholder="Age"
                      value={guest.age}
                      onChange={(e) => updateGuest(guest.id, 'age', e.target.value)}
                      className={`h-14 rounded-xl border-2 shadow-sm hover:shadow-md transition-all duration-200 ${
                        errors[guest.id]?.age 
                          ? 'border-red-500 focus:border-red-500 bg-red-50' 
                          : 'border-gray-200 focus:border-rose-400 bg-white'
                      }`}
                      min="1"
                      max="120"
                    />
                    {errors[guest.id]?.age && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-2 font-semibold"
                      >
                        {errors[guest.id].age}
                      </motion.p>
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-sm font-bold text-gray-700 mb-2 block">Gender</Label>
                    <Select 
                      value={guest.gender} 
                      onValueChange={(value) => updateGuest(guest.id, 'gender', value)}
                    >
                      <SelectTrigger className="h-14 rounded-xl border-2 border-gray-200 focus:border-rose-400 bg-white shadow-sm hover:shadow-md transition-all duration-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-2 border-gray-200 shadow-xl rounded-xl">
                        <SelectItem value="male" className="hover:bg-rose-50">Male</SelectItem>
                        <SelectItem value="female" className="hover:bg-rose-50">Female</SelectItem>
                        <SelectItem value="other" className="hover:bg-rose-50">Other</SelectItem>
                        <SelectItem value="prefer_not_to_say" className="hover:bg-rose-50">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Enhanced Add Guest Button */}
      {guests.length < maxGuests && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: guests.length * 0.1 + 0.2 }}
        >
          <Button
            type="button"
            onClick={addGuest}
            className="w-full border-dashed border-4 border-gray-300 hover:border-rose-400 bg-gradient-to-r from-white to-rose-50/30 hover:from-rose-50 hover:to-pink-50 text-gray-600 hover:text-rose-600 py-12 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl group"
          >
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-rose-500 to-pink-500 p-3 rounded-full shadow-lg group-hover:shadow-xl"
              >
                <Plus className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <span className="text-xl font-bold">Add Guest {guests.length + 1}</span>
                <p className="text-sm text-gray-500 mt-1">Click to add another traveler</p>
              </div>
            </div>
          </Button>
        </motion.div>
      )}

      {/* Enhanced Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-start space-x-4">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full p-3 shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-blue-800 font-bold text-lg">Important Guest Information</h3>
            <p className="text-blue-600 mt-2 leading-relaxed">
              Please ensure all guest details are accurate as they will be used for booking confirmation, 
              check-in procedures, and security purposes. Names should match government-issued IDs.
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white/50 rounded-lg p-3">
                <p className="font-semibold text-blue-800">✓ Required for check-in</p>
                <p className="text-blue-600">Names must match ID documents</p>
              </div>
              <div className="bg-white/50 rounded-lg p-3">
                <p className="font-semibold text-blue-800">✓ Age verification</p>
                <p className="text-blue-600">Helps with room allocation</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GuestForm;
