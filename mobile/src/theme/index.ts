/**
 * RESQGo design system — public theme exports.
 */

export { colors, palette } from './colors';
export type { ColorToken, Colors, Palette } from './colors';

export { spacing } from './spacing';
export type { Spacing, SpacingToken } from './spacing';

export {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  typography,
} from './typography';
export type {
  FontFamilies,
  FontSizes,
  FontWeights,
  LineHeights,
  Typography,
  TypographyVariant,
} from './typography';

export { radius } from './radius';
export type { Radius, RadiusToken } from './radius';

export { shadows } from './shadows';
export type { ShadowToken, Shadows } from './shadows';

import { colors } from './colors';
import { radius } from './radius';
import { shadows } from './shadows';
import { spacing } from './spacing';
import { typography } from './typography';

export const theme = {
  colors,
  spacing,
  typography,
  radius,
  shadows,
} as const;

export type Theme = typeof theme;
