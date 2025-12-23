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
  /** Micro - Minimal vertical spacing (2px) for badges/compact components */
  micro: { value: '{spacing.micro2}' },

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
  /** Tab border - Specific overlap for tab border effect (-0.25rem/-4px) */
  tabBorder: { value: '{spacing.negMicro4}' },

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
// MICRO (Fine-grained Spacing)
// ============================================================================

/**
 * Fine-grained spacing using musical ratios
 * For subtle adjustments and precise control
 */
const micro = {
  /** Major Second (9px) - Fine spacing step */
  majorSecond: { value: '{spacing.majorSecond}' },

  /** Perfect Fourth (10.67px) - Fine spacing step */
  perfectFourth: { value: '{spacing.perfectFourth}' },

  /** Minor Sixth (12.8px) - Fine spacing step */
  minorSixth: { value: '{spacing.minorSixth}' },

  /** Major Sixth (13.33px) - Fine spacing step */
  majorSixth: { value: '{spacing.majorSixth}' },

  /** Negative major third (-10px) - Overlap adjustment */
  negMajorThird: { value: '{spacing.negMajorThird}' },
} as const

// ============================================================================
// STRUCTURAL (Large Spacing)
// ============================================================================

/**
 * Large structural spacing for major divisions
 * Uses harmonic series for consistent relationships
 */
const structural = {
  /** 5th harmonic (40px) - Large structural spacing */
  harmonic5: { value: '{spacing.harmonic5}' },

  /** 10th harmonic (80px) - XL structural spacing */
  harmonic10: { value: '{spacing.harmonic10}' },

  /** 12th harmonic (96px) - XXL structural spacing */
  harmonic12: { value: '{spacing.harmonic12}' },

  /** 16th harmonic (128px) - XXXL structural spacing */
  harmonic16: { value: '{spacing.harmonic16}' },
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
  micro,
  structural,
} as const
