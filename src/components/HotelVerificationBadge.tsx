import { Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import HotelVerificationCertificate from './HotelVerificationCertificate';

interface HotelVerificationBadgeProps {
  isVerified: boolean;
  hotelName: string;
  hotelId: string;
  className?: string;
}

const HotelVerificationBadge = ({ 
  isVerified, 
  hotelName, 
  hotelId, 
  className = "" 
}: HotelVerificationBadgeProps) => {
  const [showCertificate, setShowCertificate] = useState(false);

  if (!isVerified) return null;

  return (
    <>
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
          <Shield className="h-3 w-3" />
          <span>Verified</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setShowCertificate(true);
          }}
          className="text-green-600 hover:text-green-700 hover:bg-green-50 p-1 h-auto"
        >
          <CheckCircle className="h-4 w-4" />
          <span className="text-xs ml-1 hidden sm:inline">View Certificate</span>
        </Button>
      </div>

      <HotelVerificationCertificate
        open={showCertificate}
        onOpenChange={setShowCertificate}
        hotelName={hotelName}
        hotelId={hotelId}
      />
    </>
  );
};

export default HotelVerificationBadge;