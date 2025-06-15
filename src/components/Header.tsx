
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, User, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
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

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Left section with Sidebar trigger, Back button, Home button, and Logo */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <SidebarTrigger className="p-2" />
            <BackButton />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHomeClick}
              className="hidden sm:flex items-center space-x-1 text-gray-600 hover:text-gray-900"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Button>
            <div 
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer hover:opacity-80 transition-opacity" 
              onClick={handleHomeClick}
            >
              <Logo />
              <h1 className="text-lg sm:text-2xl font-bold text-rose-500">
                <span className="hidden sm:inline">Airbnb Clone+</span>
                <span className="sm:hidden">Airbnb+</span>
              </h1>
            </div>
          </div>

          {/* Center - Search Bar */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Right section - User Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* User Menu */}
            {loading ? (
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full animate-pulse"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-1 sm:space-x-2 rounded-full p-1 sm:p-2 hover:shadow-md transition-shadow">
                    <Menu className="h-3 w-3 sm:h-4 sm:w-4" />
                    <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                      <AvatarFallback className="text-xs sm:text-sm bg-rose-500 text-white">
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => setAuthModalOpen(true)} 
                size="sm" 
                className="text-xs sm:text-sm bg-rose-500 hover:bg-rose-600 text-white shadow-md hover:shadow-lg transition-all"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden mt-3 sm:mt-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </header>
  );
};

export default Header;
