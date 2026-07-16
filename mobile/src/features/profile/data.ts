/**
 * Local profile data and helpers used until a real account API is connected.
 */

export type UserProfile = {
  name: string;
  email: string;
  mobileNumber: string;
  memberSince: string;
  /** Emoji avatar placeholder until photo upload is added. */
  avatarEmoji: string;
};

export type ProfileMenuActionId =
  | 'edit-profile'
  | 'my-vehicles'
  | 'service-history'
  | 'emergency-contacts'
  | 'notifications'
  | 'help-support'
  | 'about-app'
  | 'privacy-policy'
  | 'terms'
  | 'logout';

export type ProfileMenuItem = {
  id: ProfileMenuActionId;
  title: string;
  icon: string;
  destructive?: boolean;
};

export type AppLanguage = 'English' | 'Hindi';

export type AppSettings = {
  darkMode: boolean;
  language: AppLanguage;
  notificationsEnabled: boolean;
  locationPermission: 'Granted' | 'Denied' | 'Not Determined';
  appVersion: string;
};

export const PROFILE_MENU_ITEMS: ProfileMenuItem[] = [
  { id: 'edit-profile', title: 'Edit Profile', icon: '✏️' },
  { id: 'my-vehicles', title: 'My Vehicles', icon: '🚗' },
  { id: 'service-history', title: 'Service History', icon: '🧾' },
  { id: 'emergency-contacts', title: 'Emergency Contacts', icon: '🚨' },
  { id: 'notifications', title: 'Notifications', icon: '🔔' },
  { id: 'help-support', title: 'Help & Support', icon: '💬' },
  { id: 'about-app', title: 'About', icon: 'ℹ️' },
  { id: 'privacy-policy', title: 'Privacy Policy', icon: '🔒' },
  { id: 'terms', title: 'Terms & Conditions', icon: '📄' },
  { id: 'logout', title: 'Logout', icon: '🚪', destructive: true },
];

export const LANGUAGE_OPTIONS: AppLanguage[] = ['English', 'Hindi'];

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Gourav',
  email: 'gourav@resqgo.app',
  mobileNumber: '+91 98765 43210',
  memberSince: 'January 2026',
  avatarEmoji: '👤',
};

export const DEFAULT_SETTINGS: AppSettings = {
  darkMode: false,
  language: 'English',
  notificationsEnabled: true,
  locationPermission: 'Granted',
  appVersion: '1.0.0',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ProfileFormErrors = {
  name?: string;
  email?: string;
};

/**
 * Validates edit-profile fields before saving locally.
 */
export const validateProfileForm = (values: {
  name: string;
  email: string;
}): ProfileFormErrors => {
  const errors: ProfileFormErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  return errors;
};
