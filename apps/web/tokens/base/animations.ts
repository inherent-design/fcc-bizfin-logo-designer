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
  /** 100ms */
  duration100: { value: `${Math.round(durationBase * durationRatios.ratio67)}ms` },

  /** 150ms */
  duration150: { value: `${Math.round(durationBase * durationRatios.ratio100)}ms` },

  /** 225ms */
  duration225: { value: `${Math.round(durationBase * durationRatios.ratio150)}ms` },

  /** 338ms */
  duration338: { value: `${Math.round(durationBase * durationRatios.ratio225)}ms` },
} as const

// ============================================================================
// EASINGS
// ============================================================================

export const easings = {
  /** Smooth cubic-bezier (0.4, 0, 0.2, 1) */
  easingSmooth: { value: 'cubic-bezier(0.4, 0, 0.2, 1)' },

  /** Ease-in */
  easingIn: { value: 'ease-in' },

  /** Ease-out */
  easingOut: { value: 'ease-out' },

  /** Ease-in-out */
  easingInOut: { value: 'ease-in-out' },
} as const

// ============================================================================
// TRANSITION PATTERNS
// ============================================================================

export const transitions = {
  /** Colors-only 100ms transition */
  transitionColors100: { value: `color, background-color, border-color ${Math.round(durationBase * durationRatios.ratio67)}ms cubic-bezier(0.4, 0, 0.2, 1)` },

  /** Transform-only 150ms transition */
  transitionTransform150: { value: `transform ${Math.round(durationBase * durationRatios.ratio100)}ms cubic-bezier(0.4, 0, 0.2, 1)` },

  /** Opacity-only 100ms transition */
  transitionOpacity100: { value: `opacity ${Math.round(durationBase * durationRatios.ratio67)}ms cubic-bezier(0.4, 0, 0.2, 1)` },
} as const
