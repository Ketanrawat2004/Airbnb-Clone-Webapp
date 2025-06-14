
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, User, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import AuthModal from './AuthModal';
import BackButton from './BackButton';
import Logo from './Logo';

const Header = () => {
  const { user, loading, signOut } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (location: string) => {
    console.log('Searching for:', location);
    // TODO: Implement search functionality
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleHomeClick = () => {
    console.log('Navigating to home page');
    navigate('/');
  };

  // Show loading state while auth is initializing
  if (loading) {
    return (
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BackButton />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleHomeClick}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity" 
                onClick={handleHomeClick}
              >
                <Logo />
                <h1 className="text-2xl font-bold text-rose-500">Airbnb Clone+</h1>
              </div>
            </div>

            <div className="hidden md:block flex-1 max-w-2xl mx-8">
              <SearchBar onSearch={handleSearch} />
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="md:hidden mt-4">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left section with Back button, Home button, and Logo */}
          <div className="flex items-center space-x-4">
            <BackButton />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHomeClick}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Button>
            <div 
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity" 
              onClick={handleHomeClick}
            >
              <Logo />
              <h1 className="text-2xl font-bold text-rose-500">Airbnb Clone+</h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2 rounded-full">
                    <Menu className="h-4 w-4" />
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleProfileClick}>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => setAuthModalOpen(true)}>
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </header>
  );
};

export default Header;
