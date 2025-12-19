/**
 * Token Generation Constants
 *
 * These base values and ratio systems are the single source of truth
 * for all primitive tokens. Change these to experiment with different
 * design scales.
 *
 * WARN run `pnpm prepare` to regen. tokens
 */
export const BASES = {
  rhythm: 4,
  type: 1,
} as const

/**
 * Polar angle increments
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

/**
 * Musical ratios
 *
 * @see https://en.wikipedia.org/wiki/Just_intonation
 * @see https://en.wikipedia.org/wiki/Harmonic_series_(music)
 */
export const musicalRatios = {
  minorThird: 6 / 5, // 1.200 - Minor third (Eb)
  majorThird: 5 / 4, // 1.250 - Major third (E)
  perfectFourth: 4 / 3, // 1.333 - Perfect fourth (F)
  perfectFifth: 3 / 2, // 1.500 - Perfect fifth (G)
  minorSixth: 8 / 5, // 1.600 - Minor sixth (Ab)
  goldenRatio: (1 + Math.sqrt(5)) / 2, // 1.618 - Phi (golden ratio)
  minorSeventh: 16 / 9, // 1.778 - Minor seventh (Bb)
  octave: 2 / 1, // 2.000 - Octave (C)
} as const

/**
 * Letter spacing ratios
 */
export const letterSpacingRatios = {
  tight: -0.05, // -5% tracking
  normal: 0, // No tracking
  wide: 0.025, // 2.5% (1/40)
  wider: 0.05, // 5% (1/20)
  widest: 0.1, // 10% (1/10)
} as const

/**
 * Transform scale ratios
 */
export const scaleRatios = {
  subtle: 1.05, // ~5% (current)
} as const

/**
 * Opacity ratios
 */
export const opacityRatios = {
  disabled: 1 / 4, // 0.250
  muted: 2 / 5, // 0.400
  subtle: 1 / musicalRatios.goldenRatio, // 0.618 (φ⁻¹)
  medium: 1 - (1 / musicalRatios.goldenRatio) ** 2, // 0.854 (1 - φ⁻²)
} as const

/**
 * Animation duration ratios
 */
export const durationBase = 150

export const durationRatios = {
  fast: 2 / 3, // 100ms
  normal: 1, // 150ms
  slow: musicalRatios.perfectFifth, // 225ms (3/2 ratio)
  verySlow: musicalRatios.perfectFifth ** 2, // 337.5ms (9/4 ratio)
} as const

export const durations = {
  fast: Math.round(durationBase * durationRatios.fast),
  normal: Math.round(durationBase * durationRatios.normal),
  slow: Math.round(durationBase * durationRatios.slow),
  verySlow: Math.round(durationBase * durationRatios.verySlow),
}

/**
 * Z-index scale based on Fibonacci sequence
 */
export const zIndexScale = {
  base: 1,
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  modal: 50,
  tooltip: 80,
} as const

/**
 * Breakpoints
 */
export const breakpoints = {
  sm: '64rem', // 640px
  md: '76.8rem', // 768px
  lg: '102.4rem', // 1024px
  xl: '128rem', // 1280px
  '2xl': '153.6rem', // 1536px
  tablet: '76.8rem',
  desktop: '128rem',
} as const

/**
 * Type aliases for better IDE autocomplete
 */
export type PolarAngle = keyof typeof polarAngles
export type RadianAngle = keyof typeof radianAngles
export type MusicalRatio = keyof typeof musicalRatios
export type DurationRatio = keyof typeof durationRatios
export type ZIndexLevel = keyof typeof zIndexScale
