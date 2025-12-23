/**
 * Semantic Size Tokens
 *
 * Layer 3: Token references ONLY
 * - Maps semantic component size names to base size tokens
 * - NO direct CSS values
 * - ALL values reference base tokens using {category.name} syntax
 */

// ============================================================================
// COMPONENT SIZES
// ============================================================================

/**
 * Dialog/Modal component sizes
 */
const dialog = {
  /** Minimum dialog width (320px) */
  min: { value: '{sizes.container4}' },

  /** Small dialog (400px) */
  sm: { value: '{sizes.container5}' },

  /** Default/medium dialog (480px) */
  default: { value: '{sizes.container6}' },

  /** Large dialog (640px) */
  lg: { value: '{sizes.container8}' },

  /** Extra large dialog (800px) */
  xl: { value: '{sizes.container10}' },
} as const

/**
 * Drawer component sizes
 */
const drawer = {
  /** Standard drawer width (400px) */
  width: { value: '{sizes.container5}' },

  /** Standard drawer height (480px) */
  height: { value: '{sizes.container6}' },
} as const

/**
 * Popover component sizes
 */
const popover = {
  /** Minimum popover width (160px) */
  min: { value: '{sizes.container2}' },

  /** Maximum popover width (400px) */
  max: { value: '{sizes.container5}' },
} as const

/**
 * Touch target component sizes (accessibility)
 *
 * Ensures interactive elements meet WCAG 2.2 Level AAA and Apple HIG requirements
 */
const touch = {
  /** Minimum touch target size (44×44px) - WCAG 2.5.5 Level AAA */
  min: { value: '{sizes.touchTarget44}' },
} as const

// ============================================================================
// ALL SEMANTIC SIZES
// ============================================================================

export const sizes = {
  dialog,
  drawer,
  popover,
  touch,
} as const
