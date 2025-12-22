/**
 * Token Generation Constants
 *
 * Layer 0: Pure mathematics, zero semantic meaning
 * - Ratios, angles, base values
 * - NO CSS units
 * - NO semantic names
 *
 * These are the single source of truth for all primitive calculations.
 * Changing these values will regenerate all derived tokens.
 */

// ============================================================================
// BASE VALUES
// ============================================================================

/**
 * Foundational numeric bases for token generation
 */
export const BASES = {
  /** Base rhythm unit (quarter notes in time) - 4 converts to 8px */
  rhythm: 4,
  /** Base typography unit in rem */
  type: 1,
} as const

// ============================================================================
// ACCESSIBILITY CONSTANTS
// ============================================================================

/**
 * Minimum touch target dimension per WCAG 2.2 (Level AAA) and Apple HIG
 *
 * WCAG Success Criterion 2.5.5 (Level AAA): Target size of at least 44 by 44 CSS pixels
 * Apple HIG: Provide ample touch targets for interactive elements (minimum 44×44 points)
 *
 * @see https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
 * @see https://developer.apple.com/design/human-interface-guidelines/layout
 */
export const MIN_TOUCH_TARGET = 44 as const

// ============================================================================
// MUSICAL RATIOS (Just Intonation)
// ============================================================================

/**
 * Complete diatonic interval set using just intonation (simple ratios)
 *
 * Just intonation uses pure mathematical ratios (3:2, 5:4, etc.) rather than
 * equal temperament (12th root of 2). This provides:
 * - Simpler mathematics (3/2 vs 1.4983)
 * - Better alignment with Apple HIG empirical values
 * - Human-comprehensible ratios
 *
 * @see https://en.wikipedia.org/wiki/Just_intonation
 * @see ~/production/.atlas/integrator-reports/token-system-redesign-2025-12-19.md
 */
export const musicalRatios = {
  /** Unison - 1:1 (1.0) - Same pitch */
  unison: 1 / 1,

  /** Minor Second - 16:15 (1.067) - Semitone */
  minorSecond: 16 / 15,

  /** Major Second - 9:8 (1.125) - Whole tone */
  majorSecond: 9 / 8,

  /** Minor Third - 6:5 (1.2) - Subtle progression */
  minorThird: 6 / 5,

  /** Major Third - 5:4 (1.25) - Bright progression */
  majorThird: 5 / 4,

  /** Perfect Fourth - 4:3 (1.333) - Stable, open */
  perfectFourth: 4 / 3,

  /** Tritone - 45:32 (1.406) - Augmented fourth */
  tritone: 45 / 32,

  /** Perfect Fifth - 3:2 (1.5) - Strong progression */
  perfectFifth: 3 / 2,

  /** Minor Sixth - 8:5 (1.6) - Slightly tense */
  minorSixth: 8 / 5,

  /** Major Sixth - 5:3 (1.667) - Consonant */
  majorSixth: 5 / 3,

  /** Minor Seventh - 16:9 (1.778) - Dominant tension */
  minorSeventh: 16 / 9,

  /** Major Seventh - 15:8 (1.875) - Leading tone */
  majorSeventh: 15 / 8,

  /** Octave - 2:1 (2.0) - Double frequency */
  octave: 2 / 1,
} as const

/**
 * Equal temperament ratios (for comparison/experimentation)
 *
 * Equal temperament divides the octave into 12 equal semitones using
 * the 12th root of 2 (≈1.05946). This is used in modern Western music
 * for instrument tuning.
 *
 * NOT RECOMMENDED for design tokens - just intonation ratios are simpler
 * and better aligned with HIG patterns.
 *
 * @see ~/production/.atlas/integrator-reports/token-system-redesign-2025-12-19.md
 */
export const equalTemperamentRatios = {
  minorSecond: Math.pow(2, 1 / 12), // 1.0595
  majorSecond: Math.pow(2, 2 / 12), // 1.1225
  minorThird: Math.pow(2, 3 / 12), // 1.1892
  majorThird: Math.pow(2, 4 / 12), // 1.2599
  perfectFourth: Math.pow(2, 5 / 12), // 1.3348
  tritone: Math.pow(2, 6 / 12), // 1.4142
  perfectFifth: Math.pow(2, 7 / 12), // 1.4983
  minorSixth: Math.pow(2, 8 / 12), // 1.5874
  majorSixth: Math.pow(2, 9 / 12), // 1.6818
  minorSeventh: Math.pow(2, 10 / 12), // 1.7818
  majorSeventh: Math.pow(2, 11 / 12), // 1.8877
  octave: Math.pow(2, 12 / 12), // 2.0
} as const

// ============================================================================
// HARMONIC SERIES
// ============================================================================

/**
 * Harmonic (overtone) series - integer multiples of fundamental frequency
 *
 * Perfect for structural divisions and container sizing.
 * Apple HIG spacing uses harmonic series: 4pt × [1, 2, 3, 4, 6, 8]
 *
 * @see https://en.wikipedia.org/wiki/Harmonic_series_(music)
 */
export const harmonicSeries = {
  /** 1st harmonic - Fundamental (1×) */
  fundamental: 1,

  /** 2nd harmonic - Octave (2×) */
  second: 2,

  /** 3rd harmonic - Octave + Perfect Fifth (3×) */
  third: 3,

  /** 4th harmonic - Two octaves (4×) */
  fourth: 4,

  /** 5th harmonic - Two octaves + Major Third (5×) */
  fifth: 5,

  /** 6th harmonic - Two octaves + Perfect Fifth (6×) */
  sixth: 6,

  /** 8th harmonic - Three octaves (8×) */
  eighth: 8,

  /** 10th harmonic - Three octaves + Major Third (10×) */
  tenth: 10,

  /** 12th harmonic - Three octaves + Perfect Fifth (12×) */
  twelfth: 12,

  /** 16th harmonic - Four octaves (16×) */
  sixteenth: 16,
} as const

/**
 * Subharmonic (undertone) series - unit fractions below fundamental
 *
 * Useful for micro-spacing, opacity scales, and fractional values.
 *
 * @see https://en.wikipedia.org/wiki/Undertone_series
 */
export const subharmonicSeries = {
  /** 1st subharmonic - Fundamental (1.0) */
  fundamental: 1,

  /** 2nd subharmonic - Octave down (0.5) */
  second: 1 / 2,

  /** 3rd subharmonic - Octave + Fifth down (0.333) */
  third: 1 / 3,

  /** 4th subharmonic - Two octaves down (0.25) */
  fourth: 1 / 4,

  /** 5th subharmonic (0.2) */
  fifth: 1 / 5,

  /** 6th subharmonic (0.167) */
  sixth: 1 / 6,

  /** 8th subharmonic - Three octaves down (0.125) */
  eighth: 1 / 8,
} as const

// ============================================================================
// CHORD RATIOS
// ============================================================================

/**
 * Chord ratios for multi-token semantic progressions
 *
 * Use in semantic layer to define harmonious relationships between
 * multiple tokens (e.g., 4-tier text hierarchy using dominant 7th chord).
 *
 * @see ~/production/.atlas/integrator-reports/token-system-redesign-2025-12-19.md
 */
export const chordRatios = {
  /** Major triad - 4:5:6 (1.0, 1.25, 1.5) - Bright, expansive */
  majorTriad: [1.0, 1.25, 1.5] as const,

  /** Minor triad - 10:12:15 (1.0, 1.2, 1.5) - Subtle, contained */
  minorTriad: [1.0, 1.2, 1.5] as const,

  /** Dominant 7th - 4:5:6:7 (1.0, 1.25, 1.5, 1.75) - 4-tier hierarchy */
  dominant7th: [1.0, 1.25, 1.5, 1.75] as const,

  /** Major 7th - 8:10:12:15 (1.0, 1.25, 1.5, 1.875) */
  major7th: [1.0, 1.25, 1.5, 1.875] as const,

  /** Minor 7th - 10:12:15:18 (1.0, 1.2, 1.5, 1.8) */
  minor7th: [1.0, 1.2, 1.5, 1.8] as const,
} as const

// ============================================================================
// POLAR ANGLES
// ============================================================================

/**
 * Polar angle increments in degrees
 */
export const polarAngles = {
  deg0: 0,
  deg10: 10,
  deg15: 15,
  deg30: 30,
  deg45: 45,
  deg60: 60,
  deg90: 90,
  deg120: 120,
  deg135: 135,
  deg150: 150,
  deg180: 180,
  deg225: 225,
  deg270: 270,
  deg315: 315,
  deg360: 360,
} as const

/**
 * Radian angles using tau (τ = 2π) notation
 */
export const radianAngles = {
  rad0: 0,
  radTau24: (Math.PI * 2) / 24, // π/12 = 15°
  radTau12: (Math.PI * 2) / 12, // π/6 = 30°
  radTau8: (Math.PI * 2) / 8, // π/4 = 45°
  radTau6: (Math.PI * 2) / 6, // π/3 = 60°
  radTau4: (Math.PI * 2) / 4, // π/2 = 90°
  radTau3: (Math.PI * 2) / 3, // 2π/3 = 120°
  radTau2_67: (Math.PI * 2 * 3) / 8, // 3π/4 = 135°
  radTau2: (Math.PI * 2) / 2, // π = 180°
  radTau1_33: (Math.PI * 2 * 3) / 4, // 3π/2 = 270°
  radTau: Math.PI * 2, // 2π = 360° (full circle)
} as const

// ============================================================================
// ANIMATION DURATIONS
// ============================================================================

/**
 * Base duration for animation timing (milliseconds)
 */
export const durationBase = 150

/**
 * Duration ratio multipliers
 * Magnitude-based naming (no semantic intent)
 */
export const durationRatios = {
  /** 0.67 - 2/3 of base (produces 100ms) */
  ratio67: 2 / 3,

  /** 1.0 - 1× base (produces 150ms) */
  ratio100: 1,

  /** 1.5 - Perfect Fifth ratio (produces 225ms) */
  ratio150: musicalRatios.perfectFifth,

  /** 2.25 - Perfect Fifth squared (produces 337.5ms) */
  ratio225: musicalRatios.perfectFifth ** 2,
} as const

// ============================================================================
// Z-INDEX SCALE
// ============================================================================

/**
 * Z-index layering scale - numeric progression
 */
export const zIndexScale = {
  zIndex0: 0,
  zIndex1: 1,
  zIndex10: 10,
  zIndex12: 12,
  zIndex15: 15,
  zIndex18: 18,
  zIndex20: 20,
  zIndex22: 22,
  zIndex25: 25,
  zIndex30: 30,
  zIndex50: 50,
  zIndex80: 80,
} as const

// ============================================================================
// LETTER SPACING RATIOS
// ============================================================================

/**
 * Letter spacing as fraction of font size
 * Magnitude-based naming (no semantic intent)
 */
export const letterSpacingRatios = {
  /** -5% tracking */
  ratioNeg5: -0.05,
  /** 0% tracking (no tracking) */
  ratio0: 0,
  /** 2.5% tracking (1/40) */
  ratio2_5: 0.025,
  /** 5% tracking (1/20) */
  ratio5: 0.05,
  /** 10% tracking (1/10) */
  ratio10: 0.1,
} as const

// ============================================================================
// OPACITY RATIOS
// ============================================================================

/**
 * Opacity levels using subharmonic series
 * Magnitude-based naming (no semantic intent)
 */
export const opacityRatios = {
  /** 0.25 (1/4 subharmonic) */
  ratio25: subharmonicSeries.fourth,

  /** 0.333 (1/3 subharmonic) */
  ratio33: subharmonicSeries.third,

  /** 0.5 (1/2 subharmonic) */
  ratio50: subharmonicSeries.second,

  /** 0.67 (2/3) */
  ratio67: 1 - subharmonicSeries.third,

  /** 0.75 (3/4) */
  ratio75: 1 - subharmonicSeries.fourth,

  /** 0.90 (9/10) */
  ratio90: 0.9,

  /** 1.0 (full) */
  ratio100: subharmonicSeries.fundamental,
} as const

// ============================================================================
// COLOR SEEDS (OKLCH)
// ============================================================================

/**
 * Minimal color seeds for OKLCH palette generation
 *
 * These constants serve as input to Layer 1 primitive generation.
 * - Hue: 0-360 degrees (OKLCH hue wheel)
 * - Chroma: 0-0.4 (saturation intensity)
 */
export const colorSeeds = {
  /** Neutral hue - Blue-gray (240°) for neutral palette */
  neutralHue: 240,

  /** Base chroma for neutral colors - Low saturation (0.05) */
  baseChroma: 0.05,
} as const

// ============================================================================
// BREAKPOINTS
// ============================================================================

/**
 * Responsive breakpoints (in rem)
 */
export const breakpoints = {
  sm: '40rem', // 640px
  md: '48rem', // 768px
  lg: '64rem', // 1024px
  xl: '80rem', // 1280px
  '2xl': '96rem', // 1536px
  tablet: '48rem',
  desktop: '80rem',
} as const

// ============================================================================
// TYPE ALIASES
// ============================================================================

export type PolarAngle = keyof typeof polarAngles
export type RadianAngle = keyof typeof radianAngles
export type MusicalRatio = keyof typeof musicalRatios
export type HarmonicMultiple = keyof typeof harmonicSeries
export type DurationRatio = keyof typeof durationRatios
export type ZIndexLevel = keyof typeof zIndexScale
