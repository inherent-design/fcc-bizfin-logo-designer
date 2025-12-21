/**
 * Semantic Layout Tokens
 *
 * Layer 3: Token references ONLY
 * - NO direct CSS values
 * - ALL values reference base tokens using {category.name} syntax
 * - Z-index semantic layer for stacking context management
 */

// ============================================================================
// Z-INDEX (Stacking Context)
// ============================================================================

/**
 * Z-index semantic tokens
 * Musical progression: base 10, minor third ratio (10, 12, 15, 18, 22)
 */
const zIndex = {
  /** Base layer - default content (0) */
  base: { value: '0' },

  /** Dropdown layer - select menus, combobox (10) */
  dropdown: { value: '10' },

  /** Sticky layer - sticky headers, tabs (12) */
  sticky: { value: '12' },

  /** Popover layer - tooltips, popovers (15) */
  popover: { value: '15' },

  /** Overlay layer - modals, drawers (18) */
  overlay: { value: '18' },

  /** Toast layer - notifications (22) */
  toast: { value: '22' },

  /** Maximum layer - critical overlays (25) */
  max: { value: '25' },
} as const

// ============================================================================
// ALL SEMANTIC LAYOUT TOKENS
// ============================================================================

export const layout = {
  zIndex,
} as const
