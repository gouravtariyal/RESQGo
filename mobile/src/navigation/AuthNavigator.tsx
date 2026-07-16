import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen, OtpScreen } from '../features/auth';
import { OnboardingScreen } from '../features/onboarding';
import type { AuthStackParamList } from './types';

/**
 * AuthNavigator
 * ------------
 * Owns the unauthenticated experience: first-run onboarding and login.
 *
 * Future auth screens (SignUp, OTP, ForgotPassword) should be registered here.
 * After a successful login, navigate to the root `App` stack (see LoginScreen).
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
      <Stack.Screen name="OTP" component={OtpScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
