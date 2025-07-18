
import HotelGrid from '@/components/HotelGrid';
import { motion } from 'framer-motion';

const HotelsSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 relative overflow-hidden">
      {/* Enhanced Background Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(236,72,153,0.08),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(219,39,119,0.06),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(236,72,153,0.02)_49%,rgba(236,72,153,0.02)_51%,transparent_52%)] bg-[length:60px_60px]"></div>
      
      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-pink-200/30 to-rose-300/30 rounded-full blur-xl"
      />
      <motion.div
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -3, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-br from-rose-200/20 to-pink-300/20 rounded-full blur-2xl"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block p-3 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-2xl mb-6 sm:mb-8 shadow-2xl"
          >
            <div className="bg-white rounded-xl px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5">
              <span className="text-pink-600 text-sm sm:text-base font-bold tracking-wider uppercase whitespace-nowrap flex items-center">
                🏆 Featured Collection
              </span>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 leading-tight px-2"
          >
            <span className="bg-gradient-to-r from-pink-700 via-rose-600 to-pink-800 bg-clip-text text-transparent block">
              Handpicked
            </span>
            <span className="block text-gray-800 mt-2 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">Luxury Stays</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed px-4"
          >
            Curated accommodations that promise exceptional experiences and create lasting memories for every traveler. 
            Each property is carefully selected for its unique charm and outstanding service.
          </motion.p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <HotelGrid />
        </motion.div>
      </div>
    </section>
  );
};

export default HotelsSection;
