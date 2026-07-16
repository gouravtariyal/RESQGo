import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { spacing } from '../../theme/spacing';
import { fontSizes, fontWeights, typography } from '../../theme/typography';

/**
 * Extra brand stop for a richer premium gradient.
 * (Intentionally kept local until the palette expands.)
 */
const BRAND_PRIMARY_DEEP = '#1D4ED8';

const BASE_WIDTH = 375;

/** Primary call-to-action gradient. */
export const CTA_GRADIENT_COLORS = [colors.primary, BRAND_PRIMARY_DEEP, colors.secondary] as const;
export const CTA_GRADIENT_START = { x: 0.05, y: 0 };
export const CTA_GRADIENT_END = { x: 0.95, y: 1 };

/** Soft background tint behind the hero area. */
export const HERO_GRADIENT_COLORS = [colors.background, '#EEF2FF', colors.background] as const;
export const HERO_GRADIENT_START = { x: 0, y: 0 };
export const HERO_GRADIENT_END = { x: 1, y: 1 };

/**
 * Responsive onboarding styles derived from window width.
 * We scale typography + spacing conservatively to keep layouts stable.
 */
export const createStyles = (width: number) => {
  const scale = Math.min(Math.max(width / BASE_WIDTH, 0.9), 1.15);
  const horizontalPadding = Math.max(spacing['2xl'], Math.round(width * 0.07));

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    heroGradient: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: horizontalPadding,
      paddingTop: spacing['3xl'],
      paddingBottom: spacing['2xl'],
    },

    // --- Top / hero ---
    top: {
      alignItems: 'center',
      marginBottom: spacing['2xl'],
    },
    logoWrap: {
      width: Math.round(72 * scale),
      height: Math.round(72 * scale),
      borderRadius: Math.round(36 * scale),
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      ...shadows.md,
      marginBottom: spacing.lg,
    },
    logoEmoji: {
      fontSize: Math.round(40 * scale),
    },
    title: {
      ...typography.h1,
      fontSize: Math.round(fontSizes['3xl'] * scale),
      lineHeight: Math.round(fontSizes['3xl'] * scale * 1.15),
      color: colors.textPrimary,
      textAlign: 'center',
    },
    subtitle: {
      ...typography.label,
      fontSize: Math.round(fontSizes.md * scale),
      fontWeight: fontWeights.semibold,
      color: colors.primary,
      textAlign: 'center',
      marginTop: spacing.sm,
    },
    description: {
      ...typography.body,
      fontSize: Math.round(fontSizes.md * scale),
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: spacing.md,
      paddingHorizontal: spacing.md,
      lineHeight: Math.round(fontSizes.md * scale * 1.55),
    },

    // --- Feature cards ---
    features: {
      marginTop: spacing['2xl'],
      gap: spacing.md,
    },
    featureCard: {
      backgroundColor: colors.surface,
      borderRadius: radius.xl,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.lg,
      ...shadows.sm,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    },
    featureIconWrap: {
      width: Math.round(44 * scale),
      height: Math.round(44 * scale),
      borderRadius: Math.round(22 * scale),
      backgroundColor: '#EFF6FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    featureIcon: {
      fontSize: Math.round(22 * scale),
    },
    featureTitle: {
      ...typography.h3,
      fontSize: Math.round(fontSizes.xl * scale),
      lineHeight: Math.round(fontSizes.xl * scale * 1.25),
      color: colors.textPrimary,
      flexShrink: 1,
    },
    featureSubtitle: {
      ...typography.bodySmall,
      fontSize: Math.round(fontSizes.sm * scale),
      color: colors.textSecondary,
      marginTop: spacing.xs,
      flexShrink: 1,
    },
    featureText: {
      flex: 1,
      minWidth: 0,
    },

    // --- Bottom / actions ---
    bottom: {
      marginTop: 'auto',
      paddingTop: spacing['2xl'],
      gap: spacing.md,
    },
    ctaPressable: {
      borderRadius: radius['2xl'],
      overflow: 'hidden',
    },
    ctaGradient: {
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing['2xl'],
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius['2xl'],
    },
    ctaText: {
      ...typography.button,
      color: colors.textOnPrimary,
      fontSize: Math.round(fontSizes.lg * scale),
      fontWeight: fontWeights.semibold,
      letterSpacing: 0.3,
    },
    loginRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.xs,
      paddingBottom: spacing.sm,
    },
    loginHint: {
      ...typography.bodySmall,
      color: colors.textSecondary,
    },
    loginLink: {
      ...typography.bodySmall,
      color: colors.primary,
      fontWeight: fontWeights.semibold,
    },
  });
};

