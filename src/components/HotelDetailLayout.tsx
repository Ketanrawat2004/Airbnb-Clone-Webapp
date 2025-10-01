
import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';

interface HotelDetailLayoutProps {
  children: ReactNode;
}

const HotelDetailLayout = ({ children }: HotelDetailLayoutProps) => {
  return (
    <div className="page-container">
      <Header />
      
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(234,179,8,0.1),transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(6,182,212,0.1),transparent_40%)]"></div>
      
      <div className="relative">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <BackButton />
          </div>
          
          <div className="animate-slide-up">
            {children}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HotelDetailLayout;
