import { StyleSheet } from 'react-native';

import { colors, palette } from '../../../theme/colors';
import { radius } from '../../../theme/radius';
import { shadows } from '../../../theme/shadows';
import { spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights, typography } from '../../../theme/typography';

const BASE_WIDTH = 375;
const OTP_BOX_SIZE = 52;

/** Premium teal primary button gradient. */
export const CTA_GRADIENT_COLORS = [palette.teal500, palette.teal600, palette.teal700] as const;
export const CTA_GRADIENT_START = { x: 0, y: 0 };
export const CTA_GRADIENT_END = { x: 1, y: 1 };

/** Soft branded background wash. */
export const SCREEN_GRADIENT_COLORS = [colors.background, '#EEF2FF', colors.background] as const;
export const SCREEN_GRADIENT_START = { x: 0, y: 0 };
export const SCREEN_GRADIENT_END = { x: 1, y: 1 };

/**
 * Creates responsive styles for the OTP verification screen.
 * Width-based scaling keeps the 6 input boxes usable on smaller devices.
 */
export const createStyles = (width: number) => {
  const scale = Math.min(Math.max(width / BASE_WIDTH, 0.9), 1.1);
  const scrollPaddingHorizontal = Math.max(spacing.lg, Math.round(width * 0.05));
  const cardPaddingHorizontal = Math.max(spacing.sm, Math.round(width * 0.03));

  // Available width strictly inside the form card
  const innerCardWidth = width - scrollPaddingHorizontal * 2 - cardPaddingHorizontal * 2;
  const boxGap = Math.max(5, Math.min(8, Math.floor(innerCardWidth * 0.025)));
  const calculatedWidth = Math.floor((innerCardWidth - boxGap * 5) / 6);
  const otpBoxWidth = Math.min(48, Math.max(38, calculatedWidth));
  const otpBoxHeight = Math.round(otpBoxWidth * 1.18);

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
      paddingHorizontal: scrollPaddingHorizontal,
      paddingTop: spacing.xl,
      paddingBottom: spacing['2xl'],
    },
    container: {
      flex: 1,
    },

    // Top navigation and brand content.
    headerRow: {
      alignItems: 'flex-start',
      marginBottom: spacing['2xl'],
    },
    backButton: {
      minHeight: 40,
      minWidth: 40,
      borderRadius: radius.full,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      ...shadows.sm,
    },
    backButtonText: {
      ...typography.h3,
      color: colors.textPrimary,
      lineHeight: Math.round(fontSizes.xl * 1.1),
    },
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
      lineHeight: Math.round(fontSizes.md * scale * 1.5),
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: spacing.sm,
      paddingHorizontal: spacing.md,
    },
    phoneText: {
      ...typography.label,
      color: colors.primary,
      marginTop: spacing.sm,
      textAlign: 'center',
    },

    // Main OTP form card.
    formCard: {
      backgroundColor: colors.surface,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      paddingVertical: spacing.xl,
      paddingHorizontal: cardPaddingHorizontal,
      ...shadows.sm,
    },
    otpRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: boxGap,
    },
    otpBox: {
      width: otpBoxWidth,
      height: otpBoxHeight,
      borderRadius: radius.lg,
      borderWidth: 1.5,
      borderColor: colors.border,
      backgroundColor: colors.background,
      textAlign: 'center',
      color: colors.textPrimary,
      ...typography.h3,
      fontSize: Math.round(18 * scale),
      fontWeight: fontWeights.semibold,
      paddingVertical: 0,
      paddingHorizontal: 0,
    },
    otpBoxFocused: {
      borderColor: colors.primary,
      backgroundColor: colors.surface,
    },
    otpBoxFilled: {
      borderColor: colors.primary,
      backgroundColor: '#EFF6FF',
    },
    otpHelper: {
      ...typography.caption,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: spacing.lg,
    },
    otpError: {
      ...typography.caption,
      color: colors.error,
      textAlign: 'center',
      marginTop: spacing.lg,
    },

    // Timer and resend actions.
    timerWrap: {
      alignItems: 'center',
      marginTop: spacing.xl,
    },
    timerText: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    resendButton: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
    },
    resendText: {
      ...typography.bodySmall,
      color: colors.primary,
      fontWeight: fontWeights.semibold,
      textAlign: 'center',
    },

    // Primary footer action.
    footer: {
      marginTop: 'auto',
      paddingTop: spacing['3xl'],
    },
    verifyButton: {
      borderRadius: radius['2xl'],
      overflow: 'hidden',
    },
    verifyButtonDisabled: {
      opacity: 0.6,
    },
    verifyGradient: {
      minHeight: 56,
      borderRadius: radius['2xl'],
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing['2xl'],
    },
    verifyText: {
      ...typography.button,
      fontSize: Math.round(fontSizes.lg * scale),
      color: colors.textOnPrimary,
      fontWeight: fontWeights.semibold,
      letterSpacing: 0.3,
    },
  });
};
