
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Users } from 'lucide-react';

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
    if (guests.length <= 1) return; // Always keep at least one guest
    
    const updatedGuests = guests.filter(guest => guest.id !== guestId);
    onGuestsChange(updatedGuests);
    
    // Clear errors for removed guest
    const newErrors = { ...errors };
    delete newErrors[guestId];
    setErrors(newErrors);
  };

  const updateGuest = (guestId: string, field: keyof Guest, value: string) => {
    const updatedGuests = guests.map(guest =>
      guest.id === guestId ? { ...guest, [field]: value } : guest
    );
    onGuestsChange(updatedGuests);
    
    // Clear error when user starts typing
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-medium flex items-center space-x-2">
          <Users className="h-5 w-5" />
          <span>Guest Details</span>
        </Label>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {guests.length} of {maxGuests} guests
        </div>
      </div>

      {guests.map((guest, index) => (
        <Card key={guest.id} className="relative border-l-4 border-l-rose-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center space-x-2">
                <span className="bg-rose-100 text-rose-800 px-2 py-1 rounded-full text-xs font-medium">
                  Guest {index + 1}
                </span>
                {index === 0 && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    Primary
                  </span>
                )}
              </CardTitle>
              {guests.length > 1 && index > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeGuest(guest.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Title and Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-3">
                <Label className="text-sm font-medium">Title</Label>
                <Select 
                  value={guest.title} 
                  onValueChange={(value) => updateGuest(guest.id, 'title', value)}
                >
                  <SelectTrigger className="h-10">
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
                <Label className="text-sm font-medium">First Name *</Label>
                <Input
                  placeholder="Enter first name"
                  value={guest.firstName}
                  onChange={(e) => updateGuest(guest.id, 'firstName', e.target.value)}
                  className={`h-10 ${errors[guest.id]?.firstName ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors[guest.id]?.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors[guest.id].firstName}</p>
                )}
              </div>
              
              <div className="md:col-span-5">
                <Label className="text-sm font-medium">Last Name *</Label>
                <Input
                  placeholder="Enter last name"
                  value={guest.lastName}
                  onChange={(e) => updateGuest(guest.id, 'lastName', e.target.value)}
                  className={`h-10 ${errors[guest.id]?.lastName ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors[guest.id]?.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors[guest.id].lastName}</p>
                )}
              </div>
            </div>

            {/* Age and Gender Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium">Age *</Label>
                <Input
                  type="number"
                  placeholder="Age"
                  value={guest.age}
                  onChange={(e) => updateGuest(guest.id, 'age', e.target.value)}
                  className={`h-10 ${errors[guest.id]?.age ? 'border-red-500 focus:border-red-500' : ''}`}
                  min="1"
                  max="120"
                />
                {errors[guest.id]?.age && (
                  <p className="text-red-500 text-xs mt-1">{errors[guest.id].age}</p>
                )}
              </div>
              
              <div>
                <Label className="text-sm font-medium">Gender</Label>
                <Select 
                  value={guest.gender} 
                  onValueChange={(value) => updateGuest(guest.id, 'gender', value)}
                >
                  <SelectTrigger className="h-10">
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
          className="w-full border-dashed border-2 border-gray-300 hover:border-rose-400 hover:bg-rose-50 text-gray-600 hover:text-rose-600 py-6"
        >
          <Users className="h-4 w-4 mr-2" />
          Add Guest {guests.length + 1}
        </Button>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <div className="bg-blue-500 rounded-full p-1 mt-0.5">
            <Users className="h-3 w-3 text-white" />
          </div>
          <div>
            <p className="text-sm text-blue-800 font-medium">Guest Information</p>
            <p className="text-xs text-blue-600 mt-1">
              Please ensure all guest details are accurate as they will be used for booking confirmation and check-in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestForm;
