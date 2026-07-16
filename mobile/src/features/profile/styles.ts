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

/** Primary CTA gradient. */
export const CTA_GRADIENT_COLORS = [colors.primary, BRAND_PRIMARY_DEEP] as const;
export const CTA_GRADIENT_START = { x: 0, y: 0 };
export const CTA_GRADIENT_END = { x: 1, y: 1 };

/**
 * Builds responsive styles for Profile, Edit Profile, and Settings screens.
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
    scrollContent: {
      paddingHorizontal: horizontalPadding,
      paddingTop: spacing.lg,
      paddingBottom: spacing['6xl'] + spacing['3xl'],
    },
    stackScrollContent: {
      paddingHorizontal: horizontalPadding,
      paddingTop: spacing.lg,
      paddingBottom: spacing['4xl'],
    },

    // Shared headers
    headerTitle: {
      ...typography.h1,
      fontSize: Math.round(fontSizes['3xl'] * scale),
      color: colors.textPrimary,
      marginBottom: spacing.xl,
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
    headerTextWrap: {
      flex: 1,
    },
    headerSubtitle: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      marginTop: spacing.xs,
    },

    // Profile card
    profileCard: {
      backgroundColor: colors.surface,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.xl,
      alignItems: 'center',
      marginBottom: spacing.xl,
      ...shadows.md,
    },
    avatarWrap: {
      width: Math.round(88 * scale),
      height: Math.round(88 * scale),
      borderRadius: Math.round(44 * scale),
      backgroundColor: '#EFF6FF',
      borderWidth: 2,
      borderColor: '#BFDBFE',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.lg,
    },
    avatarEmoji: {
      fontSize: Math.round(40 * scale),
    },
    profileName: {
      ...typography.h2,
      fontSize: Math.round(fontSizes['2xl'] * scale),
      color: colors.textPrimary,
      textAlign: 'center',
    },
    profileMeta: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: spacing.sm,
    },
    memberSince: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: fontWeights.semibold,
      marginTop: spacing.md,
    },

    // Menu list
    menuSectionTitle: {
      ...typography.label,
      color: colors.textSecondary,
      marginBottom: spacing.sm,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    menuCard: {
      backgroundColor: colors.surface,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
      ...shadows.sm,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    menuItemLast: {
      borderBottomWidth: 0,
    },
    menuItemPressed: {
      backgroundColor: colors.background,
    },
    menuIconWrap: {
      width: Math.round(40 * scale),
      height: Math.round(40 * scale),
      borderRadius: Math.round(20 * scale),
      backgroundColor: '#EFF6FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuIconWrapDanger: {
      backgroundColor: '#FEF2F2',
    },
    menuIcon: {
      fontSize: Math.round(18 * scale),
    },
    menuTitle: {
      ...typography.body,
      color: colors.textPrimary,
      flex: 1,
      fontWeight: fontWeights.medium,
    },
    menuTitleDanger: {
      color: colors.error,
    },
    menuChevron: {
      ...typography.body,
      color: colors.textSecondary,
    },

    // Settings rows
    settingsCard: {
      backgroundColor: colors.surface,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.lg,
      gap: spacing.lg,
      ...shadows.sm,
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.md,
    },
    settingTextWrap: {
      flex: 1,
      minWidth: 0,
    },
    settingTitle: {
      ...typography.label,
      color: colors.textPrimary,
      fontWeight: fontWeights.semibold,
    },
    settingSubtitle: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: spacing.xxs,
    },
    languageRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginTop: spacing.sm,
    },
    languageChip: {
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
    },
    languageChipSelected: {
      borderColor: colors.primary,
      backgroundColor: '#EFF6FF',
    },
    languageChipText: {
      ...typography.label,
      color: colors.textSecondary,
    },
    languageChipTextSelected: {
      color: colors.primary,
      fontWeight: fontWeights.semibold,
    },
    statusPill: {
      borderRadius: radius.full,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      backgroundColor: '#DCFCE7',
    },
    statusPillText: {
      ...typography.caption,
      color: colors.success,
      fontWeight: fontWeights.semibold,
    },

    // Edit profile form
    formCard: {
      backgroundColor: colors.surface,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.xl,
      gap: spacing.lg,
      ...shadows.sm,
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
    inputReadonly: {
      backgroundColor: colors.disabled,
      color: colors.textSecondary,
    },
    helperText: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    errorText: {
      ...typography.caption,
      color: colors.error,
    },
    saveButton: {
      marginTop: spacing.xl,
      borderRadius: radius['2xl'],
      overflow: 'hidden',
      ...shadows.md,
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
      color: colors.textOnPrimary,
      fontSize: Math.round(fontSizes.lg * scale),
      fontWeight: fontWeights.semibold,
    },
  });
};
