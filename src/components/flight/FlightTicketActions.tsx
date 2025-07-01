
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { generateTicketHTML } from '@/utils/ticketHtmlGenerator';

interface FlightTicketActionsProps {
  bookingId: string;
  flightData: any;
  passengerData: any[];
  contactInfo: any;
  totalAmount: number;
}

const FlightTicketActions = ({ 
  bookingId, 
  flightData, 
  passengerData, 
  contactInfo, 
  totalAmount 
}: FlightTicketActionsProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      toast.loading('Generating your ticket...');
      
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const ticketHTML = generateTicketHTML({
          bookingId,
          flightData,
          passengerData,
          contactInfo,
          totalAmount
        });
        printWindow.document.write(ticketHTML);
        printWindow.document.close();
        
        printWindow.onload = () => {
          setTimeout(() => {
            printWindow.print();
            toast.success('Ticket generated successfully!');
          }, 500);
        };
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to generate ticket. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Flight Ticket - ${bookingId}`,
          text: `Flight from ${flightData.from} to ${flightData.to} on ${flightData.departureDate}`,
          url: window.location.href,
        });
        toast.success('Ticket details shared successfully!');
      } else {
        await navigator.clipboard.writeText(
          `Flight Ticket ${bookingId}\nFrom: ${flightData.from}\nTo: ${flightData.to}\nDate: ${flightData.departureDate}\nBooking: ${window.location.href}`
        );
        toast.success('Ticket details copied to clipboard!');
      }
    } catch (error) {
      console.error('Share error:', error);
      toast.error('Failed to share ticket details.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col sm:flex-row gap-3 justify-end"
    >
      <Button
        onClick={handleShare}
        disabled={isSharing}
        variant="outline"
        className="flex items-center space-x-2 hover:bg-blue-50 transition-all duration-200"
      >
        <Share2 className="h-4 w-4" />
        <span>{isSharing ? 'Sharing...' : 'Share Ticket'}</span>
      </Button>
      
      <Button
        onClick={handleDownload}
        disabled={isDownloading}
        className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Download className="h-4 w-4" />
        <span>{isDownloading ? 'Generating...' : 'Download Ticket'}</span>
      </Button>
    </motion.div>
  );
};

export default FlightTicketActions;
