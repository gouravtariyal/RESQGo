/**
 * Shared API response types for the RESQGo mobile app.
 */

export type ApiUser = {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  profileImage?: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ApiSuccessResponse<T = unknown> = {
  success: true;
  message?: string;
} & T;

export type ApiErrorResponse = {
  success: false;
  message: string;
};

export type CheckUserResponse = ApiSuccessResponse<{
  exists: boolean;
}>;

export type RegisterResponse = ApiSuccessResponse<{
  user: ApiUser;
}>;

export type LoginResponse = ApiSuccessResponse<{
  token: string;
  user: ApiUser;
}>;

export type RegisterPayload = {
  fullName: string;
  phoneNumber: string;
  password: string;
  email?: string;
};

export type LoginPayload = {
  phoneNumber: string;
  password: string;
};

export type CheckUserPayload = {
  phoneNumber: string;
};
