import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BusSearchForm from '@/components/bus/BusSearchForm';
import { Bus } from 'lucide-react';

const BusSearch = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4 md:mb-6 shadow-lg">
              <Bus className="h-8 w-8 md:h-10 md:w-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Book Bus Tickets
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Travel across India with comfort and safety. Book your bus tickets now!
            </p>
          </div>

          {/* Search Form */}
          <div className="mb-8 md:mb-12">
            <BusSearchForm />
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow border border-green-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                <Bus className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800">Wide Network</h3>
              <p className="text-sm md:text-base text-gray-600">
                Connect to thousands of cities across India with our extensive bus network
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow border border-green-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800">Best Prices</h3>
              <p className="text-sm md:text-base text-gray-600">
                Get the best deals and discounts on bus tickets with exclusive offers
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow border border-green-100 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800">Safe & Secure</h3>
              <p className="text-sm md:text-base text-gray-600">
                Travel with confidence with verified operators and secure payment options
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BusSearch;
