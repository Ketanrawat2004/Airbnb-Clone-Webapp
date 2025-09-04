import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Star, MapPin } from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: string;
  image: string;
  tags: string[];
}

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI recommendation logic
    const generateRecommendations = () => {
      const mockHotels: Hotel[] = [
        {
          id: '1',
          name: 'Luxury Beach Resort',
          location: 'Goa, India',
          rating: 4.8,
          price: '₹8,500',
          image: '/public/lovable-uploads/2b5371a2-33f0-4ff1-90ac-f53e40ab5e75.png',
          tags: ['Beach', 'Luxury', 'Spa']
        },
        {
          id: '2', 
          name: 'Mountain View Hotel',
          location: 'Shimla, India',
          rating: 4.6,
          price: '₹6,200',
          image: '/public/lovable-uploads/4cf76ed1-188e-407a-a627-7e7f28d404c2.png',
          tags: ['Mountain', 'Nature', 'Adventure']
        },
        {
          id: '3',
          name: 'Heritage Palace',
          location: 'Rajasthan, India',
          rating: 4.9,
          price: '₹12,000',
          image: '/public/lovable-uploads/79212ad3-eaf5-4fb0-a40f-3f05916dba45.png',
          tags: ['Heritage', 'Royal', 'Culture']
        }
      ];

      setTimeout(() => {
        setRecommendations(mockHotels);
        setLoading(false);
      }, 1500);
    };

    generateRecommendations();
  }, []);

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary animate-pulse" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex space-x-4">
                <div className="rounded-lg bg-muted h-20 w-20"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-3 bg-muted rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Recommendations For You
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((hotel) => (
            <div key={hotel.id} className="flex gap-4 p-3 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
              <img 
                src={hotel.image} 
                alt={hotel.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{hotel.name}</h4>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <MapPin className="w-3 h-3" />
                  {hotel.location}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{hotel.rating}</span>
                  </div>
                  <span className="text-sm font-bold text-primary">{hotel.price}/night</span>
                </div>
                <div className="flex gap-1 mt-2">
                  {hotel.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;