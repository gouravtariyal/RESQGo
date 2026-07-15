/**
 * RESQGo typography tokens.
 * Pair with platform font families when custom fonts are registered under assets/fonts.
 */

export const fontFamilies = {
  regular: 'System',
  medium: 'System',
  semibold: 'System',
  bold: 'System',
} as const;

export const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
} as const;

export const lineHeights = {
  tight: 1.2,
  snug: 1.35,
  normal: 1.5,
  relaxed: 1.65,
} as const;

export const typography = {
  display: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.bold,
    lineHeight: Math.round(fontSizes['4xl'] * lineHeights.tight),
  },
  h1: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes['3xl'],
    fontWeight: fontWeights.bold,
    lineHeight: Math.round(fontSizes['3xl'] * lineHeights.tight),
  },
  h2: {
    fontFamily: fontFamilies.semibold,
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.semibold,
    lineHeight: Math.round(fontSizes['2xl'] * lineHeights.snug),
  },
  h3: {
    fontFamily: fontFamilies.semibold,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    lineHeight: Math.round(fontSizes.xl * lineHeights.snug),
  },
  body: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    lineHeight: Math.round(fontSizes.md * lineHeights.normal),
  },
  bodySmall: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    lineHeight: Math.round(fontSizes.sm * lineHeights.normal),
  },
  label: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    lineHeight: Math.round(fontSizes.sm * lineHeights.snug),
  },
  caption: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.regular,
    lineHeight: Math.round(fontSizes.xs * lineHeights.normal),
  },
  button: {
    fontFamily: fontFamilies.semibold,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    lineHeight: Math.round(fontSizes.md * lineHeights.tight),
  },
} as const;

export type FontFamilies = typeof fontFamilies;
export type FontWeights = typeof fontWeights;
export type FontSizes = typeof fontSizes;
export type LineHeights = typeof lineHeights;
export type Typography = typeof typography;
export type TypographyVariant = keyof Typography;
