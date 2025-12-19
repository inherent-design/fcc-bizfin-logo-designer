/**
 * Primitive Token Definitions
 */

import { polarAngles, radianAngles } from './constants'

// Degrees
export const angles = {
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

// Radians (Tau)
export const radiansAngles = {
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

// Turns
export const turns = {
  quarter: angles.deg90,
  half: angles.deg180,
  threeQuarter: angles.deg270,
  full: angles.deg360,
} as const

// Directional intent
export const direction = {
  up: angles.deg0,
  right: angles.deg90,
  down: angles.deg180,
  left: angles.deg270,
} as const

// Tilt/skew
export const tilt = {
  subtle: angles.deg15,
  moderate: angles.deg30,
  strong: angles.deg45,
} as const

// Radial divisions
export const radial = {
  quarters: angles.deg90,
  sixths: angles.deg60,
  eighths: angles.deg45,
  twelfths: angles.deg30,
} as const
