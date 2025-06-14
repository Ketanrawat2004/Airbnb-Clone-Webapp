
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

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
        <Label className="text-lg font-medium">Guest Details</Label>
        <div className="text-sm text-gray-500">
          {guests.length} of {maxGuests} guests
        </div>
      </div>

      {guests.map((guest, index) => (
        <Card key={guest.id} className="relative">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                Guest {index + 1} {index === 0 && '(Primary)'}
              </CardTitle>
              {guests.length > 1 && index > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeGuest(guest.id)}
                  className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3">
            {/* Title and Name */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-3">
                <Label className="text-sm font-medium">Title</Label>
                <Select 
                  value={guest.title} 
                  onValueChange={(value) => updateGuest(guest.id, 'title', value)}
                >
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
              
              <div className="md:col-span-4">
                <Label className="text-sm font-medium">First Name *</Label>
                <Input
                  placeholder="First Name"
                  value={guest.firstName}
                  onChange={(e) => updateGuest(guest.id, 'firstName', e.target.value)}
                  className={errors[guest.id]?.firstName ? 'border-red-500' : ''}
                />
                {errors[guest.id]?.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors[guest.id].firstName}</p>
                )}
              </div>
              
              <div className="md:col-span-5">
                <Label className="text-sm font-medium">Last Name *</Label>
                <Input
                  placeholder="Last Name"
                  value={guest.lastName}
                  onChange={(e) => updateGuest(guest.id, 'lastName', e.target.value)}
                  className={errors[guest.id]?.lastName ? 'border-red-500' : ''}
                />
                {errors[guest.id]?.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors[guest.id].lastName}</p>
                )}
              </div>
            </div>

            {/* Age and Gender */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium">Age *</Label>
                <Input
                  type="number"
                  placeholder="Age"
                  value={guest.age}
                  onChange={(e) => updateGuest(guest.id, 'age', e.target.value)}
                  className={errors[guest.id]?.age ? 'border-red-500' : ''}
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
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
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
          className="w-full border-dashed"
        >
          Add Another Guest
        </Button>
      )}
    </div>
  );
};

export default GuestForm;
