/**
 * Local notification types and dummy feed data.
 */

export type NotificationCategory = 'All' | 'Unread' | 'Emergency' | 'Services' | 'Booking';

export type NotificationItem = {
  id: string;
  category: Exclude<NotificationCategory, 'All' | 'Unread'>;
  icon: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
};

export const NOTIFICATION_FILTERS: NotificationCategory[] = [
  'All',
  'Unread',
  'Emergency',
  'Services',
  'Booking',
];

export const DUMMY_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    category: 'Emergency',
    icon: '🚨',
    title: 'SOS Alert Confirmed',
    description: 'Your emergency alert was shared with nearby responders.',
    time: '2 min ago',
    isRead: false,
  },
  {
    id: 'n2',
    category: 'Booking',
    icon: '📅',
    title: 'Mechanic Assigned',
    description: 'Sharma Auto Care is heading to your location.',
    time: '18 min ago',
    isRead: false,
  },
  {
    id: 'n3',
    category: 'Services',
    icon: '⛽',
    title: 'Fuel Delivery Nearby',
    description: 'FuelOnCall is available within 2.4 km of you.',
    time: '1 hr ago',
    isRead: true,
  },
  {
    id: 'n4',
    category: 'Booking',
    icon: '✅',
    title: 'Service Completed',
    description: 'Your flat tyre request was marked as completed.',
    time: 'Yesterday',
    isRead: true,
  },
  {
    id: 'n5',
    category: 'Emergency',
    icon: '📞',
    title: 'Emergency Contact Updated',
    description: 'Your primary emergency contact was saved successfully.',
    time: '2 days ago',
    isRead: true,
  },
  {
    id: 'n6',
    category: 'Services',
    icon: '🔋',
    title: 'EV Charging Suggestion',
    description: 'ChargeHub Station has an open bay near Saket.',
    time: '3 days ago',
    isRead: false,
  },
];
