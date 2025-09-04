import { useState } from 'react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AIRecommendations from './AIRecommendations';
import VideoCallWidget from './VideoCallWidget';

const SlidingWidgetSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`fixed top-1/2 -translate-y-1/2 z-50 h-12 transition-all duration-300 ${
          isExpanded ? 'right-80' : 'right-0'
        } rounded-l-full rounded-r-none shadow-lg`}
        size="icon"
      >
        {isExpanded ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-background/95 backdrop-blur-sm border-l shadow-xl transition-transform duration-300 z-40 overflow-y-auto ${
          isExpanded ? 'translate-x-0' : 'translate-x-full'
        } w-80`}
      >
        <div className="p-4 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b">
            <Zap className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-lg">Smart Features</h2>
          </div>

          <div className="space-y-6">
            <AIRecommendations />
            <VideoCallWidget />
          </div>
        </div>
      </div>
    </>
  );
};

export default SlidingWidgetSidebar;