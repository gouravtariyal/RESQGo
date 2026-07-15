/**
 * RESQGo elevation / shadow tokens (iOS + Android).
 * Apply both shadow* (iOS) and elevation (Android) in StyleSheet usage.
 */

import type { ViewStyle } from 'react-native';

import { palette } from './colors';

type ShadowStyle = Pick<
  ViewStyle,
  'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'elevation'
>;

const createShadow = (
  offsetY: number,
  radius: number,
  opacity: number,
  elevation: number,
): ShadowStyle => ({
  shadowColor: palette.slate900,
  shadowOffset: { width: 0, height: offsetY },
  shadowOpacity: opacity,
  shadowRadius: radius,
  elevation,
});

export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } satisfies ShadowStyle,
  sm: createShadow(1, 2, 0.08, 1),
  md: createShadow(2, 4, 0.1, 3),
  lg: createShadow(4, 8, 0.12, 6),
  xl: createShadow(8, 16, 0.14, 10),
} as const;

export type Shadows = typeof shadows;
export type ShadowToken = keyof Shadows;
