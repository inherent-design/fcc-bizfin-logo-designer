/**
 * Semantic Color Tokens
 *
 * Layer 3: Token references ONLY
 * - NO direct CSS values
 * - ALL values reference base tokens using {category.name} syntax
 * - Theme-aware using conditional values (_light, _dark)
 * - Semantic names describe purpose, not magnitude
 */

// ============================================================================
// SURFACE COLORS
// ============================================================================

/**
 * Primary surface colors (background and foreground)
 * Theme-aware inversion
 */
const surface = {
  bg: {
    value: {
      _light: '{colors.neo.bg}',
      _dark: '{colors.neo.fg}',
    },
  },
  fg: {
    value: {
      _light: '{colors.neo.fg}',
      _dark: '{colors.neo.bg}',
    },
  },
} as const

/**
 * World colors (application canvas/gradient backgrounds)
 */
const world = {
  bg: {
    value: {
      _light: '{gradients.fantasy.aether.radial}',
      _dark: '{gradients.fantasy.void.radial}',
    },
  },
  glow: { value: '{colors.fantasy.arcana.glow}' },
} as const

// ============================================================================
// TEXT COLORS (4-tier hierarchy using dominant 7th chord)
// ============================================================================

/**
 * Text hierarchy - dominant 7th chord (4:5:6:7)
 * Opacity progressions: 1.0, ~0.8, ~0.67, ~0.57
 */
const text = {
  /** Primary text - Full opacity (1.0) */
  primary: { value: '{colors.surface.fg}' },

  /** Secondary text - 80% opacity (~1.25^-1) */
  secondary: {
    value: {
      _light: 'color-mix(in srgb, {colors.surface.fg} 80%, transparent)',
      _dark: 'color-mix(in srgb, {colors.surface.bg} 80%, transparent)',
    },
  },

  /** Tertiary text - 67% opacity (~1.5^-1) */
  tertiary: {
    value: {
      _light: 'color-mix(in srgb, {colors.surface.fg} 67%, transparent)',
      _dark: 'color-mix(in srgb, {colors.surface.bg} 67%, transparent)',
    },
  },

  /** Quaternary text - 57% opacity (~1.75^-1) */
  quaternary: {
    value: {
      _light: 'color-mix(in srgb, {colors.surface.fg} 57%, transparent)',
      _dark: 'color-mix(in srgb, {colors.surface.bg} 57%, transparent)',
    },
  },

  /** Disabled text - Subharmonic fourth (0.25) */
  disabled: {
    value: {
      _light: 'color-mix(in srgb, {colors.surface.fg} 25%, transparent)',
      _dark: 'color-mix(in srgb, {colors.surface.bg} 25%, transparent)',
    },
  },

  /** Inverted text (for colored backgrounds) */
  inverted: { value: '{colors.surface.bg}' },

  /** Text on primary colored background */
  onPrimary: { value: '{colors.surface.bg}' },

  /** Text on secondary colored background */
  onSecondary: { value: '{colors.surface.fg}' },

  /** Text on accent colored background */
  onAccent: { value: '{colors.surface.fg}' },

  /** Error text */
  error: { value: '{colors.neo.warning}' },

  /** Success text */
  success: { value: '{colors.neo.secondary}' },

  /** Info text */
  info: { value: '{colors.neo.accent}' },

  /** Label text */
  label: { value: '{colors.surface.fg}' },

  /** Caption text */
  caption: { value: '{colors.text.tertiary}' },

  /** Placeholder text */
  placeholder: { value: '{colors.text.secondary}' },

  /** Helper text */
  helper: { value: '{colors.text.tertiary}' },
} as const

// ============================================================================
// ICON COLORS
// ============================================================================

const icon = {
  default: { value: '{colors.surface.fg}' },
  secondary: { value: '{colors.text.secondary}' },
  muted: { value: '{colors.text.tertiary}' },
  primary: { value: '{colors.neo.primary}' },
  disabled: { value: '{colors.text.disabled}' },
} as const

// ============================================================================
// BORDER COLORS
// ============================================================================

const border = {
  /** Default border */
  default: { value: '{colors.surface.fg}' },

  /** Subtle border - 30% opacity */
  subtle: {
    value: {
      _light: 'color-mix(in srgb, {colors.surface.fg} 30%, transparent)',
      _dark: 'color-mix(in srgb, {colors.surface.bg} 30%, transparent)',
    },
  },

  /** Moderate border - 60% opacity */
  moderate: {
    value: {
      _light: 'color-mix(in srgb, {colors.surface.fg} 60%, transparent)',
      _dark: 'color-mix(in srgb, {colors.surface.bg} 60%, transparent)',
    },
  },

  /** Focus border */
  focus: { value: '{colors.neo.accent}' },

  /** Error border */
  error: { value: '{colors.neo.warning}' },

  /** Success border */
  success: { value: '{colors.neo.secondary}' },
} as const

// ============================================================================
// BACKGROUND COLORS
// ============================================================================

const bg = {
  /** Default background */
  default: { value: '{colors.surface.bg}' },

  /** Subtle background - 50% opacity */
  subtle: {
    value: {
      _light: 'color-mix(in srgb, {colors.surface.bg} 50%, transparent)',
      _dark: 'color-mix(in srgb, {colors.surface.fg} 50%, transparent)',
    },
  },

  /** Hover background - 10% foreground mix */
  hover: {
    value: {
      _light: 'color-mix(in srgb, {colors.surface.fg} 10%, {colors.surface.bg})',
      _dark: 'color-mix(in srgb, {colors.surface.bg} 15%, {colors.surface.fg})',
    },
  },

  /** Active background - 15% foreground mix */
  active: {
    value: {
      _light: 'color-mix(in srgb, {colors.surface.fg} 15%, {colors.surface.bg})',
      _dark: 'color-mix(in srgb, {colors.surface.bg} 20%, {colors.surface.fg})',
    },
  },

  /** Selected background */
  selected: { value: '{colors.neo.primary}' },

  /** Primary background */
  primary: { value: '{colors.neo.primary}' },

  /** Secondary background */
  secondary: { value: '{colors.neo.secondary}' },

  /** Accent background */
  accent: { value: '{colors.neo.accent}' },

  /** Danger background */
  danger: { value: '{colors.neo.warning}' },

  /** Success background */
  success: { value: '{colors.neo.secondary}' },

  /** Transparent background */
  transparent: { value: 'transparent' },
} as const

// ============================================================================
// INPUT COLORS
// ============================================================================

const input = {
  bg: { value: '{colors.surface.bg}' },
  bgHover: { value: '{colors.surface.bg}' },
  bgFocus: { value: '{colors.surface.bg}' },
  bgDisabled: { value: '{colors.bg.subtle}' },

  border: { value: '{colors.border.default}' },
  borderHover: { value: '{colors.border.moderate}' },
  borderFocus: { value: '{colors.border.focus}' },
  borderError: { value: '{colors.border.error}' },

  text: { value: '{colors.text.primary}' },
  textDisabled: { value: '{colors.text.disabled}' },
  textPlaceholder: { value: '{colors.text.placeholder}' },
} as const

// ============================================================================
// ACCENT COLORS
// ============================================================================

const accent = {
  primary: { value: '{colors.neo.primary}' },
  secondary: { value: '{colors.neo.secondary}' },
  tertiary: { value: '{colors.neo.accent}' },

  /** Muted accent - 20% opacity */
  muted: {
    value: {
      _light: 'color-mix(in srgb, {colors.neo.primary} 20%, transparent)',
      _dark: 'color-mix(in srgb, {colors.neo.primary} 30%, transparent)',
    },
  },

  /** Success accent */
  success: {
    value: {
      _light: '{colors.neo.accent}',
      _dark: '{colors.neo.accent}',
    },
  },

  /** Error accent */
  error: {
    value: {
      _light: '{colors.neo.warning}',
      _dark: '{colors.neo.warning}',
    },
  },

  /** Warning accent */
  warning: {
    value: {
      _light: '{colors.neo.warning}',
      _dark: '{colors.neo.warning}',
    },
  },
} as const

// ============================================================================
// OVERLAY COLORS
// ============================================================================

const overlay = {
  /** Default overlay - 42% opacity */
  default: {
    value: 'color-mix(in srgb, {colors.surface.bg} 42%, transparent)',
  },

  /** Light overlay - 15% opacity */
  light: {
    value: 'color-mix(in srgb, {colors.surface.bg} 15%, transparent)',
  },

  /** Heavy overlay - 88% opacity */
  heavy: {
    value: 'color-mix(in srgb, {colors.surface.bg} 88%, transparent)',
  },
} as const

// ============================================================================
// FOCUS COLORS
// ============================================================================

const focus = {
  ring: { value: '{colors.neo.accent}' },

  /** Primary focus ring variant */
  primary: { value: '{colors.neo.primary}' },

  /** Error focus ring variant */
  error: { value: '{colors.neo.warning}' },

  /** Success focus ring variant */
  success: { value: '{colors.neo.secondary}' },
} as const

// ============================================================================
// LOADING STATE COLORS
// ============================================================================

const loading = {
  /** Loading spinner color */
  spinner: { value: '{colors.neo.primary}' },

  /** Skeleton loading background */
  skeleton: { value: '{colors.bg.subtle}' },

  /** Skeleton shimmer color */
  shimmer: {
    value: {
      _light: 'color-mix(in srgb, {colors.surface.bg} 70%, {colors.surface.fg})',
      _dark: 'color-mix(in srgb, {colors.surface.fg} 70%, {colors.surface.bg})',
    },
  },
} as const

// ============================================================================
// INTERACTION STATE COLORS
// ============================================================================

const interaction = {
  /** Disabled state opacity */
  disabled: {
    opacity: { value: '{opacity.disabled}' },
    bg: { value: '{colors.bg.subtle}' },
    text: { value: '{colors.text.disabled}' },
  },
} as const

// ============================================================================
// DRAG STATE COLORS
// ============================================================================

const drag = {
  /** Active drag state */
  active: {
    value: {
      _light: 'color-mix(in srgb, {colors.neo.primary} 20%, transparent)',
      _dark: 'color-mix(in srgb, {colors.neo.primary} 30%, transparent)',
    },
  },

  /** Drag ghost/preview */
  ghost: {
    value: 'color-mix(in srgb, {colors.surface.bg} 60%, transparent)',
  },

  /** Drop target indicator */
  dropTarget: { value: '{colors.neo.accent}' },
} as const

// ============================================================================
// PROGRESS INDICATOR COLORS
// ============================================================================

const progress = {
  /** Progress bar fill */
  bar: { value: '{colors.neo.primary}' },

  /** Progress track background */
  track: { value: '{colors.bg.subtle}' },

  /** Success progress */
  success: { value: '{colors.neo.secondary}' },

  /** Warning progress */
  warning: { value: '{colors.neo.warning}' },
} as const

// ============================================================================
// ALL SEMANTIC COLORS
// ============================================================================

export const colors = {
  surface,
  world,
  text,
  icon,
  border,
  bg,
  input,
  accent,
  overlay,
  focus,
  loading,
  interaction,
  drag,
  progress,
} as const
