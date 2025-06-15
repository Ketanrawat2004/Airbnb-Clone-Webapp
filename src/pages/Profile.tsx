import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, Save, Download, Calendar, X, Eye, Trash2, Heart, Star, MapPin, Users, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';
import CancelBookingDialog from '@/components/CancelBookingDialog';
import PaymentSuccessToast from '@/components/PaymentSuccessToast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
}

interface Booking {
  id: string;
  hotel_id: string;
  check_in_date: string;
  check_out_date: string;
  guests: number;
  total_amount: number;
  status: string;
  payment_status: string;
  guest_phone: string;
  created_at: string;
  hotels: {
    name: string;
    location: string;
  };
}

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<Booking | null>(null);
  const [clearHistoryDialogOpen, setClearHistoryDialogOpen] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchBookings();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
        return;
      }

      const fullName = data?.full_name || user.user_metadata?.full_name || '';
      
      if (data) {
        setProfile(data);
        setFormData({
          full_name: fullName,
          phone: data.phone || '',
        });
      } else {
        const newProfile = {
          id: user.id,
          full_name: fullName,
          phone: '',
          avatar_url: null,
        };
        setProfile(newProfile);
        setFormData({
          full_name: fullName,
          phone: '',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          hotels:hotel_id (name, location)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bookings:', error);
        return;
      }

      console.log('Fetched bookings:', data);
      setBookings(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: formData.full_name,
          phone: formData.phone,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile');
        return;
      }

      toast.success('Profile updated successfully!');
      fetchProfile();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const downloadTicket = async (bookingId: string) => {
    try {
      console.log('Downloading ticket for booking:', bookingId);
      
      const { data, error } = await supabase.functions.invoke('generate-receipt', {
        body: { booking_id: bookingId }
      });

      if (error) {
        console.error('Receipt generation error:', error);
        throw error;
      }

      console.log('Receipt response:', data);

      if (data?.html_content) {
        const blob = new Blob([data.html_content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `booking-receipt-${bookingId.substring(0, 8)}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast.success('Ticket downloaded successfully!');
      } else {
        throw new Error('No receipt content received');
      }
    } catch (error) {
      console.error('Error downloading ticket:', error);
      toast.error('Failed to download ticket. Please try again.');
    }
  };

  const handleCancelBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setCancelDialogOpen(true);
  };

  const handleDeleteBooking = (booking: Booking) => {
    setBookingToDelete(booking);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteBooking = async () => {
    if (!bookingToDelete) return;

    try {
      console.log('Deleting booking:', bookingToDelete.id);
      
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingToDelete.id)
        .eq('user_id', user?.id); // Add user_id check for security

      if (error) {
        console.error('Error deleting booking:', error);
        toast.error('Failed to delete booking');
        return;
      }

      console.log('Booking deleted successfully');
      toast.success('Booking deleted successfully');
      setDeleteDialogOpen(false);
      setBookingToDelete(null);
      
      // Immediately update the bookings state
      setBookings(prev => prev.filter(booking => booking.id !== bookingToDelete.id));
      
      // Also fetch fresh data
      fetchBookings();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete booking');
    }
  };

  const handleClearAllBookings = async () => {
    if (!user) return;

    try {
      console.log('Clearing all bookings for user:', user.id);
      
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        console.error('Error clearing bookings:', error);
        toast.error('Failed to clear booking history');
        return;
      }

      console.log('All bookings cleared successfully');
      toast.success('All bookings cleared successfully');
      setClearHistoryDialogOpen(false);
      
      // Immediately update the bookings state to empty array
      setBookings([]);
      
      // Also fetch fresh data to ensure UI is in sync
      fetchBookings();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to clear booking history');
    }
  };

  const handleBookingCancelled = () => {
    fetchBookings();
  };

  const canCancelBooking = (booking: Booking) => {
    const today = new Date();
    const checkInDate = new Date(booking.check_in_date);
    today.setHours(0, 0, 0, 0);
    checkInDate.setHours(0, 0, 0, 0);
    
    return checkInDate.getTime() >= today.getTime() && 
           booking.status !== 'cancelled' && 
           booking.payment_status !== 'refunded';
  };

  // Get display name for personalization
  const getDisplayName = () => {
    if (formData.full_name) return formData.full_name;
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
    if (user?.email) return user.email.split('@')[0];
    return 'Guest';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getStatusBadge = (booking: Booking) => {
    if (booking.status === 'cancelled') {
      return <Badge variant="destructive" className="text-xs">Cancelled</Badge>;
    }
    if (booking.payment_status === 'paid') {
      return <Badge className="bg-green-500 hover:bg-green-600 text-xs">Confirmed</Badge>;
    }
    return <Badge variant="secondary" className="text-xs">Pending</Badge>;
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
  };

  // Check URL parameters for payment success
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const paymentSuccess = urlParams.get('payment_success');
    
    if (sessionId || paymentSuccess === 'true') {
      setShowPaymentSuccess(true);
      window.history.replaceState({}, document.title, '/profile');
    }
  }, []);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg font-medium text-gray-600 animate-pulse">Loading your profile...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Your Profile</h1>
            <p className="text-gray-600 mb-8">Please sign in to view and manage your travel profile</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <Header />
      
      {/* Payment Success Toast */}
      {showPaymentSuccess && (
        <PaymentSuccessToast onShow={() => setShowPaymentSuccess(false)} />
      )}
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-white shadow-xl">
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white">
                    {getDisplayName().charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  {getGreeting()}, {getDisplayName()}! 
                </h1>
                <p className="text-lg text-gray-600 flex items-center mt-1">
                  <Heart className="h-5 w-5 text-rose-500 mr-2" />
                  Welcome back to your travel dashboard
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 w-fit mx-auto shadow-lg">
              <span className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Premium Traveler</span>
              </span>
              <span>•</span>
              <span>Member since {new Date(user.created_at || '').getFullYear()}</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span>{bookings.length} {bookings.length === 1 ? 'Booking' : 'Bookings'}</span>
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information Card */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent flex items-center">
                    <User className="h-6 w-6 mr-2 text-rose-500" />
                    Profile Settings
                  </CardTitle>
                  <CardDescription className="text-base">
                    Manage your account information and travel preferences
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center space-x-2 text-gray-700 font-medium">
                        <Mail className="h-4 w-4 text-rose-500" />
                        <span>Email Address</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email || ''}
                        disabled
                        className="bg-gray-50 border-gray-200 text-gray-600"
                      />
                      <p className="text-sm text-gray-500 flex items-center space-x-1">
                        <span>🔒</span>
                        <span>Your email is secure and verified</span>
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="flex items-center space-x-2 text-gray-700 font-medium">
                        <User className="h-4 w-4 text-rose-500" />
                        <span>Full Name</span>
                      </Label>
                      <Input
                        id="full_name"
                        name="full_name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        className="border-gray-200 focus:border-rose-300 focus:ring-rose-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center space-x-2 text-gray-700 font-medium">
                        <Phone className="h-4 w-4 text-rose-500" />
                        <span>Phone Number</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="border-gray-200 focus:border-rose-300 focus:ring-rose-200"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={saving} 
                      className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? 'Saving Changes...' : 'Save Profile'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Booking History Card */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-2xl flex items-center">
                        <Calendar className="h-6 w-6 mr-2 text-rose-500" />
                        My Travel History
                      </CardTitle>
                      <CardDescription className="text-base">
                        Track your bookings and manage your reservations
                      </CardDescription>
                    </div>
                    {bookings.length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setClearHistoryDialogOpen(true)}
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear All
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {bookings.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-10 w-10 text-rose-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
                      <p className="text-gray-600 mb-6">Start your next adventure by exploring amazing places to stay</p>
                      <Link to="/">
                        <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700">
                          Explore Hotels
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {bookings.map((booking) => {
                        const nights = calculateNights(booking.check_in_date, booking.check_out_date);
                        return (
                          <div key={booking.id} className="bg-gradient-to-r from-gray-50 to-gray-50/50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-200">
                            <div className="flex justify-between items-start mb-4">
                              <div className="space-y-2">
                                <div className="flex items-center space-x-3">
                                  <h3 className="font-bold text-xl text-gray-900">{booking.hotels.name}</h3>
                                  {getStatusBadge(booking)}
                                </div>
                                <p className="text-gray-600 flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {booking.hotels.location}
                                </p>
                              </div>
                              <div className="text-right space-y-1">
                                <p className="font-bold text-2xl text-rose-600">
                                  ₹{(booking.total_amount / 100).toLocaleString('en-IN')}
                                </p>
                                <p className="text-sm text-gray-500">for {nights} {nights === 1 ? 'night' : 'nights'}</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <div>
                                  <p className="text-xs text-gray-500">Check-in</p>
                                  <p className="font-medium">{new Date(booking.check_in_date).toLocaleDateString()}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <div>
                                  <p className="text-xs text-gray-500">Check-out</p>
                                  <p className="font-medium">{new Date(booking.check_out_date).toLocaleDateString()}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Users className="h-4 w-4" />
                                <div>
                                  <p className="text-xs text-gray-500">Guests</p>
                                  <p className="font-medium">{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</p>
                                </div>
                              </div>
                            </div>

                            <Separator className="my-4" />
                            
                            <div className="flex flex-wrap gap-2">
                              {booking.payment_status === 'paid' && booking.status !== 'cancelled' && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => downloadTicket(booking.id)}
                                    className="hover:bg-blue-50 border-blue-200 text-blue-700"
                                  >
                                    <Download className="h-4 w-4 mr-1" />
                                    Download
                                  </Button>
                                  <Link to={`/ticket/${booking.id}`}>
                                    <Button variant="outline" size="sm" className="hover:bg-green-50 border-green-200 text-green-700">
                                      <Eye className="h-4 w-4 mr-1" />
                                      View Ticket
                                    </Button>
                                  </Link>
                                </>
                              )}
                              
                              {canCancelBooking(booking) && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCancelBooking(booking)}
                                  className="hover:bg-red-50 border-red-200 text-red-700"
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Cancel
                                </Button>
                              )}

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteBooking(booking)}
                                className="hover:bg-gray-50 border-gray-200 text-gray-600"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                            
                            <div className="mt-3 text-xs text-gray-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Booked on {new Date(booking.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Booking Dialog */}
      {selectedBooking && (
        <CancelBookingDialog
          open={cancelDialogOpen}
          onOpenChange={setCancelDialogOpen}
          booking={selectedBooking}
          onBookingCancelled={handleBookingCancelled}
        />
      )}

      {/* Delete Booking Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this booking for {bookingToDelete?.hotels.name}? 
              This action cannot be undone and will permanently remove the booking from your history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteBooking} 
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Clear All Bookings Dialog */}
      <AlertDialog open={clearHistoryDialogOpen} onOpenChange={setClearHistoryDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear All Bookings</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to clear your entire booking history? This will permanently delete all your bookings and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearAllBookings} className="bg-red-600 hover:bg-red-700">
              Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Profile;
