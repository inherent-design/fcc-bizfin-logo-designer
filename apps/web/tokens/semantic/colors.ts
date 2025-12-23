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
      _light: '{colors.gray.0}',  // Lightest gray (near white)
      _dark: '{colors.gray.10}',  // Darkest gray (near black)
    },
  },
  fg: {
    value: {
      _light: '{colors.gray.10}', // Darkest gray (near black)
      _dark: '{colors.gray.0}',   // Lightest gray (near white)
    },
  },
} as const

/**
 * World colors (application canvas/gradient backgrounds)
 */
const world = {
  bg: {
    value: {
      _light: '{gradients.radialGray0to2}',   // Light gradient
      _dark: '{gradients.radialGray10to8}',   // Dark gradient
    },
  },
  glow: {
    value: {
      _light: 'color-mix(in oklch, {colors.gray.5} 30%, transparent)',
      _dark: 'color-mix(in oklch, {colors.gray.5} 30%, transparent)',
    },
  },
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
      _light: 'color-mix(in oklch, {colors.surface.fg} 80%, transparent)',
      _dark: 'color-mix(in oklch, {colors.surface.bg} 80%, transparent)',
    },
  },

  /** Tertiary text - 67% opacity (~1.5^-1) */
  tertiary: {
    value: {
      _light: 'color-mix(in oklch, {colors.surface.fg} 67%, transparent)',
      _dark: 'color-mix(in oklch, {colors.surface.bg} 67%, transparent)',
    },
  },

  /** Quaternary text - 57% opacity (~1.75^-1) */
  quaternary: {
    value: {
      _light: 'color-mix(in oklch, {colors.surface.fg} 57%, transparent)',
      _dark: 'color-mix(in oklch, {colors.surface.bg} 57%, transparent)',
    },
  },

  /** Disabled text - Subharmonic fourth (0.25) */
  disabled: {
    value: {
      _light: 'color-mix(in oklch, {colors.surface.fg} 25%, transparent)',
      _dark: 'color-mix(in oklch, {colors.surface.bg} 25%, transparent)',
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
  error: { value: '{colors.gray.8}' },  // Dark gray for contrast

  /** Success text */
  success: { value: '{colors.gray.6}' }, // Mid-dark gray

  /** Info text */
  info: { value: '{colors.gray.7}' },    // Mid-dark gray

  /** Label text */
  label: { value: '{colors.surface.fg}' },

  /** Caption text */
  caption: { value: '{colors.text.tertiary}' },

  /** Placeholder text */
  placeholder: { value: '{colors.text.secondary}' },

  /** Helper text */
  helper: { value: '{colors.text.tertiary}' },

  /** Interactive element text states */
  interactive: {
    default: {
      value: {
        _light: '{colors.surface.fg}',
        _dark: '{colors.surface.fg}',
      },
    },
    hover: {
      value: {
        _light: '{colors.surface.bg}', // Full inversion on hover
        _dark: '{colors.surface.bg}',
      },
    },
    active: {
      value: {
        _light: '{colors.surface.bg}',
        _dark: '{colors.surface.bg}',
      },
    },
  },
} as const

// ============================================================================
// ICON COLORS
// ============================================================================

const icon = {
  default: { value: '{colors.surface.fg}' },
  secondary: { value: '{colors.text.secondary}' },
  muted: { value: '{colors.text.tertiary}' },
  primary: { value: '{colors.gray.7}' },     // Mid-dark gray
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
      _light: 'color-mix(in oklch, {colors.surface.fg} 30%, transparent)',
      _dark: 'color-mix(in oklch, {colors.surface.bg} 30%, transparent)',
    },
  },

  /** Moderate border - 60% opacity */
  moderate: {
    value: {
      _light: 'color-mix(in oklch, {colors.surface.fg} 60%, transparent)',
      _dark: 'color-mix(in oklch, {colors.surface.bg} 60%, transparent)',
    },
  },

  /** Emphasis border (for focus, active states) */
  emphasis: { value: '{colors.gray.8}' },

  /** Focus border */
  focus: { value: '{colors.gray.8}' },

  /** Error border */
  error: { value: '{colors.gray.8}' },

  /** Success border */
  success: { value: '{colors.gray.6}' },
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
      _light: 'color-mix(in oklch, {colors.surface.bg} 50%, transparent)',
      _dark: 'color-mix(in oklch, {colors.surface.fg} 50%, transparent)',
    },
  },

  /** Hover background - 10% foreground mix */
  hover: {
    value: {
      _light: 'color-mix(in oklch, {colors.surface.fg} 10%, {colors.surface.bg})',
      _dark: 'color-mix(in oklch, {colors.surface.bg} 15%, {colors.surface.fg})',
    },
  },

  /** Active background - 15% foreground mix */
  active: {
    value: {
      _light: 'color-mix(in oklch, {colors.surface.fg} 15%, {colors.surface.bg})',
      _dark: 'color-mix(in oklch, {colors.surface.bg} 20%, {colors.surface.fg})',
    },
  },

  /** Selected background */
  selected: { value: '{colors.gray.8}' },

  /** Primary background */
  primary: { value: '{colors.gray.7}' },

  /** Secondary background */
  secondary: { value: '{colors.gray.6}' },

  /** Accent background */
  accent: { value: '{colors.gray.8}' },

  /** Danger background */
  danger: { value: '{colors.gray.8}' },

  /** Success background */
  success: { value: '{colors.gray.6}' },

  /** Transparent background */
  transparent: { value: 'transparent' },

  /** Elevated surface background (for dialogs, popovers, menus) */
  elevated: {
    value: {
      _light: '{colors.surface.bg}',
      _dark: '{colors.surface.bg}',
    },
  },

  /** Interactive element backgrounds */
  interactive: {
    default: {
      value: {
        _light: '{colors.surface.bg}',
        _dark: '{colors.surface.bg}',
      },
    },
    primary: { value: '{colors.gray.7}' },
    secondary: { value: '{colors.gray.6}' },
    hover: {
      value: {
        _light: '{colors.surface.fg}', // Full inversion: hover bg = fg
        _dark: '{colors.surface.fg}',
      },
    },
    active: {
      value: {
        _light: '{colors.surface.fg}',
        _dark: '{colors.surface.fg}',
      },
    },
  },

  /** Overlay background (for modals, dialogs) */
  overlay: {
    value: 'color-mix(in oklch, {colors.surface.fg} 40%, transparent)',
  },
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
  primary: { value: '{colors.gray.7}' },
  secondary: { value: '{colors.gray.6}' },
  tertiary: { value: '{colors.gray.8}' },

  /** Muted accent - 20% opacity */
  muted: {
    value: {
      _light: 'color-mix(in oklch, {colors.gray.7} 20%, transparent)',
      _dark: 'color-mix(in oklch, {colors.gray.7} 30%, transparent)',
    },
  },

  /** Success accent */
  success: {
    value: {
      _light: '{colors.gray.6}',
      _dark: '{colors.gray.6}',
    },
  },

  /** Error accent */
  error: {
    value: {
      _light: '{colors.gray.8}',
      _dark: '{colors.gray.8}',
    },
  },

  /** Warning accent */
  warning: {
    value: {
      _light: '{colors.gray.7}',
      _dark: '{colors.gray.7}',
    },
  },
} as const

// ============================================================================
// OVERLAY COLORS
// ============================================================================

const overlay = {
  /** Default overlay - 42% opacity */
  default: {
    value: 'color-mix(in oklch, {colors.surface.bg} 42%, transparent)',
  },

  /** Light overlay - 15% opacity */
  light: {
    value: 'color-mix(in oklch, {colors.surface.bg} 15%, transparent)',
  },

  /** Heavy overlay - 88% opacity */
  heavy: {
    value: 'color-mix(in oklch, {colors.surface.bg} 88%, transparent)',
  },
} as const

// ============================================================================
// FOCUS COLORS
// ============================================================================

const focus = {
  ring: { value: '{colors.gray.8}' },

  /** Primary focus ring variant */
  primary: { value: '{colors.gray.7}' },

  /** Error focus ring variant */
  error: { value: '{colors.gray.8}' },

  /** Success focus ring variant */
  success: { value: '{colors.gray.6}' },
} as const

// ============================================================================
// LOADING STATE COLORS
// ============================================================================

const loading = {
  /** Loading spinner color */
  spinner: { value: '{colors.gray.7}' },

  /** Skeleton loading background */
  skeleton: { value: '{colors.bg.subtle}' },

  /** Skeleton shimmer color */
  shimmer: {
    value: {
      _light: 'color-mix(in oklch, {colors.surface.bg} 70%, {colors.surface.fg})',
      _dark: 'color-mix(in oklch, {colors.surface.fg} 70%, {colors.surface.bg})',
    },
  },
} as const

// ============================================================================
// INTERACTION STATE COLORS
// ============================================================================

const interaction = {
  /** Disabled state opacity */
  disabled: {
    opacity: { value: '{opacity.opacity25}' },
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
      _light: 'color-mix(in oklch, {colors.gray.7} 20%, transparent)',
      _dark: 'color-mix(in oklch, {colors.gray.7} 30%, transparent)',
    },
  },

  /** Drag ghost/preview */
  ghost: {
    value: 'color-mix(in oklch, {colors.surface.bg} 60%, transparent)',
  },

  /** Drop target indicator */
  dropTarget: { value: '{colors.gray.8}' },
} as const

// ============================================================================
// PROGRESS INDICATOR COLORS
// ============================================================================

const progress = {
  /** Progress bar fill */
  bar: { value: '{colors.gray.7}' },

  /** Progress track background */
  track: { value: '{colors.bg.subtle}' },

  /** Success progress */
  success: { value: '{colors.gray.6}' },

  /** Warning progress */
  warning: { value: '{colors.gray.8}' },
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
