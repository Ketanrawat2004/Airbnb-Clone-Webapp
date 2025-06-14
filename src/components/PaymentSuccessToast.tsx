
import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentSuccessToastProps {
  onShow: () => void;
}

const PaymentSuccessToast = ({ onShow }: PaymentSuccessToastProps) => {
  useEffect(() => {
    // Play success sound
    const playSuccessSound = () => {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvGYeBDWN1evIgS8EIm/E7N+YOAsRUsLj7q9bGAg+ltXyxnkqBSF+zPHjhzEGG2nG792QQAoTVqvg8apWFAxMouP0t2IbCkOBw+8AAAAAAAAAAAEAAgADAAQABQAGAAcACAAJAAoACwAMAA0ADgAPABAAEQASABMAFAAVABYAFwAYABkAGgAbABwAHQAeAB8AIAAhACIAIwAkACUAJgAnACgAKQAqACsALAAtAC4ALwAwADEAMgAzADQANQA2ADcAOAA5ADoAOwA8AD0APgA/AEAAQQBCAEMAQ==');
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Fallback if audio doesn't play
        console.log('Success sound played');
      });
    };

    // Show toast with green checkmark
    toast.success('Payment Successful! 🎉', {
      description: 'Your booking has been confirmed',
      duration: 4000,
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      style: {
        background: '#f0fdf4',
        border: '1px solid #22c55e',
        color: '#166534'
      }
    });

    playSuccessSound();
    onShow();
  }, [onShow]);

  return null;
};

export default PaymentSuccessToast;
