import React, { memo, useMemo } from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';

import type { NotificationItem } from './data';
import { createStyles } from './styles';

type NotificationCardProps = {
  item: NotificationItem;
  onPress: (item: NotificationItem) => void;
};

/**
 * NotificationCard
 * ----------------
 * Reusable notification row with read/unread styling.
 */
export const NotificationCard: React.FC<NotificationCardProps> = memo(
  ({ item, onPress }) => {
    const { width } = useWindowDimensions();
    const styles = useMemo(() => createStyles(width), [width]);

    return (
      <Pressable
        onPress={() => onPress(item)}
        accessibilityRole="button"
        accessibilityLabel={item.title}
        style={[styles.card, !item.isRead && styles.cardUnread]}>
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>{item.icon}</Text>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={[styles.badge, item.isRead ? styles.badgeRead : styles.badgeUnread]}>
              <Text
                style={[
                  styles.badgeText,
                  item.isRead ? styles.badgeTextRead : styles.badgeTextUnread,
                ]}>
                {item.isRead ? 'Read' : 'Unread'}
              </Text>
            </View>
          </View>

          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </Pressable>
    );
  },
);

NotificationCard.displayName = 'NotificationCard';

export default NotificationCard;
