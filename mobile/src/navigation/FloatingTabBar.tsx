import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from '../theme/colors';
import { radius } from '../theme/radius';
import { shadows } from '../theme/shadows';
import { spacing } from '../theme/spacing';
import { fontSizes, fontWeights, typography } from '../theme/typography';
import type { BottomTabParamList } from './types';

type TabRouteName = keyof BottomTabParamList;

const TAB_ICONS: Record<
  TabRouteName,
  { active: string; inactive: string; label: string }
> = {
  Home: { active: 'home', inactive: 'home-outline', label: 'Home' },
  History: {
    active: 'receipt',
    inactive: 'receipt-outline',
    label: 'History',
  },
  Vehicles: {
    active: 'car-sport',
    inactive: 'car-sport-outline',
    label: 'Vehicles',
  },
  Profile: {
    active: 'person',
    inactive: 'person-outline',
    label: 'Profile',
  },
};

type TabItemProps = {
  routeName: TabRouteName;
  focused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  accessibilityLabel?: string;
};

/**
 * TabItem — active tab expands into a soft rounded bubble with label.
 */
const TabItem: React.FC<TabItemProps> = ({
  routeName,
  focused,
  onPress,
  onLongPress,
  accessibilityLabel,
}) => {
  const progress = useRef(new Animated.Value(focused ? 1 : 0)).current;
  const iconSet = TAB_ICONS[routeName];

  useEffect(() => {
    Animated.spring(progress, {
      toValue: focused ? 1 : 0,
      useNativeDriver: false,
      friction: 7,
      tension: 80,
    }).start();
  }, [focused, progress]);

  const bubblePaddingHorizontal = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 14],
  });
  const bubbleScale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.92, 1],
  });
  const labelOpacity = progress.interpolate({
    inputRange: [0, 0.55, 1],
    outputRange: [0, 0, 1],
  });
  const labelWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 54],
  });
  const bubbleBackground = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(37, 99, 235, 0)', 'rgba(37, 99, 235, 0.14)'],
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityState={{ selected: focused }}
      accessibilityLabel={accessibilityLabel ?? iconSet.label}
      style={styles.tabPressable}>
      <Animated.View
        style={[
          styles.bubble,
          {
            paddingHorizontal: bubblePaddingHorizontal,
            backgroundColor: bubbleBackground,
            transform: [{ scale: bubbleScale }],
          },
          focused && styles.bubbleActiveShadow,
        ]}>
        <Ionicons
          name={(focused ? iconSet.active : iconSet.inactive) as never}
          size={22}
          color={focused ? colors.primary : colors.textSecondary}
        />

        <Animated.View
          style={[
            styles.labelWrap,
            {
              opacity: labelOpacity,
              width: labelWidth,
            },
          ]}>
          <Text
            numberOfLines={1}
            style={[styles.label, focused && styles.labelActive]}>
            {iconSet.label}
          </Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

/**
 * FloatingTabBar — premium floating pill with bubble-style active tab.
 */
export const FloatingTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, spacing.sm);

  return (
    <View pointerEvents="box-none" style={styles.wrapper}>
      <View style={[styles.bar, { marginBottom: bottomInset }]}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const { options } = descriptors[route.key];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TabItem
              key={route.key}
              routeName={route.name as TabRouteName}
              focused={focused}
              onPress={onPress}
              onLongPress={onLongPress}
              accessibilityLabel={options.tabBarAccessibilityLabel}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: spacing.xl,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    minHeight: 68,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.9)',
    ...shadows.lg,
    elevation: Platform.OS === 'android' ? 12 : shadows.lg.elevation,
    width: '88%',
    maxWidth: 420,
  },
  tabPressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    minHeight: 44,
    borderRadius: radius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  bubbleActiveShadow: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: Platform.OS === 'android' ? 3 : 0,
  },
  labelWrap: {
    marginLeft: spacing.xs,
    overflow: 'hidden',
  },
  label: {
    ...typography.caption,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.primary,
  },
});

export default FloatingTabBar;
