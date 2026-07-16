import React, { memo, useMemo } from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';

import type { FAQItem } from './data';
import { createStyles } from './styles';

type FAQCardProps = {
  item: FAQItem;
  expanded: boolean;
  onToggle: (id: string) => void;
};

/**
 * FAQCard
 * -------
 * Expandable FAQ row used on the Help & Support screen.
 */
export const FAQCard: React.FC<FAQCardProps> = memo(({ item, expanded, onToggle }) => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  return (
    <Pressable
      onPress={() => onToggle(item.id)}
      accessibilityRole="button"
      accessibilityState={{ expanded }}
      accessibilityLabel={item.question}
      style={styles.faqCard}>
      <View style={styles.faqHeader}>
        <Text style={styles.faqQuestion}>{item.question}</Text>
        <Text style={styles.faqChevron}>{expanded ? '−' : '+'}</Text>
      </View>
      {expanded ? <Text style={styles.faqAnswer}>{item.answer}</Text> : null}
    </Pressable>
  );
});

FAQCard.displayName = 'FAQCard';

export default FAQCard;
