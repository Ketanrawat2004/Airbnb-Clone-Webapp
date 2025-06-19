
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHeroSection from '@/components/about/AboutHeroSection';
import StorySection from '@/components/about/StorySection';
import TechnologyStack from '@/components/about/TechnologyStack';
import KeyFeatures from '@/components/about/KeyFeatures';
import DevelopmentJourney from '@/components/about/DevelopmentJourney';
import SystemArchitecture from '@/components/about/SystemArchitecture';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-25 to-pink-50">
      <Header />
      
      <main className="pt-20">
        <AboutHeroSection />
        <StorySection />
        <TechnologyStack />
        <KeyFeatures />
        <DevelopmentJourney />
        <SystemArchitecture />
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
