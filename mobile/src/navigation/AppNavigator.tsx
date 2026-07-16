import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AboutScreen } from '../features/about';
import { AssistantScreen } from '../features/assistant';
import {
  AddEmergencyContactScreen,
  EmergencyContactsScreen,
} from '../features/emergencyContacts';
import { HistoryDetailsScreen } from '../features/history';
import { PrivacyPolicyScreen, TermsScreen } from '../features/legal';
import { NotificationsScreen } from '../features/notifications';
import { EditProfileScreen, SettingsScreen } from '../features/profile';
import { ServicesScreen } from '../features/services';
import { SOSScreen } from '../features/sos';
import { SupportScreen } from '../features/support';
import { AddVehicleScreen } from '../features/vehicles';
import { BottomTabNavigator } from './BottomTabNavigator';
import type { AppStackParamList } from './types';

/**
 * AppNavigator
 * ------------
 * Owns the authenticated application shell.
 *
 * After OTP verification, users land on Bottom Tabs.
 * Feature stack screens open above the tabs.
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
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="NearbyServices"
        component={ServicesScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="EmergencySOS"
        component={SOSScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="AIAssistant"
        component={AssistantScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="HistoryDetails"
        component={HistoryDetailsScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="EmergencyContacts"
        component={EmergencyContactsScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="AddEmergencyContact"
        component={AddEmergencyContactScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Support"
        component={SupportScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Terms"
        component={TermsScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
