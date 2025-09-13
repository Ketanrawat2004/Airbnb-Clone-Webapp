import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Bed, Bath, Star, Heart } from 'lucide-react';
import { toast } from 'sonner';

interface HostSubmission {
  id: string;
  property_name: string;
  property_type: string;
  address: string;
  city: string;
  state: string;
  description: string;
  bedrooms: string;
  bathrooms: string;
  max_guests: string;
  price_per_night: number;
  amenities: string[];
  images: string[];
  status: string;
  is_verified: boolean;
  created_at: string;
}

const HostSubmissionsSection = () => {
  const [submissions, setSubmissions] = useState<HostSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_public_host_submissions')
        .limit(6);

      if (error) {
        console.error('Error fetching submissions:', error);
        toast.error('Failed to load host properties');
        return;
      }

      setSubmissions(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load host properties');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return `₹${Math.round(price).toLocaleString('en-IN')}`;
  };

  if (loading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 animate-pulse">
              Loading Host Properties...
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-80"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (submissions.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(59,130,246,0.08),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(147,51,234,0.06),transparent_60%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block p-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-2xl mb-6 sm:mb-8 shadow-2xl"
          >
            <div className="bg-white rounded-xl px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5">
              <span className="text-blue-600 text-sm sm:text-base font-bold tracking-wider uppercase whitespace-nowrap flex items-center">
                🏠 Host Properties
              </span>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 leading-tight px-2"
          >
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-800 bg-clip-text text-transparent block">
              Community
            </span>
            <span className="block text-gray-800 mt-2 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">Host Stays</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed px-4"
          >
            Discover unique properties shared by our trusted community hosts, each verified for quality and authenticity.
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {submissions.map((submission, index) => (
            <motion.div
              key={submission.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group cursor-pointer transition-all duration-500 border-0 shadow-lg hover:shadow-2xl overflow-hidden hover:scale-[1.02] h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 rounded-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>
                
                <CardContent className="p-0 relative h-full flex flex-col">
                  {/* Image Section */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    {submission.images && submission.images.length > 0 ? (
                      <img
                        src={submission.images[0]}
                        alt={submission.property_name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">No Image</span>
                      </div>
                    )}
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge 
                        variant={submission.is_verified ? "default" : "secondary"}
                        className={`${
                          submission.is_verified 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'bg-orange-500 hover:bg-orange-600'
                        } text-white font-semibold`}
                      >
                        {submission.is_verified ? '✓ Verified' : 'Pending Review'}
                      </Badge>
                    </div>

                    {/* Heart Icon */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg"
                    >
                      <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
                    </Button>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="mb-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-1">
                          {submission.property_name}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {submission.property_type}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{submission.city}, {submission.state}</span>
                      </div>
                    </div>

                    {/* Property Details */}
                    <div className="grid grid-cols-3 gap-2 mb-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{submission.bedrooms} bed</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{submission.bathrooms} bath</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{submission.max_guests} guests</span>
                      </div>
                    </div>

                    {/* Description */}
                    {submission.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {submission.description}
                      </p>
                    )}

                    {/* Amenities */}
                    {submission.amenities && submission.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {submission.amenities.slice(0, 3).map((amenity, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {submission.amenities.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{submission.amenities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}

                     {/* Host Info & Price */}
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
                        <span>Verified Host Property</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>New</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg sm:text-xl font-bold text-gray-900">
                            {formatPrice(submission.price_per_night)}
                          </span>
                          <span className="text-sm text-gray-600 ml-1">/ night</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HostSubmissionsSection;