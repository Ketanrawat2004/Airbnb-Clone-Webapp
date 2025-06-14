import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Mail, Phone, Save, Download, Calendar, X } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';
import CancelBookingDialog from '@/components/CancelBookingDialog';

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

      // If profile exists, use it. Otherwise, get full name from user metadata
      const fullName = data?.full_name || user.user_metadata?.full_name || '';
      
      if (data) {
        setProfile(data);
        setFormData({
          full_name: fullName,
          phone: data.phone || '',
        });
      } else {
        // Create profile with sign-up data if it doesn't exist
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
      const { data, error } = await supabase.functions.invoke('generate-receipt', {
        body: { booking_id: bookingId }
      });

      if (error) throw error;

      if (data?.html_content) {
        // Create a blob with the HTML content
        const blob = new Blob([data.html_content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        // Create a temporary link and click it to download
        const a = document.createElement('a');
        a.href = url;
        a.download = `booking-receipt-${bookingId.substring(0, 8)}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast.success('Ticket downloaded successfully!');
      }
    } catch (error) {
      console.error('Error downloading ticket:', error);
      toast.error('Failed to download ticket');
    }
  };

  const handleCancelBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setCancelDialogOpen(true);
  };

  const handleBookingCancelled = () => {
    fetchBookings(); // Refresh the bookings list
  };

  const canCancelBooking = (booking: Booking) => {
    const today = new Date();
    const checkInDate = new Date(booking.check_in_date);
    today.setHours(0, 0, 0, 0);
    checkInDate.setHours(0, 0, 0, 0);
    
    // Can cancel if check-in hasn't passed and booking is not already cancelled
    return checkInDate.getTime() >= today.getTime() && 
           booking.status !== 'cancelled' && 
           booking.payment_status !== 'refunded';
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
          
          {/* Profile Information Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">
                    {(formData.full_name || user.email)?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Manage your account details and preferences
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email || ''}
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-sm text-gray-500">
                    Email cannot be changed
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="full_name" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Full Name</span>
                  </Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>Phone Number</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <Button type="submit" disabled={saving} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Booking History Card */}
          <Card>
            <CardHeader>
              <CardTitle>My Bookings</CardTitle>
              <CardDescription>
                View your booking history and manage your reservations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {bookings.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">No bookings found</p>
                  <Link to="/">
                    <Button className="mt-4">Browse Hotels</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{booking.hotels.name}</h3>
                          <p className="text-gray-600">{booking.hotels.location}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                            <span>Check-in: {new Date(booking.check_in_date).toLocaleDateString()}</span>
                            <span>Check-out: {new Date(booking.check_out_date).toLocaleDateString()}</span>
                            <span>{booking.guests} guests</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{(booking.total_amount / 100).toLocaleString('en-IN')}</p>
                          <span className={`inline-block px-2 py-1 rounded text-xs ${
                            booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            booking.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status === 'cancelled' ? 'Cancelled' : booking.payment_status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 flex-wrap">
                        {booking.payment_status === 'paid' && booking.status !== 'cancelled' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => downloadTicket(booking.id)}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download Ticket
                            </Button>
                            <Link to={`/ticket/${booking.id}`}>
                              <Button variant="outline" size="sm">
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
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel Booking
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedBooking && (
        <CancelBookingDialog
          open={cancelDialogOpen}
          onOpenChange={setCancelDialogOpen}
          booking={selectedBooking}
          onBookingCancelled={handleBookingCancelled}
        />
      )}
    </div>
  );
};

export default Profile;
