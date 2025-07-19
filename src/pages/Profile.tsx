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
import ModernHotelTicket from '@/components/tickets/ModernHotelTicket';
import ModernFlightTicket from '@/components/tickets/ModernFlightTicket';

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

      // Load hotel bookings with hotel details
      const { data: hotelBookingsData } = await supabase
        .from('bookings')
        .select(`
          *,
          hotel:hotels(*)
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (hotelBookingsData) {
        setBookings(hotelBookingsData);
      }

      // Load flight bookings
      const { data: flightBookingsData } = await supabase
        .from('flight_bookings')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (flightBookingsData) {
        setFlightBookings(flightBookingsData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        title: "Error",
        description: "Failed to load your data. Please try refreshing the page.",
        variant: "destructive",
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
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const downloadTicket = (bookingId: string, type: 'hotel' | 'flight') => {
    const url = `/ticket-download?bookingId=${bookingId}&type=${type}`;
    window.open(url, '_blank');
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-4">
                <div className="h-64 bg-gray-200 rounded-xl"></div>
                <div className="h-32 bg-gray-200 rounded-xl"></div>
                <div className="h-32 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
              <User className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600 text-lg">Manage your account and view your bookings</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Profile Information</span>
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address
                      </Label>
                      <div className="mt-1 relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={user?.email || ''}
                          disabled
                          className="pl-10 bg-gray-50"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                        Full Name
                      </Label>
                      <div className="mt-1 relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Phone Number
                      </Label>
                      <div className="mt-1 relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Enter your phone number"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={saveProfile}
                    disabled={isSaving}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Bookings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <Ticket className="h-5 w-5" />
                    <span>My Bookings</span>
                  </CardTitle>
                  <CardDescription className="text-emerald-100">
                    View and manage your hotel and flight bookings
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Tabs defaultValue="hotels" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="hotels" className="flex items-center space-x-2">
                        <Building className="h-4 w-4" />
                        <span>Hotels ({bookings.length})</span>
                      </TabsTrigger>
                      <TabsTrigger value="flights" className="flex items-center space-x-2">
                        <Plane className="h-4 w-4" />
                        <span>Flights ({flightBookings.length})</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="hotels" className="space-y-6">
                      {bookings.length > 0 ? (
                        <div className="space-y-6">
                          {bookings.map((booking) => (
                            <ModernHotelTicket
                              key={booking.id}
                              booking={booking}
                              hotel={booking.hotel || {
                                id: '',
                                name: 'Hotel Name',
                                location: 'Location',
                                address: 'Address not provided',
                                phone: '+91 9876543210',
                                email: 'hotel@example.com',
                                check_in_time: '2:00 PM',
                                check_out_time: '11:00 AM'
                              }}
                              showActions={true}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-16">
                          <Building className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                          <h3 className="text-xl font-semibold text-gray-900 mb-3">No hotel bookings yet</h3>
                          <p className="text-gray-600 mb-8">
                            Start exploring amazing hotels and make your first booking!
                          </p>
                          <Button
                            onClick={() => navigate('/')}
                            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                          >
                            <Building className="h-4 w-4 mr-2" />
                            Browse Hotels
                          </Button>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="flights" className="space-y-6">
                      {flightBookings.length > 0 ? (
                        <div className="space-y-6">
                          {flightBookings.map((booking) => (
                            <ModernFlightTicket
                              key={booking.id}
                              booking={booking}
                              showActions={true}
                            />
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
      </main>

      <Footer />
    </div>
  );
};

export default Profile;