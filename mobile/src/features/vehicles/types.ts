/**
 * Shared vehicle types for the Vehicles feature.
 */

export type FuelType = 'Petrol' | 'Diesel' | 'EV' | 'CNG';

export type Vehicle = {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  registrationNumber: string;
  fuelType: FuelType;
  color: string;
  year: string;
  /** Optional emoji/icon used until real photos are available. */
  icon: string;
};

export type VehicleFormValues = Omit<Vehicle, 'id' | 'icon'>;

export const FUEL_TYPES: FuelType[] = ['Petrol', 'Diesel', 'EV', 'CNG'];
