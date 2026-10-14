import { StyleSheet } from 'react-native';

import { colors, palette } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { spacing } from '../../theme/spacing';
import { fontSizes, fontWeights, typography } from '../../theme/typography';

const BASE_WIDTH = 375;

/** Primary call-to-action teal gradient matching new design. */
export const CTA_GRADIENT_COLORS = [palette.teal500, palette.teal600, palette.teal700] as const;
export const CTA_GRADIENT_START = { x: 0, y: 0 };
export const CTA_GRADIENT_END = { x: 1, y: 1 };

/** Vibrant Teal hero background gradient. */
export const HERO_GRADIENT_COLORS = ['#14B8A6', '#0D9488', '#0F766E'] as const;
export const HERO_GRADIENT_START = { x: 0, y: 0 };
export const HERO_GRADIENT_END = { x: 0.8, y: 1 };

export const createStyles = (width: number, height: number) => {
  const scale = Math.min(Math.max(width / BASE_WIDTH, 0.9), 1.15);
  const heroHeight = Math.max(Math.round(height * 0.48), 280);

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0F766E',
    },
    heroGradient: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },

    // --- Top Hero Section with Graphic ---
    heroSection: {
      height: heroHeight,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.md,
    },

    // --- Bottom Rounded White Card ---
    bottomCard: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: 36,
      borderTopRightRadius: 36,
      paddingHorizontal: Math.max(spacing['2xl'], Math.round(width * 0.08)),
      paddingTop: spacing['3xl'],
      paddingBottom: spacing['3xl'],
      alignItems: 'center',
      ...shadows.lg,
    },

    // Brand Title (in place of "ASANA")
    brandTitle: {
      fontSize: Math.round(32 * scale),
      fontWeight: fontWeights.bold,
      color: palette.teal600,
      letterSpacing: 3.5,
      textAlign: 'center',
      marginBottom: spacing.md,
      fontFamily: typography.h1.fontFamily,
    },

    // Headline
    headline: {
      fontSize: Math.round(23 * scale),
      lineHeight: Math.round(23 * scale * 1.25),
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      textAlign: 'center',
      marginBottom: spacing.xs,
    },

    // Subtitle / context
    subHeadline: {
      fontSize: Math.round(fontSizes.sm * scale),
      fontWeight: fontWeights.semibold,
      color: palette.teal700,
      textAlign: 'center',
      marginBottom: spacing.sm,
    },

    // Description text
    description: {
      ...typography.body,
      fontSize: Math.round(fontSizes.md * scale),
      lineHeight: Math.round(fontSizes.md * scale * 1.5),
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: spacing['2xl'],
      paddingHorizontal: spacing.sm,
    },

    // Feature chips (compact roadside context indicators)
    featuresRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
      marginBottom: spacing['2xl'],
      flexWrap: 'wrap',
    },
    featureChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      backgroundColor: palette.teal50,
      paddingHorizontal: spacing.md,
      paddingVertical: 6,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: '#CCFBF1',
    },
    featureChipText: {
      fontSize: 12,
      fontWeight: fontWeights.medium,
      color: palette.teal800,
    },

    // Actions
    ctaContainer: {
      width: '100%',
      gap: spacing.lg,
    },
    ctaPressable: {
      borderRadius: radius.full,
      overflow: 'hidden',
      ...shadows.sm,
    },
    ctaGradient: {
      height: 54,
      borderRadius: radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing['2xl'],
    },
    ctaText: {
      ...typography.button,
      color: colors.textOnPrimary,
      fontSize: Math.round(fontSizes.lg * scale),
      fontWeight: fontWeights.bold,
      letterSpacing: 0.5,
    },

    // Already have an account row
    loginRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.xs,
      paddingVertical: spacing.xs,
    },
    loginHint: {
      ...typography.bodySmall,
      color: colors.textSecondary,
    },
    loginLink: {
      ...typography.bodySmall,
      color: palette.teal600,
      fontWeight: fontWeights.bold,
    },
  });
};
