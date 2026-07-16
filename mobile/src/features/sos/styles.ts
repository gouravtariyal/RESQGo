import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { spacing } from '../../theme/spacing';
import { fontSizes, fontWeights, typography } from '../../theme/typography';

const SOS_RED = colors.error;
const SOS_RED_DEEP = '#B91C1C';
const BASE_WIDTH = 375;

/** Soft page background with a light emergency tint. */
export const SCREEN_GRADIENT_COLORS = [colors.background, '#FEF2F2', colors.background] as const;
export const SCREEN_GRADIENT_START = { x: 0, y: 0 };
export const SCREEN_GRADIENT_END = { x: 1, y: 1 };

/** SOS button fill gradient. */
export const SOS_GRADIENT_COLORS = [SOS_RED, SOS_RED_DEEP] as const;
export const SOS_GRADIENT_START = { x: 0.2, y: 0 };
export const SOS_GRADIENT_END = { x: 0.8, y: 1 };

/**
 * Builds responsive styles for the Emergency SOS screen and contact cards.
 */
export const createStyles = (width: number) => {
  const scale = Math.min(Math.max(width / BASE_WIDTH, 0.9), 1.12);
  const horizontalPadding = Math.max(spacing.lg, Math.round(width * 0.06));
  const sosButtonSize = Math.round(180 * scale);

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    gradient: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: horizontalPadding,
      paddingTop: spacing.lg,
      paddingBottom: spacing['4xl'],
      flexGrow: 1,
    },

    // Header
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      marginBottom: spacing['2xl'],
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

    // SOS button section
    sosSection: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing['2xl'],
      minHeight: Math.round(260 * scale),
    },
    sosRing: {
      width: sosButtonSize + 28,
      height: sosButtonSize + 28,
      borderRadius: (sosButtonSize + 28) / 2,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 3,
      borderColor: '#FECACA',
      backgroundColor: 'rgba(239, 68, 68, 0.08)',
    },
    sosRingActive: {
      borderColor: SOS_RED,
      backgroundColor: 'rgba(239, 68, 68, 0.16)',
    },
    sosButton: {
      width: sosButtonSize,
      height: sosButtonSize,
      borderRadius: sosButtonSize / 2,
      overflow: 'hidden',
      ...shadows.xl,
    },
    sosButtonPressed: {
      transform: [{ scale: 0.98 }],
    },
    sosGradient: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: sosButtonSize / 2,
    },
    sosButtonLabel: {
      ...typography.display,
      fontSize: Math.round(fontSizes['4xl'] * scale),
      color: colors.textOnPrimary,
      fontWeight: fontWeights.bold,
      letterSpacing: 1,
    },
    sosHint: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: spacing.xl,
      paddingHorizontal: spacing.lg,
    },
    holdProgressTrack: {
      width: Math.round(160 * scale),
      height: 6,
      borderRadius: radius.full,
      backgroundColor: colors.border,
      marginTop: spacing.lg,
      overflow: 'hidden',
    },
    holdProgressFill: {
      height: '100%',
      borderRadius: radius.full,
      backgroundColor: SOS_RED,
    },

    // Activated banner
    activatedBanner: {
      backgroundColor: '#FEF2F2',
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: '#FECACA',
      padding: spacing.xl,
      alignItems: 'center',
      marginBottom: spacing.xl,
      ...shadows.sm,
    },
    activatedIcon: {
      fontSize: Math.round(36 * scale),
      marginBottom: spacing.sm,
    },
    activatedTitle: {
      ...typography.h2,
      fontSize: Math.round(fontSizes['2xl'] * scale),
      color: SOS_RED_DEEP,
      textAlign: 'center',
    },
    activatedSubtitle: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: spacing.sm,
    },

    // Contacts
    sectionTitle: {
      ...typography.h3,
      color: colors.textPrimary,
      marginBottom: spacing.md,
    },
    contactsList: {
      gap: spacing.md,
      marginBottom: spacing.xl,
    },
    contactCard: {
      backgroundColor: colors.surface,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      ...shadows.sm,
    },
    contactIconWrap: {
      width: Math.round(48 * scale),
      height: Math.round(48 * scale),
      borderRadius: Math.round(24 * scale),
      backgroundColor: '#FEF2F2',
      alignItems: 'center',
      justifyContent: 'center',
    },
    contactIcon: {
      fontSize: Math.round(22 * scale),
    },
    contactInfo: {
      flex: 1,
      minWidth: 0,
    },
    contactName: {
      ...typography.h3,
      fontSize: Math.round(fontSizes.lg * scale),
      color: colors.textPrimary,
    },
    contactPhone: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      marginTop: spacing.xs,
    },
    callButton: {
      minHeight: 40,
      borderRadius: radius.full,
      paddingHorizontal: spacing.lg,
      backgroundColor: '#EFF6FF',
      borderWidth: 1,
      borderColor: '#BFDBFE',
      alignItems: 'center',
      justifyContent: 'center',
    },
    callButtonText: {
      ...typography.label,
      color: colors.primary,
      fontWeight: fontWeights.semibold,
    },

    // Location card
    locationCard: {
      backgroundColor: colors.surface,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.xl,
      marginBottom: spacing.xl,
      ...shadows.sm,
    },
    locationLabel: {
      ...typography.caption,
      color: colors.textSecondary,
      marginBottom: spacing.xs,
    },
    locationValue: {
      ...typography.h3,
      color: colors.textPrimary,
      marginBottom: spacing.lg,
    },
    coordRow: {
      flexDirection: 'row',
      gap: spacing.md,
    },
    coordBlock: {
      flex: 1,
      backgroundColor: colors.background,
      borderRadius: radius.xl,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.md,
    },
    coordLabel: {
      ...typography.caption,
      color: colors.textSecondary,
      marginBottom: spacing.xs,
    },
    coordValue: {
      ...typography.label,
      color: colors.textPrimary,
    },

    // Footer
    footerMessage: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: Math.round(fontSizes.sm * scale * 1.5),
      paddingHorizontal: spacing.md,
    },
  });
};
