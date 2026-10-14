import { StyleSheet } from 'react-native';

import { colors, palette } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { spacing } from '../../theme/spacing';
import { fontSizes, fontWeights } from '../../theme/typography';

const BASE_WIDTH = 375;

/** Primary call-to-action teal gradient matching new design. */
export const CTA_GRADIENT_COLORS = [palette.teal500, palette.teal600, palette.teal700] as const;
export const CTA_GRADIENT_START = { x: 0, y: 0 };
export const CTA_GRADIENT_END = { x: 1, y: 1 };

/** Vibrant Teal screen gradient. */
export const SCREEN_GRADIENT_COLORS = ['#14B8A6', '#0D9488', '#0F766E'] as const;
export const SCREEN_GRADIENT_START = { x: 0, y: 0 };
export const SCREEN_GRADIENT_END = { x: 0.8, y: 1 };

export const createStyles = (width: number, height: number) => {
  const scale = Math.min(Math.max(width / BASE_WIDTH, 0.9), 1.15);
  const heroMinHeight = Math.max(Math.round(height * 0.28), 180);

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0F766E',
    },
    gradient: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    keyboardView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },

    // --- Top Hero Banner ---
    heroHeader: {
      minHeight: heroMinHeight,
      paddingHorizontal: spacing['2xl'],
      paddingTop: spacing.xl,
      paddingBottom: spacing.lg,
      justifyContent: 'center',
      position: 'relative',
    },
    heroTitle: {
      fontSize: Math.round(24 * scale),
      lineHeight: Math.round(32 * scale),
      fontWeight: fontWeights.bold,
      color: '#FFFFFF',
      maxWidth: '75%',
      letterSpacing: -0.3,
    },
    heroTitleHighlight: {
      color: '#CCFBF1',
      fontWeight: fontWeights.bold,
    },

    // --- Bottom White Sheet Container ---
    bottomSheet: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: 36,
      borderTopRightRadius: 36,
      paddingHorizontal: Math.max(spacing['2xl'], Math.round(width * 0.07)),
      paddingTop: spacing['2xl'],
      paddingBottom: spacing['2xl'],
      ...shadows.lg,
    },

    // Title & Sign up prompt
    sheetHeader: {
      alignItems: 'center',
      marginBottom: spacing.xl,
    },
    sheetTitle: {
      fontSize: Math.round(26 * scale),
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      marginBottom: spacing.xs,
    },
    subRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    subRowText: {
      fontSize: Math.round(13 * scale),
      color: colors.textSecondary,
    },
    subRowLink: {
      fontSize: Math.round(13 * scale),
      color: palette.teal600,
      fontWeight: fontWeights.bold,
    },

    // --- Form Controls ---
    formGroup: {
      gap: spacing.md,
      marginBottom: spacing.lg,
    },

    // Pill input container
    pillInputWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F3F4F6',
      borderRadius: radius.full,
      height: 52,
      paddingHorizontal: spacing.lg,
      borderWidth: 1.5,
      borderColor: 'transparent',
    },
    pillInputWrapFocused: {
      borderColor: palette.teal600,
      backgroundColor: '#FFFFFF',
    },
    pillInputWrapError: {
      borderColor: colors.error,
      backgroundColor: '#FEF2F2',
    },
    inputIcon: {
      marginRight: spacing.sm,
    },
    pillInput: {
      flex: 1,
      fontSize: Math.round(14 * scale),
      color: colors.textPrimary,
      paddingVertical: 0,
    },

    // Country code badge inside pill
    countryCodeBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
      paddingRight: spacing.sm,
      marginRight: spacing.xs,
      borderRightWidth: 1,
      borderRightColor: '#D1D5DB',
    },
    countryCodeText: {
      fontSize: Math.round(14 * scale),
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary,
    },

    // Remember Me & Forgot Password Row
    optionsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: spacing.xs,
      paddingHorizontal: spacing.xs,
    },
    rememberMeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    checkbox: {
      width: 18,
      height: 18,
      borderRadius: 4,
      borderWidth: 1.5,
      borderColor: '#9CA3AF',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
    },
    checkboxChecked: {
      borderColor: palette.teal600,
      backgroundColor: palette.teal600,
    },
    rememberMeText: {
      fontSize: Math.round(13 * scale),
      color: colors.textSecondary,
    },
    forgotPasswordText: {
      fontSize: Math.round(13 * scale),
      color: palette.teal600,
      fontWeight: fontWeights.semibold,
    },

    errorText: {
      fontSize: 12,
      color: colors.error,
      marginTop: -4,
      paddingHorizontal: spacing.md,
    },

    // Primary Action (Login button)
    primaryButton: {
      borderRadius: radius.full,
      overflow: 'hidden',
      marginTop: spacing.md,
      ...shadows.sm,
    },
    primaryButtonDisabled: {
      opacity: 0.6,
    },
    primaryGradient: {
      height: 52,
      borderRadius: radius.full,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryButtonText: {
      color: colors.textOnPrimary,
      fontSize: Math.round(fontSizes.md * scale),
      fontWeight: fontWeights.bold,
      letterSpacing: 0.3,
    },

    // --- Or Continue With Divider ---
    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: spacing.xl,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#E5E7EB',
    },
    dividerText: {
      fontSize: Math.round(12 * scale),
      color: '#9CA3AF',
      paddingHorizontal: spacing.md,
      fontWeight: fontWeights.medium,
    },

    // --- Social Login Buttons (Apple & Google) ---
    socialRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    },
    socialButton: {
      flex: 1,
      height: 48,
      borderRadius: radius.full,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
    },
    appleButton: {
      backgroundColor: '#0F172A',
    },
    appleButtonText: {
      color: '#FFFFFF',
      fontSize: Math.round(14 * scale),
      fontWeight: fontWeights.semibold,
    },
    googleButton: {
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: '#E5E7EB',
    },
    googleButtonText: {
      color: '#1F2937',
      fontSize: Math.round(14 * scale),
      fontWeight: fontWeights.semibold,
    },
  });
};
