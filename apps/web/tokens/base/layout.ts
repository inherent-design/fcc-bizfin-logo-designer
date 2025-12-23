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
  /** 0 - Default/reset layer */
  zIndex0: { value: zIndexScale.zIndex0 },

  /** 1 - Base content layer */
  zIndex1: { value: zIndexScale.zIndex1 },

  /** 10 */
  zIndex10: { value: zIndexScale.zIndex10 },

  /** 12 */
  zIndex12: { value: zIndexScale.zIndex12 },

  /** 15 */
  zIndex15: { value: zIndexScale.zIndex15 },

  /** 18 */
  zIndex18: { value: zIndexScale.zIndex18 },

  /** 20 */
  zIndex20: { value: zIndexScale.zIndex20 },

  /** 22 */
  zIndex22: { value: zIndexScale.zIndex22 },

  /** 25 - Maximum UI layer */
  zIndex25: { value: zIndexScale.zIndex25 },
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
