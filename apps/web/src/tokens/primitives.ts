/**
 * Primitive Token Definitions
 *
 * Layer 1: Unitless calculations from constants
 * - All values are NUMBERS (no CSS units)
 * - NO semantic names (describe calculation, not purpose)
 * - Consumed by base layer to create CSS-valued tokens
 *
 * Formula explanations:
 * - Spacing: BASES.rhythm × 2 × ratio (4 × 2 × ratio = pixels)
 * - Typography: BASES.type × ratio^step (1 × 1.2^2 = 1.44rem)
 */

import {
  BASES,
  musicalRatios,
  harmonicSeries,
  subharmonicSeries,
  polarAngles,
  radianAngles,
  opacityRatios,
} from './constants'

// ============================================================================
// SPACING PRIMITIVES (pixels as numbers)
// ============================================================================

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
 */
const rhythmToPx = (ratio: number): number => BASES.rhythm * 2 * ratio

export const spacingPrimitives = {
  // ========================================
  // Micro spacing (subharmonic fractions)
  // ========================================

  /** 1px - 1/8 of base */
  micro1: rhythmToPx(subharmonicSeries.eighth), // 1px

  /** 2px - 1/4 of base */
  micro2: rhythmToPx(subharmonicSeries.fourth), // 2px

  /** 4px - 1/2 of base */
  micro4: rhythmToPx(subharmonicSeries.second), // 4px

  // ========================================
  // Musical ratio spacing
  // ========================================

  /** Base rhythm - 8px */
  base: rhythmToPx(musicalRatios.unison), // 8px

  /** Minor Second - 8.5px (16:15) */
  minorSecond: rhythmToPx(musicalRatios.minorSecond), // ~8.5px

  /** Major Second - 9px (9:8) */
  majorSecond: rhythmToPx(musicalRatios.majorSecond), // 9px

  /** Minor Third - 9.6px (6:5) */
  minorThird: rhythmToPx(musicalRatios.minorThird), // 9.6px

  /** Major Third - 10px (5:4) */
  majorThird: rhythmToPx(musicalRatios.majorThird), // 10px

  /** Perfect Fourth - 10.67px (4:3) */
  perfectFourth: rhythmToPx(musicalRatios.perfectFourth), // ~10.67px

  /** Perfect Fifth - 12px (3:2) */
  perfectFifth: rhythmToPx(musicalRatios.perfectFifth), // 12px

  /** Minor Sixth - 12.8px (8:5) */
  minorSixth: rhythmToPx(musicalRatios.minorSixth), // 12.8px

  /** Major Sixth - 13.33px (5:3) */
  majorSixth: rhythmToPx(musicalRatios.majorSixth), // ~13.33px

  /** Octave - 16px (2:1) */
  octave: rhythmToPx(musicalRatios.octave), // 16px

  // ========================================
  // Harmonic series (structural spacing)
  // ========================================

  /** 2nd harmonic - 16px (2×) */
  harmonic2: rhythmToPx(harmonicSeries.second), // 16px

  /** 3rd harmonic - 24px (3×) */
  harmonic3: rhythmToPx(harmonicSeries.third), // 24px

  /** 4th harmonic - 32px (4×) */
  harmonic4: rhythmToPx(harmonicSeries.fourth), // 32px

  /** 5th harmonic - 40px (5×) */
  harmonic5: rhythmToPx(harmonicSeries.fifth), // 40px

  /** 6th harmonic - 48px (6×) */
  harmonic6: rhythmToPx(harmonicSeries.sixth), // 48px

  /** 8th harmonic - 64px (8×) */
  harmonic8: rhythmToPx(harmonicSeries.eighth), // 64px

  /** 10th harmonic - 80px (10×) */
  harmonic10: rhythmToPx(harmonicSeries.tenth), // 80px

  /** 12th harmonic - 96px (12×) */
  harmonic12: rhythmToPx(harmonicSeries.twelfth), // 96px

  /** 16th harmonic - 128px (16×) */
  harmonic16: rhythmToPx(harmonicSeries.sixteenth), // 128px

  // ========================================
  // Negative spacing (for overlaps)
  // ========================================

  /** Negative micro4 - -4px (architectural: tab border overlap) */
  negMicro4: -rhythmToPx(subharmonicSeries.second), // -4px

  /** Negative minor third - -9.6px */
  negMinorThird: -rhythmToPx(musicalRatios.minorThird), // -9.6px

  /** Negative major third - -10px */
  negMajorThird: -rhythmToPx(musicalRatios.majorThird), // -10px

  /** Negative perfect fifth - -12px */
  negPerfectFifth: -rhythmToPx(musicalRatios.perfectFifth), // -12px

  /** Negative octave - -16px */
  negOctave: -rhythmToPx(musicalRatios.octave), // -16px

  /** Negative harmonic3 - -24px */
  negHarmonic3: -rhythmToPx(harmonicSeries.third), // -24px
} as const

// ============================================================================
// TYPOGRAPHY PRIMITIVES (rem as numbers)
// ============================================================================

/**
 * Generate type scale step using musical ratio
 *
 * Formula: BASES.type × ratio^step
 * - BASES.type = 1 (1rem base)
 * - ratio = musical interval (e.g., 1.2 for minor third)
 * - step = position in scale (-2, -1, 0, +1, +2...)
 *
 * @param step - Scale step (0 = base, +1 = larger, -1 = smaller)
 * @param ratio - Musical ratio to use for progression
 * @returns Font size in rem as number (e.g., 1.44 for 1.44rem)
 */
const typeScale = (step: number, ratio: number): number => BASES.type * Math.pow(ratio, step)

/**
 * Typography scale using minor third (1.2) ratio
 *
 * Minor third chosen for:
 * - Balanced progression (not too aggressive)
 * - Matches Apple HIG empirical patterns
 * - 1.2^6 ≈ 3× (display sizes)
 */
export const typePrimitives = {
  /** -2 steps - 0.694rem */
  typeMinus2: typeScale(-2, musicalRatios.minorThird), // ~0.694

  /** -1 step - 0.833rem */
  typeMinus1: typeScale(-1, musicalRatios.minorThird), // ~0.833

  /** Base - 1rem (16px with browser default) */
  typeBase: typeScale(0, musicalRatios.minorThird), // 1.0

  /** +1 step - 1.2rem */
  typePlus1: typeScale(1, musicalRatios.minorThird), // 1.2

  /** +2 steps - 1.44rem */
  typePlus2: typeScale(2, musicalRatios.minorThird), // 1.44

  /** +3 steps - 1.728rem */
  typePlus3: typeScale(3, musicalRatios.minorThird), // 1.728

  /** +4 steps - 2.074rem */
  typePlus4: typeScale(4, musicalRatios.minorThird), // ~2.074

  /** +5 steps - 2.488rem */
  typePlus5: typeScale(5, musicalRatios.minorThird), // ~2.488

  /** +6 steps - 2.986rem */
  typePlus6: typeScale(6, musicalRatios.minorThird), // ~2.986

  /** +7 steps - 3.583rem */
  typePlus7: typeScale(7, musicalRatios.minorThird), // ~3.583

  /** +8 steps - 4.3rem */
  typePlus8: typeScale(8, musicalRatios.minorThird), // ~4.3

  /** Display scale - using octave jumps for large sizes */
  displayBase: BASES.type * musicalRatios.octave * 2, // 4rem (64px)
  displayPlus1: BASES.type * musicalRatios.octave * 2.5, // 5rem (80px)
  displayPlus2: BASES.type * musicalRatios.octave * 3, // 6rem (96px)
  displayPlus3: BASES.type * musicalRatios.octave * harmonicSeries.fourth, // 8rem (128px) - two octaves
  displayPlus4: BASES.type * musicalRatios.octave * harmonicSeries.fifth, // 10rem (160px) - fifth harmonic
} as const

// ============================================================================
// CONTAINER SIZE PRIMITIVES (pixels as numbers)
// ============================================================================

/**
 * Container sizes using harmonic series
 *
 * Based on Apple HIG container recommendations with harmonic alignment.
 * Perfect for responsive layout breakpoints.
 */
export const containerPrimitives = {
  /** 2nd harmonic × 10 - 160px (small mobile) */
  container2: harmonicSeries.second * 10 * BASES.rhythm * 2, // 160px

  /** 3rd harmonic × 10 - 240px (large mobile) */
  container3: harmonicSeries.third * 10 * BASES.rhythm * 2, // 240px

  /** 4th harmonic × 10 - 320px (tablet) */
  container4: harmonicSeries.fourth * 10 * BASES.rhythm * 2, // 320px

  /** 6th harmonic × 10 - 480px (desktop) */
  container6: harmonicSeries.sixth * 10 * BASES.rhythm * 2, // 480px

  /** 8th harmonic × 10 - 640px (large desktop) */
  container8: harmonicSeries.eighth * 10 * BASES.rhythm * 2, // 640px

  /** 12th harmonic × 10 - 960px (XL desktop) */
  container12: harmonicSeries.twelfth * 10 * BASES.rhythm * 2, // 960px

  /** 16th harmonic × 10 - 1280px (XXL desktop) */
  container16: harmonicSeries.sixteenth * 10 * BASES.rhythm * 2, // 1280px
} as const

// ============================================================================
// ANGLE PRIMITIVES (degrees and radians as numbers)
// ============================================================================

/**
 * Degrees (unitless numbers)
 */
export const angleDegrees = {
  deg0: polarAngles.deg0,
  deg10: polarAngles.deg10,
  deg15: polarAngles.deg15,
  deg30: polarAngles.deg30,
  deg45: polarAngles.deg45,
  deg60: polarAngles.deg60,
  deg90: polarAngles.deg90,
  deg120: polarAngles.deg120,
  deg135: polarAngles.deg135,
  deg150: polarAngles.deg150,
  deg180: polarAngles.deg180,
  deg225: polarAngles.deg225,
  deg270: polarAngles.deg270,
  deg315: polarAngles.deg315,
  deg360: polarAngles.deg360,
} as const

/**
 * Radians (unitless numbers)
 */
export const angleRadians = {
  rad0: radianAngles.rad0,
  radTau24: radianAngles.radTau24,
  radTau12: radianAngles.radTau12,
  radTau8: radianAngles.radTau8,
  radTau6: radianAngles.radTau6,
  radTau4: radianAngles.radTau4,
  radTau3: radianAngles.radTau3,
  radTau2_67: radianAngles.radTau2_67,
  radTau2: radianAngles.radTau2,
  radTau1_33: radianAngles.radTau1_33,
  radTau: radianAngles.radTau,
} as const

/**
 * Directional angles (semantic at primitive layer for common directions)
 */
export const angleDirections = {
  /** Up - 0° */
  up: angleDegrees.deg0,

  /** Right - 90° */
  right: angleDegrees.deg90,

  /** Down - 180° */
  down: angleDegrees.deg180,

  /** Left - 270° */
  left: angleDegrees.deg270,
} as const

// ============================================================================
// OPACITY PRIMITIVES (0-1 as numbers)
// ============================================================================

/**
 * Opacity levels using subharmonic series
 */
export const opacityPrimitives = {
  /** Disabled - 0.25 (1/4) */
  disabled: opacityRatios.disabled,

  /** Muted - 0.333 (1/3) */
  muted: opacityRatios.muted,

  /** Subtle - 0.5 (1/2) */
  subtle: opacityRatios.subtle,

  /** Medium - 0.75 (3/4) */
  medium: opacityRatios.medium,

  /** Full - 1.0 */
  full: opacityRatios.full,
} as const

// ============================================================================
// BORDER RADIUS PRIMITIVES (pixels as numbers)
// ============================================================================

/**
 * Border radius values
 */
export const radiusPrimitives = {
  /** None - 0px */
  none: 0,

  /** Small - 4px */
  sm: rhythmToPx(subharmonicSeries.second), // 4px

  /** Medium - 8px */
  md: rhythmToPx(musicalRatios.unison), // 8px

  /** Large - 12px */
  lg: rhythmToPx(musicalRatios.perfectFifth), // 12px

  /** Extra large - 16px */
  xl: rhythmToPx(musicalRatios.octave), // 16px
} as const

// ============================================================================
// BORDER WIDTH PRIMITIVES (pixels as numbers)
// ============================================================================

/**
 * Border width values
 */
export const borderWidthPrimitives = {
  /** Hairline - 1px */
  hairline: 1,

  /** Thin - 2px */
  thin: 2,

  /** Base - 4px */
  base: rhythmToPx(subharmonicSeries.second), // 4px

  /** Medium - 8px */
  medium: rhythmToPx(musicalRatios.unison), // 8px

  /** Thick - 12px */
  thick: rhythmToPx(musicalRatios.perfectFifth), // 12px

  /** Extra thick - 16px */
  extraThick: rhythmToPx(musicalRatios.octave), // 16px
} as const
