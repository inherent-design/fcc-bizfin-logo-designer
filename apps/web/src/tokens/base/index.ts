/**
 * Base Tokens Index
 *
 * Layer 2: Export all base token categories
 */

export { colors } from './colors'
export { spacing, sizes } from './spacing'
export { fonts, fontSizes, fontWeights, lineHeights, letterSpacings } from './typography'
export { radii, borderWidths } from './borders'
export { opacity, blurs, shadows } from './effects'
export { durations, easings } from './animations'
export { zIndex, aspectRatios } from './layout'
export { gradients } from './gradients'

/**
 * Combined base tokens object for Panda CSS config
 */
import { colors } from './colors'
import { spacing, sizes } from './spacing'
import { fonts, fontSizes, fontWeights, lineHeights, letterSpacings } from './typography'
import { radii, borderWidths } from './borders'
import { opacity, blurs, shadows } from './effects'
import { durations, easings } from './animations'
import { zIndex, aspectRatios } from './layout'
import { gradients } from './gradients'

export const baseTokens = {
  colors,
  spacing,
  sizes,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  radii,
  borderWidths,
  opacity,
  blurs,
  shadows,
  durations,
  easings,
  zIndex,
  aspectRatios,
  gradients,
} as const
