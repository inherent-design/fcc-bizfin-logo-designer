/**
 * Base Effect Tokens
 *
 * Layer 2: CSS values with units
 * - Shadows, opacity, blur
 * - References primitives for calculations
 * - NO token references (shadows defined here, semantic layer adds token refs)
 */

import { formatCss } from 'culori'
import { opacityPrimitives, darkColors } from '../primitives'

// ============================================================================
// OPACITY
// ============================================================================

export const opacity = {
  /** 0.25 (1/4 subharmonic) */
  opacity25: { value: opacityPrimitives.opacity25 },

  /** 0.333 (1/3 subharmonic) */
  opacity33: { value: opacityPrimitives.opacity33 },

  /** 0.5 (1/2 subharmonic) */
  opacity50: { value: opacityPrimitives.opacity50 },

  /** 0.67 (2/3) */
  opacity67: { value: opacityPrimitives.opacity67 },

  /** 0.75 (3/4) */
  opacity75: { value: opacityPrimitives.opacity75 },

  /** 0.90 (9/10) */
  opacity90: { value: opacityPrimitives.opacity90 },

  /** 1.0 (full opacity) */
  opacity100: { value: opacityPrimitives.opacity100 },
} as const

// ============================================================================
// BLUR
// ============================================================================

export const blurs = {
  /** 0rem - No blur */
  blur0: { value: '0' },

  /** 0.25rem (4px) */
  blur4: { value: '0.25rem' },

  /** 0.5rem (8px) */
  blur8: { value: '0.5rem' },

  /** 0.75rem (12px) */
  blur12: { value: '0.75rem' },

  /** 1rem (16px) */
  blur16: { value: '1rem' },

  /** 1.5rem (24px) */
  blur24: { value: '1.5rem' },
} as const

// ============================================================================
// BACKDROP BLUR (for overlay effects)
// ============================================================================

export const backdropBlurs = {
  /** 0rem - No backdrop blur */
  backdropBlur0: { value: '0' },

  /** 0.5rem (8px) */
  backdropBlur8: { value: '0.5rem' },

  /** 0.75rem (12px) */
  backdropBlur12: { value: '0.75rem' },

  /** 1rem (16px) */
  backdropBlur16: { value: '1rem' },
} as const

// ============================================================================
// SHADOWS (base definitions)
// ============================================================================

/**
 * Neo-brutalist shadows
 * Hard shadows with no blur
 * Magnitude-based naming (offset in pixels)
 */
export const shadows = {
  /** Neo-brutalist hard shadows (no blur) */
  brutal: {
    /** 4px offset brutal shadow */
    offset4: {
      value: {
        offsetX: '0.25rem',
        offsetY: '0.25rem',
        blur: '0',
        spread: '0',
        color: formatCss(darkColors[3]),
      },
    },

    /** 8px offset brutal shadow */
    offset8: {
      value: {
        offsetX: '0.5rem',
        offsetY: '0.5rem',
        blur: '0',
        spread: '0',
        color: formatCss(darkColors[3]),
      },
    },

    /** 12px offset brutal shadow */
    offset12: {
      value: {
        offsetX: '0.75rem',
        offsetY: '0.75rem',
        blur: '0',
        spread: '0',
        color: formatCss(darkColors[3]),
      },
    },
  },

  /** Inset brutal shadow for pressed states (2px offset) */
  brutalInset2: {
    value: {
      offsetX: '0.125rem',
      offsetY: '0.125rem',
      blur: '0',
      spread: '0',
      color: formatCss({ ...darkColors[3], alpha: opacityPrimitives.opacity25 }),
      inset: true,
    },
  },
} as const
