
import Header from '@/components/Header';
import HotelGrid from '@/components/HotelGrid';
import SearchBar from '@/components/SearchBar';
import ChatBot from '@/components/ChatBot';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500 text-white py-16 sm:py-20 lg:py-24 overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-black/25 via-transparent to-black/40 pointer-events-none z-0" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-playfair tracking-tight drop-shadow-sm"
          >
            Find your <span className="bg-white/10 px-2 sm:px-3 rounded-xl text-white shadow-lg backdrop-blur-sm">perfect stay</span>
          </h1>
          <p
            className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 opacity-90 max-w-2xl mx-auto font-medium"
          >
            Discover amazing places to stay around the world, curated for unforgettable experiences.
          </p>
          <div
            className="max-w-sm sm:max-w-2xl lg:max-w-3xl mx-auto bg-white bg-opacity-90 rounded-full shadow-2xl p-2 sm:p-3 flex items-center justify-center backdrop-blur-md"
          >
            <SearchBar variant="hero" />
          </div>
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-6 sm:mb-8 drop-shadow-sm">
            Explore unique stays
          </h2>
          <HotelGrid />
        </div>
      </section>

      <ChatBot />
      <Footer />
    </div>
  );
};

export default Index;
