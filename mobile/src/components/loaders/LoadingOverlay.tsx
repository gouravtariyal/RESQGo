import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { colors } from '../../theme/colors';

type LoadingOverlayProps = {
  visible: boolean;
};

/**
 * Non-modal loading overlay (absolute fill).
 * Avoids Modal stacking issues that can leave screens looking blank.
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <View
      pointerEvents="auto"
      style={styles.backdrop}
      accessibilityLabel="Loading">
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    zIndex: 1000,
    elevation: 1000,
  },
});

export default LoadingOverlay;
