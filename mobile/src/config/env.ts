import { Platform } from 'react-native';

/**
 * For physical devices on the same Wi-Fi network, use your machine's LAN IP.
 * For deployed production backends, set PRODUCTION_API_URL (e.g., https://api.resqgo.com/api).
 */
const PRODUCTION_API_URL = ''; // e.g. 'https://your-production-backend.com/api'
export const DEV_MACHINE_LAN_IP = '172.16.0.60';

const defaultHost = Platform.select({
  android: '10.0.2.2',
  ios: 'localhost',
  default: 'localhost',
}) as string;

export const API_HOST = DEV_MACHINE_LAN_IP.trim() || defaultHost;

export const API_BASE_URL = `http://${API_HOST}:5000`;

export const API_URL = PRODUCTION_API_URL.trim() || `${API_BASE_URL}/api`;

/**
 * Web client ID from Firebase Console → Project settings → Your apps → Web app,
 * or Authentication → Sign-in method → Google. Required for native Google Sign-In.
 */
export const GOOGLE_WEB_CLIENT_ID = '';
