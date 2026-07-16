import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { spacing } from '../../theme/spacing';
import { fontSizes, fontWeights, typography } from '../../theme/typography';

const BRAND_PRIMARY_DEEP = '#1D4ED8';
const BASE_WIDTH = 375;

export const SCREEN_GRADIENT_COLORS = [colors.background, '#EEF2FF', colors.background] as const;
export const SCREEN_GRADIENT_START = { x: 0, y: 0 };
export const SCREEN_GRADIENT_END = { x: 1, y: 1 };

export const CTA_GRADIENT_COLORS = [colors.primary, BRAND_PRIMARY_DEEP] as const;
export const CTA_GRADIENT_START = { x: 0, y: 0 };
export const CTA_GRADIENT_END = { x: 1, y: 1 };

export const createStyles = (width: number) => {
  const scale = Math.min(Math.max(width / BASE_WIDTH, 0.9), 1.12);
  const horizontalPadding = Math.max(spacing.lg, Math.round(width * 0.06));

  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    gradient: { flex: 1 },
    scrollContent: {
      paddingHorizontal: horizontalPadding,
      paddingTop: spacing.lg,
      paddingBottom: spacing['4xl'],
      alignItems: 'stretch',
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      marginBottom: spacing.xl,
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
    headerTitle: {
      ...typography.h1,
      fontSize: Math.round(fontSizes['3xl'] * scale),
      color: colors.textPrimary,
      flex: 1,
    },
    heroCard: {
      backgroundColor: colors.surface,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.xl,
      alignItems: 'center',
      marginBottom: spacing.xl,
      ...shadows.md,
    },
    logoWrap: {
      width: Math.round(84 * scale),
      height: Math.round(84 * scale),
      borderRadius: Math.round(42 * scale),
      backgroundColor: '#EFF6FF',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.lg,
    },
    logoEmoji: { fontSize: Math.round(40 * scale) },
    appName: {
      ...typography.h2,
      color: colors.textPrimary,
    },
    version: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      marginTop: spacing.xs,
    },
    infoCard: {
      backgroundColor: colors.surface,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.xl,
      gap: spacing.lg,
      marginBottom: spacing.xl,
      ...shadows.sm,
    },
    infoBlock: { gap: spacing.xs },
    infoLabel: { ...typography.caption, color: colors.textSecondary },
    infoValue: { ...typography.body, color: colors.textPrimary },
    missionText: {
      ...typography.body,
      color: colors.textSecondary,
      lineHeight: Math.round(fontSizes.md * scale * 1.5),
    },
    socialRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginBottom: spacing.xl,
    },
    socialChip: {
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
    },
    socialText: {
      ...typography.label,
      color: colors.primary,
      fontWeight: fontWeights.semibold,
    },
    actionsRow: { gap: spacing.md },
    primaryButton: {
      borderRadius: radius['2xl'],
      overflow: 'hidden',
      ...shadows.md,
    },
    primaryGradient: {
      minHeight: 52,
      borderRadius: radius['2xl'],
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryText: {
      ...typography.button,
      color: colors.textOnPrimary,
    },
    secondaryButton: {
      minHeight: 52,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    secondaryText: {
      ...typography.button,
      color: colors.textPrimary,
    },
  });
};
