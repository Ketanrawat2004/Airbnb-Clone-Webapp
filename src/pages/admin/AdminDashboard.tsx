import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
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

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    totalHotels: 0,
    flightBookings: 0,
    hotelBookings: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      // Load basic stats
      const [
        { count: usersCount },
        { count: bookingsCount },
        { count: flightBookingsCount },
        { count: hotelsCount },
        { data: bookingAmounts }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('bookings').select('*', { count: 'exact', head: true }),
        supabase.from('flight_bookings').select('*', { count: 'exact', head: true }),
        supabase.from('hotels').select('*', { count: 'exact', head: true }),
        supabase.from('bookings').select('total_amount')
      ]);

      const totalRevenue = bookingAmounts?.reduce((sum, booking) => sum + (booking.total_amount || 0), 0) || 0;

      setStats({
        totalUsers: usersCount || 0,
        totalBookings: (bookingsCount || 0) + (flightBookingsCount || 0),
        totalRevenue,
        totalHotels: hotelsCount || 0,
        flightBookings: flightBookingsCount || 0,
        hotelBookings: bookingsCount || 0
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || isLoading) {
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

  if (!user) {
    return null;
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

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8"
            >
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full lg:w-auto">
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
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
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
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
                        <CardTitle className="flex items-center space-x-2">
                          <Users className="h-5 w-5" />
                          <span>User Metrics</span>
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
                            <span className="text-gray-600">Active Bookings</span>
                            <span className="font-semibold">{stats.totalBookings}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Hotels</span>
                            <span className="font-semibold">{stats.totalHotels}</span>
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
              </Tabs>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;