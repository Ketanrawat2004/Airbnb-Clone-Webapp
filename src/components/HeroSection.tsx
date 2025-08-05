
import SearchBar from '@/components/SearchBar';

interface HeroSectionProps {
  onSearch: (location: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Revolutionary Background Design */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-blue-500/30 to-purple-600/40"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-emerald-400/10 via-teal-500/20 to-cyan-600/30"></div>
      
      {/* Animated Mesh Gradient */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-400/30 via-pink-500/40 to-red-500/30 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-bl from-blue-400/20 via-purple-500/30 to-pink-600/40 animate-float"></div>
      </div>
      
      {/* Dynamic Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400/30 to-blue-500/40 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-32 right-16 w-80 h-80 bg-gradient-to-r from-purple-400/35 to-pink-500/45 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-20 w-60 h-60 bg-gradient-to-r from-emerald-400/25 to-teal-500/35 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-r from-rose-400/30 to-orange-500/40 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
      
      {/* Geometric Art Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-32 right-24 w-32 h-32 border-2 border-cyan-300/50 rotate-45 rounded-2xl animate-glow"></div>
        <div className="absolute bottom-40 left-32 w-24 h-24 border border-purple-300/40 rotate-12 rounded-xl animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-40 h-40 border border-pink-300/30 -rotate-12 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-28 h-28 border-2 border-blue-300/40 rotate-45 rounded-lg animate-glow" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 sm:py-12 lg:py-16">
        {/* Revolutionary Header Design */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-up">
          {/* Premium Badge */}
          <div className="inline-block mb-6 sm:mb-8">
            <span className="bg-gradient-to-r from-white/10 to-white/20 backdrop-blur-xl text-white px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 rounded-full text-sm sm:text-base lg:text-lg font-medium tracking-wide border border-white/30 shadow-2xl relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></span>
              <span className="relative">✨ Experience Magic. Discover Wonder.</span>
            </span>
          </div>
          
          {/* Revolutionary Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 sm:mb-8 lg:mb-12 tracking-tight">
            <span className="block text-white mb-2 sm:mb-4">Journey Beyond</span>
            <span className="block relative">
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 text-transparent bg-clip-text relative z-10">
                Imagination
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 blur-lg opacity-60 animate-pulse"></span>
            </span>
          </h1>
          
          {/* Amazing Tagline with Color Combination */}
          <div className="max-w-5xl mx-auto mb-8 sm:mb-12">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed font-light mb-6">
              <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 text-transparent bg-clip-text font-medium">
                Unlock extraordinary destinations
              </span>
              <span className="text-white/90 block sm:inline"> with AI-powered precision. </span>
              <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-rose-300 text-transparent bg-clip-text font-medium">
                From hidden gems to luxury escapes
              </span>
              <span className="text-white/90"> - your perfect adventure starts here.</span>
            </p>
          </div>
        </div>

        {/* Ultra-Modern Search Bar */}
        <div className="w-full max-w-6xl mx-auto animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/98 transition-all duration-500">
              <SearchBar variant="classic-hero" onSearch={onSearch} />
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 sm:mt-16 lg:mt-20 flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-12 text-white/70 text-sm sm:text-base animate-fade-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span>AI-Powered Search</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <span>Instant Booking</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <span>Best Price Guarantee</span>
          </div>
        </div>
      </div>

      {/* Modern Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm bg-white/10 relative overflow-hidden">
          <div className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full mt-2 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent animate-float"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
