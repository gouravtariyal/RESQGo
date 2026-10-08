import { Platform } from 'react-native';

/**
 * When testing on a physical device, set this to your dev machine's LAN IP
 * (same Wi‑Fi). Leave empty for Android emulator (10.0.2.2) or iOS simulator (localhost).
 */
const DEV_MACHINE_LAN_IP = '';

const defaultHost = Platform.select({
  android: '10.0.2.2',
  ios: 'localhost',
  default: 'localhost',
}) as string;

export const API_HOST = DEV_MACHINE_LAN_IP.trim() || defaultHost;

export const API_BASE_URL = `http://${API_HOST}:5000`;

export const API_URL = `${API_BASE_URL}/api`;

/**
 * Web client ID from Firebase Console → Project settings → Your apps → Web app,
 * or Authentication → Sign-in method → Google. Required for native Google Sign-In.
 */
export const GOOGLE_WEB_CLIENT_ID = '';
