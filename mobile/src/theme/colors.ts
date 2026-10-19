/**
 * RESQGo color tokens.
 * Brand + semantic palette. Prefer semantic keys in UI over raw brand values.
 */

export const palette = {
  blue600: '#2563EB',
  slate900: '#0F172A',
  slate50: '#F8FAFC',
  white: '#FFFFFF',
  green500: '#22C55E',
  amber500: '#F59E0B',
  red500: '#EF4444',
  gray900: '#111827',
  gray500: '#6B7280',
  gray200: '#E5E7EB',
  teal400: '#2DD4BF',
  teal500: '#14B8A6',
  teal600: '#0D9488',
  teal700: '#0F766E',
  teal800: '#115E59',
  teal100: '#CCFBF1',
  teal50: '#F0FDFA',
  transparent: 'transparent',
} as const;

export const colors = {
  primary: palette.teal600,
  secondary: palette.slate900,

  background: palette.slate50,
  surface: palette.white,

  success: palette.green500,
  warning: palette.amber500,
  error: palette.red500,

  textPrimary: palette.gray900,
  textSecondary: palette.gray500,

  border: palette.gray200,

  /** Inverted text on primary / secondary fills */
  textOnPrimary: palette.white,
  textOnSecondary: palette.white,

  /** Teal brand tokens matching the new mobile UI */
  brandTeal: palette.teal600,
  brandTealLight: palette.teal500,
  brandTealDark: palette.teal700,
  brandTealBackground: palette.teal50,

  /** Disabled / muted helpers */
  disabled: palette.gray200,
  overlay: 'rgba(15, 23, 42, 0.45)',
} as const;

export type Palette = typeof palette;
export type Colors = typeof colors;
export type ColorToken = keyof Colors;
