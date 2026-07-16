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

/** Primary action gradient. */
export const CTA_GRADIENT_COLORS = [colors.primary, BRAND_PRIMARY_DEEP] as const;
export const CTA_GRADIENT_START = { x: 0, y: 0 };
export const CTA_GRADIENT_END = { x: 1, y: 1 };

/**
 * Builds responsive styles for Service History list and details screens.
 */
export const createStyles = (width: number) => {
  const scale = Math.min(Math.max(width / BASE_WIDTH, 0.9), 1.12);
  const horizontalPadding = Math.max(spacing.lg, Math.round(width * 0.06));

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    gradient: {
      flex: 1,
    },
    listContent: {
      paddingHorizontal: horizontalPadding,
      paddingTop: spacing.lg,
      paddingBottom: spacing['6xl'] + spacing['3xl'],
      flexGrow: 1,
    },
    detailsScrollContent: {
      paddingHorizontal: horizontalPadding,
      paddingTop: spacing.lg,
      paddingBottom: spacing['4xl'],
    },

    // List header
    headerTitle: {
      ...typography.h1,
      fontSize: Math.round(fontSizes['3xl'] * scale),
      color: colors.textPrimary,
      marginBottom: spacing.md,
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
      marginBottom: spacing.lg,
      gap: spacing.sm,
      ...shadows.sm,
    },
    searchIcon: {
      fontSize: Math.round(18 * scale),
    },
    searchInput: {
      flex: 1,
      ...typography.body,
      color: colors.textPrimary,
      paddingVertical: 0,
    },
    filtersScroll: {
      marginBottom: spacing.xl,
    },
    filtersContent: {
      gap: spacing.sm,
      paddingRight: spacing.sm,
    },
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
    filterChipText: {
      ...typography.label,
      color: colors.textSecondary,
    },
    filterChipTextSelected: {
      color: colors.primary,
      fontWeight: fontWeights.semibold,
    },

    // Empty state
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing['5xl'],
      paddingHorizontal: spacing.xl,
    },
    emptyIconWrap: {
      width: Math.round(72 * scale),
      height: Math.round(72 * scale),
      borderRadius: Math.round(36 * scale),
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.lg,
      ...shadows.sm,
    },
    emptyIcon: {
      fontSize: Math.round(30 * scale),
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
      lineHeight: Math.round(fontSizes.sm * scale * 1.5),
    },

    // History card
    card: {
      backgroundColor: colors.surface,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.lg,
      marginBottom: spacing.md,
      ...shadows.sm,
    },
    cardPressed: {
      opacity: 0.97,
      transform: [{ scale: 0.99 }],
    },
    cardTopRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing.md,
    },
    iconWrap: {
      width: Math.round(48 * scale),
      height: Math.round(48 * scale),
      borderRadius: Math.round(24 * scale),
      backgroundColor: '#EFF6FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      fontSize: Math.round(22 * scale),
    },
    cardInfo: {
      flex: 1,
      minWidth: 0,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: spacing.sm,
    },
    serviceType: {
      ...typography.h3,
      fontSize: Math.round(fontSizes.lg * scale),
      color: colors.textPrimary,
      flex: 1,
    },
    statusBadge: {
      borderRadius: radius.full,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
    },
    statusCompleted: {
      backgroundColor: '#DCFCE7',
    },
    statusCancelled: {
      backgroundColor: '#FEE2E2',
    },
    statusInProgress: {
      backgroundColor: '#FEF3C7',
    },
    statusText: {
      ...typography.caption,
      fontWeight: fontWeights.semibold,
    },
    statusTextCompleted: {
      color: colors.success,
    },
    statusTextCancelled: {
      color: colors.error,
    },
    statusTextInProgress: {
      color: colors.warning,
    },
    metaText: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      marginTop: spacing.xs,
    },
    providerText: {
      ...typography.label,
      color: colors.textPrimary,
      marginTop: spacing.md,
    },
    amountText: {
      ...typography.h3,
      fontSize: Math.round(fontSizes.lg * scale),
      color: colors.primary,
      marginTop: spacing.sm,
    },
    detailsButton: {
      marginTop: spacing.lg,
      minHeight: 42,
      borderRadius: radius.xl,
      borderWidth: 1,
      borderColor: '#BFDBFE',
      backgroundColor: '#EFF6FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    detailsButtonText: {
      ...typography.label,
      color: colors.primary,
      fontWeight: fontWeights.semibold,
    },

    // Details screen
    detailsHeaderRow: {
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
    detailsHeaderText: {
      flex: 1,
    },
    detailsTitle: {
      ...typography.h1,
      fontSize: Math.round(fontSizes['3xl'] * scale),
      color: colors.textPrimary,
    },
    detailsSubtitle: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      marginTop: spacing.xs,
    },
    detailsCard: {
      backgroundColor: colors.surface,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.xl,
      ...shadows.sm,
      gap: spacing.lg,
    },
    detailBlock: {
      gap: spacing.xs,
    },
    detailLabel: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    detailValue: {
      ...typography.body,
      color: colors.textPrimary,
    },
    detailValueStrong: {
      ...typography.h3,
      fontSize: Math.round(fontSizes.lg * scale),
      color: colors.textPrimary,
    },
    missingState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: horizontalPadding,
    },
  });
};
