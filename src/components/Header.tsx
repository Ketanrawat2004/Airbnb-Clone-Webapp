
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Plane, Building, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Logo from './Logo';
import AuthModal from './AuthModal';
import HotelAutocomplete from './hotel/HotelAutocomplete';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/search?location=${encodeURIComponent(searchValue)}`);
      setShowSearch(false);
    }
  };

  const navItems = [
    { href: '/', label: 'Hotels', icon: Building },
    { href: '/flights', label: 'Flights', icon: Plane },
    { href: '/become-host', label: 'Become a Host', icon: Home },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-pink-200/50' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Logo />
              <span className="text-lg sm:text-xl font-bold text-gray-900">Airbnb Clone+</span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <div className="flex items-center indian-card rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex-1 px-4 py-2">
                    <HotelAutocomplete
                      value={searchValue}
                      onChange={setSearchValue}
                      placeholder="Search destinations..."
                    />
                  </div>
                  <Button
                    onClick={handleSearch}
                    size="sm"
                    variant="airbnb"
                    className="rounded-full mr-2 p-2 h-8 w-8 min-w-[32px]"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-pink-600 mobile-indian-touch-target ${
                    location.pathname === item.href ? 'text-pink-600 font-bold' : 'indian-text'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Admin Access Button */}
                <Button
                  onClick={() => navigate('/admin/auth')}
                  variant="airbnb"
                  size="sm"
                  className="border-0 hidden sm:flex text-sm"
                >
                Admin
              </Button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">
                        {user.email?.split('@')[0] || 'User'}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => setAuthModalOpen(true)}
                  variant="outline"
                  className="bg-white/90 hover:bg-white border-pink-300 text-pink-700 hover:text-pink-800 mobile-indian-optimized"
                >
                  Sign In
                </Button>
              )}

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`flex items-center space-x-2 text-lg font-medium transition-colors hover:text-pink-600 mobile-indian-touch-target ${
                          location.pathname === item.href ? 'text-pink-600 font-bold' : 'indian-text'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    <Button
                      onClick={() => navigate('/admin/auth')}
                      variant="airbnb"
                      className="border-0 mt-4 w-full"
                    >
                      Admin Access
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {showSearch && (
            <div className="lg:hidden mt-4 pb-4">
              <div className="flex items-center indian-card rounded-full shadow-lg">
                <div className="flex-1 px-4 py-2">
                  <HotelAutocomplete
                    value={searchValue}
                    onChange={setSearchValue}
                    placeholder="Search destinations..."
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  size="sm"
                  variant="airbnb"
                  className="rounded-full mr-2 p-2 h-8 w-8 min-w-[32px]"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
};

export default Header;
