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

// ============================================================================
// BORDER STYLE TOKENS
// ============================================================================

/**
 * Semantic border style tokens
 * Intent: Consistent border rendering styles
 */
export const borderStyle = {
  /** Solid line (default for neo-brutalist aesthetic) */
  solid: { value: 'solid' },

  /** Dashed line (utility for focus indicators, dividers) */
  dashed: { value: 'dashed' },

  /** Dotted line (utility for secondary borders) */
  dotted: { value: 'dotted' },

  /** No border (utility for reset states) */
  none: { value: 'none' },
} as const

// ============================================================================
// BORDER RADIUS TOKENS
// ============================================================================

/**
 * Semantic border radius tokens
 * Intent: Consistent corner rounding
 */
export const borderRadius = {
  /** No radius (neo-brutalist default) */
  none: { value: '{radii.radius0}' },

  /** Small radius (4px) */
  sm: { value: '{radii.radius4}' },

  /** Medium radius (8px) */
  md: { value: '{radii.radius8}' },

  /** Large radius (12px) */
  lg: { value: '{radii.radius12}' },

  /** Extra large radius (16px) */
  xl: { value: '{radii.radius16}' },

  /** Full radius (pill shape) */
  full: { value: '{radii.radiusFull}' },
} as const
