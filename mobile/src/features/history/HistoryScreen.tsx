import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { AppStackParamList, BottomTabParamList } from '../../navigation/types';
import {
  DUMMY_HISTORY,
  HISTORY_FILTERS,
  type HistoryFilter,
  type ServiceHistoryItem,
} from './data';
import { HistoryCard } from './HistoryCard';
import {
  SCREEN_GRADIENT_COLORS,
  SCREEN_GRADIENT_END,
  SCREEN_GRADIENT_START,
  createStyles,
} from './styles';

type HistoryNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'History'>,
  NativeStackNavigationProp<AppStackParamList>
>;

/**
 * HistoryScreen
 * -------------
 * Premium Service History list with search, status filters, and detail navigation.
 */
export const HistoryScreen: React.FC = () => {
  const navigation = useNavigation<HistoryNavigationProp>();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<HistoryFilter>('All');

  // Filter by status chip and free-text search across service/provider fields.
  const filteredHistory = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return DUMMY_HISTORY.filter(item => {
      const matchesFilter =
        selectedFilter === 'All' || item.status === selectedFilter;

      const matchesSearch =
        normalizedQuery.length === 0 ||
        item.serviceType.toLowerCase().includes(normalizedQuery) ||
        item.providerName.toLowerCase().includes(normalizedQuery) ||
        item.bookingId.toLowerCase().includes(normalizedQuery);

      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, selectedFilter]);

  const handleViewDetails = useCallback(
    (item: ServiceHistoryItem) => {
      navigation.navigate('HistoryDetails', { historyId: item.id });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: ServiceHistoryItem }) => (
      <HistoryCard item={item} onViewDetails={handleViewDetails} />
    ),
    [handleViewDetails],
  );

  const listHeader = useMemo(
    () => (
      <View>
        <Text style={styles.headerTitle} accessibilityRole="header">
          Service History
        </Text>

        {/* Search bar */}
        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by service, provider, or booking ID"
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
            accessibilityLabel="Search service history"
            returnKeyType="search"
          />
        </View>

        {/* Status filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}>
          {HISTORY_FILTERS.map(filter => {
            const selected = selectedFilter === filter;

            return (
              <Pressable
                key={filter}
                onPress={() => setSelectedFilter(filter)}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                accessibilityLabel={`${filter} filter`}
                style={[styles.filterChip, selected && styles.filterChipSelected]}>
                <Text
                  style={[
                    styles.filterChipText,
                    selected && styles.filterChipTextSelected,
                  ]}>
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    ),
    [
      searchQuery,
      selectedFilter,
      styles.filterChip,
      styles.filterChipSelected,
      styles.filterChipText,
      styles.filterChipTextSelected,
      styles.filtersContent,
      styles.filtersScroll,
      styles.headerTitle,
      styles.searchIcon,
      styles.searchInput,
      styles.searchWrap,
    ],
  );

  const listEmpty = useMemo(
    () => (
      <View style={styles.emptyState}>
        <View style={styles.emptyIconWrap}>
          <Text style={styles.emptyIcon}>🧾</Text>
        </View>
        <Text style={styles.emptyTitle}>No service history yet</Text>
        <Text style={styles.emptySubtitle}>
          Your roadside assistance bookings will appear here once you request help.
        </Text>
      </View>
    ),
    [
      styles.emptyIcon,
      styles.emptyIconWrap,
      styles.emptyState,
      styles.emptySubtitle,
      styles.emptyTitle,
    ],
  );

  return (
    <LinearGradient
      colors={[...SCREEN_GRADIENT_COLORS]}
      start={SCREEN_GRADIENT_START}
      end={SCREEN_GRADIENT_END}
      style={styles.gradient}>
      {/* Bottom inset is handled by the floating tab bar. */}
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <FlatList
          data={filteredHistory}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={listEmpty}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HistoryScreen;
