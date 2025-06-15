
import { Skeleton } from '@/components/ui/skeleton';
import HotelDetailLayout from './HotelDetailLayout';

const HotelDetailSkeleton = () => {
  return (
    <HotelDetailLayout>
      <Skeleton className="h-8 w-64 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Skeleton className="h-64 sm:h-96 w-full rounded-lg" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
    </HotelDetailLayout>
  );
};

export default HotelDetailSkeleton;
