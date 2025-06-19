
import { Users } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface GuestInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
}

const GuestInput = ({ value, onChange, label, placeholder }: GuestInputProps) => {
  return (
    <div className="flex-1">
      <div className="flex items-center space-x-3 px-4 sm:px-6 py-4 sm:py-5 border-b sm:border-b-0 sm:border-r border-gray-200 min-h-[70px] sm:min-h-[80px]">
        <Users className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <label className="block text-xs sm:text-sm text-gray-500 mb-1 font-medium">
            {label}
          </label>
          <Input
            type="number"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm sm:text-base font-medium bg-transparent w-full"
            min="1"
          />
        </div>
      </div>
    </div>
  );
};

export default GuestInput;
