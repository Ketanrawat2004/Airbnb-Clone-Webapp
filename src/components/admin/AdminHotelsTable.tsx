import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Building, Search, Filter, Eye, Star, MapPin, Plus, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminHotelsTable = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      setIsLoading(true);

      const { data: hotelsData, error } = await supabase
        .from('hotels')
        .select(`
          *,
          bookings(count)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setHotels(hotelsData || []);
    } catch (error) {
      console.error('Error loading hotels:', error);
      toast({
        title: "Error",
        description: "Failed to load hotels data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadge = (availableRooms: number, totalRooms: number) => {
    const occupancyRate = ((totalRooms - availableRooms) / totalRooms) * 100;
    
    if (occupancyRate >= 90) {
      return <Badge className="bg-red-500 text-white">High Demand</Badge>;
    } else if (occupancyRate >= 70) {
      return <Badge className="bg-yellow-500 text-white">Moderate</Badge>;
    } else {
      return <Badge className="bg-green-500 text-white">Available</Badge>;
    }
  };

  const filteredHotels = hotels.filter((hotel: any) =>
    hotel.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Building className="h-5 w-5" />
          <span>Hotel Management</span>
        </CardTitle>
        <CardDescription className="text-emerald-100">
          Manage all hotels and their listings
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search hotels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <Button className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4" />
              <span>Add Hotel</span>
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hotel</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Rooms</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHotels.map((hotel: any) => (
                <TableRow key={hotel.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{hotel.name}</div>
                      <div className="text-sm text-gray-500">{hotel.property_type || 'Hotel'}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                      {hotel.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{hotel.rating || 0}</span>
                      <span className="text-gray-500 text-sm">({hotel.reviews_count || 0})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{hotel.available_rooms}/{hotel.total_rooms}</div>
                      <div className="text-sm text-gray-500">Available/Total</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    ₹{hotel.price_per_night.toLocaleString('en-IN')}
                    <div className="text-sm text-gray-500">per night</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {hotel.bookings?.[0]?.count || 0} bookings
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(hotel.available_rooms, hotel.total_rooms)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <Building className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No hotels found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminHotelsTable;