
import { motion } from 'framer-motion';
import { Lock, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AuthRequiredScreenProps {
  onSignInClick: () => void;
  onBackClick: () => void;
}

const AuthRequiredScreen = ({ onSignInClick, onBackClick }: AuthRequiredScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-md mx-auto px-4"
    >
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Lock className="h-8 w-8 text-blue-600" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-gray-900 mb-4"
          >
            Sign In Required
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-6"
          >
            Please sign in to your account to continue with flight booking and access exclusive deals.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <Button
              onClick={onSignInClick}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Sign In to Continue
            </Button>
            
            <Button
              variant="ghost"
              onClick={onBackClick}
              className="w-full text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Flight Search
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AuthRequiredScreen;
