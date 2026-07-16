import React, { memo, useEffect, useMemo, useRef } from 'react';
import { Animated, Pressable, Text, View, useWindowDimensions } from 'react-native';

import { createStyles } from './styles';
import type { Vehicle } from './types';

type VehicleCardProps = {
  vehicle: Vehicle;
  index?: number;
  expanded?: boolean;
  onToggleDetails: (vehicleId: string) => void;
  onEdit: (vehicleId: string) => void;
  onDelete: (vehicleId: string) => void;
};

/**
 * VehicleCard
 * -----------
 * Reusable premium card that shows core vehicle details and quick actions.
 */
export const VehicleCard: React.FC<VehicleCardProps> = memo(
  ({ vehicle, index = 0, expanded = false, onToggleDetails, onEdit, onDelete }) => {
    const { width } = useWindowDimensions();
    const styles = useMemo(() => createStyles(width), [width]);

    // Gentle entrance animation so the list feels polished.
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(12)).current;

    useEffect(() => {
      const animation = Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 320,
          delay: index * 70,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 320,
          delay: index * 70,
          useNativeDriver: true,
        }),
      ]);

      animation.start();

      return () => {
        animation.stop();
      };
    }, [index, opacity, translateY]);

    return (
      <Animated.View style={{ opacity, transform: [{ translateY }] }}>
        <Pressable
          onPress={() => onToggleDetails(vehicle.id)}
          accessibilityRole="button"
          accessibilityLabel={`${vehicle.name} vehicle card`}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
          {/* Top identity row */}
          <View style={styles.cardTopRow}>
            <View style={styles.vehicleIconWrap}>
              <Text style={styles.vehicleIcon}>{vehicle.icon}</Text>
            </View>

            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>{vehicle.name}</Text>
              <Text style={styles.vehicleNumber}>{vehicle.registrationNumber}</Text>
            </View>
          </View>

          {/* Quick meta chips keep the card scannable */}
          <View style={styles.metaRow}>
            <View style={styles.metaChip}>
              <Text style={styles.metaChipText}>{vehicle.fuelType}</Text>
            </View>
            <View style={styles.metaChip}>
              <Text style={styles.metaChipText}>{vehicle.color}</Text>
            </View>
            <View style={styles.metaChip}>
              <Text style={styles.metaChipText}>{vehicle.year}</Text>
            </View>
          </View>

          {/* Expanded details block */}
          {expanded ? (
            <View style={styles.detailsBlock}>
              <DetailRow label="Manufacturer" value={vehicle.manufacturer} />
              <DetailRow label="Model" value={vehicle.model} />
              <DetailRow label="Fuel Type" value={vehicle.fuelType} />
              <DetailRow label="Color" value={vehicle.color} />
              <DetailRow label="Year" value={vehicle.year} />
            </View>
          ) : null}

          {/* Quick actions */}
          <View style={styles.actionsRow}>
            <Pressable
              onPress={() => onEdit(vehicle.id)}
              accessibilityRole="button"
              accessibilityLabel={`Edit ${vehicle.name}`}
              style={[styles.actionButton, styles.actionButtonPrimary]}>
              <Text style={[styles.actionButtonText, styles.actionButtonTextPrimary]}>
                Edit
              </Text>
            </Pressable>

            <Pressable
              onPress={() => onDelete(vehicle.id)}
              accessibilityRole="button"
              accessibilityLabel={`Delete ${vehicle.name}`}
              style={[styles.actionButton, styles.actionButtonDanger]}>
              <Text style={[styles.actionButtonText, styles.actionButtonTextDanger]}>
                Delete
              </Text>
            </Pressable>

            <Pressable
              onPress={() => onToggleDetails(vehicle.id)}
              accessibilityRole="button"
              accessibilityLabel={`View details for ${vehicle.name}`}
              style={styles.actionButton}>
              <Text style={styles.actionButtonText}>
                {expanded ? 'Hide' : 'View Details'}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Animated.View>
    );
  },
);

VehicleCard.displayName = 'VehicleCard';

type DetailRowProps = {
  label: string;
  value: string;
};

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
};

export default VehicleCard;
