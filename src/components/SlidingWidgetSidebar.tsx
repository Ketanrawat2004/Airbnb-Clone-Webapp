import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import ChatBot from './ChatBot';
import VideoCallWidget from './VideoCallWidget';
import CustomerSupportWidget from './CustomerSupportWidget';

const SlidingWidgetSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Home Button */}
      <motion.div
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          size="lg"
          className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white rounded-xl w-12 h-12 md:w-14 md:h-14 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white/20"
        >
          <Home className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
      </motion.div>

      {/* Sliding Sidebar */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed bottom-20 md:bottom-6 right-2 md:right-24 lg:right-20 z-40 flex flex-col md:flex-row gap-6 md:gap-16 lg:gap-20 max-w-[calc(100vw-1rem)] md:max-w-none"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Chat Bot Widget */}
            <div className="relative flex-shrink-0">
              <ChatBot />
            </div>

            {/* Video Call Widget */}
            <div className="relative flex-shrink-0">
              <VideoCallWidget />
            </div>

            {/* Customer Support Widget */}
            <div className="relative flex-shrink-0">
              <CustomerSupportWidget />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SlidingWidgetSidebar;