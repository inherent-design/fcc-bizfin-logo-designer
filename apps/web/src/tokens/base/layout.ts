/**
 * Base Layout Tokens
 *
 * Layer 2: CSS values with units
 * - Z-index and aspect ratios
 */

import { zIndexScale } from '../constants'

// ============================================================================
// Z-INDEX
// ============================================================================

export const zIndex = {
  /** 1 - Base layer */
  base: { value: zIndexScale.base },

  /** 10 - Dropdown */
  dropdown: { value: zIndexScale.dropdown },

  /** 20 - Sticky */
  sticky: { value: zIndexScale.sticky },

  /** 30 - Overlay */
  overlay: { value: zIndexScale.overlay },

  /** 50 - Modal */
  modal: { value: zIndexScale.modal },

  /** 80 - Tooltip */
  tooltip: { value: zIndexScale.tooltip },
} as const

// ============================================================================
// ASPECT RATIOS
// ============================================================================

export const aspectRatios = {
  /** 1:1 - Square */
  square: { value: '1 / 1' },

  /** 16:9 - Video */
  video: { value: '16 / 9' },

  /** 4:3 - Traditional */
  traditional: { value: '4 / 3' },

  /** 5:3 - Major sixth ratio */
  majorSixth: { value: '5 / 3' },

  /** 3:2 - Perfect fifth ratio */
  perfectFifth: { value: '3 / 2' },
} as const
