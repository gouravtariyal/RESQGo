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
export const checkUser = async (payload: CheckUserPayload): Promise<CheckUserResponse> => {
  const { data } = await api.post<CheckUserResponse>('/auth/check-user', payload);
  return data;
};

export const register = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  const { data } = await api.post<RegisterResponse>('/auth/register', payload);
  return data;
};

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>('/auth/login', payload);
  return data;
};