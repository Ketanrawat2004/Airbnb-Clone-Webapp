
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnhancedPassengerForm from '@/components/flight/EnhancedPassengerForm';
import FlightPaymentPage from '@/components/flight/FlightPaymentPage';
import AuthModal from '@/components/AuthModal';
import AuthRequiredScreen from '@/components/flight/AuthRequiredScreen';
import FlightBookingHeader from '@/components/flight/FlightBookingHeader';
import LoadingScreen from '@/components/flight/LoadingScreen';

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

  const handleBackClick = () => {
    if (currentStep === 1) {
      navigate(-1);
    } else {
      setCurrentStep(1);
    }
  };

  const handlePassengerSubmit = (passengers: any[], contact: any) => {
    setPassengerData(passengers);
    setContactInfo(contact);
    setCurrentStep(2);
  };

  const totalAmount = flightData?.price ? flightData.price + Math.round(flightData.price * 0.2) : 0;

  // Show authentication required screen if user is not signed in
  if (!loading && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-25 to-blue-50">
        <Header />
        
        <main className="pt-20 pb-12 flex items-center justify-center min-h-[80vh]">
          <AuthRequiredScreen
            onSignInClick={() => setAuthModalOpen(true)}
            onBackClick={() => navigate('/flights')}
          />
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
        <LoadingScreen />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-25 to-blue-50">
      <Header />
      
      <main className="pt-20 pb-12">
        <FlightBookingHeader 
          currentStep={currentStep}
          onBackClick={handleBackClick}
        />

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
