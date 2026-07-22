import AsyncStorage from '@react-native-async-storage/async-storage';

import type { ApiUser } from '../api/types';
import { STORAGE_KEYS } from './storageKeys';

/**
 * Persists the JWT returned by the backend login API.
 */
export const saveAuthToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  } catch (error) {
    console.warn('[storage] Failed to save auth token', error);
    throw error;
  }
};

/**
 * Reads the stored JWT, if any.
 */
export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    console.warn('[storage] Failed to read auth token', error);
    return null;
  }
};

/**
 * Persists the authenticated user object (password is never stored).
 */
export const saveAuthUser = async (user: ApiUser): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
  } catch (error) {
    console.warn('[storage] Failed to save auth user', error);
    throw error;
  }
};

/**
 * Reads the stored user object.
 */
export const getAuthUser = async (): Promise<ApiUser | null> => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_USER);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as ApiUser;
  } catch (error) {
    console.warn('[storage] Failed to read auth user', error);
    return null;
  }
};

/**
 * Clears token and user on logout.
 */
export const clearAuthSession = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.AUTH_TOKEN,
      STORAGE_KEYS.AUTH_USER,
    ]);
  } catch (error) {
    console.warn('[storage] Failed to clear auth session', error);
  }
};

/**
 * Returns true when a JWT is present in storage.
 */
export const hasAuthSession = async (): Promise<boolean> => {
  const token = await getAuthToken();
  return Boolean(token);
};
