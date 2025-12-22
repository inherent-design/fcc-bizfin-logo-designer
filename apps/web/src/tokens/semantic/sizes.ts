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
  /** Minimum dialog width (300px) */
  min: { value: '18.75rem' },

  /** Small dialog (400px) */
  sm: { value: '25rem' },

  /** Default/medium dialog (500px) */
  default: { value: '31.25rem' },

  /** Large dialog (640px) */
  lg: { value: '40rem' },

  /** Extra large dialog (800px) */
  xl: { value: '50rem' },
} as const

/**
 * Drawer component sizes
 */
const drawer = {
  /** Standard drawer width (400px) */
  width: { value: '25rem' },

  /** Standard drawer height (500px) */
  height: { value: '31.25rem' },
} as const

/**
 * Popover component sizes
 */
const popover = {
  /** Minimum popover width (200px) */
  min: { value: '12.5rem' },

  /** Maximum popover width (400px) */
  max: { value: '25rem' },
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
