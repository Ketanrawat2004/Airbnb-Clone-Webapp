import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

interface RevenueData {
  month: string;
  hotels: number;
  flights: number;
  trains: number;
  buses: number;
  total: number;
}

const AdminRevenueChart = () => {
  const [data, setData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRevenueData();
  }, []);

  const loadRevenueData = async () => {
    try {
      const now = new Date();
      const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

      const [hotelBookings, flightBookings, trainBookings, busBookings] = await Promise.all([
        supabase
          .from('bookings')
          .select('total_amount, created_at')
          .gte('created_at', sixMonthsAgo.toISOString()),
        supabase
          .from('flight_bookings')
          .select('total_amount, created_at')
          .gte('created_at', sixMonthsAgo.toISOString()),
        supabase
          .from('train_bookings')
          .select('total_amount, created_at')
          .gte('created_at', sixMonthsAgo.toISOString()),
        supabase
          .from('bus_bookings')
          .select('total_amount, created_at')
          .gte('created_at', sixMonthsAgo.toISOString())
      ]);

      const monthlyData: { [key: string]: RevenueData } = {};
      
      // Initialize months
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = date.toLocaleString('default', { month: 'short' });
        monthlyData[monthKey] = {
          month: monthKey,
          hotels: 0,
          flights: 0,
          trains: 0,
          buses: 0,
          total: 0
        };
      }

      // Aggregate hotel revenue
      hotelBookings.data?.forEach(booking => {
        const month = new Date(booking.created_at).toLocaleString('default', { month: 'short' });
        if (monthlyData[month]) {
          monthlyData[month].hotels += booking.total_amount;
        }
      });

      // Aggregate flight revenue
      flightBookings.data?.forEach(booking => {
        const month = new Date(booking.created_at).toLocaleString('default', { month: 'short' });
        if (monthlyData[month]) {
          monthlyData[month].flights += booking.total_amount;
        }
      });

      // Aggregate train revenue
      trainBookings.data?.forEach(booking => {
        const month = new Date(booking.created_at).toLocaleString('default', { month: 'short' });
        if (monthlyData[month]) {
          monthlyData[month].trains += booking.total_amount;
        }
      });

      // Aggregate bus revenue
      busBookings.data?.forEach(booking => {
        const month = new Date(booking.created_at).toLocaleString('default', { month: 'short' });
        if (monthlyData[month]) {
          monthlyData[month].buses += booking.total_amount;
        }
      });

      // Calculate totals
      Object.values(monthlyData).forEach(month => {
        month.total = month.hotels + month.flights + month.trains + month.buses;
      });

      setData(Object.values(monthlyData));
    } catch (error) {
      console.error('Error loading revenue data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span>Revenue Trends (Last 6 Months)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-gray-500">Loading revenue data...</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, '']}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Bar dataKey="hotels" fill="#f97316" name="Hotels" radius={[4, 4, 0, 0]} />
              <Bar dataKey="flights" fill="#0ea5e9" name="Flights" radius={[4, 4, 0, 0]} />
              <Bar dataKey="trains" fill="#10b981" name="Trains" radius={[4, 4, 0, 0]} />
              <Bar dataKey="buses" fill="#3b82f6" name="Buses" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminRevenueChart;
