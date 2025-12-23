/**
 * Base Typography Tokens
 *
 * Layer 2: CSS values with units
 * - Font families, sizes, weights, line heights, letter spacing
 * - References primitives for calculations
 * - NO token references
 */

import { letterSpacingRatios, musicalRatios } from '../constants'
import { typePrimitives } from '../primitives'

// ============================================================================
// FONT FAMILIES
// ============================================================================

export const fonts = {
  space_grotesk: { value: 'Space Grotesk, system-ui, sans-serif' },
  fira_code: { value: 'Fira Code, Consolas, Monaco, monospace' },
} as const

// ============================================================================
// FONT SIZES
// ============================================================================

export const fontSizes = {
  /** 0.694rem - Smallest text */
  typeMinus2: { value: `${typePrimitives.typeMinus2.toFixed(3)}rem` },

  /** 0.833rem - Small text */
  typeMinus1: { value: `${typePrimitives.typeMinus1.toFixed(3)}rem` },

  /** 1rem - Base size */
  typeBase: { value: `${typePrimitives.typeBase}rem` },

  /** 1.2rem - +1 step */
  typePlus1: { value: `${typePrimitives.typePlus1}rem` },

  /** 1.44rem - +2 steps */
  typePlus2: { value: `${typePrimitives.typePlus2}rem` },

  /** 1.728rem - +3 steps */
  typePlus3: { value: `${typePrimitives.typePlus3.toFixed(3)}rem` },

  /** 2.074rem - +4 steps */
  typePlus4: { value: `${typePrimitives.typePlus4.toFixed(3)}rem` },

  /** 2.488rem - +5 steps */
  typePlus5: { value: `${typePrimitives.typePlus5.toFixed(3)}rem` },

  /** 2.986rem - +6 steps */
  typePlus6: { value: `${typePrimitives.typePlus6.toFixed(3)}rem` },

  /** 3.583rem - +7 steps */
  typePlus7: { value: `${typePrimitives.typePlus7.toFixed(3)}rem` },

  /** 4.3rem - +8 steps */
  typePlus8: { value: `${typePrimitives.typePlus8.toFixed(3)}rem` },

  /** 4rem - Display base */
  displayBase: { value: `${typePrimitives.displayBase}rem` },

  /** 5rem - Display +1 */
  displayPlus1: { value: `${typePrimitives.displayPlus1}rem` },

  /** 6rem - Display +2 */
  displayPlus2: { value: `${typePrimitives.displayPlus2}rem` },

  /** 8rem - Display +3 (two octaves) */
  displayPlus3: { value: `${typePrimitives.displayPlus3}rem` },

  /** 10rem - Display +4 (fifth harmonic) */
  displayPlus4: { value: `${typePrimitives.displayPlus4}rem` },
} as const

// ============================================================================
// FONT WEIGHTS
// ============================================================================

export const fontWeights = {
  fontWeight400: { value: '400' },
  fontWeight500: { value: '500' },
  fontWeight600: { value: '600' },
  fontWeight700: { value: '700' },
  fontWeight900: { value: '900' },
} as const

// ============================================================================
// LINE HEIGHTS
// ============================================================================

export const lineHeights = {
  /** 1.2 - Minor third ratio */
  lineHeight1_2: { value: `${musicalRatios.minorThird}` },

  /** 1.5 - Perfect fifth ratio */
  lineHeight1_5: { value: `${musicalRatios.perfectFifth}` },

  /** 1.778 - Minor seventh ratio */
  lineHeight1_778: { value: `${musicalRatios.minorSeventh.toFixed(3)}` },
} as const

// ============================================================================
// LETTER SPACING
// ============================================================================

export const letterSpacings = {
  /** -0.05em - Negative tracking */
  letterSpacingNeg0_05: { value: `${letterSpacingRatios.ratioNeg5}em` },

  /** 0em - No tracking */
  letterSpacing0: { value: `${letterSpacingRatios.ratio0}em` },

  /** 0.025em */
  letterSpacing0_025: { value: `${letterSpacingRatios.ratio2_5}em` },

  /** 0.05em */
  letterSpacing0_05: { value: `${letterSpacingRatios.ratio5}em` },

  /** 0.1em */
  letterSpacing0_1: { value: `${letterSpacingRatios.ratio10}em` },
} as const
