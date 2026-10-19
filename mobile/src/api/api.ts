import axios from 'axios';

import { API_BASE_URL, API_URL } from '../config/env';
import { getCurrentServerUrlSync, initializeServerUrl } from '../config/serverConfig';
import { getAuthToken } from '../utils/storage';

// Initialize server URL from AsyncStorage in background
initializeServerUrl().catch(() => {});

/** Host root without `/api` suffix (health checks, debugging). */
export const BASE_URL = API_BASE_URL;

/**
 * Shared Axios instance for all RESQGo API calls.
 * Attaches JWT automatically when a token is stored.
 */
export const api = axios.create({
  baseURL: getCurrentServerUrlSync(),
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(async config => {
  // Dynamically ensure request uses the active server URL
  config.baseURL = getCurrentServerUrlSync();

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
