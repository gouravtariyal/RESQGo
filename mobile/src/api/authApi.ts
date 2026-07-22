import api from './api';
import type {
  CheckUserPayload,
  CheckUserResponse,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from './types';

/**
 * Low-level auth API calls.
 * Screens should use authService instead of calling these directly.
 */
export const checkUser = async (payload: CheckUserPayload) => {
  const { data } = await api.post('/auth/check-user', payload);
  return data;
};

export const register = async (payload: RegisterPayload) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};

export const login = async (payload: LoginPayload) => {
  const { data } = await api.post('/auth/login', payload);
  return data;
};