
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CheapRatesSection from '@/components/CheapRatesSection';
import HotelsSection from '@/components/HotelsSection';
import HostSubmissionsSection from '@/components/HostSubmissionsSection';
import FlightSection from '@/components/FlightSection';
import ReviewAndTestimonialsSection from '@/components/ReviewAndTestimonialsSection';
import FeaturesSection from '@/components/FeaturesSection';

import AdvertisementBanner from '@/components/AdvertisementBanner';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';



const Index = () => {
  const handleSearch = (location: string) => {
    console.log('Searching for:', location);
    // TODO: Implement search functionality
  };

  return (
    <div className="page-container">
      <Header />
      <HeroSection onSearch={handleSearch} />
      <CheapRatesSection />
      <HotelsSection />
      <HostSubmissionsSection />
      <FlightSection />
      
      <div className="animate-fade-up">
        <ReviewAndTestimonialsSection />
      </div>
      <FeaturesSection />
      
      <AdvertisementBanner />
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;
