
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnhancedPassengerForm from '@/components/flight/EnhancedPassengerForm';
import FlightPaymentPage from '@/components/flight/FlightPaymentPage';
import AuthModal from '@/components/AuthModal';
import { ArrowLeft, Plane, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const FlightBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [passengerData, setPassengerData] = useState<any[]>([]);
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  const { flightData } = location.state || {};

  useEffect(() => {
    if (!flightData) {
      navigate('/flights');
    }
  }, [flightData, navigate]);

  // Show authentication required screen if user is not signed in
  if (!loading && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-25 to-blue-50">
        <Header />
        
        <main className="pt-20 pb-12 flex items-center justify-center min-h-[80vh]">
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
                    onClick={() => setAuthModalOpen(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Sign In to Continue
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/flights')}
                    className="w-full text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Flight Search
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </main>

        <Footer />
        <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      </div>
    );
  }

  if (!flightData || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-25 to-blue-50">
        <Header />
        <main className="pt-20 pb-12 flex items-center justify-center min-h-[80vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePassengerSubmit = (passengers: any[], contact: any) => {
    setPassengerData(passengers);
    setContactInfo(contact);
    setCurrentStep(2);
  };

  const totalAmount = flightData.price + Math.round(flightData.price * 0.2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-25 to-blue-50">
      <Header />
      
      <main className="pt-20 pb-12">
        {/* Header Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-8 bg-white border-b"
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                onClick={() => currentStep === 1 ? navigate(-1) : setCurrentStep(1)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              
              <div className="flex items-center space-x-2">
                <Plane className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-gray-900">Flight Booking</span>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center space-x-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center space-x-2"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  currentStep >= 1 ? 'bg-blue-600 text-white scale-110' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </div>
                <span className={`text-sm font-medium transition-all duration-300 ${
                  currentStep >= 1 ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  Passenger Info
                </span>
              </motion.div>
              
              <motion.div
                className={`w-16 h-1 transition-all duration-500 ${
                  currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: currentStep >= 2 ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex items-center space-x-2"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  currentStep >= 2 ? 'bg-blue-600 text-white scale-110' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
                <span className={`text-sm font-medium transition-all duration-300 ${
                  currentStep >= 2 ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  Payment
                </span>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {currentStep === 1 ? (
              <EnhancedPassengerForm
                passengerCount={parseInt(flightData.passengers) || 1}
                flightData={flightData}
                onSubmit={handlePassengerSubmit}
              />
            ) : (
              <FlightPaymentPage
                flightData={flightData}
                passengerData={passengerData}
                contactInfo={contactInfo}
                totalAmount={totalAmount}
              />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FlightBooking;
