
import { Users } from 'lucide-react';
import { Guest } from './GuestForm';

interface Hotel {
  id: string;
  name: string;
  location: string;
  price_per_night: number;
  images: string[];
  available_rooms: number;
  facilities: string[];
  rules_and_regulations: string[];
}

interface BookingModalBookingSummaryProps {
  hotel: Hotel;
  nights: number;
  guests: string;
  checkInDate: string;
  checkOutDate: string;
  finalAmountInPaise: number;
  guestList: Guest[];
}

const BookingModalBookingSummary = ({
  hotel,
  nights,
  guests,
  checkInDate,
  checkOutDate,
  finalAmountInPaise,
  guestList
}: BookingModalBookingSummaryProps) => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 shadow-inner">
      <h3 className="font-bold mb-4 flex items-center space-x-2 text-lg">
        <Users className="h-6 w-6 text-gray-600" />
        <span>Booking Summary</span>
      </h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-800">{hotel.name}</span>
          <span className="font-bold text-xl text-rose-600">₹{(finalAmountInPaise / 100).toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>{nights} nights • {guests} guests</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>{checkInDate} to {checkOutDate}</span>
        </div>
        {guestList.length > 0 && (
          <div className="border-t pt-3 mt-3">
            <p className="font-semibold text-gray-700 mb-2">Guests:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {guestList.map((guest, index) => (
                <p key={guest.id} className="text-xs text-gray-600 bg-white rounded-lg px-2 py-1">
                  {index + 1}. {guest.title} {guest.firstName} {guest.lastName} ({guest.age} years)
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModalBookingSummary;
