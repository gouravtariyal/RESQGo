import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { spacing } from '../../theme/spacing';
import { fontSizes, fontWeights, typography } from '../../theme/typography';

const BASE_WIDTH = 375;

export const SCREEN_GRADIENT_COLORS = [colors.background, '#EEF2FF', colors.background] as const;
export const SCREEN_GRADIENT_START = { x: 0, y: 0 };
export const SCREEN_GRADIENT_END = { x: 1, y: 1 };

export const createStyles = (width: number) => {
  const scale = Math.min(Math.max(width / BASE_WIDTH, 0.9), 1.12);
  const horizontalPadding = Math.max(spacing.lg, Math.round(width * 0.06));

  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    gradient: { flex: 1 },
    listContent: {
      paddingHorizontal: horizontalPadding,
      paddingTop: spacing.lg,
      paddingBottom: spacing['4xl'],
      flexGrow: 1,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      marginBottom: spacing.lg,
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
    filtersScroll: { marginBottom: spacing.xl },
    filtersContent: { gap: spacing.sm, paddingRight: spacing.sm },
    filterChip: {
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
    },
    filterChipSelected: {
      borderColor: colors.primary,
      backgroundColor: '#EFF6FF',
    },
    filterChipText: { ...typography.label, color: colors.textSecondary },
    filterChipTextSelected: {
      color: colors.primary,
      fontWeight: fontWeights.semibold,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.lg,
      marginBottom: spacing.md,
      flexDirection: 'row',
      gap: spacing.md,
      ...shadows.sm,
    },
    cardUnread: {
      borderColor: '#BFDBFE',
      backgroundColor: '#F8FBFF',
    },
    iconWrap: {
      width: Math.round(44 * scale),
      height: Math.round(44 * scale),
      borderRadius: Math.round(22 * scale),
      backgroundColor: '#EFF6FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: { fontSize: Math.round(20 * scale) },
    cardBody: { flex: 1, minWidth: 0 },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: spacing.sm,
    },
    title: {
      ...typography.h3,
      fontSize: Math.round(fontSizes.lg * scale),
      color: colors.textPrimary,
      flex: 1,
    },
    badge: {
      borderRadius: radius.full,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
    },
    badgeUnread: { backgroundColor: '#DBEAFE' },
    badgeRead: { backgroundColor: colors.background },
    badgeText: {
      ...typography.caption,
      fontWeight: fontWeights.semibold,
    },
    badgeTextUnread: { color: colors.primary },
    badgeTextRead: { color: colors.textSecondary },
    description: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      marginTop: spacing.xs,
    },
    time: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: spacing.sm,
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing['5xl'],
      paddingHorizontal: spacing.xl,
    },
    emptyTitle: {
      ...typography.h3,
      color: colors.textPrimary,
      textAlign: 'center',
    },
    emptySubtitle: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: spacing.sm,
    },
  });
};
