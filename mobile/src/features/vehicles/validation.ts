/**
 * Vehicle form helpers — validation and formatting for Add / Edit flows.
 */

import type { FuelType, VehicleFormValues } from './types';

/**
 * Indian registration format examples:
 * MH12AB1234, KA05CD5678, DL1CAF1234
 * Spaces are ignored before validation.
 */
export const REGISTRATION_NUMBER_PATTERN =
  /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/;

export const normalizeRegistrationNumber = (value: string) =>
  value.replace(/\s+/g, '').toUpperCase();

export type VehicleFormErrors = Partial<Record<keyof VehicleFormValues, string>>;

export const validateVehicleForm = (
  values: VehicleFormValues,
): VehicleFormErrors => {
  const errors: VehicleFormErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Vehicle name is required.';
  }

  if (!values.manufacturer.trim()) {
    errors.manufacturer = 'Manufacturer is required.';
  }

  if (!values.model.trim()) {
    errors.model = 'Model is required.';
  }

  const registrationNumber = normalizeRegistrationNumber(values.registrationNumber);

  if (!registrationNumber) {
    errors.registrationNumber = 'Registration number is required.';
  } else if (!REGISTRATION_NUMBER_PATTERN.test(registrationNumber)) {
    errors.registrationNumber =
      'Use a valid format like MH12AB1234.';
  }

  if (!values.fuelType) {
    errors.fuelType = 'Fuel type is required.';
  }

  if (!values.color.trim()) {
    errors.color = 'Color is required.';
  }

  if (!values.year.trim()) {
    errors.year = 'Year is required.';
  } else if (!/^\d{4}$/.test(values.year.trim())) {
    errors.year = 'Enter a valid 4-digit year.';
  } else {
    const yearNumber = Number(values.year.trim());
    const currentYear = new Date().getFullYear() + 1;

    if (yearNumber < 1980 || yearNumber > currentYear) {
      errors.year = `Year must be between 1980 and ${currentYear}.`;
    }
  }

  return errors;
};

export const createEmptyVehicleForm = (): VehicleFormValues => ({
  name: '',
  manufacturer: '',
  model: '',
  registrationNumber: '',
  fuelType: 'Petrol' as FuelType,
  color: '',
  year: '',
});
