
import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import BackButton from '@/components/BackButton';

interface HotelDetailLayoutProps {
  children: ReactNode;
}

const HotelDetailLayout = ({ children }: HotelDetailLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="mb-4 sm:mb-6">
          <BackButton />
        </div>
        
        {children}
      </div>

      <ChatBot />
      <Footer />
    </div>
  );
};

export default HotelDetailLayout;
