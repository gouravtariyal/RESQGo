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

/** Primary action gradient for Book Now. */
export const CTA_GRADIENT_COLORS = [colors.primary, BRAND_PRIMARY_DEEP, colors.secondary] as const;
export const CTA_GRADIENT_START = { x: 0.05, y: 0 };
export const CTA_GRADIENT_END = { x: 0.95, y: 1 };

/**
 * Builds responsive styles for the Nearby Services screen and cards.
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

    // Header
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
    headerTextWrap: {
      flex: 1,
    },
    locationLabel: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    locationValue: {
      ...typography.h3,
      fontSize: Math.round(fontSizes.xl * scale),
      color: colors.textPrimary,
      marginTop: spacing.xxs,
    },
    title: {
      ...typography.h1,
      fontSize: Math.round(fontSizes['3xl'] * scale),
      color: colors.textPrimary,
      marginBottom: spacing.md,
    },

    // Search
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
    searchIcon: {
      fontSize: Math.round(18 * scale),
    },
    searchInput: {
      flex: 1,
      ...typography.body,
      color: colors.textPrimary,
      paddingVertical: 0,
    },

    // Categories
    categoriesLabel: {
      ...typography.label,
      color: colors.textPrimary,
      marginBottom: spacing.sm,
    },
    categoriesScroll: {
      marginBottom: spacing.xl,
    },
    categoriesContent: {
      gap: spacing.sm,
      paddingRight: spacing.sm,
    },
    categoryChip: {
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
    },
    categoryChipSelected: {
      borderColor: colors.primary,
      backgroundColor: '#EFF6FF',
    },
    categoryChipText: {
      ...typography.label,
      color: colors.textSecondary,
    },
    categoryChipTextSelected: {
      color: colors.primary,
      fontWeight: fontWeights.semibold,
    },

    // Empty state
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing['4xl'],
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

    // Service card
    card: {
      backgroundColor: colors.surface,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.lg,
      marginBottom: spacing.md,
      ...shadows.md,
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
      width: Math.round(52 * scale),
      height: Math.round(52 * scale),
      borderRadius: Math.round(26 * scale),
      backgroundColor: '#EFF6FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      fontSize: Math.round(24 * scale),
    },
    cardInfo: {
      flex: 1,
      minWidth: 0,
    },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: spacing.sm,
    },
    serviceName: {
      ...typography.h3,
      fontSize: Math.round(fontSizes.xl * scale),
      color: colors.textPrimary,
      flex: 1,
    },
    statusBadge: {
      borderRadius: radius.full,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
    },
    statusOpen: {
      backgroundColor: '#DCFCE7',
    },
    statusClosed: {
      backgroundColor: '#FEE2E2',
    },
    statusText: {
      ...typography.caption,
      fontWeight: fontWeights.semibold,
    },
    statusTextOpen: {
      color: colors.success,
    },
    statusTextClosed: {
      color: colors.error,
    },
    categoryText: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      marginTop: spacing.xs,
    },
    statsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginTop: spacing.lg,
    },
    statChip: {
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
    },
    statChipText: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    actionsRow: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginTop: spacing.lg,
    },
    callButton: {
      flex: 1,
      minHeight: 46,
      borderRadius: radius.xl,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    callButtonText: {
      ...typography.button,
      color: colors.textPrimary,
      fontSize: Math.round(fontSizes.sm * scale),
    },
    bookButton: {
      flex: 1.2,
      borderRadius: radius.xl,
      overflow: 'hidden',
    },
    bookButtonDisabled: {
      opacity: 0.55,
    },
    bookGradient: {
      minHeight: 46,
      borderRadius: radius.xl,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.md,
    },
    bookButtonText: {
      ...typography.button,
      color: colors.textOnPrimary,
      fontSize: Math.round(fontSizes.sm * scale),
    },
  });
};
