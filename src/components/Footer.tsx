
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, User } from 'lucide-react';
import VisitorCounter from './VisitorCounter';

const Footer = () => {
  const currentYear = 2025;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-bold text-rose-400">Airbnb Clone+</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Discover unique accommodations and flights around the world. From cozy apartments to luxury villas, 
              find your perfect journey with us.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base md:text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Search Hotels
                </Link>
              </li>
              <li>
                <Link to="/flights" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Search Flights
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-rose-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-rose-400 transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/become-host" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Become a Host
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Center */}
          <div className="space-y-4">
            <h4 className="text-base md:text-lg font-semibold">Help Center</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help/customer-service" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link to="/help/safety-security" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Safety & Security
                </Link>
              </li>
              <li>
                <Link to="/cancellation-policy" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Analytics & Reports */}
          <div className="space-y-4">
            <h4 className="text-base md:text-lg font-semibold">Analytics & Reports</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/website-analysis" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Website Analysis
                </Link>
              </li>
              <li>
                <Link to="/website-analysis" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Performance Report
                </Link>
              </li>
              <li>
                <Link to="/website-analysis" className="text-gray-300 hover:text-rose-400 transition-colors">
                  User Insights
                </Link>
              </li>
              <li>
                <Link to="/website-analysis" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Traffic Analytics
                </Link>
              </li>
              <li>
                <Link to="/admin/auth" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-base md:text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">NIT Jamshedpur, Jamshedpur, Jharkhand</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-rose-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-rose-400" />
                <span className="text-gray-300">support@airbnbclone.com</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-400">
                Available 24/7 for customer support
              </p>
            </div>
          </div>
        </div>

        {/* Developer Info Section */}
        <div className="border-t border-gray-700 mt-6 md:mt-8 pt-6">
          <div className="bg-gray-800 rounded-lg p-4 mb-4 md:mb-6">
            <div className="flex items-center space-x-4 mb-3">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden bg-rose-500 flex-shrink-0">
                <img 
                  src="/lovable-uploads/2b5371a2-33f0-4ff1-90ac-f53e40ab5e75.png" 
                  alt="Ketan Rawat - Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-base md:text-lg font-semibold text-rose-400">Developer</h4>
                <p className="font-medium text-white text-sm md:text-base">Ketan Rawat</p>
              </div>
            </div>
            <div className="text-sm text-gray-300 ml-16 md:ml-20">
              <p className="text-gray-400">B.Tech ECE 3rd Year</p>
              <p className="text-gray-400">NIT Jamshedpur</p>
              <p className="text-rose-300 mt-2">Developer of Airbnb Clone+ Project</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-4 md:pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              <p>&copy; {currentYear} Airbnb Clone+. All rights reserved.</p>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <VisitorCounter />
              <div className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-6 text-xs text-gray-400">
                <Link to="/privacy" className="hover:text-rose-400 transition-colors">
                  Privacy
                </Link>
                <Link to="/terms" className="hover:text-rose-400 transition-colors">
                  Terms
                </Link>
                <Link to="/cookies-policy" className="hover:text-rose-400 transition-colors">
                  Cookies
                </Link>
                <Link to="/accessibility" className="hover:text-rose-400 transition-colors">
                  Accessibility
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
