/**
 * Base Gradient Tokens
 *
 * Layer 2: CSS values with gradient definitions
 * - Format: { value: 'radial-gradient(...)' } or { value: 'linear-gradient(...)' }
 * - References base color tokens only (not semantic)
 * - Magnitude/appearance-based naming
 */

/**
 * Radial gradients using gray scale
 *
 * Naming convention: radial{ColorStart}to{ColorEnd}
 */
const radialGradients = {
  /**
   * Radial gradient from light gray to near-white
   * For light theme backgrounds
   */
  radialGray0to2: {
    value: 'radial-gradient(ellipse at center, {colors.gray.1} 0%, {colors.gray.0} 50%, {colors.gray.2} 100%)',
  },

  /**
   * Radial gradient from dark gray to near-black
   * For dark theme backgrounds
   */
  radialGray10to8: {
    value: 'radial-gradient(ellipse at center, {colors.gray.9} 0%, {colors.gray.10} 50%, {colors.gray.8} 100%)',
  },
} as const

/**
 * All base gradient tokens
 */
export const gradients = {
  ...radialGradients,
} as const
