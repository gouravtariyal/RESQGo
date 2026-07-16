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

/** Floating action / save button gradient. */
export const CTA_GRADIENT_COLORS = [colors.primary, BRAND_PRIMARY_DEEP, colors.secondary] as const;
export const CTA_GRADIENT_START = { x: 0.05, y: 0 };
export const CTA_GRADIENT_END = { x: 0.95, y: 1 };

/**
 * Builds responsive styles for the Vehicles feature screens and cards.
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
    keyboardView: {
      flex: 1,
    },

    // Vehicles list screen
    listContent: {
      paddingHorizontal: horizontalPadding,
      paddingTop: spacing.lg,
      paddingBottom: spacing['6xl'] + spacing['4xl'],
      flexGrow: 1,
    },
    header: {
      marginBottom: spacing.xl,
    },
    headerTitle: {
      ...typography.h1,
      fontSize: Math.round(fontSizes['3xl'] * scale),
      lineHeight: Math.round(fontSizes['3xl'] * scale * 1.1),
      color: colors.textPrimary,
    },
    headerSubtitle: {
      ...typography.body,
      color: colors.textSecondary,
      marginTop: spacing.sm,
    },
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.xl,
      paddingBottom: spacing['6xl'],
    },
    emptyIconWrap: {
      width: Math.round(84 * scale),
      height: Math.round(84 * scale),
      borderRadius: Math.round(42 * scale),
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.lg,
      ...shadows.sm,
    },
    emptyIcon: {
      fontSize: Math.round(36 * scale),
    },
    emptyTitle: {
      ...typography.h2,
      fontSize: Math.round(fontSizes['2xl'] * scale),
      color: colors.textPrimary,
      textAlign: 'center',
    },
    emptySubtitle: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: spacing.sm,
      lineHeight: Math.round(fontSizes.md * scale * 1.5),
    },

    // Floating add button
    fab: {
      position: 'absolute',
      right: horizontalPadding,
      bottom: spacing['6xl'] + spacing.lg,
      borderRadius: radius.full,
      overflow: 'hidden',
      ...shadows.lg,
    },
    fabGradient: {
      minWidth: Math.round(148 * scale),
      minHeight: Math.round(54 * scale),
      borderRadius: radius.full,
      paddingHorizontal: spacing.xl,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: spacing.sm,
    },
    fabIcon: {
      ...typography.button,
      color: colors.textOnPrimary,
      fontSize: Math.round(fontSizes.lg * scale),
    },
    fabText: {
      ...typography.button,
      color: colors.textOnPrimary,
      fontWeight: fontWeights.semibold,
    },

    // Vehicle card
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
      opacity: 0.96,
      transform: [{ scale: 0.99 }],
    },
    cardTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    },
    vehicleIconWrap: {
      width: Math.round(56 * scale),
      height: Math.round(56 * scale),
      borderRadius: Math.round(28 * scale),
      backgroundColor: '#EFF6FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    vehicleIcon: {
      fontSize: Math.round(28 * scale),
    },
    vehicleInfo: {
      flex: 1,
      minWidth: 0,
    },
    vehicleName: {
      ...typography.h3,
      fontSize: Math.round(fontSizes.xl * scale),
      color: colors.textPrimary,
    },
    vehicleNumber: {
      ...typography.label,
      color: colors.primary,
      marginTop: spacing.xs,
      letterSpacing: 0.6,
    },
    metaRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginTop: spacing.lg,
    },
    metaChip: {
      backgroundColor: colors.background,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
    },
    metaChipText: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    detailsBlock: {
      marginTop: spacing.lg,
      paddingTop: spacing.lg,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      gap: spacing.sm,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing.md,
    },
    detailLabel: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    detailValue: {
      ...typography.label,
      color: colors.textPrimary,
      textAlign: 'right',
      flexShrink: 1,
    },
    actionsRow: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginTop: spacing.lg,
    },
    actionButton: {
      flex: 1,
      minHeight: 42,
      borderRadius: radius.xl,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.sm,
    },
    actionButtonPrimary: {
      borderColor: '#BFDBFE',
      backgroundColor: '#EFF6FF',
    },
    actionButtonDanger: {
      borderColor: '#FECACA',
      backgroundColor: '#FEF2F2',
    },
    actionButtonText: {
      ...typography.caption,
      color: colors.textPrimary,
      fontWeight: fontWeights.semibold,
    },
    actionButtonTextPrimary: {
      color: colors.primary,
    },
    actionButtonTextDanger: {
      color: colors.error,
    },

    // Add / Edit form screen
    formScrollContent: {
      paddingHorizontal: horizontalPadding,
      paddingTop: spacing.lg,
      paddingBottom: spacing['4xl'],
    },
    formHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.xl,
      gap: spacing.md,
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
    formHeaderText: {
      flex: 1,
    },
    formTitle: {
      ...typography.h1,
      fontSize: Math.round(fontSizes['3xl'] * scale),
      color: colors.textPrimary,
    },
    formSubtitle: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      marginTop: spacing.xs,
    },
    formCard: {
      backgroundColor: colors.surface,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.xl,
      ...shadows.sm,
      gap: spacing.lg,
    },
    fieldGroup: {
      gap: spacing.sm,
    },
    label: {
      ...typography.label,
      color: colors.textPrimary,
    },
    input: {
      minHeight: 52,
      borderRadius: radius.xl,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      paddingHorizontal: spacing.lg,
      ...typography.body,
      color: colors.textPrimary,
    },
    inputFocused: {
      borderColor: colors.primary,
      backgroundColor: colors.surface,
    },
    inputError: {
      borderColor: colors.error,
    },
    errorText: {
      ...typography.caption,
      color: colors.error,
    },
    fuelRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    fuelChip: {
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
    },
    fuelChipSelected: {
      borderColor: colors.primary,
      backgroundColor: '#EFF6FF',
    },
    fuelChipText: {
      ...typography.label,
      color: colors.textSecondary,
    },
    fuelChipTextSelected: {
      color: colors.primary,
      fontWeight: fontWeights.semibold,
    },
    saveButton: {
      marginTop: spacing.xl,
      borderRadius: radius['2xl'],
      overflow: 'hidden',
      ...shadows.md,
    },
    saveButtonDisabled: {
      opacity: 0.6,
    },
    saveGradient: {
      minHeight: 56,
      borderRadius: radius['2xl'],
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing['2xl'],
    },
    saveText: {
      ...typography.button,
      fontSize: Math.round(fontSizes.lg * scale),
      color: colors.textOnPrimary,
      fontWeight: fontWeights.semibold,
    },
  });
};
