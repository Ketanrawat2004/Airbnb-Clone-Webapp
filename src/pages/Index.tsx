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
    <>
      <Header />

      {/* Hero Section - Classic Pink Red Grad + Simple Layout */}
      <section className="relative h-[520px] min-h-[400px] flex flex-col items-center justify-center text-center bg-pink-gradient">
        <div className="w-full max-w-2xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight text-white">
            Find your <span className="pink-highlight">perfect stay</span>
          </h1>
          <p className="text-lg sm:text-2xl font-medium text-white mb-10">
            Discover amazing places to stay around the world,<br className="hidden sm:inline" />
            curated for unforgettable experiences.
          </p>
        </div>
        {/* SearchBar section with simplified appearance */}
        <div className="w-full flex justify-center px-4 relative">
          <div className="searchbar-pink-wrapper">
            <SearchBar variant="classic-hero" onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Hotels Section with Enhanced Design */}
      <section className="py-20 bg-gradient-to-b from-white to-teal-50/50 relative">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(6,182,212,0.05)_25%,rgba(6,182,212,0.05)_26%,transparent_27%,transparent_74%,rgba(6,182,212,0.05)_75%,rgba(6,182,212,0.05)_76%,transparent_77%)] bg-[length:60px_60px]"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-block p-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mb-6">
              <div className="bg-white rounded-full px-6 py-2">
                <span className="text-teal-600 text-sm font-semibold tracking-wider uppercase">
                  Featured Collection
                </span>
              </div>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-teal-700 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Handpicked Stays
              </span>
            </h2>
            
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Curated accommodations that promise exceptional experiences and create lasting memories for every traveler
            </p>
          </div>
          <HotelGrid />
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Features Section with Modern Design */}
      <section className="py-20 bg-gradient-to-br from-teal-900 via-cyan-800 to-blue-900 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(234,179,8,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-block p-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-6">
              <div className="bg-white rounded-full px-6 py-2">
                <span className="text-amber-600 text-sm font-semibold tracking-wider uppercase">
                  Why Choose Us
                </span>
              </div>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Exceptional Service,
              <span className="block bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                Every Time
              </span>
            </h2>
            
            <p className="text-teal-100 text-xl max-w-3xl mx-auto leading-relaxed">
              We're committed to making your booking experience seamless, secure, and absolutely delightful
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center">
              <div className="relative mb-6 mx-auto w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                <div className="relative bg-white rounded-2xl w-full h-full flex items-center justify-center shadow-lg">
                  <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Best Price Promise</h3>
              <p className="text-teal-100 leading-relaxed">
                Unbeatable rates with complete transparency. Find a better deal? We'll match it instantly, guaranteed.
              </p>
            </div>
            
            <div className="group text-center">
              <div className="relative mb-6 mx-auto w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                <div className="relative bg-white rounded-2xl w-full h-full flex items-center justify-center shadow-lg">
                  <svg className="w-10 h-10 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Fort Knox Security</h3>
              <p className="text-teal-100 leading-relaxed">
                Bank-grade encryption protects every transaction. Your privacy and security are our top priorities.
              </p>
            </div>
            
            <div className="group text-center">
              <div className="relative mb-6 mx-auto w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                <div className="relative bg-white rounded-2xl w-full h-full flex items-center justify-center shadow-lg">
                  <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Always Here</h3>
              <p className="text-teal-100 leading-relaxed">
                Round-the-clock expert support in multiple languages. We're here whenever you need us, day or night.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ChatBot />
      <Footer />
      <CookieConsent />
    </>
  );
};

export default Index;
