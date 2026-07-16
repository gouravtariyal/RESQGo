import React, { useMemo } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { createPlaceholderStyles } from './styles';

/**
 * HistoryScreen
 * -------------
 * Placeholder for past roadside requests and service history.
 */
export const HistoryScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createPlaceholderStyles(width), [width]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <Text style={styles.title} accessibilityRole="header">
          History Screen
        </Text>
        <Text style={styles.subtitle}>
          Your previous roadside assistance requests will appear here.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HistoryScreen;
