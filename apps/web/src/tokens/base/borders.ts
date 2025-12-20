/**
 * Base Border Tokens
 *
 * Layer 2: CSS values with units
 * - Border widths and radii
 * - References primitives for calculations
 * - NO token references
 */

import { radiusPrimitives, borderWidthPrimitives } from '../primitives'

/**
 * Convert pixel value to rem
 * 1rem = 16px (browser default)
 */
const pxToRem = (px: number): string => `${px / 16}rem`

// ============================================================================
// BORDER RADII
// ============================================================================

export const radii = {
  /** 0 - No rounding */
  none: { value: '0' },

  /** 0.25rem (4px) - Small radius */
  sm: { value: pxToRem(radiusPrimitives.sm) },

  /** 0.5rem (8px) - Medium radius */
  md: { value: pxToRem(radiusPrimitives.md) },

  /** 0.75rem (12px) - Large radius */
  lg: { value: pxToRem(radiusPrimitives.lg) },

  /** 1rem (16px) - Extra large radius */
  xl: { value: pxToRem(radiusPrimitives.xl) },

  /** 999.9rem - Full rounding (pill shape) */
  full: { value: '999.9rem' },
} as const

// ============================================================================
// BORDER WIDTHS
// ============================================================================

export const borderWidths = {
  /** 1px - Hairline border */
  hairline: { value: '1px' },

  /** 2px - Thin border */
  thin: { value: '2px' },

  /** 0.25rem (4px) - Base border */
  base: { value: pxToRem(borderWidthPrimitives.base) },

  /** 0.5rem (8px) - Medium border */
  medium: { value: pxToRem(borderWidthPrimitives.medium) },

  /** 0.75rem (12px) - Thick border */
  thick: { value: pxToRem(borderWidthPrimitives.thick) },

  /** 1rem (16px) - Extra thick border */
  extraThick: { value: pxToRem(borderWidthPrimitives.extraThick) },

  /** Neo-brutalist borders */
  brutal: {
    /** 0.5rem (8px) - Small brutal */
    sm: { value: pxToRem(borderWidthPrimitives.medium) },

    /** 0.75rem (12px) - Medium brutal */
    md: { value: pxToRem(borderWidthPrimitives.thick) },

    /** 1rem (16px) - Large brutal */
    lg: { value: pxToRem(borderWidthPrimitives.extraThick) },
  },
} as const
