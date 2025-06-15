
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, User } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-rose-400">Airbnb Clone+</h3>
            <p className="text-gray-300 text-sm">
              Discover unique accommodations around the world. From cozy apartments to luxury villas, 
              find your perfect stay with us.
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
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Search Properties
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-rose-400 transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Become a Host
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Customer Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Safety & Security
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Cancellation Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-rose-400" />
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
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-4 mb-3">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-rose-500 flex-shrink-0">
                <img 
                  src="/lovable-uploads/2b5371a2-33f0-4ff1-90ac-f53e40ab5e75.png" 
                  alt="Ketan Rawat - Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-rose-400">Developer</h4>
                <p className="font-medium text-white">Ketan Rawat</p>
              </div>
            </div>
            <div className="text-sm text-gray-300 ml-20">
              <p className="text-gray-400">B.Tech ECE 3rd Year</p>
              <p className="text-gray-400">NIT Jamshedpur</p>
              <p className="text-rose-300 mt-2">Developer of Airbnb Clone+ Project</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              <p>&copy; {currentYear} Airbnb Clone+. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 text-xs text-gray-400">
              <a href="#" className="hover:text-rose-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-rose-400 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-rose-400 transition-colors">
                Cookies
              </a>
              <a href="#" className="hover:text-rose-400 transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
