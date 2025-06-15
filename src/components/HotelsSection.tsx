
import HotelGrid from '@/components/HotelGrid';

const HotelsSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 relative overflow-hidden">
      {/* Pink Background Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(236,72,153,0.06),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(219,39,119,0.04),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(236,72,153,0.01)_49%,rgba(236,72,153,0.01)_51%,transparent_52%)] bg-[length:80px_80px]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 animate-fade-up">
          <div className="inline-block p-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full mb-6 sm:mb-8 shadow-xl animate-glow">
            <div className="bg-white rounded-full px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4">
              <span className="text-pink-600 text-xs sm:text-sm font-bold tracking-wider uppercase whitespace-nowrap">
                🏆 Featured Collection
              </span>
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 leading-tight px-2">
            <span className="bg-gradient-to-r from-pink-700 via-rose-600 to-pink-800 bg-clip-text text-transparent block animate-scale-in">
              Handpicked
            </span>
            <span className="block text-gray-800 mt-2 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl animate-scale-in" style={{ animationDelay: '0.2s' }}>Luxury Stays</span>
          </h2>
          
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed px-4 break-words animate-fade-up" style={{ animationDelay: '0.4s' }}>
            Curated accommodations that promise exceptional experiences and create lasting memories for every traveler. 
            Each property is carefully selected for its unique charm and outstanding service.
          </p>
        </div>
        
        <div className="animate-fade-up" style={{ animationDelay: '0.6s' }}>
          <HotelGrid />
        </div>
      </div>
    </section>
  );
};

export default HotelsSection;
