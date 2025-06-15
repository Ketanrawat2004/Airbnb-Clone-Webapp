
import CheapRatesHotelGrid from '@/components/CheapRatesHotelGrid';

const CheapRatesSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 relative overflow-hidden">
      {/* Pink Background Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(236,72,153,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(219,39,119,0.06),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(236,72,153,0.02)_49%,rgba(236,72,153,0.02)_51%,transparent_52%)] bg-[length:80px_80px]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Educational Disclaimer Notice */}
        <div className="mb-10 sm:mb-12 text-center animate-fade-up">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
            <div className="flex items-start justify-center gap-3 sm:gap-4 mb-4">
              <div className="text-blue-600 text-xl sm:text-2xl flex-shrink-0">ℹ️</div>
              <div className="text-left">
                <h3 className="text-base sm:text-lg font-bold text-blue-800 mb-2 sm:mb-3 break-words">
                  🎓 Educational Project Notice
                </h3>
                <p className="text-blue-700 text-sm sm:text-base leading-relaxed mb-2 sm:mb-3 break-words">
                  This is a <strong>clone website for project purposes only</strong>. You can book hotels and enjoy the complete booking procedure to experience all website functions, but please note:
                </p>
                <div className="bg-red-50 border-l-4 border-red-400 p-3 sm:p-4 rounded-r-lg mb-2 sm:mb-3">
                  <p className="text-red-800 font-semibold text-sm sm:text-base break-words">
                    ⚠️ <strong>NOT FOR REAL WORLD BOOKINGS</strong> - These are not actual hotel reservations
                  </p>
                </div>
                <p className="text-blue-700 text-sm sm:text-base leading-relaxed break-words">
                  Book tickets for just <strong className="text-pink-600">₹5 - ₹15</strong> to enjoy the complete experience! 
                  You can also add your review in the review section and provide suggestions to help improve this project.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-12 sm:mb-16 lg:mb-20 animate-fade-up">
          <div className="inline-block p-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full mb-6 sm:mb-8 shadow-xl animate-pulse-slow">
            <div className="bg-white rounded-full px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4">
              <span className="text-pink-600 text-xs sm:text-sm font-bold tracking-wider uppercase whitespace-nowrap">
                💰 Budget Friendly
              </span>
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 leading-tight px-2">
            <span className="bg-gradient-to-r from-pink-700 via-rose-600 to-pink-800 bg-clip-text text-transparent block animate-slide-up">
              Cheap Rates
            </span>
            <span className="block text-gray-800 mt-2 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl animate-slide-up" style={{ animationDelay: '0.2s' }}>₹5 - ₹15 per night</span>
          </h2>
          
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed px-4 break-words animate-fade-up" style={{ animationDelay: '0.4s' }}>
            Discover amazing deals and budget-friendly accommodations without compromising on quality. 
            Perfect for travelers who want great value for their money.
          </p>
        </div>
        
        <div className="animate-fade-up" style={{ animationDelay: '0.6s' }}>
          <CheapRatesHotelGrid />
        </div>
      </div>
    </section>
  );
};

export default CheapRatesSection;
