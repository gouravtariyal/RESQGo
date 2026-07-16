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
    keyboardView: { flex: 1 },
    listContent: {
      paddingHorizontal: horizontalPadding,
      paddingTop: spacing.lg,
      paddingBottom: spacing['6xl'] + spacing['4xl'],
      flexGrow: 1,
    },
    formScrollContent: {
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
    card: {
      backgroundColor: colors.surface,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.lg,
      marginBottom: spacing.md,
      ...shadows.sm,
    },
    cardTopRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing.md,
    },
    avatarWrap: {
      width: Math.round(48 * scale),
      height: Math.round(48 * scale),
      borderRadius: Math.round(24 * scale),
      backgroundColor: '#EFF6FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: {
      ...typography.h3,
      color: colors.primary,
    },
    cardInfo: { flex: 1, minWidth: 0 },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      flexWrap: 'wrap',
    },
    name: {
      ...typography.h3,
      fontSize: Math.round(fontSizes.lg * scale),
      color: colors.textPrimary,
    },
    primaryBadge: {
      borderRadius: radius.full,
      backgroundColor: '#DCFCE7',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
    },
    primaryBadgeText: {
      ...typography.caption,
      color: colors.success,
      fontWeight: fontWeights.semibold,
    },
    metaText: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      marginTop: spacing.xs,
    },
    actionsRow: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginTop: spacing.lg,
    },
    actionButton: {
      flex: 1,
      minHeight: 40,
      borderRadius: radius.xl,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionPrimary: {
      borderColor: '#BFDBFE',
      backgroundColor: '#EFF6FF',
    },
    actionDanger: {
      borderColor: '#FECACA',
      backgroundColor: '#FEF2F2',
    },
    actionText: {
      ...typography.caption,
      color: colors.textPrimary,
      fontWeight: fontWeights.semibold,
    },
    actionTextPrimary: { color: colors.primary },
    actionTextDanger: { color: colors.error },
    fab: {
      position: 'absolute',
      right: horizontalPadding,
      bottom: spacing['3xl'],
      borderRadius: radius.full,
      overflow: 'hidden',
      ...shadows.lg,
    },
    fabGradient: {
      minHeight: 54,
      paddingHorizontal: spacing.xl,
      borderRadius: radius.full,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    fabText: {
      ...typography.button,
      color: colors.textOnPrimary,
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
    formCard: {
      backgroundColor: colors.surface,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.xl,
      gap: spacing.lg,
      ...shadows.sm,
    },
    fieldGroup: { gap: spacing.sm },
    label: { ...typography.label, color: colors.textPrimary },
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
    inputError: { borderColor: colors.error },
    errorText: { ...typography.caption, color: colors.error },
    chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
    chip: {
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
    },
    chipSelected: {
      borderColor: colors.primary,
      backgroundColor: '#EFF6FF',
    },
    chipText: { ...typography.label, color: colors.textSecondary },
    chipTextSelected: {
      color: colors.primary,
      fontWeight: fontWeights.semibold,
    },
    toggleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.md,
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
    },
    saveText: {
      ...typography.button,
      color: colors.textOnPrimary,
      fontSize: Math.round(fontSizes.lg * scale),
      fontWeight: fontWeights.semibold,
    },
  });
};
