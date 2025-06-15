
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Users, Sparkles } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label className="text-xl font-bold flex items-center space-x-3">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-2 rounded-xl">
            <Users className="h-6 w-6 text-white" />
          </div>
          <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Guest Details
          </span>
        </Label>
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold border-2 border-blue-200">
          {guests.length} of {maxGuests} guests
        </div>
      </div>

      {guests.map((guest, index) => (
        <Card key={guest.id} className="relative border-0 shadow-lg bg-gradient-to-r from-white to-rose-50/30 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-500 to-pink-500"></div>
          
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center space-x-3">
                <div className="bg-gradient-to-r from-rose-100 to-pink-100 text-rose-800 px-3 py-1 rounded-full text-sm font-bold border-2 border-rose-200">
                  Guest {index + 1}
                </div>
                {index === 0 && (
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold border-2 border-blue-200 flex items-center space-x-1">
                    <Sparkles className="h-3 w-3" />
                    <span>Primary</span>
                  </div>
                )}
              </CardTitle>
              {guests.length > 1 && index > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeGuest(guest.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 h-10 w-10 p-0 rounded-xl transition-all duration-200"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-5">
            {/* Title and Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-3">
                <Label className="text-sm font-semibold text-gray-700">Title</Label>
                <Select 
                  value={guest.title} 
                  onValueChange={(value) => updateGuest(guest.id, 'title', value)}
                >
                  <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-rose-400">
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
                <Label className="text-sm font-semibold text-gray-700">First Name *</Label>
                <Input
                  placeholder="Enter first name"
                  value={guest.firstName}
                  onChange={(e) => updateGuest(guest.id, 'firstName', e.target.value)}
                  className={`${errors[guest.id]?.firstName ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors[guest.id]?.firstName && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors[guest.id].firstName}</p>
                )}
              </div>
              
              <div className="md:col-span-5">
                <Label className="text-sm font-semibold text-gray-700">Last Name *</Label>
                <Input
                  placeholder="Enter last name"
                  value={guest.lastName}
                  onChange={(e) => updateGuest(guest.id, 'lastName', e.target.value)}
                  className={`${errors[guest.id]?.lastName ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors[guest.id]?.lastName && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors[guest.id].lastName}</p>
                )}
              </div>
            </div>

            {/* Age and Gender Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700">Age *</Label>
                <Input
                  type="number"
                  placeholder="Age"
                  value={guest.age}
                  onChange={(e) => updateGuest(guest.id, 'age', e.target.value)}
                  className={`${errors[guest.id]?.age ? 'border-red-500 focus:border-red-500' : ''}`}
                  min="1"
                  max="120"
                />
                {errors[guest.id]?.age && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors[guest.id].age}</p>
                )}
              </div>
              
              <div>
                <Label className="text-sm font-semibold text-gray-700">Gender</Label>
                <Select 
                  value={guest.gender} 
                  onValueChange={(value) => updateGuest(guest.id, 'gender', value)}
                >
                  <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-rose-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {guests.length < maxGuests && (
        <Button
          type="button"
          variant="outline"
          onClick={addGuest}
          className="w-full border-dashed border-3 border-gray-300 hover:border-rose-400 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 text-gray-600 hover:text-rose-600 py-8 rounded-xl transition-all duration-200 hover:scale-105"
        >
          <Users className="h-5 w-5 mr-2" />
          <span className="text-lg font-semibold">Add Guest {guests.length + 1}</span>
        </Button>
      )}

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full p-2 mt-0.5">
            <Users className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-blue-800 font-semibold">Guest Information</p>
            <p className="text-blue-600 text-sm mt-1">
              Please ensure all guest details are accurate as they will be used for booking confirmation and check-in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestForm;
