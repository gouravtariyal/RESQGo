import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HistoryScreen } from '../features/history';
import { HomeScreen } from '../features/home';
import { ProfileScreen } from '../features/profile';
import { VehiclesScreen } from '../features/vehicles';
import { FloatingTabBar } from './FloatingTabBar';
import type { BottomTabParamList } from './types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

/**
 * BottomTabNavigator
 * ------------------
 * Authenticated shell after OTP verification.
 * Uses a floating bubble-style custom tab bar.
 */
export const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        animation: 'shift',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarAccessibilityLabel: 'Home tab' }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{ tabBarAccessibilityLabel: 'History tab' }}
      />
      <Tab.Screen
        name="Vehicles"
        component={VehiclesScreen}
        options={{ tabBarAccessibilityLabel: 'Vehicles tab' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarAccessibilityLabel: 'Profile tab' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
