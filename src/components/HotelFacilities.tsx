
import { Badge } from '@/components/ui/badge';

interface HotelFacilitiesProps {
  facilities: string[];
}

const HotelFacilities = ({ facilities }: HotelFacilitiesProps) => {
  if (!facilities || facilities.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Facilities</h2>
      <div className="flex flex-wrap gap-2">
        {facilities.map((facility, index) => (
          <Badge key={index} variant="outline" className="text-sm">
            {facility}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default HotelFacilities;
