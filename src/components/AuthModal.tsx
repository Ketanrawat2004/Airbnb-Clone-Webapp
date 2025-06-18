
import { Dialog, DialogContent } from '@/components/ui/dialog';
import AuthModalContent from './auth/AuthModalContent';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <AuthModalContent onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
