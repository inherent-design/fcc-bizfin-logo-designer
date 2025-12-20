/**
 * Base Animation Tokens
 *
 * Layer 2: CSS values with units
 * - Durations and easings
 * - References constants for calculations
 */

import { durationBase, durationRatios } from '../constants'

// ============================================================================
// DURATIONS
// ============================================================================

export const durations = {
  /** 100ms - Fast animation */
  fast: { value: `${Math.round(durationBase * durationRatios.fast)}ms` },

  /** 150ms - Normal animation */
  normal: { value: `${Math.round(durationBase * durationRatios.normal)}ms` },

  /** 225ms - Slow animation (perfect fifth ratio) */
  slow: { value: `${Math.round(durationBase * durationRatios.slow)}ms` },

  /** 338ms - Very slow animation (perfect fifth squared) */
  verySlow: { value: `${Math.round(durationBase * durationRatios.verySlow)}ms` },
} as const

// ============================================================================
// EASINGS
// ============================================================================

export const easings = {
  /** Default ease */
  default: { value: 'ease' },

  /** Smooth cubic-bezier */
  smooth: { value: 'cubic-bezier(0.4, 0, 0.2, 1)' },

  /** Ease-in */
  in: { value: 'ease-in' },

  /** Ease-out */
  out: { value: 'ease-out' },

  /** Ease-in-out */
  inOut: { value: 'ease-in-out' },
} as const
