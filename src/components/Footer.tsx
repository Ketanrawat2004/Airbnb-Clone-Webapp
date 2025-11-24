
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import VisitorCounter from './VisitorCounter';
import founderPhoto from '@/assets/founder-photo.jpg';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = 2025;

  return (
    <footer className="bg-gradient-to-br from-rose-500 via-pink-600 to-rose-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-bold text-white">Airbnb Clone+</h3>
            <p className="text-rose-100 text-sm leading-relaxed">
              Discover incredible stays and experiences across India and beyond. From heritage homestays to modern apartments, 
              find your perfect cultural journey with us.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-rose-100 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-rose-100 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-rose-100 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-rose-100 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base md:text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-rose-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-rose-100 hover:text-white transition-colors">
                  Search Hotels
                </Link>
              </li>
              <li>
                <Link to="/flights" className="text-rose-100 hover:text-white transition-colors">
                  Search Flights
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-rose-100 hover:text-white transition-colors">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-rose-100 hover:text-white transition-colors">
                  {t('profile.myProfile')}
                </Link>
              </li>
              <li>
                <Link to="/become-host" className="text-rose-100 hover:text-white transition-colors">
                  {t('header.becomeHost')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Center */}
          <div className="space-y-4">
            <h4 className="text-base md:text-lg font-semibold">Help Center</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help/customer-service" className="text-rose-100 hover:text-white transition-colors">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link to="/help/safety-security" className="text-rose-100 hover:text-white transition-colors">
                  Safety & Security
                </Link>
              </li>
              <li>
                <Link to="/cancellation-policy" className="text-rose-100 hover:text-white transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-rose-100 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-rose-100 hover:text-white transition-colors">
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
                <Link to="/website-analysis" className="text-rose-100 hover:text-white transition-colors">
                  Website Analysis
                </Link>
              </li>
              <li>
                <Link to="/website-analysis" className="text-rose-100 hover:text-white transition-colors">
                  Performance Report
                </Link>
              </li>
              <li>
                <Link to="/website-analysis" className="text-rose-100 hover:text-white transition-colors">
                  User Insights
                </Link>
              </li>
              <li>
                <Link to="/website-analysis" className="text-rose-100 hover:text-white transition-colors">
                  Traffic Analytics
                </Link>
              </li>
              <li>
                <Link to="/admin/auth" className="text-rose-100 hover:text-white transition-colors">
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
                <MapPin className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                <span className="text-rose-100">NIT Jamshedpur, Jamshedpur, Jharkhand</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-white" />
                <span className="text-rose-100">+91 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-white" />
                <span className="text-rose-100">support@airbnbcloneplus.com</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-rose-200">
                Available 24/7 for incredible customer support
              </p>
            </div>
          </div>
        </div>

        {/* Founder Info Section */}
        <div className="border-t border-rose-300/30 mt-6 md:mt-8 pt-6">
          <div className="bg-gradient-to-r from-rose-600/30 to-pink-600/30 rounded-2xl p-6 mb-4 md:mb-6 border border-rose-400/30">
            <div className="flex items-center space-x-4 mb-3">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gradient-to-r from-rose-400 to-pink-400 flex-shrink-0 border-4 border-white shadow-lg">
                <img 
                  src={founderPhoto}
                  alt="Founder"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white">Founder & CEO</h4>
                <p className="font-medium text-rose-100 text-sm md:text-base">Airbnb Clone+</p>
              </div>
            </div>
            <div className="text-sm text-rose-100 ml-20 md:ml-24">
              <p className="text-rose-200">B.Tech ECE 3rd Year</p>
              <p className="text-rose-200">NIT Jamshedpur</p>
              <p className="text-white mt-2">Building the future of secure travel booking technology</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-rose-300/30 pt-4 md:pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-rose-100">
              <p>&copy; {currentYear} Airbnb Clone+. All rights reserved.</p>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <VisitorCounter />
              <div className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-6 text-xs text-rose-200">
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms
                </Link>
                <Link to="/cookies-policy" className="hover:text-white transition-colors">
                  Cookies
                </Link>
                <Link to="/accessibility" className="hover:text-white transition-colors">
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
