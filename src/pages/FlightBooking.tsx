
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PassengerInformationForm from '@/components/flight/PassengerInformationForm';
import FlightPaymentPage from '@/components/flight/FlightPaymentPage';
import { ArrowLeft, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FlightBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [passengerData, setPassengerData] = useState<any[]>([]);
  
  const { flightData } = location.state || {};

  useEffect(() => {
    if (!flightData) {
      navigate('/flights');
    }
  }, [flightData, navigate]);

  if (!flightData) {
    return null;
  }

  const handlePassengerSubmit = (passengers: any[]) => {
    setPassengerData(passengers);
    setCurrentStep(2);
  };

  const totalAmount = flightData.price + Math.round(flightData.price * 0.2); // Base price + taxes

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
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </div>
                <span className={`text-sm font-medium ${
                  currentStep >= 1 ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  Passenger Info
                </span>
              </div>
              
              <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
                <span className={`text-sm font-medium ${
                  currentStep >= 2 ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  Payment
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {currentStep === 1 ? (
              <PassengerInformationForm
                passengerCount={parseInt(flightData.passengers) || 1}
                onSubmit={handlePassengerSubmit}
              />
            ) : (
              <FlightPaymentPage
                flightData={flightData}
                passengerData={passengerData}
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
