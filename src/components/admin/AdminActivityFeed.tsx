import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Plane, 
  Building, 
  Train, 
  Bus, 
  User, 
  Star,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';

interface Activity {
  id: string;
  type: 'booking' | 'user' | 'review';
  action: string;
  timestamp: string;
  user?: string;
  icon: any;
  color: string;
}

const AdminActivityFeed = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
    
    // Set up real-time subscriptions
    const bookingsChannel = supabase
      .channel('bookings-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => {
        loadActivities();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'flight_bookings' }, () => {
        loadActivities();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'train_bookings' }, () => {
        loadActivities();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bus_bookings' }, () => {
        loadActivities();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(bookingsChannel);
    };
  }, []);

  const loadActivities = async () => {
    try {
      const [bookings, flightBookings, trainBookings, busBookings, profiles, reviews] = await Promise.all([
        supabase.from('bookings').select('id, created_at, user_id').order('created_at', { ascending: false }).limit(5),
        supabase.from('flight_bookings').select('id, created_at, user_id').order('created_at', { ascending: false }).limit(5),
        supabase.from('train_bookings').select('id, created_at, user_id').order('created_at', { ascending: false }).limit(5),
        supabase.from('bus_bookings').select('id, created_at, user_id').order('created_at', { ascending: false }).limit(5),
        supabase.from('profiles').select('id, created_at, full_name').order('created_at', { ascending: false }).limit(5),
        supabase.from('user_reviews').select('id, created_at, guest_name').order('created_at', { ascending: false }).limit(5)
      ]);

      const allActivities: Activity[] = [];

      bookings.data?.forEach(b => {
        allActivities.push({
          id: b.id,
          type: 'booking',
          action: 'New hotel booking',
          timestamp: b.created_at,
          icon: Building,
          color: 'bg-orange-500'
        });
      });

      flightBookings.data?.forEach(b => {
        allActivities.push({
          id: b.id,
          type: 'booking',
          action: 'New flight booking',
          timestamp: b.created_at,
          icon: Plane,
          color: 'bg-sky-500'
        });
      });

      trainBookings.data?.forEach(b => {
        allActivities.push({
          id: b.id,
          type: 'booking',
          action: 'New train booking',
          timestamp: b.created_at,
          icon: Train,
          color: 'bg-green-500'
        });
      });

      busBookings.data?.forEach(b => {
        allActivities.push({
          id: b.id,
          type: 'booking',
          action: 'New bus booking',
          timestamp: b.created_at,
          icon: Bus,
          color: 'bg-blue-500'
        });
      });

      profiles.data?.forEach(p => {
        allActivities.push({
          id: p.id,
          type: 'user',
          action: 'New user registered',
          timestamp: p.created_at,
          user: p.full_name || 'Anonymous',
          icon: User,
          color: 'bg-purple-500'
        });
      });

      reviews.data?.forEach(r => {
        allActivities.push({
          id: r.id,
          type: 'review',
          action: 'New review posted',
          timestamp: r.created_at,
          user: r.guest_name,
          icon: Star,
          color: 'bg-yellow-500'
        });
      });

      allActivities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setActivities(allActivities.slice(0, 15));
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="p-4 space-y-3">
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading activities...</div>
            ) : activities.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No recent activities</div>
            ) : (
              activities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${activity.color} text-white flex-shrink-0`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      {activity.user && (
                        <p className="text-xs text-gray-600">{activity.user}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {format(new Date(activity.timestamp), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AdminActivityFeed;
