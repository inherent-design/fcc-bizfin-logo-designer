/**
 * Semantic Effect Tokens
 * Layer 3: Token references with intent-based naming
 */

// ============================================================================
// OPACITY
// ============================================================================

/**
 * Opacity semantic tokens
 * Intent-based naming (not magnitude-based)
 */
export const opacity = {
  /** Disabled state (25% opacity) */
  disabled: { value: '{opacity.opacity25}' },

  /** Muted/de-emphasized content (33% opacity) */
  muted: { value: '{opacity.opacity33}' },

  /** Subtle/secondary content (50% opacity) */
  subtle: { value: '{opacity.opacity50}' },

  /** Medium emphasis (67% opacity) */
  medium: { value: '{opacity.opacity67}' },

  /** Strong emphasis (75% opacity) */
  strong: { value: '{opacity.opacity75}' },

  /** Near full (90% opacity) */
  nearFull: { value: '{opacity.opacity90}' },

  /** Full opacity */
  full: { value: '{opacity.opacity100}' },
} as const

// ============================================================================
// BLUR
// ============================================================================

/**
 * Blur semantic tokens
 * Intent-based naming for common UI purposes
 */
export const blur = {
  /** No blur */
  none: { value: '{blurs.blur0}' },

  /** Subtle blur for slight frosted glass (4px) */
  subtle: { value: '{blurs.blur4}' },

  /** Default blur for frosted glass (8px) */
  default: { value: '{blurs.blur8}' },

  /** Medium blur for prominent overlays (12px) */
  medium: { value: '{blurs.blur12}' },

  /** Strong blur for modals/backgrounds (16px) */
  strong: { value: '{blurs.blur16}' },

  /** Maximum blur for heavy obscuring (24px) */
  maximum: { value: '{blurs.blur24}' },
} as const

// ============================================================================
// BACKDROP BLUR
// ============================================================================

/**
 * Backdrop blur semantic tokens
 * Intent-based naming for overlay/modal contexts
 */
export const backdropBlur = {
  /** No backdrop blur */
  none: { value: '{backdropBlurs.backdropBlur0}' },

  /** Dropdown/popover backdrop (8px) */
  dropdown: { value: '{backdropBlurs.backdropBlur8}' },

  /** Tooltip backdrop (12px) */
  tooltip: { value: '{backdropBlurs.backdropBlur12}' },

  /** Modal/drawer backdrop (16px) */
  modal: { value: '{backdropBlurs.backdropBlur16}' },
} as const

// ============================================================================
// SHADOWS
// ============================================================================

/**
 * Shadow semantic tokens
 * Intent-based naming (not magnitude-based)
 */
export const shadows = {
  /** Elevation hierarchy (z-axis depth) */
  elevation: {
    /** Raised elements (buttons, badges) */
    raised: { value: '{shadows.brutal.offset4}' },

    /** Floating elements (panels, cards) */
    floating: { value: '{shadows.brutal.offset8}' },

    /** Modal/drawer top-level */
    modal: { value: '{shadows.brutal.offset12}' },
  },

  /** Interaction states */
  interaction: {
    /** Pressed/active state (inset) */
    pressed: { value: '{shadows.brutalInset2}' },

    /** Hover state lift */
    hover: { value: '{shadows.brutal.offset8}' },
  }
} as const
