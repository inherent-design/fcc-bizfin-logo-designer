/**
 * Semantic Typography Tokens
 *
 * Layer 3: Token references ONLY
 * - Maps semantic heading/body/label names to base font sizes
 * - NO direct CSS values
 * - ALL values reference base tokens using {category.name} syntax
 */

// ============================================================================
// HEADING TYPOGRAPHY
// ============================================================================

/**
 * Semantic heading sizes
 * Mapped to type scale using musical ratio progression (minor third: 1.2)
 */
const heading = {
  /** Display - Largest heading (typePlus8) */
  display: { value: '{fontSizes.typePlus8}' },

  /** H1 - Primary heading (typePlus6) */
  h1: { value: '{fontSizes.typePlus6}' },

  /** H2 - Secondary heading (typePlus5) */
  h2: { value: '{fontSizes.typePlus5}' },

  /** H3 - Tertiary heading (typePlus4) */
  h3: { value: '{fontSizes.typePlus4}' },

  /** H4 - Quaternary heading (typePlus3) */
  h4: { value: '{fontSizes.typePlus3}' },

  /** H5 - Quinary heading (typePlus2) */
  h5: { value: '{fontSizes.typePlus2}' },

  /** H6 - Smallest heading (typePlus1) */
  h6: { value: '{fontSizes.typePlus1}' },
} as const

// ============================================================================
// BODY TYPOGRAPHY
// ============================================================================

/**
 * Semantic body text sizes
 */
const body = {
  /** Large body text (typePlus1) */
  large: { value: '{fontSizes.typePlus1}' },

  /** Default body text (typeBase) */
  default: { value: '{fontSizes.typeBase}' },

  /** Small body text (typeMinus1) */
  small: { value: '{fontSizes.typeMinus1}' },

  /** Extra small body text (typeMinus2) */
  xs: { value: '{fontSizes.typeMinus2}' },
} as const

// ============================================================================
// UI TYPOGRAPHY
// ============================================================================

/**
 * UI element text sizes
 */
const label = {
  /** Default label (typeBase) */
  default: { value: '{fontSizes.typeBase}' },

  /** Small label (typeMinus1) */
  small: { value: '{fontSizes.typeMinus1}' },
} as const

const caption = {
  /** Default caption (typeMinus1) */
  default: { value: '{fontSizes.typeMinus1}' },

  /** Small caption (typeMinus2) */
  small: { value: '{fontSizes.typeMinus2}' },
} as const

// ============================================================================
// FONT FAMILIES
// ============================================================================

/**
 * Semantic font families by intent
 */
const fontFamily = {
  /** Neo-brutalist UI font for controls and headers */
  brutalist: { value: '{fonts.brutalist}' },

  /** Monospace font for code and technical content */
  mono: { value: '{fonts.mono}' },
} as const

// ============================================================================
// FONT WEIGHTS
// ============================================================================

/**
 * Semantic font weights by intent
 */
const fontWeight = {
  /** Normal weight for body text */
  normal: { value: '{fontWeights.normal}' },

  /** Medium weight for emphasis */
  medium: { value: '{fontWeights.medium}' },

  /** Bold weight for strong emphasis */
  bold: { value: '{fontWeights.bold}' },

  /** Extra heavy weight for neo-brutalist UI */
  brutal: { value: '{fontWeights.brutal}' },
} as const

// ============================================================================
// ALL SEMANTIC TYPOGRAPHY
// ============================================================================

export const typography = {
  heading,
  body,
  label,
  caption,
  fontFamily,
  fontWeight,
} as const
