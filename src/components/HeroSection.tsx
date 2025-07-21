
import SearchBar from '@/components/SearchBar';

interface HeroSectionProps {
  onSearch: (location: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden pt-20">
      {/* Enhanced Background with Pink Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-rose-600 to-pink-700"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10"></div>
      
      {/* Sophisticated Animated Elements */}
      <div className="absolute top-16 left-16 w-64 h-64 bg-white/8 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-300/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-rose-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 sm:py-12">
        {/* Enhanced Header Content */}
        <div className="mb-8 sm:mb-12 animate-fade-up">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="bg-white/15 backdrop-blur-lg text-white/95 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase border border-white/20 shadow-xl whitespace-nowrap leading-relaxed">
              ✨ Discover Your Perfect Stay & Flight
            </span>
          </div>
          
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6 lg:mb-8 tracking-tight px-2">
            <span className="block sm:inline mr-0 sm:mr-4 mb-2 sm:mb-0">Find your</span>
            <span className="block sm:inline bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 text-transparent bg-clip-text px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-2xl shadow-2xl backdrop-blur-sm border-2 border-white/20 animate-glow bg-white/10 leading-relaxed">
              perfect journey
            </span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 max-w-4xl mx-auto leading-relaxed font-light px-4 break-words">
            Discover extraordinary places to stay and flights around the world,
            <br className="hidden sm:block" />
            curated for unforgettable experiences and lasting memories.
          </p>
        </div>

        {/* Premium Search Bar */}
        <div className="mt-8 sm:mt-12 lg:mt-16 w-full max-w-6xl mx-auto animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-4 border border-white/30 hover:shadow-3xl transition-all duration-500 hover:bg-white/98">
            <SearchBar variant="classic-hero" onSearch={onSearch} />
          </div>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
          <div className="w-1 h-2 sm:h-3 bg-white/80 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
