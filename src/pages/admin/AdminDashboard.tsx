import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Building, 
  Plane, 
  CreditCard, 
  TrendingUp, 
  Calendar,
  Star,
  MapPin,
  Eye,
  BarChart3,
  Settings,
  Shield
} from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminStatsCards from '@/components/admin/AdminStatsCards';
import AdminBookingsTable from '@/components/admin/AdminBookingsTable';
import AdminUsersTable from '@/components/admin/AdminUsersTable';
import AdminHotelsTable from '@/components/admin/AdminHotelsTable';
import AdminReportGenerator from '@/components/admin/AdminReportGenerator';
import AdminActivityFeed from '@/components/admin/AdminActivityFeed';
import AdminRevenueChart from '@/components/admin/AdminRevenueChart';
import AdminQuickStats from '@/components/admin/AdminQuickStats';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    totalHotels: 0,
    flightBookings: 0,
    hotelBookings: 0,
    trainBookings: 0,
    busBookings: 0,
    visitorCount: 0,
    totalReviews: 0,
    totalTestimonials: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminAccess = async () => {
      setIsLoading(true);
      
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate('/admin/auth');
          return;
        }

        // Check if user has admin role
        const { data: roles, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .single();

        if (error || !roles) {
          await supabase.auth.signOut();
          navigate('/admin/auth');
          return;
        }

        setIsAdmin(true);
        await loadDashboardData();
      } catch (error) {
        console.error('Error checking admin access:', error);
        navigate('/admin/auth');
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAccess();
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      // Load real-time stats including train and bus bookings
      const [
        { count: usersCount },
        { count: bookingsCount },
        { count: flightBookingsCount },
        { count: trainBookingsCount },
        { count: busBookingsCount },
        { count: hotelsCount },
        { count: reviewsCount },
        { count: testimonialsCount },
        { data: bookingAmounts },
        { data: flightAmounts },
        { data: trainAmounts },
        { data: busAmounts },
        { data: visitorData }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('bookings').select('*', { count: 'exact', head: true }),
        supabase.from('flight_bookings').select('*', { count: 'exact', head: true }),
        supabase.from('train_bookings').select('*', { count: 'exact', head: true }),
        supabase.from('bus_bookings').select('*', { count: 'exact', head: true }),
        supabase.from('hotels').select('*', { count: 'exact', head: true }),
        supabase.from('user_reviews').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('bookings').select('total_amount'),
        supabase.from('flight_bookings').select('total_amount'),
        supabase.from('train_bookings').select('total_amount'),
        supabase.from('bus_bookings').select('total_amount'),
        supabase.from('visitor_counter').select('visit_count').eq('id', 1).single()
      ]);

      const hotelRevenue = bookingAmounts?.reduce((sum, booking) => sum + (booking.total_amount || 0), 0) || 0;
      const flightRevenue = flightAmounts?.reduce((sum, booking) => sum + (booking.total_amount || 0), 0) || 0;
      const trainRevenue = trainAmounts?.reduce((sum, booking) => sum + (booking.total_amount || 0), 0) || 0;
      const busRevenue = busAmounts?.reduce((sum, booking) => sum + (booking.total_amount || 0), 0) || 0;
      const totalRevenue = hotelRevenue + flightRevenue + trainRevenue + busRevenue;

      setStats({
        totalUsers: usersCount || 0,
        totalBookings: (bookingsCount || 0) + (flightBookingsCount || 0) + (trainBookingsCount || 0) + (busBookingsCount || 0),
        totalRevenue,
        totalHotels: hotelsCount || 0,
        flightBookings: flightBookingsCount || 0,
        hotelBookings: bookingsCount || 0,
        trainBookings: trainBookingsCount || 0,
        busBookings: busBookingsCount || 0,
        visitorCount: visitorData?.visit_count || 0,
        totalReviews: reviewsCount || 0,
        totalTestimonials: testimonialsCount || 0
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  if (isLoading || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 lg:ml-64">
          <div className="p-4 lg:p-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    Admin Dashboard
                  </h1>
                  <p className="text-gray-600">
                    Welcome back! Here's what's happening with your platform.
                  </p>
                </div>
                <div className="mt-4 lg:mt-0">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    <Shield className="h-4 w-4 mr-1" />
                    Administrator
                  </Badge>
                </div>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <AdminStatsCards stats={stats} />

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8"
            >
              <AdminQuickStats />
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8"
            >
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid grid-cols-3 lg:grid-cols-5 w-full lg:w-auto">
                  <TabsTrigger value="overview" className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden sm:inline">Overview</span>
                  </TabsTrigger>
                  <TabsTrigger value="bookings" className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span className="hidden sm:inline">Bookings</span>
                  </TabsTrigger>
                  <TabsTrigger value="users" className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span className="hidden sm:inline">Users</span>
                  </TabsTrigger>
                  <TabsTrigger value="hotels" className="flex items-center space-x-2">
                    <Building className="h-4 w-4" />
                    <span className="hidden sm:inline">Hotels</span>
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span className="hidden sm:inline">Reports</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <AdminRevenueChart />
                    </div>
                    <div>
                      <AdminActivityFeed />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                      <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                        <CardTitle className="flex items-center space-x-2">
                          <TrendingUp className="h-5 w-5" />
                          <span>Revenue Analytics</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Revenue</span>
                            <span className="text-2xl font-bold text-green-600">
                              ₹{stats.totalRevenue.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Hotel Bookings</span>
                            <span className="font-semibold">{stats.hotelBookings}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Flight Bookings</span>
                            <span className="font-semibold">{stats.flightBookings}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Train Bookings</span>
                            <span className="font-semibold">{stats.trainBookings}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Bus Bookings</span>
                            <span className="font-semibold">{stats.busBookings}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
                        <CardTitle className="flex items-center space-x-2">
                          <Users className="h-5 w-5" />
                          <span>Platform Metrics</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Users</span>
                            <span className="text-2xl font-bold text-purple-600">
                              {stats.totalUsers}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Hotels</span>
                            <span className="font-semibold">{stats.totalHotels}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">User Reviews</span>
                            <span className="font-semibold">{stats.totalReviews}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Testimonials</span>
                            <span className="font-semibold">{stats.totalTestimonials}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Site Visitors</span>
                            <span className="font-semibold">{stats.visitorCount.toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="bookings">
                  <AdminBookingsTable />
                </TabsContent>

                <TabsContent value="users">
                  <AdminUsersTable />
                </TabsContent>

                <TabsContent value="hotels">
                  <AdminHotelsTable />
                </TabsContent>

                <TabsContent value="reports">
                  <AdminReportGenerator stats={stats} />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;