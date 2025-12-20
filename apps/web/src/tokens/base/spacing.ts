/**
 * Base Spacing & Size Tokens
 *
 * Layer 2: CSS values with units
 * - Format: { value: 'Xrem' } or { value: 'Xpx' }
 * - References primitives for calculations
 * - NO token references (no '{spacing.base}')
 * - NO semantic names (magnitude-based: "octave", "harmonic3", not "normal", "loose")
 */

import { spacingPrimitives, containerPrimitives } from '../primitives'

/**
 * Convert pixel value to rem
 * 1rem = 16px (browser default)
 */
const pxToRem = (px: number): string => `${px / 16}rem`

// ============================================================================
// SPACING SCALE
// ============================================================================

export const spacing = {
  // ========================================
  // Micro spacing
  // ========================================

  /** 0.0625rem (1px) */
  micro1: { value: pxToRem(spacingPrimitives.micro1) },

  /** 0.125rem (2px) */
  micro2: { value: pxToRem(spacingPrimitives.micro2) },

  /** 0.25rem (4px) */
  micro4: { value: pxToRem(spacingPrimitives.micro4) },

  // ========================================
  // Musical ratio spacing
  // ========================================

  /** 0.5rem (8px) - Base rhythm */
  base: { value: pxToRem(spacingPrimitives.base) },

  /** ~0.531rem (8.5px) - Minor Second (16:15) */
  minorSecond: { value: pxToRem(spacingPrimitives.minorSecond) },

  /** 0.5625rem (9px) - Major Second (9:8) */
  majorSecond: { value: pxToRem(spacingPrimitives.majorSecond) },

  /** 0.6rem (9.6px) - Minor Third (6:5) */
  minorThird: { value: pxToRem(spacingPrimitives.minorThird) },

  /** 0.625rem (10px) - Major Third (5:4) */
  majorThird: { value: pxToRem(spacingPrimitives.majorThird) },

  /** ~0.667rem (10.67px) - Perfect Fourth (4:3) */
  perfectFourth: { value: pxToRem(spacingPrimitives.perfectFourth) },

  /** 0.75rem (12px) - Perfect Fifth (3:2) */
  perfectFifth: { value: pxToRem(spacingPrimitives.perfectFifth) },

  /** 0.8rem (12.8px) - Minor Sixth (8:5) */
  minorSixth: { value: pxToRem(spacingPrimitives.minorSixth) },

  /** ~0.833rem (13.33px) - Major Sixth (5:3) */
  majorSixth: { value: pxToRem(spacingPrimitives.majorSixth) },

  /** 1rem (16px) - Octave (2:1) */
  octave: { value: pxToRem(spacingPrimitives.octave) },

  // ========================================
  // Harmonic series spacing
  // ========================================

  /** 1rem (16px) - 2× base */
  harmonic2: { value: pxToRem(spacingPrimitives.harmonic2) },

  /** 1.5rem (24px) - 3× base */
  harmonic3: { value: pxToRem(spacingPrimitives.harmonic3) },

  /** 2rem (32px) - 4× base */
  harmonic4: { value: pxToRem(spacingPrimitives.harmonic4) },

  /** 2.5rem (40px) - 5× base */
  harmonic5: { value: pxToRem(spacingPrimitives.harmonic5) },

  /** 3rem (48px) - 6× base */
  harmonic6: { value: pxToRem(spacingPrimitives.harmonic6) },

  /** 4rem (64px) - 8× base */
  harmonic8: { value: pxToRem(spacingPrimitives.harmonic8) },

  /** 5rem (80px) - 10× base */
  harmonic10: { value: pxToRem(spacingPrimitives.harmonic10) },

  /** 6rem (96px) - 12× base */
  harmonic12: { value: pxToRem(spacingPrimitives.harmonic12) },

  /** 8rem (128px) - 16× base */
  harmonic16: { value: pxToRem(spacingPrimitives.harmonic16) },

  // ========================================
  // Negative spacing (for overlaps)
  // ========================================

  /** -0.6rem (-9.6px) */
  negMinorThird: { value: pxToRem(spacingPrimitives.negMinorThird) },

  /** -0.75rem (-12px) */
  negPerfectFifth: { value: pxToRem(spacingPrimitives.negPerfectFifth) },

  /** -1rem (-16px) */
  negOctave: { value: pxToRem(spacingPrimitives.negOctave) },

  /** -1.5rem (-24px) */
  negHarmonic3: { value: pxToRem(spacingPrimitives.negHarmonic3) },
} as const

// ============================================================================
// CONTAINER SIZES
// ============================================================================

export const sizes = {
  // ========================================
  // Harmonic container sizes
  // ========================================

  /** 10rem (160px) - 2nd harmonic × 10 */
  container2: { value: pxToRem(containerPrimitives.container2) },

  /** 15rem (240px) - 3rd harmonic × 10 */
  container3: { value: pxToRem(containerPrimitives.container3) },

  /** 20rem (320px) - 4th harmonic × 10 */
  container4: { value: pxToRem(containerPrimitives.container4) },

  /** 30rem (480px) - 6th harmonic × 10 */
  container6: { value: pxToRem(containerPrimitives.container6) },

  /** 40rem (640px) - 8th harmonic × 10 */
  container8: { value: pxToRem(containerPrimitives.container8) },

  /** 60rem (960px) - 12th harmonic × 10 */
  container12: { value: pxToRem(containerPrimitives.container12) },

  /** 80rem (1280px) - 16th harmonic × 10 */
  container16: { value: pxToRem(containerPrimitives.container16) },

  // ========================================
  // Content-based sizes
  // ========================================

  full: { value: '100%' },
  screen: { value: '100vw' },
  min: { value: 'min-content' },
  max: { value: 'max-content' },
  fit: { value: 'fit-content' },
} as const
