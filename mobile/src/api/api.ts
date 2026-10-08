import axios from 'axios';

import { API_BASE_URL, API_URL } from '../config/env';
import { getAuthToken } from '../utils/storage';

/** Host root without `/api` suffix (health checks, debugging). */
export const BASE_URL = API_BASE_URL;

/**
 * Shared Axios instance for all RESQGo API calls.
 * Attaches JWT automatically when a token is stored.
 */
export const api = axios.create({
  baseURL: API_URL,
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
