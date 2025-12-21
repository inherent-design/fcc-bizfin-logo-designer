/**
 * Semantic Effect Tokens
 * Layer 3: Token references with intent-based naming
 */

/**
 * Shadow semantic tokens
 * Intent-based naming (not magnitude-based)
 */
export const shadows = {
  /** Elevation hierarchy (z-axis depth) */
  elevation: {
    /** Raised elements (buttons, badges) */
    raised: { value: '{shadows.brutal.sm}' },

    /** Floating elements (panels, cards) */
    floating: { value: '{shadows.brutal.md}' },

    /** Modal/drawer top-level */
    modal: { value: '{shadows.brutal.lg}' },
  },

  /** Interaction states */
  interaction: {
    /** Pressed/active state (inset) */
    pressed: { value: '{shadows.brutalInset}' },

    /** Hover state lift */
    hover: { value: '{shadows.brutal.md}' },
  }
} as const
