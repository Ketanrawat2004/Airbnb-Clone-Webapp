
import HotelGrid from '@/components/HotelGrid';

const HotelsSection = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Sophisticated Background Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(59,130,246,0.04),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(99,102,241,0.04),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.01)_49%,rgba(59,130,246,0.01)_51%,transparent_52%)] bg-[length:80px_80px]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 sm:mb-20 animate-fade-up">
          <div className="inline-block p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-8 shadow-xl">
            <div className="bg-white rounded-full px-8 py-4">
              <span className="text-blue-600 text-sm font-bold tracking-wider uppercase">
                🏆 Featured Collection
              </span>
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Handpicked
            </span>
            <span className="block text-gray-800 mt-2">Luxury Stays</span>
          </h2>
          
          <p className="text-gray-600 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed px-4">
            Curated accommodations that promise exceptional experiences and create lasting memories for every traveler. 
            Each property is carefully selected for its unique charm and outstanding service.
          </p>
        </div>
        
        <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <HotelGrid />
        </div>
      </div>
    </section>
  );
};

export default HotelsSection;
