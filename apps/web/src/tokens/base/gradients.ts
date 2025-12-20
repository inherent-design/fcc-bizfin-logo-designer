/**
 * Base Gradient Tokens
 *
 * Layer 2: CSS values with units
 * - Format: { value: 'radial-gradient(...)' } or { value: 'linear-gradient(...)' }
 * - NO token references (use direct color references)
 * - NO semantic names (palette-based names only)
 */

/**
 * Fantasy gradients
 * For atmospheric backgrounds and world-layer effects
 */
const fantasy = {
  /**
   * Void gradient - Dark theme radial gradient
   * Ellipse from center: mid → start → end
   */
  void: {
    radial: {
      value:
        'radial-gradient(ellipse at center, {colors.fantasy.void.mid} 0%, {colors.fantasy.void.start} 50%, {colors.fantasy.void.end} 100%)',
    },
  },

  /**
   * Aether gradient - Light theme radial gradient
   * Ellipse from center: mid → start → end
   */
  aether: {
    radial: {
      value:
        'radial-gradient(ellipse at center, {colors.fantasy.aether.mid} 0%, {colors.fantasy.aether.start} 50%, {colors.fantasy.aether.end} 100%)',
    },
  },
} as const

/**
 * All base gradient tokens
 */
export const gradients = {
  fantasy,
} as const
