
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchButtonProps {
  onSubmit: () => void;
}

const SearchButton = ({ onSubmit }: SearchButtonProps) => {
  return (
    <div className="flex items-center justify-center sm:justify-end p-4 sm:p-6">
      <Button 
        type="submit" 
        onClick={onSubmit}
        className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
      >
        <Search className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
    </div>
  );
};

export default SearchButton;
