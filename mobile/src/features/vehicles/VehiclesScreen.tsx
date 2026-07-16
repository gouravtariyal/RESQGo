import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  Text,
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
import { VehicleCard } from './VehicleCard';
import {
  CTA_GRADIENT_COLORS,
  CTA_GRADIENT_END,
  CTA_GRADIENT_START,
  SCREEN_GRADIENT_COLORS,
  SCREEN_GRADIENT_END,
  SCREEN_GRADIENT_START,
  createStyles,
} from './styles';
import type { Vehicle } from './types';
import { useVehicles } from './vehiclesStore';

type VehiclesNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Vehicles'>,
  NativeStackNavigationProp<AppStackParamList>
>;

/**
 * VehiclesScreen
 * --------------
 * Premium vehicle management list with empty state, cards, and a floating Add button.
 */
export const VehiclesScreen: React.FC = () => {
  const navigation = useNavigation<VehiclesNavigationProp>();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);
  const { vehicles, deleteVehicle } = useVehicles();
  const [expandedVehicleId, setExpandedVehicleId] = useState<string | null>(null);

  // Open the Add Vehicle stack screen above the tab navigator.
  const handleAddVehicle = useCallback(() => {
    navigation.navigate('AddVehicle');
  }, [navigation]);

  const handleEditVehicle = useCallback(
    (vehicleId: string) => {
      navigation.navigate('AddVehicle', { vehicleId });
    },
    [navigation],
  );

  // Confirm before removing a vehicle from local storage.
  const handleDeleteVehicle = useCallback(
    (vehicleId: string) => {
      const vehicle = vehicles.find(item => item.id === vehicleId);

      Alert.alert(
        'Delete vehicle?',
        `Remove ${vehicle?.name ?? 'this vehicle'} from your garage?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              deleteVehicle(vehicleId);
              setExpandedVehicleId(current =>
                current === vehicleId ? null : current,
              );
            },
          },
        ],
      );
    },
    [deleteVehicle, vehicles],
  );

  const handleToggleDetails = useCallback((vehicleId: string) => {
    setExpandedVehicleId(current => (current === vehicleId ? null : vehicleId));
  }, []);

  const renderVehicle = useCallback(
    ({ item, index }: { item: Vehicle; index: number }) => (
      <VehicleCard
        vehicle={item}
        index={index}
        expanded={expandedVehicleId === item.id}
        onToggleDetails={handleToggleDetails}
        onEdit={handleEditVehicle}
        onDelete={handleDeleteVehicle}
      />
    ),
    [
      expandedVehicleId,
      handleDeleteVehicle,
      handleEditVehicle,
      handleToggleDetails,
    ],
  );

  const listHeader = useMemo(
    () => (
      <View style={styles.header}>
        <Text style={styles.headerTitle} accessibilityRole="header">
          My Vehicles
        </Text>
        <Text style={styles.headerSubtitle}>
          Manage your cars and keep roadside help one tap away.
        </Text>
      </View>
    ),
    [styles.header, styles.headerSubtitle, styles.headerTitle],
  );

  return (
    <LinearGradient
      colors={[...SCREEN_GRADIENT_COLORS]}
      start={SCREEN_GRADIENT_START}
      end={SCREEN_GRADIENT_END}
      style={styles.gradient}>
      {/* Bottom safe area is handled by the floating tab bar. */}
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        {vehicles.length === 0 ? (
          // Empty state encourages the first vehicle add.
          <View style={styles.emptyState}>
            <View style={styles.emptyIconWrap}>
              <Text style={styles.emptyIcon}>🚗</Text>
            </View>
            <Text style={styles.emptyTitle}>No vehicles added yet.</Text>
            <Text style={styles.emptySubtitle}>
              Tap the button below to add your first vehicle.
            </Text>
          </View>
        ) : (
          <FlatList
            data={vehicles}
            keyExtractor={item => item.id}
            renderItem={renderVehicle}
            ListHeaderComponent={listHeader}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Floating Add Vehicle CTA stays reachable above the tab bar. */}
        <Pressable
          onPress={handleAddVehicle}
          accessibilityRole="button"
          accessibilityLabel="Add Vehicle"
          style={styles.fab}>
          <LinearGradient
            colors={[...CTA_GRADIENT_COLORS]}
            start={CTA_GRADIENT_START}
            end={CTA_GRADIENT_END}
            style={styles.fabGradient}>
            <Text style={styles.fabIcon}>+</Text>
            <Text style={styles.fabText}>Add Vehicle</Text>
          </LinearGradient>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default VehiclesScreen;
