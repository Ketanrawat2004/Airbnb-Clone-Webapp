
import SearchBar from '@/components/SearchBar';

interface HeroSectionProps {
  onSearch: (location: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Rose Pink Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-pink-400 to-rose-500"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-rose-500/80 via-pink-400/40 to-transparent"></div>
      
      {/* Animated Gradient Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-300/30 via-pink-400/20 to-transparent animate-pulse"></div>
      
      {/* Dynamic Floating Elements */}
      <div className="absolute top-16 left-8 w-80 h-80 bg-gradient-to-r from-rose-300/20 to-pink-300/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-12 w-96 h-96 bg-gradient-to-r from-pink-300/25 to-rose-400/25 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-gradient-to-r from-rose-400/15 to-pink-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      
      {/* Geometric Overlay Pattern */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-20 w-40 h-40 border-2 border-white/30 rotate-45 rounded-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-28 h-28 border border-rose-200/40 rotate-12 rounded-lg animate-float"></div>
        <div className="absolute bottom-40 left-40 w-48 h-48 border border-pink-200/30 -rotate-12 rounded-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 border-2 border-white/20 rotate-45 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 sm:py-12">
        {/* Premium Header Content */}
        <div className="mb-8 sm:mb-12 animate-fade-up">
          <div className="inline-block mb-6 sm:mb-8">
            <span className="bg-gradient-to-r from-pink-400/20 to-rose-400/20 backdrop-blur-xl text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full text-sm sm:text-base font-medium tracking-wide border border-white/30 shadow-2xl whitespace-nowrap">
              🌟 Your Gateway to Extraordinary Travels
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6 sm:mb-8 lg:mb-10 tracking-tight">
            <span className="block mb-3 sm:mb-4">Unlock Your</span>
            <span className="block bg-gradient-to-r from-rose-200 via-pink-200 to-rose-300 text-transparent bg-clip-text relative">
              <span className="absolute inset-0 bg-gradient-to-r from-rose-200 via-pink-200 to-rose-300 blur-lg opacity-50"></span>
              <span className="relative">Dream Adventure</span>
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light px-4">
            Experience the world like never before with our AI-powered travel platform.
            <br className="hidden sm:block" />
            From luxury escapes to budget-friendly adventures - your perfect journey awaits.
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
