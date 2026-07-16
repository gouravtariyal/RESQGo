import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Linking,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { AppStackParamList } from '../../navigation/types';
import { DUMMY_SERVICES } from './data';
import { ServiceCard } from './ServiceCard';
import {
  SCREEN_GRADIENT_COLORS,
  SCREEN_GRADIENT_END,
  SCREEN_GRADIENT_START,
  createStyles,
} from './styles';
import {
  SERVICE_CATEGORIES,
  type NearbyService,
  type ServiceCategory,
} from './types';

type ServicesNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'NearbyServices'
>;

/**
 * ServicesScreen
 * --------------
 * Premium Nearby Services experience with search, category filters, and provider cards.
 */
export const ServicesScreen: React.FC = () => {
  const navigation = useNavigation<ServicesNavigationProp>();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('All');

  // Filter services by selected category and free-text search.
  const filteredServices = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return DUMMY_SERVICES.filter(service => {
      const matchesCategory =
        selectedCategory === 'All' || service.category === selectedCategory;

      const matchesSearch =
        normalizedQuery.length === 0 ||
        service.name.toLowerCase().includes(normalizedQuery) ||
        service.category.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleCall = useCallback(async (service: NearbyService) => {
    const phoneUrl = `tel:${service.phoneNumber}`;
    const canOpen = await Linking.canOpenURL(phoneUrl);

    if (!canOpen) {
      Alert.alert('Unable to place call', `Try calling ${service.phoneNumber} manually.`);
      return;
    }

    await Linking.openURL(phoneUrl);
  }, []);

  const handleBook = useCallback((service: NearbyService) => {
    if (service.status === 'Closed') {
      Alert.alert('Currently closed', `${service.name} is closed right now.`);
      return;
    }

    Alert.alert(
      'Booking started',
      `Your request for ${service.name} has been prepared. Live booking will connect here next.`,
    );
  }, []);

  const renderService = useCallback(
    ({ item }: { item: NearbyService }) => (
      <ServiceCard service={item} onCall={handleCall} onBook={handleBook} />
    ),
    [handleBook, handleCall],
  );

  const listHeader = useMemo(
    () => (
      <View>
        {/* Top header with back button and current location */}
        <View style={styles.headerRow}>
          <Pressable
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={styles.backButton}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </Pressable>

          <View style={styles.headerTextWrap}>
            <Text style={styles.locationLabel}>Current Location</Text>
            <Text style={styles.locationValue}>Connaught Place, New Delhi</Text>
          </View>
        </View>

        <Text style={styles.title} accessibilityRole="header">
          Nearby Services
        </Text>

        {/* Search bar for provider or category lookup */}
        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search mechanics, fuel, EV..."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
            accessibilityLabel="Search nearby services"
            returnKeyType="search"
          />
        </View>

        {/* Horizontal category chips */}
        <Text style={styles.categoriesLabel}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}>
          {SERVICE_CATEGORIES.map(category => {
            const selected = selectedCategory === category;

            return (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                accessibilityLabel={`${category} category`}
                style={[styles.categoryChip, selected && styles.categoryChipSelected]}>
                <Text
                  style={[
                    styles.categoryChipText,
                    selected && styles.categoryChipTextSelected,
                  ]}>
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    ),
    [
      navigation,
      searchQuery,
      selectedCategory,
      styles.backButton,
      styles.backButtonText,
      styles.categoriesContent,
      styles.categoriesLabel,
      styles.categoriesScroll,
      styles.categoryChip,
      styles.categoryChipSelected,
      styles.categoryChipText,
      styles.categoryChipTextSelected,
      styles.headerRow,
      styles.headerTextWrap,
      styles.locationLabel,
      styles.locationValue,
      styles.searchIcon,
      styles.searchInput,
      styles.searchWrap,
      styles.title,
    ],
  );

  const listEmpty = useMemo(
    () => (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>No services found</Text>
        <Text style={styles.emptySubtitle}>
          Try another category or clear your search to see nearby providers.
        </Text>
      </View>
    ),
    [styles.emptyState, styles.emptySubtitle, styles.emptyTitle],
  );

  return (
    <LinearGradient
      colors={[...SCREEN_GRADIENT_COLORS]}
      start={SCREEN_GRADIENT_START}
      end={SCREEN_GRADIENT_END}
      style={styles.gradient}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <FlatList
          data={filteredServices}
          keyExtractor={item => item.id}
          renderItem={renderService}
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

export default ServicesScreen;
