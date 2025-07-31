
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import HotelCard from '@/components/HotelCard';
import SlidingWidgetSidebar from '@/components/SlidingWidgetSidebar';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Calendar, Users, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  price_per_night: number;
  amenities: string[];
  facilities: string[];
  rules_and_regulations: string[];
  images: string[];
  rating: number;
  reviews_count: number;
  total_rooms: number;
  available_rooms: number;
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const location = searchParams.get('location') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = searchParams.get('guests') || '';

  useEffect(() => {
    const searchHotels = async () => {
      try {
        setLoading(true);
        
        if (location) {
          const { data, error } = await supabase.rpc('search_hotels', {
            search_location: location
          });

          if (error) {
            console.error('Error searching hotels:', error);
          } else {
            const hotelsWithDefaults = (data || []).map(hotel => ({
              ...hotel,
              available_rooms: hotel.available_rooms || 0
            }));
            setHotels(hotelsWithDefaults);
          }
        } else {
          const { data, error } = await supabase
            .from('hotels')
            .select('*')
            .order('rating', { ascending: false });

          if (error) {
            console.error('Error fetching hotels:', error);
          } else {
            const hotelsWithDefaults = (data || []).map(hotel => ({
              ...hotel,
              available_rooms: hotel.available_rooms || 0
            }));
            setHotels(hotelsWithDefaults);
          }
        }
      } catch (error) {
        console.error('Error searching hotels:', error);
      } finally {
        setLoading(false);
      }
    };

    searchHotels();
  }, [location, checkIn, checkOut, guests]);

  return (
    <div className="page-container">
      <Header />

      {/* Hero Section with Search Summary */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(234,179,8,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.3),transparent_50%)]"></div>
        
        <div className="relative pt-8 pb-12 px-4">
          <div className="container mx-auto">
            <div className="floating-card max-w-4xl mx-auto animate-slide-up">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center">
                {location ? (
                  <>
                    <span className="gradient-text">Discover </span>
                    <span className="text-gray-900">{location}</span>
                  </>
                ) : (
                  <span className="gradient-text">All Amazing Stays</span>
                )}
              </h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {location && (
                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl border border-teal-200">
                    <div className="p-2 bg-teal-500 rounded-full">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Location</p>
                      <p className="text-sm font-semibold text-gray-900">{location}</p>
                    </div>
                  </div>
                )}
                {checkIn && checkOut && (
                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                    <div className="p-2 bg-amber-500 rounded-full">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Dates</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {checkIn} - {checkOut}
                      </p>
                    </div>
                  </div>
                )}
                {guests && (
                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border border-cyan-200">
                    <div className="p-2 bg-cyan-500 rounded-full">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Guests</p>
                      <p className="text-sm font-semibold text-gray-900">{guests} guests</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                  <div className="p-2 bg-emerald-500 rounded-full">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Results</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {loading ? "Searching..." : `${hotels.length} stays`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="content-section">
        <div className="container mx-auto px-4">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">
                Available Properties
              </h2>
              <p className="text-gray-600">
                {loading ? "Loading amazing stays..." : `${hotels.length} properties match your search`}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="glass-effect hover:bg-white/20"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <div className="flex bg-white rounded-xl p-1 shadow-sm border">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-lg"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-lg"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Grid/List */}
          {loading ? (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="space-y-3 animate-pulse">
                  <Skeleton className="h-48 sm:h-56 lg:h-64 w-full rounded-2xl" />
                  <div className="space-y-2 p-4">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : hotels.length > 0 ? (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
              {hotels.map((hotel, index) => (
                <div
                  key={hotel.id}
                  className="animate-slide-up hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <HotelCard
                    hotel={hotel}
                    searchParams={{
                      checkIn,
                      checkOut,
                      guests,
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 sm:py-20">
              <div className="floating-card max-w-md mx-auto animate-scale-in">
                <div className="text-gray-400 mb-6">
                  <MapPin className="h-16 w-16 sm:h-20 sm:w-20 mx-auto animate-float" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold gradient-text mb-4">
                  No stays found
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any properties matching your search criteria. Try adjusting your filters or exploring different destinations.
                </p>
                <Button 
                  variant="default" 
                  size="lg"
                  className="gradient-primary text-white hover:shadow-lg"
                  onClick={() => window.location.href = '/'}
                >
                  Explore All Destinations
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <SlidingWidgetSidebar />
      <Footer />
    </div>
  );
};

export default SearchResults;
