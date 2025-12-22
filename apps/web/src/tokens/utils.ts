/**
 * Token System Utilities
 *
 * Shared conversion functions for token generation across all layers.
 * Consolidates rhythmToPx (Layer 1) and pxToRem (Layer 2) utilities.
 *
 * @module tokens/utils
 */

import { BASES } from './constants'

/**
 * Convert rhythm ratio to pixel value (unitless)
 *
 * Formula: BASES.rhythm × 2 × ratio
 * - BASES.rhythm = 4 (quarter notes)
 * - × 2 converts to pixels (8px base)
 * - × ratio scales the value
 *
 * @param ratio - Musical or harmonic ratio
 * @returns Pixel value as number (e.g., 12 for 12px)
 *
 * @example
 * ```typescript
 * rhythmToPx(1.5) // 12 (perfectFifth: 8px base × 1.5)
 * rhythmToPx(2.0) // 16 (octave: 8px base × 2)
 * rhythmToPx(3.0) // 24 (harmonic3: 8px base × 3)
 * ```
 */
export const rhythmToPx = (ratio: number): number => BASES.rhythm * 2 * ratio

/**
 * Convert pixel value to rem string
 *
 * Formula: px / 16
 * - 16px = 1rem (browser default)
 *
 * @param px - Pixel value as number
 * @returns Rem value as string (e.g., '0.75rem')
 *
 * @example
 * ```typescript
 * pxToRem(12) // '0.75rem'
 * pxToRem(16) // '1rem'
 * pxToRem(44) // '2.75rem' (touch target)
 * ```
 */
export const pxToRem = (px: number): string => `${px / 16}rem`
