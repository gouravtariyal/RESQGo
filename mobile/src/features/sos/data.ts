/**
 * Local dummy SOS data used until real emergency APIs are connected.
 */

export type EmergencyContact = {
  id: string;
  name: string;
  phoneNumber: string;
  icon: string;
};

export type DummyLocation = {
  label: string;
  latitude: number;
  longitude: number;
};

/** Contacts shown after SOS activation. */
export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'police',
    name: 'Police',
    phoneNumber: '112',
    icon: '🚓',
  },
  {
    id: 'ambulance',
    name: 'Ambulance',
    phoneNumber: '108',
    icon: '🚑',
  },
  {
    id: 'roadside',
    name: 'Roadside Assistance',
    phoneNumber: '1800-123-7367',
    icon: '🛠️',
  },
  {
    id: 'personal',
    name: 'Personal Emergency Contact',
    phoneNumber: '+91 98765 43210',
    icon: '👤',
  },
];

/** Static location values for UI preview only. */
export const DUMMY_LOCATION: DummyLocation = {
  label: 'Connaught Place, New Delhi',
  latitude: 28.6315,
  longitude: 77.2167,
};

/** How long the user must hold the SOS button before activation. */
export const SOS_HOLD_DURATION_MS = 3000;
