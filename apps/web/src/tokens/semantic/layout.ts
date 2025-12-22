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
 * Maps semantic component names to base z-index magnitude values
 */
const zIndex = {
  /** Base layer - default content (0) */
  base: { value: '{zIndex.zIndex0}' },

  /** Dropdown layer - select menus, combobox (10) */
  dropdown: { value: '{zIndex.zIndex10}' },

  /** Sticky layer - sticky headers, tabs (12) */
  sticky: { value: '{zIndex.zIndex12}' },

  /** Popover layer - tooltips, popovers (15) */
  popover: { value: '{zIndex.zIndex15}' },

  /** Overlay layer - modals, drawers (18) */
  overlay: { value: '{zIndex.zIndex18}' },

  /** Toast layer - notifications (22) */
  toast: { value: '{zIndex.zIndex22}' },

  /** Maximum layer - critical overlays (25) */
  max: { value: '{zIndex.zIndex25}' },
} as const

// ============================================================================
// ALL SEMANTIC LAYOUT TOKENS
// ============================================================================

export const layout = {
  zIndex,
} as const
