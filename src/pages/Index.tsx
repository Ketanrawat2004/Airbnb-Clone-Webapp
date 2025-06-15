
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HotelsSection from '@/components/HotelsSection';
import CheapRatesSection from '@/components/CheapRatesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
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
      <HeroSection onSearch={handleSearch} />
      <HotelsSection />
      <CheapRatesSection />
      <div className="animate-fade-up">
        <TestimonialsSection />
      </div>
      <FeaturesSection />
      <ChatBot />
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;
