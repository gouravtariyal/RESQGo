/**
 * RESQGo spacing scale (4pt base).
 * Use these tokens for padding, margin, and gaps — avoid magic numbers.
 */

export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;

export type Spacing = typeof spacing;
export type SpacingToken = keyof Spacing;
