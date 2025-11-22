import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, DollarSign, TrendingUp, Users, Calendar } from 'lucide-react';

interface QuickStats {
  todayRevenue: number;
  todayBookings: number;
  activeUsers: number;
  avgBookingValue: number;
  revenueChange: number;
  bookingsChange: number;
}

const AdminQuickStats = () => {
  const [stats, setStats] = useState<QuickStats>({
    todayRevenue: 0,
    todayBookings: 0,
    activeUsers: 0,
    avgBookingValue: 0,
    revenueChange: 0,
    bookingsChange: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuickStats();
  }, []);

  const loadQuickStats = async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      // Today's data
      const [todayHotels, todayFlights, todayTrains, todayBuses] = await Promise.all([
        supabase.from('bookings').select('total_amount').gte('created_at', today.toISOString()),
        supabase.from('flight_bookings').select('total_amount').gte('created_at', today.toISOString()),
        supabase.from('train_bookings').select('total_amount').gte('created_at', today.toISOString()),
        supabase.from('bus_bookings').select('total_amount').gte('created_at', today.toISOString())
      ]);

      // Yesterday's data for comparison
      const [yesterdayHotels, yesterdayFlights, yesterdayTrains, yesterdayBuses] = await Promise.all([
        supabase.from('bookings').select('total_amount').gte('created_at', yesterday.toISOString()).lt('created_at', today.toISOString()),
        supabase.from('flight_bookings').select('total_amount').gte('created_at', yesterday.toISOString()).lt('created_at', today.toISOString()),
        supabase.from('train_bookings').select('total_amount').gte('created_at', yesterday.toISOString()).lt('created_at', today.toISOString()),
        supabase.from('bus_bookings').select('total_amount').gte('created_at', yesterday.toISOString()).lt('created_at', today.toISOString())
      ]);

      const todayRevenue = [
        ...(todayHotels.data || []),
        ...(todayFlights.data || []),
        ...(todayTrains.data || []),
        ...(todayBuses.data || [])
      ].reduce((sum, b) => sum + (b.total_amount || 0), 0);

      const yesterdayRevenue = [
        ...(yesterdayHotels.data || []),
        ...(yesterdayFlights.data || []),
        ...(yesterdayTrains.data || []),
        ...(yesterdayBuses.data || [])
      ].reduce((sum, b) => sum + (b.total_amount || 0), 0);

      const todayBookings = 
        (todayHotels.data?.length || 0) + 
        (todayFlights.data?.length || 0) + 
        (todayTrains.data?.length || 0) + 
        (todayBuses.data?.length || 0);

      const yesterdayBookings = 
        (yesterdayHotels.data?.length || 0) + 
        (yesterdayFlights.data?.length || 0) + 
        (yesterdayTrains.data?.length || 0) + 
        (yesterdayBuses.data?.length || 0);

      const revenueChange = yesterdayRevenue > 0 
        ? ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100 
        : 0;

      const bookingsChange = yesterdayBookings > 0 
        ? ((todayBookings - yesterdayBookings) / yesterdayBookings) * 100 
        : 0;

      const avgBookingValue = todayBookings > 0 ? todayRevenue / todayBookings : 0;

      // Count active users (last 24 hours)
      const { count: activeUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('updated_at', yesterday.toISOString());

      setStats({
        todayRevenue,
        todayBookings,
        activeUsers: activeUsers || 0,
        avgBookingValue,
        revenueChange,
        bookingsChange
      });
    } catch (error) {
      console.error('Error loading quick stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickStatCards = [
    {
      title: "Today's Revenue",
      value: `₹${stats.todayRevenue.toLocaleString('en-IN')}`,
      change: stats.revenueChange,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: "Today's Bookings",
      value: stats.todayBookings.toString(),
      change: stats.bookingsChange,
      icon: Calendar,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Active Users (24h)',
      value: stats.activeUsers.toString(),
      change: 0,
      icon: Users,
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Avg. Booking Value',
      value: `₹${stats.avgBookingValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      change: 0,
      icon: TrendingUp,
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
      {quickStatCards.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.change >= 0;
        
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  {stat.change !== 0 && (
                    <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                      <span className="text-sm font-semibold">
                        {Math.abs(stat.change).toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : stat.value}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AdminQuickStats;
