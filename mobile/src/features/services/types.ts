/**
 * Shared service types for the Nearby Services feature.
 */

export type ServiceCategory =
  | 'All'
  | 'Mechanic'
  | 'Tow Truck'
  | 'Fuel Delivery'
  | 'EV Charging'
  | 'Battery Jump'
  | 'Flat Tyre';

export type ServiceStatus = 'Open' | 'Closed';

export type NearbyService = {
  id: string;
  name: string;
  category: Exclude<ServiceCategory, 'All'>;
  icon: string;
  distanceKm: number;
  rating: number;
  etaMinutes: number;
  status: ServiceStatus;
  phoneNumber: string;
};

/** Horizontal filter chips shown under the search bar. */
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  'All',
  'Mechanic',
  'Tow Truck',
  'Fuel Delivery',
  'EV Charging',
  'Battery Jump',
  'Flat Tyre',
];
