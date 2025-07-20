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
import { Calendar, Search, Filter, Eye, Building, Plane } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminBookingsTable = () => {
  const [bookings, setBookings] = useState([]);
  const [flightBookings, setFlightBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setIsLoading(true);

      // Load hotel bookings
      const { data: hotelBookingsData, error: hotelError } = await supabase
        .from('bookings')
        .select(`
          *,
          hotel:hotels(name, location),
          profile:profiles(full_name)
        `)
        .order('created_at', { ascending: false });

      // Load flight bookings
      const { data: flightBookingsData, error: flightError } = await supabase
        .from('flight_bookings')
        .select(`
          *,
          profile:profiles(full_name)
        `)
        .order('created_at', { ascending: false });

      if (hotelError) throw hotelError;
      if (flightError) throw flightError;

      setBookings(hotelBookingsData || []);
      setFlightBookings(flightBookingsData || []);
    } catch (error) {
      console.error('Error loading bookings:', error);
      toast({
        title: "Error",
        description: "Failed to load bookings data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'confirmed': { color: 'bg-green-500', label: 'Confirmed' },
      'pending': { color: 'bg-yellow-500', label: 'Pending' },
      'cancelled': { color: 'bg-red-500', label: 'Cancelled' },
      'completed': { color: 'bg-blue-500', label: 'Completed' }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    
    return (
      <Badge className={`${statusInfo.color} text-white`}>
        {statusInfo.label}
      </Badge>
    );
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredHotelBookings = bookings.filter((booking: any) =>
    booking.guest_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.hotel?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFlightBookings = flightBookings.filter((booking: any) =>
    booking.contact_info?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.contact_info?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="space-y-6">
      {/* Hotel Bookings */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>Hotel Bookings</span>
          </CardTitle>
          <CardDescription className="text-orange-100">
            Manage all hotel bookings and reservations
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Guest Name</TableHead>
                  <TableHead>Hotel</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHotelBookings.map((booking: any) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-mono text-xs">
                      {booking.id.slice(0, 8).toUpperCase()}
                    </TableCell>
                    <TableCell className="font-medium">
                      {booking.guest_name || booking.profile?.full_name || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{booking.hotel?.name || 'Unknown Hotel'}</div>
                        <div className="text-sm text-gray-500">{booking.hotel?.location}</div>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(booking.check_in_date)}</TableCell>
                    <TableCell>{formatDate(booking.check_out_date)}</TableCell>
                    <TableCell className="font-semibold">
                      ₹{booking.total_amount.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredHotelBookings.length === 0 && (
            <div className="text-center py-12">
              <Building className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No hotel bookings found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Flight Bookings */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <Plane className="h-5 w-5" />
            <span>Flight Bookings</span>
          </CardTitle>
          <CardDescription className="text-blue-100">
            Manage all flight bookings and reservations
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Passenger</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFlightBookings.map((booking: any) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-mono text-xs">
                      {booking.id.slice(0, 8).toUpperCase()}
                    </TableCell>
                    <TableCell className="font-medium">
                      {booking.contact_info?.firstName} {booking.contact_info?.lastName}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{booking.flight_data?.from || 'DEL'}</span>
                        <Plane className="h-3 w-3 text-gray-400" />
                        <span className="font-medium">{booking.flight_data?.to || 'BOM'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {booking.flight_data?.departureDate ? 
                        formatDate(booking.flight_data.departureDate) : 
                        formatDate(booking.created_at)
                      }
                    </TableCell>
                    <TableCell className="font-semibold">
                      ₹{booking.total_amount.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredFlightBookings.length === 0 && (
            <div className="text-center py-12">
              <Plane className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No flight bookings found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBookingsTable;