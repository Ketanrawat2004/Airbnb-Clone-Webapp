
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Mail, Phone, Save, Download, Calendar, X, Eye, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';
import CancelBookingDialog from '@/components/CancelBookingDialog';
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
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingToDelete.id);

      if (error) {
        console.error('Error deleting booking:', error);
        toast.error('Failed to delete booking');
        return;
      }

      toast.success('Booking deleted successfully');
      setDeleteDialogOpen(false);
      setBookingToDelete(null);
      fetchBookings();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete booking');
    }
  };

  const handleClearAllBookings = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        console.error('Error clearing bookings:', error);
        toast.error('Failed to clear booking history');
        return;
      }

      toast.success('All bookings cleared successfully');
      setClearHistoryDialogOpen(false);
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
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>My Bookings</CardTitle>
                  <CardDescription>
                    View your booking history and manage your reservations
                  </CardDescription>
                </div>
                {bookings.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setClearHistoryDialogOpen(true)}
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>
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
                                <Eye className="h-4 w-4 mr-2" />
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

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteBooking(booking)}
                          className="border-gray-300 text-gray-600 hover:bg-gray-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
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
              Are you sure you want to delete this booking? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteBooking} className="bg-red-600 hover:bg-red-700">
              Delete
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
