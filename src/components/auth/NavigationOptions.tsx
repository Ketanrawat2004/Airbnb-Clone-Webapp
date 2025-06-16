
import { Home, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NavigationOptions = () => {
  const navigate = useNavigate();

  const handleContinue = () => navigate('/');
  const handleExplore = () => navigate('/search');
  const handleProfile = () => navigate('/profile');

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <h3 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">🚀 Ready to explore?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Button 
          onClick={handleContinue} 
          variant="outline" 
          size="sm"
          className="flex items-center space-x-2 text-xs md:text-sm"
        >
          <Home className="h-4 w-4" />
          <span>Home</span>
        </Button>
        <Button 
          onClick={handleExplore} 
          variant="outline" 
          size="sm"
          className="flex items-center space-x-2 text-xs md:text-sm"
        >
          <Search className="h-4 w-4" />
          <span>Search</span>
        </Button>
        <Button 
          onClick={handleProfile} 
          variant="outline" 
          size="sm"
          className="flex items-center space-x-2 text-xs md:text-sm"
        >
          <User className="h-4 w-4" />
          <span>Profile</span>
        </Button>
      </div>
    </div>
  );
};

export default NavigationOptions;
