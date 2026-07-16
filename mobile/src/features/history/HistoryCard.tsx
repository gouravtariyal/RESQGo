import React, { memo, useMemo } from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';

import { formatAmount, type HistoryStatus, type ServiceHistoryItem } from './data';
import { createStyles } from './styles';

type HistoryCardProps = {
  item: ServiceHistoryItem;
  onViewDetails: (item: ServiceHistoryItem) => void;
};

/**
 * Picks badge colors based on the booking status.
 */
const getStatusStyles = (
  status: HistoryStatus,
  styles: ReturnType<typeof createStyles>,
) => {
  switch (status) {
    case 'Completed':
      return {
        badge: styles.statusCompleted,
        text: styles.statusTextCompleted,
      };
    case 'Cancelled':
      return {
        badge: styles.statusCancelled,
        text: styles.statusTextCancelled,
      };
    case 'In Progress':
    default:
      return {
        badge: styles.statusInProgress,
        text: styles.statusTextInProgress,
      };
  }
};

/**
 * HistoryCard
 * -----------
 * Reusable service-history card with status, provider, amount, and details CTA.
 */
export const HistoryCard: React.FC<HistoryCardProps> = memo(
  ({ item, onViewDetails }) => {
    const { width } = useWindowDimensions();
    const styles = useMemo(() => createStyles(width), [width]);
    const statusStyles = getStatusStyles(item.status, styles);

    return (
      <Pressable
        onPress={() => onViewDetails(item)}
        accessibilityRole="button"
        accessibilityLabel={`${item.serviceType} history card`}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
        <View style={styles.cardTopRow}>
          <View style={styles.iconWrap}>
            <Text style={styles.icon}>{item.icon}</Text>
          </View>

          <View style={styles.cardInfo}>
            <View style={styles.titleRow}>
              <Text style={styles.serviceType}>{item.serviceType}</Text>

              <View style={[styles.statusBadge, statusStyles.badge]}>
                <Text style={[styles.statusText, statusStyles.text]}>
                  {item.status}
                </Text>
              </View>
            </View>

            <Text style={styles.metaText}>{`${item.date} · ${item.time}`}</Text>
            <Text style={styles.providerText}>{item.providerName}</Text>
            <Text style={styles.amountText}>{formatAmount(item.amount)}</Text>
          </View>
        </View>

        <Pressable
          onPress={() => onViewDetails(item)}
          accessibilityRole="button"
          accessibilityLabel={`View details for ${item.serviceType}`}
          style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>View Details</Text>
        </Pressable>
      </Pressable>
    );
  },
);

HistoryCard.displayName = 'HistoryCard';

export default HistoryCard;
