
import { Smartphone, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface MobileTroubleshootingProps {
  isMobile: boolean;
}

const MobileTroubleshooting = ({ isMobile }: MobileTroubleshootingProps) => {
  const copyCurrentUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('URL copied to clipboard!');
  };

  const openInBrowser = () => {
    window.open(window.location.href, '_blank');
  };

  if (!isMobile) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-center mb-2">
        <Smartphone className="h-5 w-5 text-amber-600 mr-2" />
        <span className="text-sm font-semibold text-amber-800">Mobile Troubleshooting</span>
      </div>
      <div className="space-y-3 text-xs text-amber-700">
        <p className="font-medium">Try these steps to fix the issue:</p>
        <ol className="list-decimal list-inside space-y-1 text-left">
          <li>Copy the confirmation link from your email</li>
          <li>Open your mobile browser (Chrome/Safari)</li>
          <li>Paste the link in the address bar</li>
          <li>Press Enter to load the confirmation page</li>
        </ol>
        <div className="flex space-x-2 mt-3">
          <Button 
            onClick={copyCurrentUrl} 
            size="sm" 
            variant="outline"
            className="flex-1 text-xs"
          >
            <Copy className="h-3 w-3 mr-1" />
            Copy URL
          </Button>
          <Button 
            onClick={openInBrowser} 
            size="sm" 
            variant="outline"
            className="flex-1 text-xs"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Open
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileTroubleshooting;
