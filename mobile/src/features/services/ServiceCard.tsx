import React, { memo, useMemo } from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  CTA_GRADIENT_COLORS,
  CTA_GRADIENT_END,
  CTA_GRADIENT_START,
  createStyles,
} from './styles';
import type { NearbyService } from './types';

type ServiceCardProps = {
  service: NearbyService;
  onCall: (service: NearbyService) => void;
  onBook: (service: NearbyService) => void;
};

/**
 * ServiceCard
 * -----------
 * Reusable premium card that shows a nearby provider and quick actions.
 */
export const ServiceCard: React.FC<ServiceCardProps> = memo(
  ({ service, onCall, onBook }) => {
    const { width } = useWindowDimensions();
    const styles = useMemo(() => createStyles(width), [width]);
    const isOpen = service.status === 'Open';

    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${service.name} service card`}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
        {/* Identity row: icon, name, open/closed badge */}
        <View style={styles.cardTopRow}>
          <View style={styles.iconWrap}>
            <Text style={styles.icon}>{service.icon}</Text>
          </View>

          <View style={styles.cardInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.serviceName}>{service.name}</Text>

              <View
                style={[
                  styles.statusBadge,
                  isOpen ? styles.statusOpen : styles.statusClosed,
                ]}>
                <Text
                  style={[
                    styles.statusText,
                    isOpen ? styles.statusTextOpen : styles.statusTextClosed,
                  ]}>
                  {service.status}
                </Text>
              </View>
            </View>

            <Text style={styles.categoryText}>{service.category}</Text>
          </View>
        </View>

        {/* Key service stats in compact chips */}
        <View style={styles.statsRow}>
          <View style={styles.statChip}>
            <Text style={styles.statChipText}>{`${service.distanceKm.toFixed(1)} km`}</Text>
          </View>
          <View style={styles.statChip}>
            <Text style={styles.statChipText}>{`★ ${service.rating.toFixed(1)}`}</Text>
          </View>
          <View style={styles.statChip}>
            <Text style={styles.statChipText}>{`ETA ${service.etaMinutes} min`}</Text>
          </View>
        </View>

        {/* Quick actions for call and booking */}
        <View style={styles.actionsRow}>
          <Pressable
            onPress={() => onCall(service)}
            accessibilityRole="button"
            accessibilityLabel={`Call ${service.name}`}
            style={styles.callButton}>
            <Text style={styles.callButtonText}>Call</Text>
          </Pressable>

          <Pressable
            onPress={() => onBook(service)}
            disabled={!isOpen}
            accessibilityRole="button"
            accessibilityLabel={`Book ${service.name}`}
            style={[styles.bookButton, !isOpen && styles.bookButtonDisabled]}>
            <LinearGradient
              colors={[...CTA_GRADIENT_COLORS]}
              start={CTA_GRADIENT_START}
              end={CTA_GRADIENT_END}
              style={styles.bookGradient}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </Pressable>
    );
  },
);

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
