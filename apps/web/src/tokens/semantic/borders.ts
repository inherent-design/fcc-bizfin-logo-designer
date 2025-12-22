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
  default: { value: '{borderWidths.border4}' },

  /** Hairline border for subtle dividers */
  hairline: { value: '{borderWidths.border1}' },

  /** Neo-brutalist heavy border for UI controls */
  brutal: {
    DEFAULT: { value: '{borderWidths.border3}' },   // 3px - neo-brutalist default
    thick: { value: '{borderWidths.border4}' },     // 4px
    extraThick: { value: '{borderWidths.border5}' }, // 5px
  },
} as const

// ============================================================================
// BORDER RADII
// ============================================================================

/**
 * Semantic border radii by intent
 */
const borderRadius = {
  /** No rounding for brutalist aesthetic */
  none: { value: '{radii.radius0}' },

  /** Small radius for subtle rounding (4px) */
  small: { value: '{radii.radius4}' },

  /** Medium radius for standard controls (8px) */
  medium: { value: '{radii.radius8}' },

  /** Large radius for emphasized controls (12px) */
  large: { value: '{radii.radius12}' },

  /** Extra large radius (16px) */
  xlarge: { value: '{radii.radius16}' },

  /** Full radius for pill shapes */
  full: { value: '{radii.radiusFull}' },
} as const

// ============================================================================
// OUTLINE TOKENS
// ============================================================================

/**
 * Semantic outline tokens for focus states
 */
const outline = {
  /** Outline widths */
  width: {
    focus: { value: '{borderWidths.border2}' },
    emphasized: { value: '{borderWidths.border4}' },
  },

  /** Outline offsets */
  offset: {
    normal: { value: '{borderWidths.border2}' },
  },
} as const

// ============================================================================
// ALL SEMANTIC BORDERS
// ============================================================================

export const borders = {
  borderWidth,
  borderRadius,
  outline,
} as const
