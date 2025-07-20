import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Users, 
  Building, 
  Calendar, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Home,
  Shield,
  CreditCard,
  Star,
  MessageSquare
} from 'lucide-react';

const AdminSidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const menuItems = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: BarChart3,
      active: location.pathname === '/admin'
    },
    {
      title: 'Users',
      href: '/admin/users',
      icon: Users,
      active: location.pathname === '/admin/users'
    },
    {
      title: 'Hotels',
      href: '/admin/hotels',
      icon: Building,
      active: location.pathname === '/admin/hotels'
    },
    {
      title: 'Bookings',
      href: '/admin/bookings',
      icon: Calendar,
      active: location.pathname === '/admin/bookings'
    },
    {
      title: 'Reviews',
      href: '/admin/reviews',
      icon: Star,
      active: location.pathname === '/admin/reviews'
    },
    {
      title: 'Messages',
      href: '/admin/messages',
      icon: MessageSquare,
      active: location.pathname === '/admin/messages'
    },
    {
      title: 'Payments',
      href: '/admin/payments',
      icon: CreditCard,
      active: location.pathname === '/admin/payments'
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      active: location.pathname === '/admin/settings'
    }
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Admin Panel</h2>
            <p className="text-xs text-blue-200">Travel Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                ${item.active 
                  ? 'bg-white/20 text-white shadow-lg' 
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200/20 space-y-2">
        <Link
          to="/"
          onClick={() => setIsMobileOpen(false)}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          <Home className="h-5 w-5" />
          <span className="font-medium">Back to Site</span>
        </Link>
        
        <Button
          onClick={handleSignOut}
          variant="ghost"
          className="w-full justify-start text-blue-100 hover:bg-red-500/20 hover:text-white transition-all duration-200"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white"
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64 bg-gradient-to-b from-blue-600 to-indigo-700 shadow-xl z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            
            {/* Sidebar */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-600 to-indigo-700 shadow-xl z-50 lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;