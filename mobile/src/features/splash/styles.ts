import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSizes, fontWeights, typography } from '../../theme/typography';

/**
 * Brand mid-tone for the splash gradient.
 * Matches the splash design spec (#1D4ED8). Start/end stops use theme tokens.
 * Promote into `theme/colors` when the shared palette expands.
 */
const BRAND_PRIMARY_DEEP = '#1D4ED8';

const BASE_WIDTH = 375;

/** Full-screen blue depth gradient: primary → deep blue → secondary */
export const SPLASH_GRADIENT_COLORS = [
  colors.primary,
  BRAND_PRIMARY_DEEP,
  colors.secondary,
] as const;

export const SPLASH_GRADIENT_START = { x: 0.1, y: 0 };
export const SPLASH_GRADIENT_END = { x: 0.9, y: 1 };

/**
 * Builds responsive splash styles from window width.
 */
export const createStyles = (width: number) => {
  const scale = Math.min(Math.max(width / BASE_WIDTH, 0.85), 1.2);
  const horizontalPadding = Math.max(spacing['2xl'], Math.round(width * 0.08));

  return StyleSheet.create({
    gradient: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: horizontalPadding,
      paddingTop: spacing['3xl'],
      paddingBottom: spacing['2xl'],
    },
    hero: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoWrap: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing['2xl'],
    },
    logoEmoji: {
      fontSize: Math.round(64 * scale),
      textAlign: 'center',
    },
    appName: {
      ...typography.display,
      fontSize: Math.round(fontSizes['4xl'] * scale),
      lineHeight: Math.round(fontSizes['4xl'] * scale * 1.15),
      fontWeight: fontWeights.bold,
      color: colors.textOnPrimary,
      textAlign: 'center',
      letterSpacing: 0.5,
      marginBottom: spacing.sm,
    },
    subtitle: {
      ...typography.body,
      fontSize: Math.round(fontSizes.md * scale),
      color: colors.textOnPrimary,
      textAlign: 'center',
      opacity: 0.92,
      marginBottom: spacing.lg,
      paddingHorizontal: spacing.md,
    },
    tagline: {
      ...typography.label,
      fontSize: Math.round(fontSizes.sm * scale),
      fontWeight: fontWeights.medium,
      color: colors.textOnPrimary,
      textAlign: 'center',
      letterSpacing: 1.2,
      opacity: 0.78,
      textTransform: 'uppercase',
    },
    footer: {
      alignItems: 'center',
      paddingBottom: spacing.sm,
      gap: spacing.xs,
    },
    version: {
      ...typography.caption,
      color: colors.textOnPrimary,
      textAlign: 'center',
      opacity: 0.7,
    },
    credit: {
      ...typography.caption,
      color: colors.textOnPrimary,
      textAlign: 'center',
      opacity: 0.65,
    },
  });
};
