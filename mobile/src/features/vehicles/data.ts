import type { Vehicle } from './types';

/**
 * Local dummy vehicles used until a real backend is connected.
 * Keep this list small so the UI stays easy to scan during development.
 */
export const DUMMY_VEHICLES: Vehicle[] = [
  {
    id: 'veh-1',
    name: 'Family Hatchback',
    manufacturer: 'Hyundai',
    model: 'i20 Sportz',
    registrationNumber: 'MH12AB1234',
    fuelType: 'Petrol',
    color: 'White',
    year: '2021',
    icon: '🚗',
  },
  {
    id: 'veh-2',
    name: 'Office SUV',
    manufacturer: 'Tata',
    model: 'Nexon EV',
    registrationNumber: 'KA05CD5678',
    fuelType: 'EV',
    color: 'Blue',
    year: '2023',
    icon: '🚙',
  },
  {
    id: 'veh-3',
    name: 'Weekend Sedan',
    manufacturer: 'Honda',
    model: 'City ZX',
    registrationNumber: 'DL01EF9012',
    fuelType: 'Petrol',
    color: 'Grey',
    year: '2020',
    icon: '🚘',
  },
];
