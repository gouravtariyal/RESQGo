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
    verificationId: string;
  };
};

/**
 * Bottom tab routes shown after a successful OTP verification.
 */
export type BottomTabParamList = {
  Home: undefined;
  History: undefined;
  Vehicles: undefined;
  Profile: undefined;
};

/**
 * Authenticated app stack.
 * MainTabs hosts the bottom tab navigator; stacked screens open above the tabs.
 */
export type AppStackParamList = {
  MainTabs: NavigatorScreenParams<BottomTabParamList> | undefined;
  AddVehicle:
    | {
        vehicleId?: string;
      }
    | undefined;
  NearbyServices: undefined;
  EmergencySOS: undefined;
  AIAssistant: undefined;
  HistoryDetails: {
    historyId: string;
  };
  EditProfile: undefined;
  Settings: undefined;
  Notifications: undefined;
  EmergencyContacts: undefined;
  AddEmergencyContact:
    | {
        contactId?: string;
      }
    | undefined;
  Support: undefined;
  About: undefined;
  PrivacyPolicy: undefined;
  Terms: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  App: NavigatorScreenParams<AppStackParamList> | undefined;
};
