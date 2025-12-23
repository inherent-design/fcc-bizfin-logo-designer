/**
 * Semantic Tokens Index
 *
 * Layer 3: Export all semantic token categories
 */

export { animations } from './animations'
export { borderRadius, borderStyle, borderWidths, outline } from './borders'
export { colors } from './colors'
export { backdropBlur, blur, opacity, shadows } from './effects'
export { cursors } from './interaction'
export { layout } from './layout'
export { radii } from './radii'
export { sizes } from './sizes'
export { spacing } from './spacing'
export { typography } from './typography'

/**
 * Combined semantic tokens object for Panda CSS config
 */
import { animations } from './animations'
import { borderRadius, borderStyle, borderWidths, outline } from './borders'
import { colors } from './colors'
import { backdropBlur, blur, opacity, shadows } from './effects'
import { cursors } from './interaction'
import { layout } from './layout'
import { radii } from './radii'
import { sizes } from './sizes'
import { spacing } from './spacing'
import { typography } from './typography'

export const semanticTokens = {
  // Top-level Panda categories (must match expected structure)
  borderWidths,
  radii,
  opacity,
  blur,
  backdropBlur,
  colors,

  // Semantic groupings (nested structures for intent-based usage)
  outline,
  borderStyle,
  borderRadius,
  cursors,
  spacing,
  fonts: typography.fonts,
  fontSizes: typography.fontSizes,
  fontWeights: typography.fontWeights,
  letterSpacings: typography.letterSpacings,
  lineHeights: typography.lineHeights,
  shadows,
  animations,
  layout,
  sizes,
} as const
