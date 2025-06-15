
import HotelGrid from '@/components/HotelGrid';

const CheapRatesSection = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 relative overflow-hidden">
      {/* Pink Background Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(236,72,153,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(219,39,119,0.06),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(236,72,153,0.02)_49%,rgba(236,72,153,0.02)_51%,transparent_52%)] bg-[length:80px_80px]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 sm:mb-20 animate-fade-up">
          <div className="inline-block p-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full mb-8 shadow-xl">
            <div className="bg-white rounded-full px-8 py-4">
              <span className="text-pink-600 text-sm font-bold tracking-wider uppercase">
                💰 Budget Friendly
              </span>
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-pink-700 via-rose-600 to-pink-800 bg-clip-text text-transparent">
              Testing
            </span>
            <span className="block text-gray-800 mt-2">Cheap Rates</span>
          </h2>
          
          <p className="text-gray-600 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed px-4">
            Discover amazing deals and budget-friendly accommodations without compromising on quality. 
            Perfect for travelers who want great value for their money.
          </p>
        </div>
        
        <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <HotelGrid />
        </div>
      </div>
    </section>
  );
};

export default CheapRatesSection;
