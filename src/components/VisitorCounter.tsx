
import { Eye } from 'lucide-react';
import { useVisitorCounter } from '@/hooks/useVisitorCounter';

const VisitorCounter = () => {
  const { visitorCount, isLoading } = useVisitorCounter();

  const formatVisitorCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-gray-400">
        <Eye className="h-4 w-4" />
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-gray-400">
      <Eye className="h-4 w-4" />
      <span className="text-sm">
        {formatVisitorCount(visitorCount)} visitors
      </span>
    </div>
  );
};

export default VisitorCounter;
