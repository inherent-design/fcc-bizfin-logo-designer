/**
 * Base Color Tokens
 *
 * Layer 2: CSS values with units
 * - Format: { value: '#hex' }
 * - NO token references
 * - NO semantic names (palette-based names only)
 */

/**
 * Neo-brutalist palette
 * For UI controls and interface elements
 */
const neo = {
  fg: { value: '#1a1a1a' },
  bg: { value: '#fef6e4' },
  primary: { value: '#f582ae' },
  secondary: { value: '#8bd3dd' },
  accent: { value: '#00FF00' },
  warning: { value: '#ff6b6b' },
} as const

/**
 * High-fantasy palette
 * For backgrounds, gradients, and atmospheric effects
 */
const fantasy = {
  void: {
    start: { value: '#0a0514' },
    mid: { value: '#0f0820' },
    end: { value: '#1a0f2e' },
  },
  aether: {
    start: { value: '#fdfdfb' },
    mid: { value: '#f5faf6' },
    end: { value: '#d7f2ddff' },
  },
  arcana: {
    primary: { value: '#a78bfa' },
    secondary: { value: '#60a5fa' },
    tertiary: { value: '#34d399' },
    glow: { value: 'rgba(167, 139, 250, 0.3)' },
  },
  gold: {
    base: { value: '#d7913a' },
    dark: { value: '#5f4c0c' },
    shimmer: { value: '#ffd700' },
  },
} as const

/**
 * All base color tokens
 */
export const colors = {
  neo,
  fantasy,
} as const
