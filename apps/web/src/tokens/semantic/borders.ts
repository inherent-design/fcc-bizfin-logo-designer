/**
 * Semantic Border Tokens
 *
 * Layer 3: Token references ONLY
 * - Maps semantic border intent names to base border tokens
 * - NO direct CSS values
 * - ALL values reference base tokens using {category.name} syntax
 */

// ============================================================================
// BORDER WIDTHS
// ============================================================================

/**
 * Semantic border widths by intent
 */
const borderWidth = {
  /** Default border width for standard UI elements */
  default: { value: '{borderWidths.base}' },

  /** Hairline border for subtle dividers */
  hairline: { value: '{borderWidths.hairline}' },

  /** Neo-brutalist heavy border for UI controls */
  brutal: { value: '{borderWidths.brutal.md}' },
} as const

// ============================================================================
// BORDER RADII
// ============================================================================

/**
 * Semantic border radii by intent
 */
const borderRadius = {
  /** No rounding for brutalist aesthetic */
  none: { value: '{radii.none}' },

  /** Small radius for subtle rounding */
  small: { value: '{radii.sm}' },

  /** Medium radius for standard controls */
  medium: { value: '{radii.md}' },
} as const

// ============================================================================
// ALL SEMANTIC BORDERS
// ============================================================================

export const borders = {
  borderWidth,
  borderRadius,
} as const
