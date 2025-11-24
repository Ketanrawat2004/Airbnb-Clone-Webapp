
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CheapRatesSection from '@/components/CheapRatesSection';
import HotelsSection from '@/components/HotelsSection';
import HostSubmissionsSection from '@/components/HostSubmissionsSection';
import FlightSection from '@/components/FlightSection';
import TrainSection from '@/components/TrainSection';
import BusSection from '@/components/BusSection';
import ReviewAndTestimonialsSection from '@/components/ReviewAndTestimonialsSection';
import FeaturesSection from '@/components/FeaturesSection';
import AdvertisementBanner from '@/components/AdvertisementBanner';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import ScrollToTop from '@/components/ScrollToTop';
import QuickAccessFAB from '@/components/QuickAccessFAB';
import LanguageBanner from '@/components/LanguageBanner';



const Index = () => {
  const handleSearch = (location: string) => {
    console.log('Searching for:', location);
    // TODO: Implement search functionality
  };

  return (
    <div className="page-container">
      <LanguageBanner />
      <Header />
      <HeroSection onSearch={handleSearch} />
      <CheapRatesSection />
      <HotelsSection />
      <HostSubmissionsSection />
      <FlightSection />
      <TrainSection />
      <BusSection />
      
      <div className="animate-fade-up">
        <ReviewAndTestimonialsSection />
      </div>
      <FeaturesSection />
      
      <AdvertisementBanner />
      <Footer />
      <CookieConsent />
      <ScrollToTop />
      <QuickAccessFAB />
    </div>
  );
};

export default Index;
