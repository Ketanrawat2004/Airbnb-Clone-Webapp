
import AnimatedSection from '@/components/AnimatedSection';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import HotelGrid from '@/components/HotelGrid';
import TestimonialsSection from '@/components/TestimonialsSection';
import ChatBot from '@/components/ChatBot';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

const Index = () => {
  const handleSearch = (location: string) => {
    console.log('Searching for:', location);
    // TODO: Implement search functionality
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pt-20 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              Stay
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover amazing places to stay around the world. From luxury hotels to cozy homestays, 
            we've got the perfect accommodation for your next adventure.
          </p>
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-2">
            <SearchBar variant="hero" onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Hotels Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Stays
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Handpicked accommodations that offer exceptional experiences and unforgettable memories
            </p>
          </div>
          <HotelGrid />
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We make booking your perfect stay simple, secure, and stress-free
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-rose-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">
                We offer the most competitive prices with no hidden fees. Find a better deal? We'll match it.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Booking</h3>
              <p className="text-gray-600">
                Your personal information and payments are protected with industry-standard encryption.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our dedicated support team is available around the clock to assist you with any questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ChatBot />
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;
