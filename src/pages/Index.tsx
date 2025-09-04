
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CheapRatesSection from '@/components/CheapRatesSection';
import HotelsSection from '@/components/HotelsSection';
import HostSubmissionsSection from '@/components/HostSubmissionsSection';
import FlightSection from '@/components/FlightSection';
import ReviewAndTestimonialsSection from '@/components/ReviewAndTestimonialsSection';
import FeaturesSection from '@/components/FeaturesSection';
import SlidingWidgetSidebar from '@/components/SlidingWidgetSidebar';
import AdvertisementBanner from '@/components/AdvertisementBanner';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import AIRecommendations from '@/components/AIRecommendations';
import CustomerSupportWidget from '@/components/CustomerSupportWidget';

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
      <AIRecommendations />
      <div className="animate-fade-up">
        <ReviewAndTestimonialsSection />
      </div>
      <FeaturesSection />
      <SlidingWidgetSidebar />
      <CustomerSupportWidget />
      <AdvertisementBanner />
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;
