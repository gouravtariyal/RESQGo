import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSizes, typography } from '../../theme/typography';

const BASE_WIDTH = 375;

/**
 * Shared placeholder styles for the Profile feature.
 */
export const createPlaceholderStyles = (width: number) => {
  const scale = Math.min(Math.max(width / BASE_WIDTH, 0.9), 1.15);
  const horizontalPadding = Math.max(spacing['2xl'], Math.round(width * 0.07));

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: horizontalPadding,
      paddingBottom: spacing['6xl'],
    },
    title: {
      ...typography.h1,
      fontSize: Math.round(fontSizes['3xl'] * scale),
      color: colors.textPrimary,
      textAlign: 'center',
    },
    subtitle: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: spacing.md,
    },
  });
};
