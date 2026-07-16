import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AssistantScreen } from '../features/assistant';
import { ServicesScreen } from '../features/services';
import { SOSScreen } from '../features/sos';
import { AddVehicleScreen } from '../features/vehicles';
import { BottomTabNavigator } from './BottomTabNavigator';
import type { AppStackParamList } from './types';

/**
 * AppNavigator
 * ------------
 * Owns the authenticated application shell.
 *
 * After OTP verification, users land here and see the Bottom Tab Navigator.
 * Stack screens (vehicles, services, SOS, AI assistant) open above the tabs.
 */
export type { AppStackParamList };

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen
        name="AddVehicle"
        component={AddVehicleScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="NearbyServices"
        component={ServicesScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="EmergencySOS"
        component={SOSScreen}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="AIAssistant"
        component={AssistantScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
