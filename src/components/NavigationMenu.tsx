
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Search, User, Heart, HelpCircle, MapPin, Info, Plane } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navigationItems = [
    { 
      name: 'Home', 
      path: '/', 
      icon: Home,
      description: 'Discover amazing places'
    },
    { 
      name: 'Hotels', 
      path: '/search', 
      icon: Search,
      description: 'Find your perfect stay'
    },
    { 
      name: 'Flights', 
      path: '/flights', 
      icon: Plane,
      description: 'Book amazing flights'
    },
    { 
      name: 'About', 
      path: '/about', 
      icon: Info,
      description: 'Learn about our platform'
    },
    { 
      name: 'Profile', 
      path: '/profile', 
      icon: User,
      description: 'Manage your account',
      authRequired: true
    },
    { 
      name: 'Privacy', 
      path: '/privacy', 
      icon: HelpCircle,
      description: 'Privacy & Terms'
    }
  ];

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const filteredItems = navigationItems.filter(item => 
    !item.authRequired || (item.authRequired && user)
  );

  return (
    <>
      {/* Desktop Navigation - Hidden on mobile */}
      <nav className="hidden lg:flex items-center space-x-1">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = isActivePath(item.path);
          
          return (
            <Link key={item.name} to={item.path}>
              <Button
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={`flex items-center space-x-2 transition-all duration-200 ${
                  isActive 
                    ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{item.name}</span>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Navigation Menu */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="p-2">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle className="flex items-center space-x-2 text-rose-500">
                <MapPin className="h-5 w-5" />
                <span>Navigation</span>
              </SheetTitle>
            </SheetHeader>
            
            <div className="mt-6 space-y-2">
              {filteredItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);
                
                return (
                  <Link 
                    key={item.name} 
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-rose-50 border-l-4 border-rose-500 text-rose-700' 
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-rose-500' : 'text-gray-500'}`} />
                    <div>
                      <div className={`font-medium ${isActive ? 'text-rose-700' : 'text-gray-900'}`}>
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* User Info Section for Mobile */}
            {user && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="h-10 w-10 bg-rose-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Welcome!</div>
                    <div className="text-sm text-gray-500 truncate">{user.email}</div>
                  </div>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default NavigationMenu;
