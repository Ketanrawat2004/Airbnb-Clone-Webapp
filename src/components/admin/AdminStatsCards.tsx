import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Building, Plane, CreditCard, TrendingUp, Calendar } from 'lucide-react';

interface AdminStatsCardsProps {
  stats: {
    totalUsers: number;
    totalBookings: number;
    totalRevenue: number;
    totalHotels: number;
    flightBookings: number;
    hotelBookings: number;
  };
}

const AdminStatsCards = ({ stats }: AdminStatsCardsProps) => {
  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings.toLocaleString(),
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`,
      icon: CreditCard,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Hotels Listed',
      value: stats.totalHotels.toLocaleString(),
      icon: Building,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Hotel Bookings',
      value: stats.hotelBookings.toLocaleString(),
      icon: Building,
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      iconColor: 'text-rose-600'
    },
    {
      title: 'Flight Bookings',
      value: stats.flightBookings.toLocaleString(),
      icon: Plane,
      color: 'from-sky-500 to-sky-600',
      bgColor: 'bg-sky-50',
      iconColor: 'text-sky-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-600 truncate">
                      {stat.title}
                    </p>
                    <p className="text-lg lg:text-xl font-bold text-gray-900 truncate">
                      {stat.value}
                    </p>
                  </div>
                </div>
                
                {/* Progress indicator (optional visual enhancement) */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full bg-gradient-to-r ${stat.color}`}
                      style={{ width: '75%' }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AdminStatsCards;