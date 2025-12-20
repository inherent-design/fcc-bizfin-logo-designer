/**
 * Base Effect Tokens
 *
 * Layer 2: CSS values with units
 * - Shadows, opacity, blur
 * - References primitives for calculations
 * - NO token references (shadows defined here, semantic layer adds token refs)
 */

import { opacityPrimitives } from '../primitives'

// ============================================================================
// OPACITY
// ============================================================================

export const opacity = {
  /** 0.25 - Disabled state */
  disabled: { value: opacityPrimitives.disabled },

  /** 0.333 - Muted state */
  muted: { value: opacityPrimitives.muted },

  /** 0.5 - Subtle state */
  subtle: { value: opacityPrimitives.subtle },

  /** 0.75 - Medium state */
  medium: { value: opacityPrimitives.medium },

  /** 1.0 - Full opacity */
  full: { value: opacityPrimitives.full },
} as const

// ============================================================================
// BLUR
// ============================================================================

export const blurs = {
  /** 0.5rem (8px) - Soft blur */
  soft: { value: '0.5rem' },

  /** 0.75rem (12px) - Glass effect */
  glass: { value: '0.75rem' },

  /** 1.5rem (24px) - Heavy blur */
  heavy: { value: '1.5rem' },
} as const

// ============================================================================
// SHADOWS (base definitions)
// ============================================================================

/**
 * Neo-brutalist shadows
 * Hard shadows with no blur, semantic layer will add color token refs
 */
export const shadows = {
  brutal: {
    /** Small brutal shadow - 4px offset */
    sm: {
      value: {
        offsetX: '0.25rem',
        offsetY: '0.25rem',
        blur: '0',
        color: '#1a1a1a',
      },
    },

    /** Medium brutal shadow - 8px offset */
    md: {
      value: {
        offsetX: '0.5rem',
        offsetY: '0.5rem',
        blur: '0',
        color: '#1a1a1a',
      },
    },

    /** Large brutal shadow - 12px offset */
    lg: {
      value: {
        offsetX: '0.75rem',
        offsetY: '0.75rem',
        blur: '0',
        color: '#1a1a1a',
      },
    },
  },

  /** Inset shadow for pressed states */
  inset: {
    value: {
      offsetX: '0.125rem',
      offsetY: '0.125rem',
      blur: '0',
      color: 'rgba(26, 26, 26, 0.2)',
      inset: true,
    },
  },
} as const
