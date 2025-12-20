/**
 * Semantic Tokens Index
 *
 * Layer 3: Export all semantic token categories
 */

export { colors } from './colors'
export { spacing } from './spacing'
export { typography } from './typography'

/**
 * Combined semantic tokens object for Panda CSS config
 */
import { colors } from './colors'
import { spacing } from './spacing'
import { typography } from './typography'

export const semanticTokens = {
  colors,
  spacing,
  typography,
} as const
