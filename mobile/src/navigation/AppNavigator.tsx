import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../features/home';
import type { AppStackParamList } from './types';

/**
 * AppNavigator
 * ------------
 * Owns the authenticated application shell.
 *
 * Currently mounts Home. Extend this stack (or nest tab/drawer navigators here)
 * for Provider, AI, Booking, Tracking, Profile, and other product modules.
 */
export type { AppStackParamList };

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
