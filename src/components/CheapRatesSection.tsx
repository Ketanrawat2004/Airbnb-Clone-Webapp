
import CheapRatesHotelGrid from '@/components/CheapRatesHotelGrid';

const CheapRatesSection = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 relative overflow-hidden">
      {/* Pink Background Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(236,72,153,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(219,39,119,0.06),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(236,72,153,0.02)_49%,rgba(236,72,153,0.02)_51%,transparent_52%)] bg-[length:80px_80px]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Educational Disclaimer Notice */}
        <div className="mb-12 text-center animate-fade-up">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-start justify-center gap-4 mb-4">
              <div className="text-blue-600 text-2xl">ℹ️</div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-blue-800 mb-3">
                  🎓 Educational Project Notice
                </h3>
                <p className="text-blue-700 text-sm sm:text-base leading-relaxed mb-3">
                  This is a <strong>clone website for project purposes only</strong>. You can book hotels and enjoy the complete booking procedure to experience all website functions, but please note:
                </p>
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg mb-3">
                  <p className="text-red-800 font-semibold text-sm sm:text-base">
                    ⚠️ <strong>NOT FOR REAL WORLD BOOKINGS</strong> - These are not actual hotel reservations
                  </p>
                </div>
                <p className="text-blue-700 text-sm sm:text-base leading-relaxed">
                  Book tickets for just <strong className="text-pink-600">₹5 - ₹15</strong> to enjoy the complete experience! 
                  You can also add your review in the review section and provide suggestions to help improve this project.
                </p>
              </div>
            </div>
          </div>
        </div>

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
              Cheap Rates
            </span>
            <span className="block text-gray-800 mt-2">₹5 - ₹15 per night</span>
          </h2>
          
          <p className="text-gray-600 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed px-4">
            Discover amazing deals and budget-friendly accommodations without compromising on quality. 
            Perfect for travelers who want great value for their money.
          </p>
        </div>
        
        <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <CheapRatesHotelGrid />
        </div>
      </div>
    </section>
  );
};

export default CheapRatesSection;
