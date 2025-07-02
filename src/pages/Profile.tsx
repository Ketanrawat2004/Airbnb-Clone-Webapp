
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
import { supabase } from '@/integrations/supabase/client';
import { User, Mail, Phone, Calendar, Download, Ticket, Plane, Building, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
    const url = `/ticket-download?id=${bookingId}&type=${type}`;
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
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-8">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-rose-500" />
                  </div>
                  <div className="text-white">
                    <h1 className="text-3xl font-bold">
                      {profile?.full_name || 'Welcome'}
                    </h1>
                    <p className="text-rose-100 flex items-center mt-2">
                      <Mail className="h-4 w-4 mr-2" />
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Information */}
              <div className="lg:col-span-1">
                <Card className="shadow-xl border-gray-100">
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2 text-rose-500" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        className="mt-1"
                      />
                    </div>
                    <Button 
                      onClick={saveProfile} 
                      disabled={isSaving}
                      className="w-full bg-rose-500 hover:bg-rose-600"
                    >
                      {isSaving ? 'Saving...' : 'Save Profile'}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Bookings */}
              <div className="lg:col-span-2">
                <Card className="shadow-xl border-gray-100">
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="flex items-center">
                      <Ticket className="h-5 w-5 mr-2 text-rose-500" />
                      Your Bookings
                    </CardTitle>
                    <CardDescription>
                      Manage and download your booking tickets
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {/* Hotel Bookings */}
                    {bookings.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <Building className="h-5 w-5 mr-2 text-blue-500" />
                          Hotel Bookings ({bookings.length})
                        </h3>
                        <div className="space-y-4">
                          {bookings.map((booking) => (
                            <div key={booking.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900">
                                    {booking.hotels?.name || 'Hotel Booking'}
                                  </h4>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {booking.hotels?.location}
                                  </p>
                                  <div className="flex items-center space-x-4 mt-2 text-sm">
                                    <span className="flex items-center">
                                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                                      {new Date(booking.check_in_date).toLocaleDateString()} - {new Date(booking.check_out_date).toLocaleDateString()}
                                    </span>
                                    <Badge variant={booking.payment_status === 'paid' ? 'default' : 'secondary'}>
                                      {booking.payment_status}
                                    </Badge>
                                  </div>
                                  <p className="text-sm font-medium text-green-600 mt-2">
                                    ₹{booking.total_amount?.toLocaleString()}
                                  </p>
                                </div>
                                <Button
                                  onClick={() => downloadTicket(booking.id, 'hotel')}
                                  size="sm"
                                  variant="outline"
                                  className="ml-4 border-blue-300 text-blue-600 hover:bg-blue-50"
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Flight Bookings */}
                    {flightBookings.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <Plane className="h-5 w-5 mr-2 text-sky-500" />
                          Flight Bookings ({flightBookings.length})
                        </h3>
                        <div className="space-y-4">
                          {flightBookings.map((booking) => (
                            <div key={booking.id} className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900">
                                    {booking.flight_data?.from} → {booking.flight_data?.to}
                                  </h4>
                                  <p className="text-sm text-gray-600 mt-1">
                                    Flight {booking.flight_data?.flightNumber || 'N/A'}
                                  </p>
                                  <div className="flex items-center space-x-4 mt-2 text-sm">
                                    <span className="flex items-center">
                                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                                      {new Date(booking.flight_data?.departureDate).toLocaleDateString()}
                                    </span>
                                    <Badge variant={booking.payment_status === 'paid' ? 'default' : 'secondary'}>
                                      {booking.payment_status}
                                    </Badge>
                                  </div>
                                  <p className="text-sm font-medium text-green-600 mt-2">
                                    ₹{booking.total_amount?.toLocaleString()}
                                  </p>
                                </div>
                                <Button
                                  onClick={() => downloadTicket(booking.id, 'flight')}
                                  size="sm"
                                  variant="outline"
                                  className="ml-4 border-sky-300 text-sky-600 hover:bg-sky-50"
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {bookings.length === 0 && flightBookings.length === 0 && (
                      <div className="text-center py-12">
                        <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                        <p className="text-gray-600">
                          Start exploring and book your first trip!
                        </p>
                        <div className="flex justify-center space-x-4 mt-6">
                          <Button
                            onClick={() => navigate('/')}
                            className="bg-rose-500 hover:bg-rose-600"
                          >
                            <Building className="h-4 w-4 mr-2" />
                            Book Hotels
                          </Button>
                          <Button
                            onClick={() => navigate('/flights')}
                            variant="outline"
                            className="border-blue-300 text-blue-600 hover:bg-blue-50"
                          >
                            <Plane className="h-4 w-4 mr-2" />
                            Book Flights
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
