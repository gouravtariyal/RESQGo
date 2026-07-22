import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen, OtpScreen } from '../features/auth';
import { RegisterScreen } from '../features/auth/register';
import { OnboardingScreen } from '../features/onboarding';
import type { AuthStackParamList } from './types';

/**
 * AuthNavigator
 * ------------
 * Owns the unauthenticated experience: first-run onboarding, login, register, and OTP.
 *
 * Flow:
 *   Onboarding → Login
 *   Login (existing user) → OTP → App Home
 *   Login (new user / Create Account) → Register → Login
 */
export type { AuthStackParamList };

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="OTP" component={OtpScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
