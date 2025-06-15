
import SearchBar from '@/components/SearchBar';

interface HeroSectionProps {
  onSearch: (location: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  return (
    <section className="relative h-[80vh] min-h-[600px] max-h-[800px] flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Enhanced Background with Pink Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-rose-600 to-pink-700"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10"></div>
      
      {/* Sophisticated Animated Elements */}
      <div className="absolute top-16 left-16 w-64 h-64 bg-white/8 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-300/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-rose-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header Content */}
        <div className="mb-12 animate-fade-up">
          <div className="inline-block mb-6">
            <span className="bg-white/15 backdrop-blur-lg text-white/95 px-8 py-3 rounded-full text-sm font-semibold tracking-wider uppercase border border-white/20 shadow-xl">
              ✨ Discover Your Perfect Stay
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-8 tracking-tight">
            Find your{' '}
            <span className="inline-block bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 text-transparent bg-clip-text px-6 py-2 rounded-2xl shadow-2xl backdrop-blur-sm border-2 border-white/20 animate-glow bg-white/10">
              perfect stay
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed font-light px-4">
            Discover extraordinary places to stay around the world,<br className="hidden sm:block" />
            curated for unforgettable experiences and lasting memories.
          </p>
        </div>

        {/* Premium Search Bar */}
        <div className="mt-16 w-full max-w-6xl mx-auto animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-4 border border-white/30 hover:shadow-3xl transition-all duration-500 hover:bg-white/98">
            <SearchBar variant="classic-hero" onSearch={onSearch} />
          </div>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
          <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
