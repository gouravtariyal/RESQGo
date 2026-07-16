/**
 * Local service history types and dummy records.
 * Used until a real bookings API is connected.
 */

export type HistoryStatus = 'Completed' | 'Cancelled' | 'In Progress';

export type HistoryFilter = 'All' | HistoryStatus;

export type ServiceHistoryItem = {
  id: string;
  bookingId: string;
  serviceType: string;
  icon: string;
  date: string;
  time: string;
  status: HistoryStatus;
  providerName: string;
  amount: number;
  address: string;
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  notes: string;
};

export const HISTORY_FILTERS: HistoryFilter[] = [
  'All',
  'Completed',
  'Cancelled',
  'In Progress',
];

/** Formats INR amounts for display in cards and details. */
export const formatAmount = (amount: number) =>
  `₹${amount.toLocaleString('en-IN')}`;

/**
 * Dummy history list for UI development.
 * Keep a mix of statuses so filter chips can be tested easily.
 */
export const DUMMY_HISTORY: ServiceHistoryItem[] = [
  {
    id: 'hist-1',
    bookingId: 'RG-20260312-01',
    serviceType: 'Battery Jump Start',
    icon: '⚡',
    date: '12 Mar 2026',
    time: '09:40 AM',
    status: 'In Progress',
    providerName: 'JumpStart Pros',
    amount: 499,
    address: 'Connaught Place, New Delhi',
    paymentStatus: 'Pending',
    notes: 'Technician is on the way. Keep hazard lights on.',
  },
  {
    id: 'hist-2',
    bookingId: 'RG-20260305-02',
    serviceType: 'Flat Tyre Help',
    icon: '🛞',
    date: '05 Mar 2026',
    time: '07:15 PM',
    status: 'Completed',
    providerName: 'TyreFix Mobile Unit',
    amount: 699,
    address: 'Ring Road, Karol Bagh, New Delhi',
    paymentStatus: 'Paid',
    notes: 'Spare tyre fitted successfully. Valve checked.',
  },
  {
    id: 'hist-3',
    bookingId: 'RG-20260228-03',
    serviceType: 'Tow Truck',
    icon: '🚚',
    date: '28 Feb 2026',
    time: '11:05 AM',
    status: 'Completed',
    providerName: 'Rapid Tow Express',
    amount: 1499,
    address: 'NH-48, near Gurgaon Toll Plaza',
    paymentStatus: 'Paid',
    notes: 'Vehicle towed to authorized workshop.',
  },
  {
    id: 'hist-4',
    bookingId: 'RG-20260220-04',
    serviceType: 'Fuel Delivery',
    icon: '⛽',
    date: '20 Feb 2026',
    time: '08:50 PM',
    status: 'Cancelled',
    providerName: 'FuelOnCall Delhi',
    amount: 350,
    address: 'Dwarka Sector 21, New Delhi',
    paymentStatus: 'Refunded',
    notes: 'Cancelled by user before provider arrival.',
  },
  {
    id: 'hist-5',
    bookingId: 'RG-20260211-05',
    serviceType: 'Mechanic Visit',
    icon: '🛠️',
    date: '11 Feb 2026',
    time: '04:20 PM',
    status: 'Completed',
    providerName: 'Sharma Auto Care',
    amount: 899,
    address: 'Lajpat Nagar Market, New Delhi',
    paymentStatus: 'Paid',
    notes: 'Minor electrical issue fixed on site.',
  },
  {
    id: 'hist-6',
    bookingId: 'RG-20260130-06',
    serviceType: 'EV Charging Assist',
    icon: '🔋',
    date: '30 Jan 2026',
    time: '01:10 PM',
    status: 'Cancelled',
    providerName: 'ChargeHub Station',
    amount: 250,
    address: 'Saket District Centre, New Delhi',
    paymentStatus: 'Refunded',
    notes: 'Booking cancelled due to station unavailability.',
  },
];

export const getHistoryById = (id: string) =>
  DUMMY_HISTORY.find(item => item.id === id);
