import type { NavigatorScreenParams } from '@react-navigation/native';

/**
 * Shared navigation param lists.
 * Kept separate from navigator components to avoid circular imports with screens.
 */

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  OTP: {
    phoneNumber: string;
  };
};

export type AppStackParamList = {
  Home: undefined;
  // Provider: undefined;
  // AI: undefined;
  // Booking: undefined;
  // Tracking: undefined;
  // Profile: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  App: NavigatorScreenParams<AppStackParamList> | undefined;
};
