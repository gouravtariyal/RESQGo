import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { spacing } from '../../theme/spacing';
import { fontSizes, fontWeights, typography } from '../../theme/typography';

const BRAND_PRIMARY_DEEP = '#1D4ED8';
const BASE_WIDTH = 375;

/** Soft page background gradient. */
export const SCREEN_GRADIENT_COLORS = [colors.background, '#EEF2FF', colors.background] as const;
export const SCREEN_GRADIENT_START = { x: 0, y: 0 };
export const SCREEN_GRADIENT_END = { x: 1, y: 1 };

/** Send button gradient. */
export const CTA_GRADIENT_COLORS = [colors.primary, BRAND_PRIMARY_DEEP] as const;
export const CTA_GRADIENT_START = { x: 0, y: 0 };
export const CTA_GRADIENT_END = { x: 1, y: 1 };

/**
 * Builds responsive styles for the AI Assistant chat experience.
 */
export const createStyles = (width: number) => {
  const scale = Math.min(Math.max(width / BASE_WIDTH, 0.9), 1.12);
  const horizontalPadding = Math.max(spacing.lg, Math.round(width * 0.05));
  const bubbleMaxWidth = Math.round(width * 0.78);

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

    // Header
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: horizontalPadding,
      paddingTop: spacing.sm,
      paddingBottom: spacing.md,
      gap: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: 'rgba(248, 250, 252, 0.92)',
    },
    backButton: {
      width: 40,
      height: 40,
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
    avatarWrap: {
      width: Math.round(44 * scale),
      height: Math.round(44 * scale),
      borderRadius: Math.round(22 * scale),
      backgroundColor: '#EFF6FF',
      borderWidth: 1,
      borderColor: '#BFDBFE',
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarEmoji: {
      fontSize: Math.round(22 * scale),
    },
    headerTextWrap: {
      flex: 1,
      minWidth: 0,
    },
    headerTitle: {
      ...typography.h3,
      fontSize: Math.round(fontSizes.xl * scale),
      color: colors.textPrimary,
    },
    onlineRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      marginTop: spacing.xxs,
    },
    onlineDot: {
      width: 8,
      height: 8,
      borderRadius: radius.full,
      backgroundColor: colors.success,
    },
    onlineText: {
      ...typography.caption,
      color: colors.success,
      fontWeight: fontWeights.semibold,
    },

    // Chat list
    listContent: {
      paddingHorizontal: horizontalPadding,
      paddingTop: spacing.lg,
      paddingBottom: spacing.lg,
      flexGrow: 1,
    },
    bubbleRow: {
      marginBottom: spacing.md,
      maxWidth: bubbleMaxWidth,
    },
    bubbleRowUser: {
      alignSelf: 'flex-end',
    },
    bubbleRowAi: {
      alignSelf: 'flex-start',
    },
    bubble: {
      borderRadius: radius['2xl'],
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      ...shadows.sm,
    },
    bubbleUser: {
      backgroundColor: colors.primary,
      borderBottomRightRadius: radius.sm,
    },
    bubbleAi: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderBottomLeftRadius: radius.sm,
    },
    bubbleText: {
      ...typography.body,
      fontSize: Math.round(fontSizes.md * scale),
      lineHeight: Math.round(fontSizes.md * scale * 1.45),
    },
    bubbleTextUser: {
      color: colors.textOnPrimary,
    },
    bubbleTextAi: {
      color: colors.textPrimary,
    },
    timestamp: {
      ...typography.caption,
      marginTop: spacing.xs,
    },
    timestampUser: {
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'right',
    },
    timestampAi: {
      color: colors.textSecondary,
      textAlign: 'left',
    },

    // Composer / input area
    inputBar: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: spacing.sm,
      paddingHorizontal: horizontalPadding,
      paddingTop: spacing.md,
      paddingBottom: spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.surface,
    },
    inputWrap: {
      flex: 1,
      minHeight: 48,
      maxHeight: 120,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      justifyContent: 'center',
    },
    input: {
      ...typography.body,
      color: colors.textPrimary,
      paddingVertical: 0,
      maxHeight: 96,
    },
    sendButton: {
      width: 48,
      height: 48,
      borderRadius: radius.full,
      overflow: 'hidden',
      ...shadows.sm,
    },
    sendButtonDisabled: {
      opacity: 0.45,
    },
    sendGradient: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.full,
    },
    sendIcon: {
      ...typography.button,
      color: colors.textOnPrimary,
      fontSize: Math.round(fontSizes.lg * scale),
    },
  });
};
