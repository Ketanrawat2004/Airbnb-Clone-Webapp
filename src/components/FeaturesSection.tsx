
const FeaturesSection = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(168,85,247,0.12),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.12),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_80%,rgba(236,72,153,0.08),transparent_50%)]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-purple-400/8 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400/8 rounded-full blur-xl animate-float" style={{ animationDelay: '3s' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 sm:mb-20 animate-fade-up">
          <div className="inline-block p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-8 shadow-xl">
            <div className="bg-white rounded-full px-8 py-4">
              <span className="text-purple-600 text-sm font-bold tracking-wider uppercase">
                ⭐ Why Choose Us
              </span>
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Exceptional Service,
            <span className="block bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent mt-2">
              Every Single Time
            </span>
          </h2>
          
          <p className="text-purple-100 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed px-4">
            We're committed to making your booking experience seamless, secure, and absolutely delightful. 
            Your satisfaction is our priority, every step of the way.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <div className="group text-center hover-lift animate-fade-up">
            <div className="relative mb-8 mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl"></div>
              <div className="relative bg-white rounded-3xl w-full h-full flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-shadow duration-300">
                <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-green-300 transition-colors">Best Price Promise</h3>
            <p className="text-purple-100 leading-relaxed text-lg px-4">
              Unbeatable rates with complete transparency. Find a better deal? We'll match it instantly, guaranteed without question.
            </p>
          </div>
          
          <div className="group text-center hover-lift animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative mb-8 mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl"></div>
              <div className="relative bg-white rounded-3xl w-full h-full flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-shadow duration-300">
                <svg className="w-12 h-12 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-blue-300 transition-colors">Fort Knox Security</h3>
            <p className="text-purple-100 leading-relaxed text-lg px-4">
              Bank-grade encryption protects every transaction. Your privacy and security are our absolute top priorities, always.
            </p>
          </div>
          
          <div className="group text-center hover-lift animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="relative mb-8 mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl"></div>
              <div className="relative bg-white rounded-3xl w-full h-full flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-shadow duration-300">
                <svg className="w-12 h-12 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-pink-300 transition-colors">Always Here For You</h3>
            <p className="text-purple-100 leading-relaxed text-lg px-4">
              Round-the-clock expert support in multiple languages. We're here whenever you need us, day or night, guaranteed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
