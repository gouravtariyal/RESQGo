import axios from 'axios';
import { Platform } from 'react-native';

import { getAuthToken } from '../utils/storage';

/**
 * Android emulator maps host loopback to 10.0.2.2.
 * iOS simulator can use localhost directly.
 */
export const BASE_URL = Platform.select({
  android: 'http://10.0.2.2:5000',
  ios: 'http://localhost:5000',
  default: 'http://10.0.2.2:5000',
}) as string;

/**
 * Shared Axios instance for all RESQGo API calls.
 * Attaches JWT automatically when a token is stored.
 */
export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(async config => {
  try {
    const token = await getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // Continue without auth header if storage is unavailable.
  }

  return config;
});

export default api;
