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
export const borderWidths = {
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
// OUTLINE TOKENS
// ============================================================================

/**
 * Semantic outline tokens for focus states
 */
export const outline = {
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
