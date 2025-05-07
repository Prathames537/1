import React, { useState } from 'react';
import { Bell, Calendar, Clock, MessageCircle, FileText, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  type: 'appointment' | 'message' | 'report' | 'system';
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'appointment',
    title: 'Upcoming Appointment',
    description: 'Video consultation with Sarah Johnson in 30 minutes',
    time: '30 minutes ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message',
    description: 'Robert Chen sent you a message about medication refill',
    time: '1 hour ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'report',
    title: 'Lab Results Ready',
    description: 'Blood test results for Emma Garcia are now available',
    time: '2 hours ago',
    isRead: true,
  },
  {
    id: '4',
    type: 'system',
    title: 'System Update',
    description: 'New features have been added to your dashboard',
    time: '1 day ago',
    isRead: true,
  },
];

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
  const unreadCount = notifications.filter(n => !n.isRead).length;

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