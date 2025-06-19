
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AdvertisementBanner from '@/components/AdvertisementBanner';
import CheapRatesSection from '@/components/CheapRatesSection';
import HotelsSection from '@/components/HotelsSection';
import ReviewAndTestimonialsSection from '@/components/ReviewAndTestimonialsSection';
import FeaturesSection from '@/components/FeaturesSection';
import ChatBot from '@/components/ChatBot';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

const Index = () => {
  const handleSearch = (location: string) => {
    console.log('Searching for:', location);
    // TODO: Implement search functionality
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 via-rose-25 to-pink-50">
      <Header />
      <AdvertisementBanner />
      <HeroSection onSearch={handleSearch} />
      <CheapRatesSection />
      <HotelsSection />
      <div className="animate-fade-up">
        <ReviewAndTestimonialsSection />
      </div>
      <FeaturesSection />
      <ChatBot />
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;
