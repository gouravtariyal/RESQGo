import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { AppStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import {
  DUMMY_NOTIFICATIONS,
  NOTIFICATION_FILTERS,
  type NotificationCategory,
  type NotificationItem,
} from './data';
import { NotificationCard } from './NotificationCard';
import {
  SCREEN_GRADIENT_COLORS,
  SCREEN_GRADIENT_END,
  SCREEN_GRADIENT_START,
  createStyles,
} from './styles';

type NotificationsNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'Notifications'
>;

/**
 * NotificationsScreen
 * -------------------
 * Premium notifications inbox with category filters and dummy pull-to-refresh.
 */
export const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation<NotificationsNavigationProp>();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  const [items, setItems] = useState<NotificationItem[]>(DUMMY_NOTIFICATIONS);
  const [filter, setFilter] = useState<NotificationCategory>('All');
  const [refreshing, setRefreshing] = useState(false);

  const filteredItems = useMemo(() => {
    if (filter === 'All') {
      return items;
    }

    if (filter === 'Unread') {
      return items.filter(item => !item.isRead);
    }

    return items.filter(item => item.category === filter);
  }, [filter, items]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);

    // Dummy refresh delay — no backend call.
    setTimeout(() => {
      setItems([...DUMMY_NOTIFICATIONS]);
      setRefreshing(false);
    }, 900);
  }, []);

  const handlePress = useCallback((item: NotificationItem) => {
    setItems(current =>
      current.map(entry =>
        entry.id === item.id ? { ...entry, isRead: true } : entry,
      ),
    );
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: NotificationItem }) => (
      <NotificationCard item={item} onPress={handlePress} />
    ),
    [handlePress],
  );

  const listHeader = useMemo(
    () => (
      <View>
        <View style={styles.headerRow}>
          <Pressable
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={styles.backButton}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </Pressable>
          <Text style={styles.headerTitle} accessibilityRole="header">
            Notifications
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}>
          {NOTIFICATION_FILTERS.map(option => {
            const selected = filter === option;

            return (
              <Pressable
                key={option}
                onPress={() => setFilter(option)}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                style={[styles.filterChip, selected && styles.filterChipSelected]}>
                <Text
                  style={[
                    styles.filterChipText,
                    selected && styles.filterChipTextSelected,
                  ]}>
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    ),
    [filter, navigation, styles],
  );

  const listEmpty = useMemo(
    () => (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>No notifications</Text>
        <Text style={styles.emptySubtitle}>
          You are all caught up. New alerts will appear here.
        </Text>
      </View>
    ),
    [styles],
  );

  return (
    <LinearGradient
      colors={[...SCREEN_GRADIENT_COLORS]}
      start={SCREEN_GRADIENT_START}
      end={SCREEN_GRADIENT_END}
      style={styles.gradient}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <FlatList
          data={filteredItems}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={listEmpty}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default NotificationsScreen;
