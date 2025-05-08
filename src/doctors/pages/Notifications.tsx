import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, MessageCircle, FileText } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

interface Notification {
  id: string;
  type: 'appointment' | 'message' | 'report' | 'system';
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

const NotificationItem = ({ notification }: { notification: Notification }) => {
  const icons = {
    appointment: <Calendar className="w-5 h-5 text-blue-500" />,
    message: <MessageCircle className="w-5 h-5 text-green-500" />,
    report: <FileText className="w-5 h-5 text-purple-500" />,
    system: <Bell className="w-5 h-5 text-orange-500" />,
  };

  return (
    <div className={`p-4 rounded-lg border ${notification.isRead ? 'bg-white' : 'bg-welli-light-green/20'}`}>
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-full bg-white shadow-sm">
          {icons[notification.type]}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-welli-gray-800">{notification.title}</h3>
            <span className="text-sm text-welli-gray-500">{notification.time}</span>
          </div>
          <p className="text-welli-gray-600 mt-1">{notification.description}</p>
        </div>
      </div>
    </div>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabase.from('notifications').select('*');
      if (!error) {
        setNotifications(data || []);
        setUnreadCount(data.filter((n: Notification) => !n.isRead).length);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-welli-gray-800">Notifications</h1>
          <p className="text-welli-gray-600">You have {unreadCount} unread notifications</p>
        </div>
        <Button variant="outline" className="text-welli-green">
          Mark all as read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

export default Notifications; 