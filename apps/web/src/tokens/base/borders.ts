/**
 * Base Border Tokens
 *
 * Layer 2: CSS values with units
 * - Border widths and radii
 * - References primitives for calculations
 * - NO token references
 */

import { borderWidthPrimitives, radiusPrimitives } from '../primitives'

/**
 * Convert pixel value to rem
 * 1rem = 16px (browser default)
 */
const pxToRem = (px: number): string => `${px / 16}rem`

// ============================================================================
// BORDER RADII (Magnitude-based naming)
// ============================================================================

export const radii = {
  /** 0 - No rounding */
  radius0: { value: '0' },

  /** 0.25rem (4px) - 4px radius */
  radius4: { value: pxToRem(radiusPrimitives.sm) },

  /** 0.5rem (8px) - 8px radius */
  radius8: { value: pxToRem(radiusPrimitives.md) },

  /** 0.75rem (12px) - 12px radius */
  radius12: { value: pxToRem(radiusPrimitives.lg) },

  /** 1rem (16px) - 16px radius */
  radius16: { value: pxToRem(radiusPrimitives.xl) },

  /** 999.9rem - Full rounding (pill shape) */
  radiusFull: { value: '999.9rem' },
} as const

// ============================================================================
// BORDER WIDTHS (Magnitude-based naming - neo-brutalist emphasis)
// ============================================================================

export const borderWidths = {
  /** 1px - Hairline border */
  border1: { value: '1px' },

  /** 2px - Thin border */
  border2: { value: '2px' },

  /** 0.1875rem (3px) - Neo-brutalist default */
  border3: { value: '3px' },

  /** 0.25rem (4px) - Neo-brutalist medium */
  border4: { value: pxToRem(borderWidthPrimitives.base) },

  /** 0.3125rem (5px) - Neo-brutalist thick */
  border5: { value: '5px' },
} as const
