import * as authApi from '../api/authApi';
import type {
  ApiUser,
  CheckUserPayload,
  LoginPayload,
  RegisterPayload,
} from '../api/types';
import { getApiErrorMessage } from '../utils/apiError';
import {
  clearAuthSession,
  getAuthToken,
  getAuthUser,
  hasAuthSession,
  saveAuthToken,
  saveAuthUser,
} from '../utils/storage';
import { updateProfile } from '../features/profile/profileStore';
import {
  signOutFirebaseUser,
  waitForFirebaseCurrentUser,
} from './firebase/authSession';

/**
 * Business layer for authentication.
 * Screens call these helpers instead of talking to Axios directly.
 */
export const checkUser = async (payload: CheckUserPayload) => {
  try {
    return await authApi.checkUser(payload);
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Unable to verify phone number.'));
  }
};

export const register = async (payload: RegisterPayload) => {
  try {
    return await authApi.register(payload);
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Registration failed.'));
  }
};

/**
 * Password login kept for a future email/password auth path.
 * Phone OTP login does not use this.
 */
export const login = async (payload: LoginPayload) => {
  try {
    const response = await authApi.login(payload);

    if (!response?.token || !response?.user) {
      throw new Error('Invalid login response from server.');
    }

    await persistAuthSession(response.token, response.user);
    return response;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Login failed.'));
  }
};

/**
 * Saves JWT + user and syncs profile UI state.
 */
export const persistAuthSession = async (
  token: string,
  user: ApiUser,
): Promise<void> => {
  await saveAuthToken(token);
  await saveAuthUser(user);
  syncProfileFromApiUser(user);
};

/**
 * Maps backend user fields into the local profile store.
 */
export const syncProfileFromApiUser = (user: ApiUser): void => {
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-IN', {
        month: 'short',
        year: 'numeric',
      })
    : 'Recently';

  updateProfile({
    name: user.fullName,
    email: user.email ?? '',
    mobileNumber: user.phoneNumber,
    memberSince,
  });
};

/**
 * Restores session from JWT (future password auth) or Firebase phone OTP.
 */
export const restoreAuthSession = async (): Promise<boolean> => {
  try {
    const token = await getAuthToken();
    const user = await getAuthUser();

    if (token) {
      if (user) {
        syncProfileFromApiUser(user);
      }
      return true;
    }

    const firebaseUser = await waitForFirebaseCurrentUser();
    if (firebaseUser) {
      if (firebaseUser.phoneNumber) {
        updateProfile({
          mobileNumber: firebaseUser.phoneNumber.replace(/^\+91/, ''),
        });
      }
      return true;
    }

    return false;
  } catch (error) {
    console.warn('[authService] Failed to restore auth session', error);
    return false;
  }
};

export const logout = async (): Promise<void> => {
  await clearAuthSession();

  try {
    await signOutFirebaseUser();
  } catch (error) {
    console.warn('[authService] Firebase sign-out failed', error);
  }
};

export {
  getAuthToken,
  getAuthUser,
  hasAuthSession,
  clearAuthSession,
};
