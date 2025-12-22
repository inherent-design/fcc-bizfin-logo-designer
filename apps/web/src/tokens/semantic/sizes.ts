/**
 * Semantic Size Tokens
 *
 * Layer 3: Token references for component sizing
 * - Component-specific dimensions
 * - Layout constraints
 * - NO direct CSS values in components
 */

// ============================================================================
// COMPONENT SIZES
// ============================================================================

/**
 * Component-specific size tokens
 */
const component = {
  /** Modal dialog widths */
  modal: {
    compact: { value: '{sizes.container4}' },
    default: { value: '{sizes.component32}' },
    spacious: { value: '{sizes.component48}' },
  },

  /** Drawer panel dimensions */
  drawer: {
    width: { value: '{sizes.component24}' },
    height: { value: '{sizes.component24}' },
  },

  /** Toast notification constraints */
  toast: {
    min: { value: '{sizes.container4}' },
    max: { value: '{sizes.component24}' },
  },

  /** Popover content constraints */
  popover: {
    min: { value: '{sizes.component12}' },
    max: { value: '{sizes.container4}' },
  },

  /** Floating UI arrow sizing */
  arrow: {
    size: { value: '{spacing.base}' },
    offset: { value: '{spacing.micro4}' },
  },

  /** Switch toggle dimensions by size variant */
  switch: {
    compact: {
      width: { value: '2.5rem' },
      height: { value: '1.25rem' },
      thumb: { value: '{spacing.octave}' },
      padding: { value: '{spacing.micro2}' },
    },
    default: {
      width: { value: '{spacing.harmonic6}' },
      height: { value: '{spacing.harmonic3}' },
      thumb: { value: '1.25rem' },
      padding: { value: '{spacing.micro2}' },
    },
    spacious: {
      width: { value: '3.5rem' },
      height: { value: '1.75rem' },
      thumb: { value: '{spacing.harmonic3}' },
      padding: { value: '{spacing.micro2}' },
    },
  },
} as const

// ============================================================================
// LAYOUT CONSTRAINTS
// ============================================================================

/**
 * Layout constraint tokens for scrollable areas
 */
const constraints = {
  /** Scrollable container heights */
  scrollable: {
    compact: { value: '{sizes.component12}' },
    default: { value: '{spacing.harmonic16}' },
    spacious: { value: '{sizes.component24}' },
  },
} as const

// ============================================================================
// ALL SEMANTIC SIZES
// ============================================================================

export const sizes = {
  component,
  constraints,
} as const
