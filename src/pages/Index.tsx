
import Header from '@/components/Header';
import HotelGrid from '@/components/HotelGrid';
import SearchBar from '@/components/SearchBar';

const Index = () => {
  const handleHeroSearch = (location: string) => {
    console.log('Hero search for:', location);
    // TODO: Implement search functionality
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-500 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Find your perfect stay</h1>
          <p className="text-xl mb-8 opacity-90">
            Discover amazing places to stay around the world
          </p>
          
          {/* Hero Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-full shadow-lg p-2">
            <SearchBar onSearch={handleHeroSearch} variant="hero" />
          </div>
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Explore unique stays
          </h2>
          <HotelGrid />
        </div>
      </section>
    </div>
  );
};

export default Index;
