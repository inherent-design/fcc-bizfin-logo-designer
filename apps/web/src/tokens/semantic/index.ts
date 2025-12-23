/**
 * Semantic Tokens Index
 *
 * Layer 3: Export all semantic token categories
 */

export { animations } from './animations'
export { borderWidths, outline } from './borders'
export { colors } from './colors'
export { opacity, blur, backdropBlur, shadows } from './effects'
export { layout } from './layout'
export { radii } from './radii'
export { sizes } from './sizes'
export { spacing } from './spacing'
export { typography } from './typography'

/**
 * Combined semantic tokens object for Panda CSS config
 */
import { animations } from './animations'
import { borderWidths, outline } from './borders'
import { colors } from './colors'
import { opacity, blur, backdropBlur, shadows } from './effects'
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
  spacing,
  typography,
  shadows,
  animations,
  layout,
  sizes,
} as const
