import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Phone, MessageCircle, Mail, X } from 'lucide-react';

const QuickAccessFAB = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickActions = [
    { icon: Phone, label: 'Call Us', color: 'from-green-500 to-emerald-500', action: () => window.location.href = 'tel:+1234567890' },
    { icon: MessageCircle, label: 'Chat', color: 'from-blue-500 to-cyan-500', action: () => console.log('Chat opened') },
    { icon: Mail, label: 'Email', color: 'from-purple-500 to-pink-500', action: () => window.location.href = 'mailto:support@example.com' },
  ];

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-20 left-0 space-y-3"
          >
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 20, x: -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: 20, x: -20 }}
                transition={{ delay: index * 0.1 }}
                onClick={action.action}
                className={`flex items-center gap-3 bg-gradient-to-r ${action.color} text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 group`}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <action.icon className="w-5 h-5" />
                <span className="font-medium">{action.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white p-4 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};

export default QuickAccessFAB;
