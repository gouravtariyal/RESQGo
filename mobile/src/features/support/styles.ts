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
    headerTextWrap: { flex: 1 },
    headerTitle: {
      ...typography.h1,
      fontSize: Math.round(fontSizes['3xl'] * scale),
      color: colors.textPrimary,
    },
    headerSubtitle: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      marginTop: spacing.xs,
    },
    searchWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: 52,
      borderRadius: radius.xl,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.xl,
      gap: spacing.sm,
      ...shadows.sm,
    },
    searchIcon: { fontSize: Math.round(18 * scale) },
    searchInput: {
      flex: 1,
      ...typography.body,
      color: colors.textPrimary,
      paddingVertical: 0,
    },
    sectionTitle: {
      ...typography.h3,
      color: colors.textPrimary,
      marginBottom: spacing.md,
    },
    faqCard: {
      backgroundColor: colors.surface,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.lg,
      marginBottom: spacing.md,
      ...shadows.sm,
    },
    faqHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.md,
    },
    faqQuestion: {
      ...typography.label,
      color: colors.textPrimary,
      flex: 1,
      fontWeight: fontWeights.semibold,
    },
    faqChevron: {
      ...typography.body,
      color: colors.textSecondary,
    },
    faqAnswer: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      marginTop: spacing.md,
      lineHeight: Math.round(fontSizes.sm * scale * 1.5),
    },
    channelCard: {
      backgroundColor: colors.surface,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.lg,
      marginBottom: spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      ...shadows.sm,
    },
    channelIconWrap: {
      width: Math.round(44 * scale),
      height: Math.round(44 * scale),
      borderRadius: Math.round(22 * scale),
      backgroundColor: '#EFF6FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    channelIcon: { fontSize: Math.round(20 * scale) },
    channelTextWrap: { flex: 1 },
    channelTitle: {
      ...typography.label,
      color: colors.textPrimary,
      fontWeight: fontWeights.semibold,
    },
    channelSubtitle: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: spacing.xxs,
    },
    ticketButton: {
      marginTop: spacing.sm,
      marginBottom: spacing.xl,
      borderRadius: radius['2xl'],
      overflow: 'hidden',
      ...shadows.md,
    },
    ticketGradient: {
      minHeight: 52,
      borderRadius: radius['2xl'],
      alignItems: 'center',
      justifyContent: 'center',
    },
    ticketText: {
      ...typography.button,
      color: colors.textOnPrimary,
    },
    hoursCard: {
      backgroundColor: '#EFF6FF',
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: '#BFDBFE',
      padding: spacing.lg,
    },
    hoursText: {
      ...typography.bodySmall,
      color: colors.primary,
      textAlign: 'center',
    },
    emptyText: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      marginBottom: spacing.lg,
    },
  });
};
