
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { User, Mail, Phone, Calendar, Download, Ticket, Plane, Building, CreditCard, MapPin, Clock, Users, Star, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [flightBookings, setFlightBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSaving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      
      // Load profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (profileData) {
        setProfile(profileData);
        setFullName(profileData.full_name || '');
        setPhone(profileData.phone || '');
      }

      // Load hotel bookings
      const { data: bookingData } = await supabase
        .from('bookings')
        .select(`
          *,
          hotels (
            name,
            location,
            images
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (bookingData) {
        setBookings(bookingData);
      }

      // Load flight bookings
      const { data: flightData } = await supabase
        .from('flight_bookings')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (flightData) {
        setFlightBookings(flightData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile data',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveProfile = async () => {
    if (!user) return;

    try {
      setSaving(true);
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: fullName,
          phone: phone,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
      
      loadUserData();
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const downloadTicket = (bookingId: string, type: 'hotel' | 'flight') => {
    const url = `/ticket-download/${bookingId}?type=${type}`;
    window.open(url, '_blank');
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
        <Header />
        <div className="pt-20 pb-12 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-rose-200 rounded-full mx-auto mb-4"></div>
              <div className="h-4 bg-rose-200 rounded w-32 mx-auto"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Profile Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 rounded-2xl shadow-2xl overflow-hidden mb-8"
            >
              <div className="px-6 sm:px-8 py-8 sm:py-12">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  <div className="text-white text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                      {profile?.full_name || 'Welcome'}
                    </h1>
                    <p className="text-rose-100 flex items-center justify-center sm:justify-start text-lg">
                      <Mail className="h-5 w-5 mr-2" />
                      {user?.email}
                    </p>
                    {profile?.phone && (
                      <p className="text-rose-100 flex items-center justify-center sm:justify-start mt-1">
                        <Phone className="h-4 w-4 mr-2" />
                        {profile.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Profile Information */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="xl:col-span-1"
              >
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                    <CardTitle className="flex items-center text-lg">
                      <User className="h-5 w-5 mr-2 text-rose-500" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="mt-2 h-11"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        className="mt-2 h-11"
                      />
                    </div>
                    <Button 
                      onClick={saveProfile} 
                      disabled={isSaving}
                      className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-11 font-medium"
                    >
                      {isSaving ? 'Saving...' : 'Save Profile'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Bookings */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="xl:col-span-3"
              >
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                    <CardTitle className="flex items-center text-xl">
                      <Ticket className="h-6 w-6 mr-3 text-rose-500" />
                      Your Travel History
                    </CardTitle>
                    <CardDescription>
                      View and manage your booking tickets
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Tabs defaultValue="hotels" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 rounded-lg p-1">
                        <TabsTrigger 
                          value="hotels" 
                          className="flex items-center space-x-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                          <Building className="h-4 w-4" />
                          <span>Hotels ({bookings.length})</span>
                        </TabsTrigger>
                        <TabsTrigger 
                          value="flights" 
                          className="flex items-center space-x-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                          <Plane className="h-4 w-4" />
                          <span>Flights ({flightBookings.length})</span>
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="hotels" className="space-y-6">
                        {bookings.length > 0 ? (
                          <div className="space-y-4">
                            {bookings.map((booking, index) => (
                              <motion.div
                                key={booking.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                              >
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                                  <div className="flex-1 space-y-3">
                                    <div className="flex items-start space-x-3">
                                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                                        <Building className="h-6 w-6 text-white" />
                                      </div>
                                      <div>
                                        <h4 className="text-lg font-bold text-gray-900">
                                          {booking.hotels?.name || 'Hotel Booking'}
                                        </h4>
                                        <p className="text-gray-600 flex items-center">
                                          <MapPin className="h-4 w-4 mr-1" />
                                          {booking.hotels?.location}
                                        </p>
                                      </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                      <div className="flex items-center space-x-2">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-700">
                                          {new Date(booking.check_in_date).toLocaleDateString()} - {new Date(booking.check_out_date).toLocaleDateString()}
                                        </span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Users className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-700">{booking.guests} Guests</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Badge variant={booking.payment_status === 'paid' ? 'default' : 'secondary'} className="px-3 py-1">
                                          {booking.payment_status}
                                        </Badge>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                      <p className="text-xl font-bold text-green-600">
                                        ₹{booking.total_amount?.toLocaleString()}
                                      </p>
                                      <p className="text-sm text-gray-500">
                                        Booked on {new Date(booking.created_at).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex space-x-3">
                                    <Button
                                      onClick={() => navigate(`/hotel/${booking.hotel_id}`)}
                                      size="sm"
                                      variant="outline"
                                      className="flex items-center space-x-2"
                                    >
                                      <Eye className="h-4 w-4" />
                                      <span>View Hotel</span>
                                    </Button>
                                    <Button
                                      onClick={() => downloadTicket(booking.id, 'hotel')}
                                      size="sm"
                                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 flex items-center space-x-2"
                                    >
                                      <Download className="h-4 w-4" />
                                      <span>Download Ticket</span>
                                    </Button>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-16">
                            <Building className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">No hotel bookings yet</h3>
                            <p className="text-gray-600 mb-8">
                              Discover amazing accommodations and start your journey!
                            </p>
                            <Button
                              onClick={() => navigate('/')}
                              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                            >
                              <Building className="h-4 w-4 mr-2" />
                              Explore Hotels
                            </Button>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="flights" className="space-y-6">
                        {flightBookings.length > 0 ? (
                          <div className="space-y-4">
                            {flightBookings.map((booking, index) => (
                              <motion.div
                                key={booking.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                              >
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                                  <div className="flex-1 space-y-3">
                                    <div className="flex items-start space-x-3">
                                      <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center">
                                        <Plane className="h-6 w-6 text-white" />
                                      </div>
                                      <div>
                                        <h4 className="text-lg font-bold text-gray-900">
                                          {booking.flight_data?.from} → {booking.flight_data?.to}
                                        </h4>
                                        <p className="text-gray-600">
                                          Flight {booking.flight_data?.flightNumber || 'N/A'} • {booking.flight_data?.airline || 'Airline'}
                                        </p>
                                      </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                      <div className="flex items-center space-x-2">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-700">
                                          {new Date(booking.flight_data?.departureDate).toLocaleDateString()}
                                        </span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Clock className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-700">
                                          {booking.flight_data?.departureTime || 'TBD'}
                                        </span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Badge variant={booking.payment_status === 'paid' ? 'default' : 'secondary'} className="px-3 py-1">
                                          {booking.payment_status}
                                        </Badge>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                      <p className="text-xl font-bold text-green-600">
                                        ₹{booking.total_amount?.toLocaleString()}
                                      </p>
                                      <p className="text-sm text-gray-500">
                                        Booked on {new Date(booking.created_at).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex space-x-3">
                                    <Button
                                      onClick={() => downloadTicket(booking.id, 'flight')}
                                      size="sm"
                                      className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 flex items-center space-x-2"
                                    >
                                      <Download className="h-4 w-4" />
                                      <span>Download Ticket</span>
                                    </Button>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-16">
                            <Plane className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">No flight bookings yet</h3>
                            <p className="text-gray-600 mb-8">
                              Book your next flight and explore the world!
                            </p>
                            <Button
                              onClick={() => navigate('/flights')}
                              className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600"
                            >
                              <Plane className="h-4 w-4 mr-2" />
                              Search Flights
                            </Button>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
