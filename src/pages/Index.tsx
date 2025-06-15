
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HotelsSection from '@/components/HotelsSection';
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
    <>
      <Header />
      <HeroSection onSearch={handleSearch} />
      <HotelsSection />
      <div className="animate-fade-up">
        <TestimonialsSection />
      </div>
      <FeaturesSection />
      <ChatBot />
      <Footer />
      <CookieConsent />
    </>
  );
};

export default Index;
