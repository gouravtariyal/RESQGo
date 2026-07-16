import React, { useMemo } from 'react';
import { Platform, StyleSheet, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { HistoryScreen } from '../features/history';
import { HomeScreen } from '../features/home';
import { ProfileScreen } from '../features/profile';
import { VehiclesScreen } from '../features/vehicles';
import { colors } from '../theme/colors';
import { radius } from '../theme/radius';
import { shadows } from '../theme/shadows';
import { spacing } from '../theme/spacing';
import { fontSizes, fontWeights, typography } from '../theme/typography';
import type { BottomTabParamList } from './types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BASE_WIDTH = 375;

/** Maps each tab route to outline / filled Ionicons glyph names. */
const TAB_ICONS = {
  Home: { active: 'home', inactive: 'home-outline' },
  History: { active: 'time', inactive: 'time-outline' },
  Vehicles: { active: 'car-sport', inactive: 'car-sport-outline' },
  Profile: { active: 'person', inactive: 'person-outline' },
} as const;

/**
 * BottomTabNavigator
 * ------------------
 * Authenticated shell shown after OTP verification.
 * Home is the default landing tab.
 *
 * Visual design:
 * - Floating rounded tab bar
 * - Soft elevation / shadow
 * - Theme-driven active and inactive tint colors
 * - Safe-area aware bottom inset on notched devices
 */
export const BottomTabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  // Keep tab sizing responsive without over-scaling on large tablets.
  const scale = Math.min(Math.max(width / BASE_WIDTH, 0.9), 1.1);
  const tabBarHeight = Math.round(64 * scale);
  const horizontalInset = Math.max(spacing.lg, Math.round(width * 0.04));
  const bottomInset = Math.max(insets.bottom, spacing.sm);

  const tabBarStyle = useMemo(
    () => [
      styles.tabBar,
      {
        height: tabBarHeight + bottomInset * 0.35,
        marginHorizontal: horizontalInset,
        marginBottom: bottomInset,
        paddingBottom: Math.max(spacing.sm, Math.round(bottomInset * 0.25)),
      },
    ],
    [bottomInset, horizontalInset, tabBarHeight],
  );

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        // Smooth tab transitions for a premium feel.
        animation: 'shift',
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          ...typography.caption,
          fontSize: Math.round(fontSizes.xs * scale),
          fontWeight: fontWeights.semibold,
          marginTop: spacing.xxs,
        },
        tabBarStyle,
        tabBarItemStyle: styles.tabBarItem,
        // Pick a filled icon when active and an outline icon when inactive.
        tabBarIcon: ({ color, size, focused }) => {
          const iconSet = TAB_ICONS[route.name];
          const iconName = focused ? iconSet.active : iconSet.inactive;

          return (
            <Ionicons
              name={iconName}
              size={Math.round(size * scale)}
              color={color}
            />
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarAccessibilityLabel: 'Home tab',
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: 'History',
          tabBarAccessibilityLabel: 'History tab',
        }}
      />
      <Tab.Screen
        name="Vehicles"
        component={VehiclesScreen}
        options={{
          tabBarLabel: 'Vehicles',
          tabBarAccessibilityLabel: 'Vehicles tab',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarAccessibilityLabel: 'Profile tab',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  // Floating rounded container that sits above the home-indicator / system nav.
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderRadius: radius['2xl'],
    backgroundColor: colors.surface,
    borderTopWidth: 0,
    paddingTop: spacing.sm,
    ...shadows.lg,
    // Android needs a slightly stronger elevation for the floating look.
    elevation: Platform.OS === 'android' ? 10 : shadows.lg.elevation,
  },
  tabBarItem: {
    paddingVertical: spacing.xs,
  },
});

export default BottomTabNavigator;
