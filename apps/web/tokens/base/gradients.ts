/**
 * Base Gradient Tokens
 *
 * Layer 2: CSS values with gradient definitions
 * - Format: { value: 'radial-gradient(...)' } or { value: 'linear-gradient(...)' }
 * - References primitives directly (not base tokens)
 * - Magnitude/appearance-based naming
 */

import { formatCss } from 'culori'
import { neutralColors } from '../primitives'

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
    value: `radial-gradient(ellipse at center, ${formatCss(neutralColors[1])} 0%, ${formatCss(neutralColors[0])} 50%, ${formatCss(neutralColors[2])} 100%)`,
  },

  /**
   * Radial gradient from dark gray to near-black
   * For dark theme backgrounds
   */
  radialGray10to8: {
    value: `radial-gradient(ellipse at center, ${formatCss(neutralColors[9])} 0%, ${formatCss(neutralColors[10])} 50%, ${formatCss(neutralColors[8])} 100%)`,
  },
} as const

/**
 * All base gradient tokens
 */
export const gradients = {
  ...radialGradients,
} as const
