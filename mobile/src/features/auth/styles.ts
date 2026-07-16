import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { spacing } from '../../theme/spacing';
import { fontSizes, fontWeights, typography } from '../../theme/typography';

/**
 * Deeper brand blue used to enrich premium gradients.
 * This stays feature-local until the shared palette grows.
 */
const BRAND_PRIMARY_DEEP = '#1D4ED8';

const BASE_WIDTH = 375;

/** Shared premium button gradient. */
export const CTA_GRADIENT_COLORS = [colors.primary, BRAND_PRIMARY_DEEP, colors.secondary] as const;
export const CTA_GRADIENT_START = { x: 0.05, y: 0 };
export const CTA_GRADIENT_END = { x: 0.95, y: 1 };

/** Soft premium page background. */
export const SCREEN_GRADIENT_COLORS = [colors.background, '#EEF2FF', colors.background] as const;
export const SCREEN_GRADIENT_START = { x: 0, y: 0 };
export const SCREEN_GRADIENT_END = { x: 1, y: 1 };

/**
 * Creates responsive styles for the login screen.
 * Width-based scaling keeps the UI balanced across smaller and larger phones.
 */
export const createStyles = (width: number) => {
  const scale = Math.min(Math.max(width / BASE_WIDTH, 0.9), 1.15);
  const horizontalPadding = Math.max(spacing['2xl'], Math.round(width * 0.07));

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    gradient: {
      flex: 1,
    },
    keyboardView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: horizontalPadding,
      paddingTop: spacing['3xl'],
      paddingBottom: spacing['2xl'],
    },
    container: {
      flex: 1,
    },

    // Top branding and welcome copy.
    hero: {
      alignItems: 'center',
      marginBottom: spacing['3xl'],
    },
    logoWrap: {
      width: Math.round(72 * scale),
      height: Math.round(72 * scale),
      borderRadius: Math.round(36 * scale),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.surface,
      marginBottom: spacing.lg,
      ...shadows.md,
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
      ...typography.body,
      fontSize: Math.round(fontSizes.md * scale),
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: spacing.sm,
      paddingHorizontal: spacing.md,
    },

    // Main login form card.
    formCard: {
      backgroundColor: colors.surface,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.xl,
      ...shadows.sm,
    },
    label: {
      ...typography.label,
      color: colors.textPrimary,
      marginBottom: spacing.sm,
    },
    phoneRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    countryCodeButton: {
      minHeight: 56,
      paddingHorizontal: spacing.md,
      borderRadius: radius.xl,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.xs,
    },
    countryCodeText: {
      ...typography.body,
      color: colors.textPrimary,
      fontWeight: fontWeights.semibold,
    },
    countryChevron: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    phoneInputWrap: {
      flex: 1,
      minHeight: 56,
      borderRadius: radius.xl,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      justifyContent: 'center',
      paddingHorizontal: spacing.lg,
    },
    phoneInputWrapFocused: {
      borderColor: colors.primary,
    },
    phoneInputWrapError: {
      borderColor: colors.error,
    },
    phoneInput: {
      ...typography.body,
      color: colors.textPrimary,
      paddingVertical: 0,
    },
    helperText: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: spacing.sm,
    },
    errorText: {
      ...typography.caption,
      color: colors.error,
      marginTop: spacing.sm,
    },

    // Primary and secondary actions.
    actions: {
      marginTop: spacing.xl,
      gap: spacing.md,
    },
    continueButton: {
      borderRadius: radius['2xl'],
      overflow: 'hidden',
    },
    continueButtonDisabled: {
      opacity: 0.6,
    },
    continueGradient: {
      minHeight: 56,
      borderRadius: radius['2xl'],
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing['2xl'],
    },
    continueText: {
      ...typography.button,
      fontSize: Math.round(fontSizes.lg * scale),
      color: colors.textOnPrimary,
      fontWeight: fontWeights.semibold,
      letterSpacing: 0.3,
    },
    googleButton: {
      minHeight: 56,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: spacing.sm,
      paddingHorizontal: spacing['2xl'],
    },
    googleIcon: {
      ...typography.h3,
      color: colors.primary,
    },
    googleText: {
      ...typography.button,
      color: colors.textPrimary,
    },

    // Footer assistance copy.
    footer: {
      alignItems: 'center',
      marginTop: 'auto',
      paddingTop: spacing['2xl'],
      paddingBottom: spacing.sm,
    },
    helpText: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });
};
