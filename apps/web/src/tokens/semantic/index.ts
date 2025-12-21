/**
 * Semantic Tokens Index
 *
 * Layer 3: Export all semantic token categories
 */

export { animations } from './animations'
export { borders } from './borders'
export { colors } from './colors'
export { shadows } from './effects'
export { layout } from './layout'
export { spacing } from './spacing'
export { typography } from './typography'

/**
 * Combined semantic tokens object for Panda CSS config
 */
import { animations } from './animations'
import { borders } from './borders'
import { colors } from './colors'
import { shadows } from './effects'
import { layout } from './layout'
import { spacing } from './spacing'
import { typography } from './typography'

export const semanticTokens = {
  colors,
  spacing,
  typography,
  shadows,
  borders,
  animations,
  layout,
} as const
