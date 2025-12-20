/**
 * Semantic Spacing Tokens
 *
 * Layer 3: Token references ONLY
 * - Gestalt proximity principles
 * - Inset (padding), stack (vertical), inline (horizontal)
 * - Overlap (negative spacing)
 * - ALL values reference base spacing tokens
 */

// ============================================================================
// PROXIMITY (Gestalt Principle)
// ============================================================================

/**
 * Proximity spacing based on Gestalt psychology
 * Encodes perceptual relationships between elements
 *
 * Uses minor triad ratios (10:12:15) for harmonious progression
 */
const proximity = {
  /** Tight - Elements feel unified (icon + label, button text + icon) */
  tight: {
    value: '{spacing.minorSecond}',
    description: 'Elements feel unified (icon + label)',
  },

  /** Close - Elements feel related (form field + helper text) */
  close: {
    value: '{spacing.minorThird}',
    description: 'Elements feel related (form field + helper)',
  },

  /** Related - Elements feel grouped (card sections, list items) */
  related: {
    value: '{spacing.perfectFifth}',
    description: 'Elements feel grouped (card sections)',
  },

  /** Separate - Elements feel distinct (separate cards, panels) */
  separate: {
    value: '{spacing.harmonic3}',
    description: 'Elements feel separate (distinct cards)',
  },

  /** Isolated - Elements feel isolated (major page sections) */
  isolated: {
    value: '{spacing.harmonic6}',
    description: 'Elements feel isolated (page sections)',
  },

  /** Distant - Elements feel unrelated (different content areas) */
  distant: {
    value: '{spacing.harmonic8}',
    description: 'Elements feel unrelated (major divisions)',
  },
} as const

// ============================================================================
// INSET (Padding)
// ============================================================================

/**
 * Inset spacing for padding within components
 * Uses major triad ratios (4:5:6) for bright, expansive feel
 */
const inset = {
  /** Tight - Minimal internal padding */
  tight: { value: '{spacing.minorSecond}' },

  /** Normal - Standard internal padding */
  normal: { value: '{spacing.perfectFifth}' },

  /** Loose - Generous internal padding */
  loose: { value: '{spacing.harmonic3}' },

  /** Spacious - Very generous padding */
  spacious: { value: '{spacing.harmonic4}' },
} as const

// ============================================================================
// STACK (Vertical Spacing)
// ============================================================================

/**
 * Stack spacing for vertical rhythm
 */
const stack = {
  /** Tight - Minimal vertical spacing */
  tight: { value: '{spacing.micro4}' },

  /** Close - Close vertical spacing */
  close: { value: '{spacing.minorThird}' },

  /** Normal - Standard vertical spacing */
  normal: { value: '{spacing.octave}' },

  /** Loose - Generous vertical spacing */
  loose: { value: '{spacing.harmonic3}' },

  /** Spacious - Very generous vertical spacing */
  spacious: { value: '{spacing.harmonic4}' },
} as const

// ============================================================================
// INLINE (Horizontal Spacing)
// ============================================================================

/**
 * Inline spacing for horizontal rhythm
 */
const inline = {
  /** Tight - Minimal horizontal spacing */
  tight: { value: '{spacing.micro2}' },

  /** Close - Close horizontal spacing */
  close: { value: '{spacing.minorSecond}' },

  /** Normal - Standard horizontal spacing */
  normal: { value: '{spacing.minorThird}' },

  /** Loose - Generous horizontal spacing */
  loose: { value: '{spacing.perfectFifth}' },

  /** Spacious - Very generous horizontal spacing */
  spacious: { value: '{spacing.octave}' },
} as const

// ============================================================================
// OVERLAP (Negative Spacing)
// ============================================================================

/**
 * Overlap spacing for overlapping elements
 * Negative values create pull effects
 */
const overlap = {
  /** Slight - Minor overlap */
  slight: { value: '{spacing.negMinorThird}' },

  /** Moderate - Moderate overlap */
  moderate: { value: '{spacing.negPerfectFifth}' },

  /** Strong - Strong overlap */
  strong: { value: '{spacing.negOctave}' },

  /** Heavy - Heavy overlap */
  heavy: { value: '{spacing.negHarmonic3}' },
} as const

// ============================================================================
// ALL SEMANTIC SPACING
// ============================================================================

export const spacing = {
  proximity,
  inset,
  stack,
  inline,
  overlap,
} as const
