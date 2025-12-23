/**
 * Semantic Border Radius Tokens
 *
 * Layer 3: Token references ONLY
 * - Maps semantic radius intent names to base radius tokens
 * - NO direct CSS values
 * - ALL values reference base tokens using {category.name} syntax
 */

/**
 * Semantic border radii by intent
 */
export const radii = {
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
