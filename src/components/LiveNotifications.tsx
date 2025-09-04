import { useState, useEffect } from 'react';
import { Bell, X, Check, Heart, Star, MessageSquare, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  type: 'booking' | 'offer' | 'review' | 'like' | 'message';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const LiveNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Simulate real-time notifications
    const generateNotification = () => {
      const notificationTypes = ['booking', 'offer', 'review', 'like', 'message'] as const;
      const messages = {
        booking: ['New booking received!', 'Booking confirmed for tomorrow', 'Payment received successfully'],
        offer: ['Special 30% discount available!', 'Limited time offer on luxury hotels', 'Weekend deals are live'],
        review: ['You received a 5-star review!', 'New guest feedback available', 'Your rating has improved'],
        like: ['Someone liked your property!', 'Your hotel is trending', 'Added to wishlist by 5 users'],
        message: ['New message from guest', 'Host replied to your query', 'Support team contacted you']
      };

      const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      const typeMessages = messages[type];
      const message = typeMessages[Math.floor(Math.random() * typeMessages.length)];

      const newNotification: Notification = {
        id: Date.now().toString(),
        type,
        title: type.charAt(0).toUpperCase() + type.slice(1),
        message,
        timestamp: new Date(),
        read: false
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
      setUnreadCount(prev => prev + 1);
    };

    // Generate notifications every 10-30 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.3) { // 70% chance to generate notification
        generateNotification();
      }
    }, Math.random() * 20000 + 10000);

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setUnreadCount(0);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Check className="w-4 h-4 text-green-600" />;
      case 'offer': return <Zap className="w-4 h-4 text-yellow-600" />;
      case 'review': return <Star className="w-4 h-4 text-blue-600" />;
      case 'like': return <Heart className="w-4 h-4 text-red-600" />;
      case 'message': return <MessageSquare className="w-4 h-4 text-purple-600" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <>
      {/* Notification Button */}
      <Button
        onClick={() => setShowNotifications(!showNotifications)}
        variant="outline"
        size="icon"
        className="relative hover:bg-primary/10 transition-colors"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge 
            className="absolute -top-2 -right-2 px-1 min-w-[1.2rem] h-5 text-xs bg-red-500 hover:bg-red-600"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notifications Panel */}
      {showNotifications && (
        <Card className="absolute top-12 right-0 w-80 max-h-96 shadow-xl z-50 border">
          <CardContent className="p-0">
            <div className="p-4 border-b flex items-center justify-between bg-muted/50">
              <h3 className="font-semibold text-sm">Live Notifications</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button
                    onClick={markAllAsRead}
                    variant="ghost"
                    size="sm"
                    className="text-xs h-6 px-2"
                  >
                    Mark all read
                  </Button>
                )}
                <Button
                  onClick={() => setShowNotifications(false)}
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 hover:bg-muted/50 transition-colors cursor-pointer ${
                        !notif.read ? 'bg-primary/5 border-l-2 border-l-primary' : ''
                      }`}
                      onClick={() => markAsRead(notif.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getIcon(notif.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium truncate">{notif.title}</p>
                            {!notif.read && (
                              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notif.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default LiveNotifications;