import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ChatBot from './ChatBot';
import VideoCallWidget from './VideoCallWidget';
import CustomerSupportWidget from './CustomerSupportWidget';

const SlidingWidgetSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Arrow Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          size="lg"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isExpanded ? (
            <ChevronRight className="h-6 w-6" />
          ) : (
            <ChevronLeft className="h-6 w-6" />
          )}
        </Button>
      </motion.div>

      {/* Sliding Sidebar */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed bottom-6 right-20 z-40 flex space-x-4"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Chat Bot Widget */}
            <div className="relative">
              <ChatBot />
            </div>

            {/* Video Call Widget */}
            <div className="relative">
              <VideoCallWidget />
            </div>

            {/* Customer Support Widget */}
            <div className="relative">
              <CustomerSupportWidget />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SlidingWidgetSidebar;