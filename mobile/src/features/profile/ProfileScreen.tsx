import React, { useMemo } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { createPlaceholderStyles } from './styles';

/**
 * ProfileScreen
 * -------------
 * Placeholder for account details, preferences, and settings entry points.
 */
export const ProfileScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createPlaceholderStyles(width), [width]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <Text style={styles.title} accessibilityRole="header">
          Profile Screen
        </Text>
        <Text style={styles.subtitle}>
          Your account information and profile settings will appear here.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
