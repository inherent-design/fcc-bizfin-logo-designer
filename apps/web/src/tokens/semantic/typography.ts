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

/**
 * Display typography sizes
 * Extra-large text for hero sections and impact statements
 */
const display = {
  /** Base display (4rem / 64px) */
  base: { value: '{fontSizes.displayBase}' },

  /** Display Plus 1 (5rem / 80px) */
  plus1: { value: '{fontSizes.displayPlus1}' },

  /** Display Plus 2 (6rem / 96px) */
  plus2: { value: '{fontSizes.displayPlus2}' },

  /** Display Plus 3 (8rem / 128px) */
  plus3: { value: '{fontSizes.displayPlus3}' },

  /** Display Plus 4 (10rem / 160px) */
  plus4: { value: '{fontSizes.displayPlus4}' },
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
  normal: { value: '{fontWeights.fontWeight400}' },

  /** Medium weight for emphasis */
  medium: { value: '{fontWeights.fontWeight500}' },

  /** Bold weight for strong emphasis */
  bold: { value: '{fontWeights.fontWeight700}' },

  /** Extra heavy weight for neo-brutalist UI */
  brutal: { value: '{fontWeights.fontWeight900}' },
} as const

// ============================================================================
// LETTER SPACING
// ============================================================================

/**
 * Semantic letter spacing by intent
 */
const letterSpacing = {
  /** Negative tracking (-0.05em) */
  tight: { value: '{letterSpacings.letterSpacingNeg0_05}' },

  /** No tracking (0em) */
  normal: { value: '{letterSpacings.letterSpacing0}' },

  /** Subtle tracking (0.025em) */
  relaxed: { value: '{letterSpacings.letterSpacing0_025}' },

  /** Wide tracking (0.05em) for labels and UI text */
  wide: { value: '{letterSpacings.letterSpacing0_05}' },

  /** Wider tracking (0.1em) for neo-brutalist headers */
  wider: { value: '{letterSpacings.letterSpacing0_1}' },
} as const

// ============================================================================
// LINE HEIGHT
// ============================================================================

/**
 * Semantic line heights by intent
 */
const lineHeight = {
  /** Tight line height (1.2) */
  tight: { value: '{lineHeights.lineHeight1_2}' },

  /** Normal line height (1.5) */
  normal: { value: '{lineHeights.lineHeight1_5}' },

  /** Relaxed line height (1.778) */
  relaxed: { value: '{lineHeights.lineHeight1_778}' },
} as const

// ============================================================================
// ALL SEMANTIC TYPOGRAPHY
// ============================================================================

export const typography = {
  heading,
  display,
  body,
  label,
  caption,
  fontFamily,
  fontWeight,
  letterSpacing,
  lineHeight,
} as const
