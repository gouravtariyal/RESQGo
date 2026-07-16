import { useCallback, useEffect, useState } from 'react';

import { DUMMY_VEHICLES } from './data';
import type { Vehicle, VehicleFormValues } from './types';

/**
 * Tiny in-memory store for local vehicle management.
 * This keeps screens in sync without a backend for now.
 */
let vehicles: Vehicle[] = [...DUMMY_VEHICLES];
const listeners = new Set<() => void>();

const notify = () => {
  listeners.forEach(listener => listener());
};

const createId = () => `veh-${Date.now()}`;

const pickIcon = (fuelType: Vehicle['fuelType']) => {
  if (fuelType === 'EV') {
    return '🚙';
  }

  if (fuelType === 'CNG') {
    return '🚕';
  }

  return '🚗';
};

export const getVehicles = () => vehicles;

export const addVehicle = (values: VehicleFormValues) => {
  const nextVehicle: Vehicle = {
    id: createId(),
    icon: pickIcon(values.fuelType),
    ...values,
  };

  vehicles = [nextVehicle, ...vehicles];
  notify();
  return nextVehicle;
};

export const updateVehicle = (id: string, values: VehicleFormValues) => {
  vehicles = vehicles.map(vehicle =>
    vehicle.id === id
      ? {
          ...vehicle,
          ...values,
          icon: pickIcon(values.fuelType),
        }
      : vehicle,
  );
  notify();
};

export const deleteVehicle = (id: string) => {
  vehicles = vehicles.filter(vehicle => vehicle.id !== id);
  notify();
};

export const getVehicleById = (id: string) =>
  vehicles.find(vehicle => vehicle.id === id);

/**
 * React hook that re-renders whenever the local vehicle list changes.
 */
export const useVehicles = () => {
  const [items, setItems] = useState<Vehicle[]>(() => getVehicles());

  useEffect(() => {
    const refresh = () => setItems([...getVehicles()]);
    listeners.add(refresh);

    return () => {
      listeners.delete(refresh);
    };
  }, []);

  const create = useCallback((values: VehicleFormValues) => addVehicle(values), []);
  const update = useCallback(
    (id: string, values: VehicleFormValues) => updateVehicle(id, values),
    [],
  );
  const remove = useCallback((id: string) => deleteVehicle(id), []);

  return {
    vehicles: items,
    addVehicle: create,
    updateVehicle: update,
    deleteVehicle: remove,
  };
};
