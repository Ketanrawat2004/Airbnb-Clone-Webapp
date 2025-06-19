
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

const AdvertisementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 overflow-hidden"
    >
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/4cf76ed1-188e-407a-a627-7e7f28d404c2.png"
          alt="Discover The World - Travel Advertisement"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex-1"
          >
            <div className="text-white">
              <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mb-2">
                🌴 GET READY - Discover The World!
              </h2>
              <p className="text-sm md:text-base lg:text-lg opacity-90 mb-3">
                Experience Ticket booking with Dummy Ticket - Prices starting ₹5
              </p>
              <div className="text-xs md:text-sm opacity-75 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 inline-block">
                **This website is not booking tickets in real world, these booking and ticket are Dummy to experience this website only
              </div>
            </div>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            onClick={() => setIsVisible(false)}
            className="ml-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200 backdrop-blur-sm"
          >
            <X className="h-4 w-4 md:h-5 md:w-5 text-white" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default AdvertisementBanner;
