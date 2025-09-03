import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Shield, Award, CheckCircle, Download, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface HotelVerificationCertificateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hotelName: string;
  hotelId: string;
}

const HotelVerificationCertificate = ({
  open,
  onOpenChange,
  hotelName,
  hotelId
}: HotelVerificationCertificateProps) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const downloadCertificate = () => {
    // In a real implementation, this would generate and download a PDF
    const certificateContent = `
      HOTEL VERIFICATION CERTIFICATE
      
      This is to certify that
      
      ${hotelName}
      Hotel ID: ${hotelId}
      
      has been verified and approved by Airbnb Clone+ for quality standards,
      safety compliance, and authenticity.
      
      Issued on: ${currentDate}
      
      Authorized by: Ketan Rawat
      CEO, Airbnb Clone+
      
      This certificate serves as proof of our rigorous verification process
      and commitment to providing authentic, quality accommodations.
    `;
    
    const blob = new Blob([certificateContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${hotelName}_Verification_Certificate.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Shield className="h-6 w-6 text-green-600" />
            Hotel Verification Certificate
          </DialogTitle>
        </DialogHeader>

        <motion.div 
          className="bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 border-2 border-pink-200 rounded-xl p-6 sm:p-8 space-y-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header with Logo */}
          <div className="text-center border-b border-pink-200 pb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-700 bg-clip-text text-transparent">
                  Airbnb Clone+
                </h1>
                <p className="text-sm text-gray-600">Premium Hotel Verification</p>
              </div>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              CERTIFICATE OF AUTHENTICITY
            </h2>
            <p className="text-gray-600">Official Hotel Verification Document</p>
          </div>

          {/* Certificate Body */}
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-4">This is to certify that</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-pink-800 bg-white rounded-lg p-4 shadow-sm border border-pink-200">
                {hotelName}
              </h3>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border border-pink-200">
              <p className="text-gray-700 text-center leading-relaxed">
                has successfully completed our comprehensive verification process and meets all quality standards 
                for safety, authenticity, and service excellence as required by <strong>Airbnb Clone+</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-pink-200">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-800">Safety Verified</p>
                <p className="text-sm text-gray-600">Fire & Security</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-pink-200">
                <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-800">Quality Assured</p>
                <p className="text-sm text-gray-600">Standards Met</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-pink-200">
                <Award className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-800">Authenticity</p>
                <p className="text-sm text-gray-600">Verified Property</p>
              </div>
            </div>

            {/* Certificate Details */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-pink-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Hotel ID:</span>
                <span className="text-gray-600 font-mono text-sm">{hotelId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Issue Date:</span>
                <span className="text-gray-600 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {currentDate}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Valid Until:</span>
                <span className="text-gray-600">Indefinite (Subject to Review)</span>
              </div>
            </div>

            {/* Signature */}
            <div className="text-center border-t border-pink-200 pt-6">
              <div className="mb-4">
                <div className="w-48 h-16 mx-auto bg-gradient-to-r from-pink-100 to-rose-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-pink-800 italic">Ketan Rawat</span>
                </div>
                <p className="font-semibold text-gray-800">Ketan Rawat</p>
                <p className="text-sm text-gray-600">CEO & Founder, Airbnb Clone+</p>
                <p className="text-xs text-gray-500 mt-1">Authorized Signature</p>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>This certificate verifies the authenticity and quality standards of the listed property</span>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="text-center pt-4 border-t border-pink-200">
            <Button
              onClick={downloadCertificate}
              className="bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-700 hover:to-rose-800 text-white px-6 py-2 rounded-lg shadow-lg"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Certificate
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default HotelVerificationCertificate;