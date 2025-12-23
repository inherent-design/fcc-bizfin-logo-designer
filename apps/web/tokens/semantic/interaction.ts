/**
 * Interaction Semantic Tokens
 *
 * Layer 3: Token references
 * - Cursor states, focus indicators, interaction affordances
 */

// ============================================================================
// CURSOR TOKENS
// ============================================================================

/**
 * Cursor tokens
 * Intent: Semantic cursor styles for interactive elements
 */
export const cursors = {
  /** Default pointer for clickable elements */
  pointer: { value: 'pointer' },

  /** Grab cursor for draggable elements (idle state) */
  grab: { value: 'grab' },

  /** Grabbing cursor for dragging in progress */
  grabbing: { value: 'grabbing' },

  /** Not allowed cursor for disabled interactions */
  notAllowed: { value: 'not-allowed' },

  /** Default cursor (reset to system default) */
  default: { value: 'default' },

  /** Text selection cursor */
  text: { value: 'text' },
} as const
