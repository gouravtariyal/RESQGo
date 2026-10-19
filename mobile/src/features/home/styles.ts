import { StyleSheet } from 'react-native';

import { colors, palette } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { spacing } from '../../theme/spacing';
import { fontSizes, fontWeights, typography } from '../../theme/typography';

/**
 * Rich deep teal matching the login hero gradient.
 */
const BRAND_PRIMARY_DEEP = palette.teal700; // #0F766E

const BASE_WIDTH = 375;

/** Soft mint & clean page background gradient matching login theme. */
export const SCREEN_GRADIENT_COLORS = ['#F0FDFA', '#F8FAFC', '#F0FDFA'] as const;
export const SCREEN_GRADIENT_START = { x: 0, y: 0 };
export const SCREEN_GRADIENT_END = { x: 1, y: 1 };

/** Vibrant Teal hero gradient matching LoginScreen & RegisterScreen. */
export const HERO_GRADIENT_COLORS = [palette.teal500, palette.teal600, BRAND_PRIMARY_DEEP] as const;
export const HERO_GRADIENT_START = { x: 0, y: 0 };
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
      backgroundColor: 'transparent',
    },
    gradient: {
      flex: 1,
    },
    listContent: {
      paddingHorizontal: horizontalPadding,
      paddingTop: spacing.lg,
      // Extra bottom space so the last cards clear the floating tab bar.
      paddingBottom: spacing['6xl'] + spacing['3xl'],
    },

    // Shared card shell used across dashboard sections.
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: radius['2xl'],
      borderWidth: 1.2,
      borderColor: '#E2E8F0',
      padding: spacing.lg,
      shadowColor: '#0F766E',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius: 10,
      elevation: 2,
    },
    section: {
      marginTop: spacing.xl,
    },
    sectionTitle: {
      ...typography.h3,
      fontSize: Math.round(fontSizes.xl * scale),
      lineHeight: Math.round(fontSizes.xl * scale * 1.2),
      fontWeight: fontWeights.bold,
      color: '#0F172A',
      marginBottom: spacing.md,
      letterSpacing: -0.2,
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
      color: palette.teal600,
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.semibold,
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      marginBottom: spacing.xxs,
    },
    userName: {
      ...typography.h1,
      fontSize: Math.round(fontSizes['3xl'] * scale),
      lineHeight: Math.round(fontSizes['3xl'] * scale * 1.1),
      fontWeight: fontWeights.bold,
      color: '#0F172A',
      letterSpacing: -0.5,
    },
    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing.xs,
    },
    locationIcon: {
      ...typography.body,
      marginRight: spacing.xs,
    },
    locationText: {
      ...typography.bodySmall,
      color: '#64748B',
      fontWeight: fontWeights.medium,
      flexShrink: 1,
    },
    notificationButton: {
      width: Math.round(46 * scale),
      height: Math.round(46 * scale),
      borderRadius: radius.full,
      backgroundColor: '#FFFFFF',
      borderWidth: 1.2,
      borderColor: '#CCFBF1',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: palette.teal600,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 2,
      position: 'relative',
    },
    notificationBadgeDot: {
      position: 'absolute',
      top: 10,
      right: 11,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#EF4444',
      borderWidth: 1.5,
      borderColor: '#FFFFFF',
    },

    // Hero card matching Login teal hero banner.
    heroCard: {
      borderRadius: radius['2xl'],
      overflow: 'hidden',
      shadowColor: '#0F766E',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.22,
      shadowRadius: 16,
      elevation: 6,
    },
    heroGradient: {
      padding: spacing.xl,
      minHeight: Math.round(204 * scale),
      justifyContent: 'space-between',
      position: 'relative',
    },
    heroDecorCircle: {
      position: 'absolute',
      top: -30,
      right: -30,
      width: 140,
      height: 140,
      borderRadius: 70,
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
    },
    heroBadge: {
      alignSelf: 'flex-start',
      backgroundColor: 'rgba(255, 255, 255, 0.22)',
      borderRadius: radius.full,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.35)',
    },
    heroBadgeText: {
      ...typography.caption,
      color: '#FFFFFF',
      fontWeight: fontWeights.semibold,
      letterSpacing: 0.4,
    },
    heroTitle: {
      ...typography.h2,
      fontSize: Math.round(fontSizes['2xl'] * scale),
      lineHeight: Math.round(fontSizes['2xl'] * scale * 1.2),
      fontWeight: fontWeights.bold,
      color: '#FFFFFF',
      marginTop: spacing.md,
      letterSpacing: -0.3,
    },
    heroDescription: {
      ...typography.body,
      color: '#CCFBF1',
      fontSize: Math.round(fontSizes.sm * scale),
      lineHeight: Math.round(fontSizes.sm * scale * 1.35),
      opacity: 0.95,
      marginTop: spacing.xs,
      maxWidth: '90%',
    },
    heroButton: {
      marginTop: spacing.lg,
      alignSelf: 'flex-start',
      backgroundColor: '#FFFFFF',
      borderRadius: radius.full,
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.md,
      shadowColor: '#0F766E',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.18,
      shadowRadius: 8,
      elevation: 3,
    },
    heroButtonText: {
      ...typography.button,
      color: palette.teal600,
      fontWeight: fontWeights.bold,
      fontSize: fontSizes.sm,
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
      borderRadius: radius['2xl'],
      borderWidth: 1.2,
      borderColor: '#E2E8F0',
      backgroundColor: '#FFFFFF',
      shadowColor: '#0F766E',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
      justifyContent: 'space-between',
    },
    actionCardSOS: {
      borderColor: '#FECACA',
    },
    actionIconWrap: {
      width: Math.round(46 * scale),
      height: Math.round(46 * scale),
      borderRadius: Math.round(23 * scale),
      backgroundColor: '#F0FDFA',
      borderWidth: 1.2,
      borderColor: '#CCFBF1',
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionIconWrapSOS: {
      backgroundColor: '#FEF2F2',
      borderColor: '#FECACA',
    },
    actionIconWrapFuel: {
      backgroundColor: '#FFFBEB',
      borderColor: '#FDE68A',
    },
    actionIconWrapEv: {
      backgroundColor: '#ECFDF5',
      borderColor: '#A7F3D0',
    },
    actionIconWrapTyre: {
      backgroundColor: '#FFF7ED',
      borderColor: '#FED7AA',
    },
    actionIcon: {
      fontSize: Math.round(22 * scale),
    },
    actionTitle: {
      ...typography.label,
      fontSize: Math.round(fontSizes.sm * scale),
      lineHeight: Math.round(fontSizes.sm * scale * 1.35),
      fontWeight: fontWeights.semibold,
      color: '#0F172A',
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
      fontWeight: fontWeights.bold,
      color: '#0F172A',
    },
    serviceMeta: {
      ...typography.bodySmall,
      color: '#64748B',
      marginTop: spacing.xs,
    },
    serviceStatusWrap: {
      borderRadius: radius.full,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      backgroundColor: '#CCFBF1',
    },
    serviceStatusText: {
      ...typography.caption,
      color: '#0F766E',
      fontWeight: fontWeights.bold,
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
      color: '#64748B',
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: spacing.xs,
    },
    statValue: {
      ...typography.label,
      fontWeight: fontWeights.bold,
      color: '#0F172A',
    },

    // Recent activity.
    activityLabel: {
      ...typography.caption,
      color: '#64748B',
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: spacing.xs,
    },
    activityValue: {
      ...typography.body,
      color: '#0F172A',
      fontWeight: fontWeights.semibold,
      marginBottom: spacing.md,
    },
    activityStatusWrap: {
      alignSelf: 'flex-start',
      borderRadius: radius.full,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      backgroundColor: '#CCFBF1',
    },
    activityStatusText: {
      ...typography.caption,
      color: '#0F766E',
      fontWeight: fontWeights.bold,
    },

  });
};
