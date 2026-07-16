import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { spacing } from '../../theme/spacing';
import { fontSizes, fontWeights, typography } from '../../theme/typography';

/**
 * Local richer blue used to give the dashboard a premium gradient treatment.
 * This can move into the shared palette when more screens reuse it.
 */
const BRAND_PRIMARY_DEEP = '#1D4ED8';

const BASE_WIDTH = 375;

/** Soft page background gradient. */
export const SCREEN_GRADIENT_COLORS = [colors.background, '#EEF2FF', colors.background] as const;
export const SCREEN_GRADIENT_START = { x: 0, y: 0 };
export const SCREEN_GRADIENT_END = { x: 1, y: 1 };

/** Hero card gradient. */
export const HERO_GRADIENT_COLORS = [colors.primary, BRAND_PRIMARY_DEEP, colors.secondary] as const;
export const HERO_GRADIENT_START = { x: 0.05, y: 0 };
export const HERO_GRADIENT_END = { x: 1, y: 1 };

/**
 * Builds responsive dashboard styles from screen width.
 * The scale is capped to keep cards readable across device sizes.
 */
export const createStyles = (width: number) => {
  const scale = Math.min(Math.max(width / BASE_WIDTH, 0.92), 1.15);
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
      paddingBottom: spacing['3xl'],
    },

    // Shared card shell used across dashboard sections.
    card: {
      backgroundColor: colors.surface,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.lg,
      ...shadows.sm,
    },
    section: {
      marginTop: spacing.xl,
    },
    sectionTitle: {
      ...typography.h3,
      fontSize: Math.round(fontSizes.xl * scale),
      lineHeight: Math.round(fontSizes.xl * scale * 1.2),
      color: colors.textPrimary,
      marginBottom: spacing.md,
    },

    // Header area.
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.xl,
    },
    headerTextWrap: {
      flex: 1,
      paddingRight: spacing.md,
    },
    greeting: {
      ...typography.label,
      color: colors.primary,
      marginBottom: spacing.xs,
    },
    userName: {
      ...typography.h1,
      fontSize: Math.round(fontSizes['3xl'] * scale),
      lineHeight: Math.round(fontSizes['3xl'] * scale * 1.1),
      color: colors.textPrimary,
    },
    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing.sm,
    },
    locationIcon: {
      ...typography.body,
      color: colors.primary,
      marginRight: spacing.xs,
    },
    locationText: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      flexShrink: 1,
    },
    notificationButton: {
      width: Math.round(48 * scale),
      height: Math.round(48 * scale),
      borderRadius: radius.full,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      ...shadows.sm,
    },
    notificationIcon: {
      fontSize: Math.round(22 * scale),
    },

    // Hero card.
    heroCard: {
      borderRadius: radius['2xl'],
      overflow: 'hidden',
      ...shadows.md,
    },
    heroGradient: {
      padding: spacing.xl,
      minHeight: Math.round(200 * scale),
      justifyContent: 'space-between',
    },
    heroBadge: {
      alignSelf: 'flex-start',
      backgroundColor: 'rgba(255, 255, 255, 0.14)',
      borderRadius: radius.full,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
    },
    heroBadgeText: {
      ...typography.caption,
      color: colors.textOnPrimary,
      letterSpacing: 0.4,
    },
    heroTitle: {
      ...typography.h2,
      fontSize: Math.round(fontSizes['2xl'] * scale),
      lineHeight: Math.round(fontSizes['2xl'] * scale * 1.2),
      color: colors.textOnPrimary,
      marginTop: spacing.lg,
    },
    heroDescription: {
      ...typography.body,
      color: colors.textOnPrimary,
      opacity: 0.92,
      marginTop: spacing.sm,
      maxWidth: '85%',
    },
    heroButton: {
      marginTop: spacing.xl,
      alignSelf: 'flex-start',
      backgroundColor: colors.surface,
      borderRadius: radius.full,
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.md,
    },
    heroButtonText: {
      ...typography.button,
      color: colors.primary,
    },

    // Quick actions.
    actionRow: {
      justifyContent: 'space-between',
      marginBottom: spacing.md,
    },
    actionCard: {
      flex: 1,
      minHeight: Math.round(124 * scale),
      marginHorizontal: spacing.xxs,
      padding: spacing.lg,
      borderRadius: radius.xl,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      ...shadows.sm,
      justifyContent: 'space-between',
    },
    actionIconWrap: {
      width: Math.round(44 * scale),
      height: Math.round(44 * scale),
      borderRadius: Math.round(22 * scale),
      backgroundColor: '#EFF6FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionIcon: {
      fontSize: Math.round(22 * scale),
    },
    actionTitle: {
      ...typography.label,
      fontSize: Math.round(fontSizes.sm * scale),
      lineHeight: Math.round(fontSizes.sm * scale * 1.35),
      color: colors.textPrimary,
      marginTop: spacing.md,
    },

    // Nearby service section.
    serviceHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: spacing.md,
    },
    serviceNameWrap: {
      flex: 1,
    },
    serviceName: {
      ...typography.h3,
      color: colors.textPrimary,
    },
    serviceMeta: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      marginTop: spacing.xs,
    },
    serviceStatusWrap: {
      borderRadius: radius.full,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      backgroundColor: '#DCFCE7',
    },
    serviceStatusText: {
      ...typography.caption,
      color: colors.success,
      fontWeight: fontWeights.semibold,
    },
    serviceStatsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: spacing.lg,
      gap: spacing.md,
    },
    statBlock: {
      flex: 1,
    },
    statLabel: {
      ...typography.caption,
      color: colors.textSecondary,
      marginBottom: spacing.xs,
    },
    statValue: {
      ...typography.label,
      color: colors.textPrimary,
    },

    // Recent activity.
    activityLabel: {
      ...typography.caption,
      color: colors.textSecondary,
      marginBottom: spacing.xs,
    },
    activityValue: {
      ...typography.body,
      color: colors.textPrimary,
      marginBottom: spacing.md,
    },
    activityStatusWrap: {
      alignSelf: 'flex-start',
      borderRadius: radius.full,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      backgroundColor: '#FEF3C7',
    },
    activityStatusText: {
      ...typography.caption,
      color: colors.warning,
      fontWeight: fontWeights.semibold,
    },

    // Bottom navigation placeholder.
    bottomNav: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: spacing['2xl'],
      padding: spacing.sm,
      borderRadius: radius.full,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      ...shadows.sm,
    },
    bottomNavItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.full,
      paddingVertical: spacing.md,
      marginHorizontal: spacing.xxs,
    },
    bottomNavItemActive: {
      backgroundColor: '#EFF6FF',
    },
    bottomNavText: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    bottomNavTextActive: {
      color: colors.primary,
      fontWeight: fontWeights.semibold,
    },
  });
};
