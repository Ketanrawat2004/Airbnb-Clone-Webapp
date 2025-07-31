
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CheapRatesSection from '@/components/CheapRatesSection';
import HotelsSection from '@/components/HotelsSection';
import FlightSection from '@/components/FlightSection';
import ReviewAndTestimonialsSection from '@/components/ReviewAndTestimonialsSection';
import FeaturesSection from '@/components/FeaturesSection';
import SlidingWidgetSidebar from '@/components/SlidingWidgetSidebar';
import AdvertisementBanner from '@/components/AdvertisementBanner';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import AIRecommendations from '@/components/AIRecommendations';

const Index = () => {
  const handleSearch = (location: string) => {
    console.log('Searching for:', location);
    // TODO: Implement search functionality
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 via-rose-25 to-pink-50">
      <Header />
      <HeroSection onSearch={handleSearch} />
      <CheapRatesSection />
      <HotelsSection />
      <FlightSection />
      <AIRecommendations />
      <div className="animate-fade-up">
        <ReviewAndTestimonialsSection />
      </div>
      <FeaturesSection />
      <SlidingWidgetSidebar />
      <AdvertisementBanner />
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;
