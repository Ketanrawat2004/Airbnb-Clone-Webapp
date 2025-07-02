
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100">
        <Header />
        
        <main className="pt-20 pb-12 flex items-center justify-center min-h-[80vh]">
          <div className="max-w-2xl mx-auto p-8">
            <AuthRequiredScreen
              onSignInClick={() => setAuthModalOpen(true)}
              onBackClick={() => navigate('/flights')}
            />
          </div>
        </main>

        <Footer />
        <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      </div>
    );
  }

  if (!flightData || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100">
        <Header />
        <div className="pt-20">
          <LoadingScreen />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <FlightBookingHeader 
              currentStep={currentStep}
              onBackClick={handleBackClick}
            />

            {/* Content Section */}
            <div className="mt-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 lg:p-8">
                  {currentStep === 1 ? (
                    <div className="space-y-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="font-semibold text-blue-900 mb-2">Flight Summary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-blue-600 font-medium">Route:</span>
                            <p className="text-gray-700">{flightData.from} → {flightData.to}</p>
                          </div>
                          <div>
                            <span className="text-blue-600 font-medium">Date:</span>
                            <p className="text-gray-700">{new Date(flightData.departureDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <span className="text-blue-600 font-medium">Passengers:</span>
                            <p className="text-gray-700">{flightData.passengers || 1}</p>
                          </div>
                        </div>
                      </div>
                      
                      <EnhancedPassengerForm
                        passengerCount={parseInt(flightData.passengers) || 1}
                        flightData={flightData}
                        onSubmit={handlePassengerSubmit}
                      />
                    </div>
                  ) : (
                    <FlightPaymentPage
                      flightData={flightData}
                      passengerData={passengerData}
                      contactInfo={contactInfo}
                      totalAmount={totalAmount}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FlightBooking;
