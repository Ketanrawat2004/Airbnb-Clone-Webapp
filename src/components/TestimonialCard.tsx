
import { Star, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Testimonial {
  id: string;
  guest_name: string;
  guest_location: string | null;
  rating: number;
  review_text: string;
  stay_date: string | null;
  room_type: string | null;
  is_verified: boolean | null;
  is_featured: boolean | null;
  hotels?: {
    name: string;
  };
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= testimonial.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            {testimonial.is_verified && (
              <Badge variant="secondary" className="text-xs">
                Verified
              </Badge>
            )}
            {testimonial.is_featured && (
              <Badge className="text-xs bg-rose-500">
                Featured
              </Badge>
            )}
          </div>
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed">"{testimonial.review_text}"</p>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-gray-900">{testimonial.guest_name}</div>
            {testimonial.guest_location && (
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-3 w-3 mr-1" />
                {testimonial.guest_location}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            {testimonial.hotels && (
              <span className="font-medium">{testimonial.hotels.name}</span>
            )}
            {testimonial.stay_date && (
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(testimonial.stay_date).toLocaleDateString()}
              </div>
            )}
          </div>

          {testimonial.room_type && (
            <div className="text-sm text-gray-600">
              Stayed in: <span className="font-medium">{testimonial.room_type}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
