
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const InternationalTravelAlert = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border-orange-200 bg-orange-50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-orange-800 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Important Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-orange-700">
          <p className="flex items-start">
            <span className="font-medium mr-2">✓</span>
            Check travel guidelines and baggage information below
          </p>
          <p className="flex items-start">
            <span className="font-medium mr-2">⚠️</span>
            Passport required for international travel
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InternationalTravelAlert;
