import React, { memo, useCallback, useMemo } from 'react';
import { FlatList, Pressable, Text, View, useWindowDimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  HERO_GRADIENT_COLORS,
  HERO_GRADIENT_END,
  HERO_GRADIENT_START,
  SCREEN_GRADIENT_COLORS,
  SCREEN_GRADIENT_END,
  SCREEN_GRADIENT_START,
  createStyles,
} from './styles';

type QuickAction = {
  id: string;
  title: string;
  icon: string;
};

const QUICK_ACTIONS: QuickAction[] = [
  { id: 'emergency-sos', title: 'Emergency SOS', icon: '🚨' },
  { id: 'nearby-mechanics', title: 'Nearby Mechanics', icon: '🛠️' },
  { id: 'fuel-delivery', title: 'Fuel Delivery', icon: '⛽' },
  { id: 'ev-charging', title: 'EV Charging', icon: '🔋' },
  { id: 'tow-truck', title: 'Tow Truck', icon: '🚚' },
  { id: 'flat-tyre-help', title: 'Flat Tyre Help', icon: '🛞' },
];

const BOTTOM_NAV_ITEMS = ['Home', 'History', 'Profile', 'Settings'] as const;

/**
 * HomeScreen
 * ----------
 * Premium dashboard shown after authentication.
 * It presents the most common help paths and recent account context in one place.
 */
export const HomeScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  // These handlers are placeholders for future feature navigation wiring.
  const handleGetHelp = useCallback(() => {
    // Intentionally ready for AI assistant or help flow navigation.
  }, []);

  const handleQuickActionPress = useCallback((actionId: string) => {
    void actionId;
    // Intentionally ready for future quick-action navigation.
  }, []);

  const renderQuickAction = useCallback(
    ({ item }: { item: QuickAction }) => (
      <QuickActionCard
        icon={item.icon}
        title={item.title}
        onPress={() => handleQuickActionPress(item.id)}
      />
    ),
    [handleQuickActionPress],
  );

  const listHeader = useMemo(
    () => (
      <View>
        {/* Top header gives the user immediate personal context. */}
        <View style={styles.header}>
          <View style={styles.headerTextWrap}>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.userName}>Gourav</Text>

            <View style={styles.locationRow}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.locationText}>Current Location</Text>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
          </Pressable>
        </View>

        {/* Hero card promotes the fastest help path in a premium visual block. */}
        <View style={styles.heroCard}>
          <LinearGradient
            colors={[...HERO_GRADIENT_COLORS]}
            start={HERO_GRADIENT_START}
            end={HERO_GRADIENT_END}
            style={styles.heroGradient}>
            <View>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>RESQGo AI Assistant</Text>
              </View>

              <Text style={styles.heroTitle}>Need roadside help?</Text>
              <Text style={styles.heroDescription}>
                Our AI will guide you instantly.
              </Text>
            </View>

            <Pressable
              onPress={handleGetHelp}
              accessibilityRole="button"
              accessibilityLabel="Get Help"
              style={styles.heroButton}>
              <Text style={styles.heroButtonText}>Get Help</Text>
            </Pressable>
          </LinearGradient>
        </View>

        {/* Quick actions highlight the most common help categories. */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
      </View>
    ),
    [
      handleGetHelp,
      styles.greeting,
      styles.header,
      styles.headerTextWrap,
      styles.heroBadge,
      styles.heroBadgeText,
      styles.heroButton,
      styles.heroButtonText,
      styles.heroCard,
      styles.heroDescription,
      styles.heroGradient,
      styles.heroTitle,
      styles.locationIcon,
      styles.locationRow,
      styles.locationText,
      styles.notificationButton,
      styles.notificationIcon,
      styles.section,
      styles.sectionTitle,
      styles.userName,
    ],
  );

  const listFooter = useMemo(
    () => (
      <View>
        {/* Nearby services card shows the closest trusted service option. */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Services</Text>
          <SurfaceCard>
            <View style={styles.serviceHeader}>
              <View style={styles.serviceNameWrap}>
                <Text style={styles.serviceName}>Sharma Auto Care</Text>
                <Text style={styles.serviceMeta}>Nearest mechanic near your location</Text>
              </View>

              <View style={styles.serviceStatusWrap}>
                <Text style={styles.serviceStatusText}>Open</Text>
              </View>
            </View>

            <View style={styles.serviceStatsRow}>
              <StatBlock label="Distance" value="1.8 km" />
              <StatBlock label="Rating" value="4.8 / 5" />
              <StatBlock label="Status" value="Open Now" />
            </View>
          </SurfaceCard>
        </View>

        {/* Recent activity gives users quick confidence about their last request. */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <SurfaceCard>
            <Text style={styles.activityLabel}>Last roadside request</Text>
            <Text style={styles.activityValue}>Battery jump-start assistance</Text>

            <Text style={styles.activityLabel}>Vehicle details</Text>
            <Text style={styles.activityValue}>Hyundai i20 Sportz - White</Text>

            <Text style={styles.activityLabel}>Status</Text>
            <View style={styles.activityStatusWrap}>
              <Text style={styles.activityStatusText}>Technician On The Way</Text>
            </View>
          </SurfaceCard>
        </View>

        {/* Bottom navigation is a visual placeholder until the real tab bar arrives. */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Navigation</Text>
          <View style={styles.bottomNav}>
            {BOTTOM_NAV_ITEMS.map(item => {
              const isActive = item === 'Home';

              return (
                <Pressable
                  key={item}
                  accessibilityRole="button"
                  accessibilityLabel={item}
                  style={[
                    styles.bottomNavItem,
                    isActive && styles.bottomNavItemActive,
                  ]}>
                  <Text
                    style={[
                      styles.bottomNavText,
                      isActive && styles.bottomNavTextActive,
                    ]}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    ),
    [
      styles.activityLabel,
      styles.activityStatusText,
      styles.activityStatusWrap,
      styles.activityValue,
      styles.bottomNav,
      styles.bottomNavItem,
      styles.bottomNavItemActive,
      styles.bottomNavText,
      styles.bottomNavTextActive,
      styles.section,
      styles.sectionTitle,
      styles.serviceHeader,
      styles.serviceMeta,
      styles.serviceName,
      styles.serviceNameWrap,
      styles.serviceStatsRow,
      styles.serviceStatusText,
      styles.serviceStatusWrap,
    ],
  );

  return (
    <LinearGradient
      colors={[...SCREEN_GRADIENT_COLORS]}
      start={SCREEN_GRADIENT_START}
      end={SCREEN_GRADIENT_END}
      style={styles.gradient}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <FlatList
          data={QUICK_ACTIONS}
          keyExtractor={item => item.id}
          renderItem={renderQuickAction}
          numColumns={2}
          columnWrapperStyle={styles.actionRow}
          ListHeaderComponent={listHeader}
          ListFooterComponent={listFooter}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

type QuickActionCardProps = {
  icon: string;
  title: string;
  onPress: () => void;
};

/**
 * SurfaceCard
 * -----------
 * Reusable dashboard wrapper that keeps section cards visually consistent.
 */
const SurfaceCard: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  return <View style={styles.card}>{children}</View>;
};

/**
 * QuickActionCard
 * ---------------
 * Reusable action tile used inside the quick action grid.
 */
const QuickActionCard: React.FC<QuickActionCardProps> = memo(({ icon, title, onPress }) => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={styles.actionCard}>
      <View style={styles.actionIconWrap}>
        <Text style={styles.actionIcon}>{icon}</Text>
      </View>

      <Text style={styles.actionTitle}>{title}</Text>
    </Pressable>
  );
});
QuickActionCard.displayName = 'QuickActionCard';

type StatBlockProps = {
  label: string;
  value: string;
};

/**
 * StatBlock
 * ---------
 * Small reusable value pair used inside the nearby service card.
 */
const StatBlock: React.FC<StatBlockProps> = memo(({ label, value }) => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  return (
    <View style={styles.statBlock}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
});
StatBlock.displayName = 'StatBlock';

export default HomeScreen;
