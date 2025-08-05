
import SearchBar from '@/components/SearchBar';
import { Sparkles, Zap, Globe, Users } from 'lucide-react';

interface HeroSectionProps {
  onSearch: (location: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden font-display">
      {/* Revolutionary Layered Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/20 to-pink-500/15"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-emerald-400/5 via-blue-500/15 to-indigo-600/20"></div>
      
      {/* Dynamic Mesh Overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-500/30 to-cyan-500/20 animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/15 via-indigo-600/25 to-purple-700/20 animate-float-slow"></div>
      </div>
      
      {/* Sophisticated Floating Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-500/30 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-32 right-16 w-[28rem] h-[28rem] bg-gradient-to-r from-purple-400/25 to-pink-500/35 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-1/2 left-20 w-80 h-80 bg-gradient-to-r from-emerald-400/15 to-teal-500/25 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '6s' }}></div>
      <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-rose-400/20 to-orange-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '9s' }}></div>
      
      {/* Premium Geometric Art */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-32 right-24 w-40 h-40 border-2 border-cyan-300/40 rotate-45 rounded-3xl animate-glow"></div>
        <div className="absolute bottom-40 left-32 w-32 h-32 border border-purple-300/30 rotate-12 rounded-2xl animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-48 h-48 border border-pink-300/25 -rotate-12 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-36 h-36 border-2 border-blue-300/35 rotate-45 rounded-xl animate-glow" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 sm:py-12 lg:py-20">
        {/* Premium Header Content */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 animate-fade-up">
          {/* Enhanced Premium Badge */}
          <div className="inline-block mb-8 sm:mb-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              <span className="relative glass-morphism text-white px-8 sm:px-10 lg:px-14 py-4 sm:py-5 lg:py-6 rounded-full text-sm sm:text-base lg:text-lg font-medium tracking-wide shadow-2xl flex items-center gap-3 border border-white/20">
                <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                <span className="text-shimmer">Experience Magic. Discover Wonder.</span>
                <Zap className="w-5 h-5 text-cyan-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </span>
            </div>
          </div>
          
          {/* Revolutionary Typography */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] mb-8 sm:mb-10 lg:mb-12 tracking-tight">
            <span className="block text-white mb-4 sm:mb-6 text-glow">Journey Beyond</span>
            <span className="block relative">
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 text-transparent bg-clip-text relative z-10 text-glow">
                Imagination
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 blur-2xl opacity-50 animate-pulse-slow"></span>
            </span>
          </h1>
          
          {/* Premium Tagline */}
          <div className="max-w-6xl mx-auto mb-12 sm:mb-16">
            <p className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed font-light">
              <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 text-transparent bg-clip-text font-semibold text-glow">
                Unlock extraordinary destinations
              </span>
              <span className="text-white/90 block sm:inline"> with AI-powered precision. </span>
              <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-rose-300 text-transparent bg-clip-text font-semibold text-glow">
                From hidden gems to luxury escapes
              </span>
              <span className="text-white/90"> - your perfect adventure starts here.</span>
            </p>
          </div>
        </div>

        {/* Ultra-Premium Search Bar */}
        <div className="w-full max-w-7xl mx-auto animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="relative group floating-card-enhanced">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-700"></div>
            <div className="relative glass-morphism rounded-3xl sm:rounded-[2rem] shadow-2xl p-6 sm:p-8 lg:p-10 border border-white/30 hover:border-white/50 transition-all duration-700">
              <SearchBar variant="classic-hero" onSearch={onSearch} />
            </div>
          </div>
        </div>

        {/* Enhanced Trust Indicators */}
        <div className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 max-w-5xl mx-auto animate-fade-up" style={{ animationDelay: '0.6s' }}>
          <div className="text-center group">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-emerald-400/10 p-4 rounded-full border border-emerald-400/30">
                <Zap className="w-6 h-6 text-emerald-300 mx-auto" />
              </div>
            </div>
            <p className="text-white/80 font-medium">AI-Powered Search</p>
          </div>
          
          <div className="text-center group">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-purple-400/10 p-4 rounded-full border border-purple-400/30">
                <Globe className="w-6 h-6 text-purple-300 mx-auto" />
              </div>
            </div>
            <p className="text-white/80 font-medium">Global Coverage</p>
          </div>
          
          <div className="text-center group">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-cyan-400/10 p-4 rounded-full border border-cyan-400/30">
                <Sparkles className="w-6 h-6 text-cyan-300 mx-auto" />
              </div>
            </div>
            <p className="text-white/80 font-medium">Best Price Guarantee</p>
          </div>
          
          <div className="text-center group">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-pink-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-pink-400/10 p-4 rounded-full border border-pink-400/30">
                <Users className="w-6 h-6 text-pink-300 mx-auto" />
              </div>
            </div>
            <p className="text-white/80 font-medium">Expert Support</p>
          </div>
        </div>
      </div>

      {/* Premium Scroll Indicator */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/30 to-purple-400/30 rounded-full blur-lg"></div>
          <div className="relative w-8 h-12 border-2 border-white/30 rounded-full flex justify-center glass-morphism group-hover:border-white/50 transition-colors duration-300">
            <div className="w-1 h-4 bg-gradient-to-b from-cyan-300 to-purple-300 rounded-full mt-3 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
