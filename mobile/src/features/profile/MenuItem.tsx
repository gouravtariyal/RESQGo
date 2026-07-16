import React, { memo, useMemo } from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';

import type { ProfileMenuItem } from './data';
import { createStyles } from './styles';

type MenuItemProps = {
  item: ProfileMenuItem;
  isLast?: boolean;
  onPress: (item: ProfileMenuItem) => void;
};

/**
 * MenuItem
 * --------
 * Reusable profile quick-action row with icon, title, and chevron.
 */
export const MenuItem: React.FC<MenuItemProps> = memo(
  ({ item, isLast = false, onPress }) => {
    const { width } = useWindowDimensions();
    const styles = useMemo(() => createStyles(width), [width]);

    return (
      <Pressable
        onPress={() => onPress(item)}
        accessibilityRole="button"
        accessibilityLabel={item.title}
        style={({ pressed }) => [
          styles.menuItem,
          isLast && styles.menuItemLast,
          pressed && styles.menuItemPressed,
        ]}>
        <View
          style={[
            styles.menuIconWrap,
            item.destructive && styles.menuIconWrapDanger,
          ]}>
          <Text style={styles.menuIcon}>{item.icon}</Text>
        </View>

        <Text
          style={[styles.menuTitle, item.destructive && styles.menuTitleDanger]}>
          {item.title}
        </Text>

        <Text style={styles.menuChevron}>{'>'}</Text>
      </Pressable>
    );
  },
);

MenuItem.displayName = 'MenuItem';

export default MenuItem;
