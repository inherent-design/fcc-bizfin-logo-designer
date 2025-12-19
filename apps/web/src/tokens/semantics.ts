/**
 * Semantic Tokens
 * Context-aware tokens that reference primitive tokens
 */

// ============================================================================
// COLOR SEMANTICS
// ============================================================================

/**
 * Semantic Colors - World (Application Canvas)
 */
export const worldColors = {
  bg: {
    value: {
      _light:
        'radial-gradient(ellipse at center, {colors.fantasy.aether.mid} 0%, {colors.fantasy.aether.start} 50%, {colors.fantasy.aether.end} 100%)',
      _dark:
        'radial-gradient(ellipse at center, {colors.fantasy.void.mid} 0%, {colors.fantasy.void.start} 50%, {colors.fantasy.void.end} 100%)',
    },
  },
  glow: { value: '{colors.fantasy.arcana.glow}' },
} as const

/**
 * Semantic Colors - Panel (Base Surface)
 */
export const panelColors = {
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
  border: {
    value: {
      _light: '{colors.neo.fg}',
      _dark: '{colors.neo.bg}',
    },
  },
  primary: { value: '{colors.neo.primary}' },
  secondary: { value: '{colors.neo.secondary}' },
  accent: { value: '{colors.neo.accent}' },
  warning: { value: '{colors.neo.warning}' },
  success: { value: '{colors.neo.secondary}' },
  info: { value: '{colors.neo.accent}' },
} as const

/**
 * Semantic Colors - Focus (Keyboard Navigation)
 */
export const focusColors = {
  ring: { value: '{colors.panel.accent}' },
} as const

/**
 * Semantic Colors - Overlay (Modal/Drawer Backdrops)
 */
export const overlayColors = {
  DEFAULT: { value: 'color-mix(in srgb, {colors.panel.bg} 42%, transparent)' },
  light: { value: 'color-mix(in srgb, {colors.panel.bg} 15%, transparent)' },
  heavy: { value: 'color-mix(in srgb, {colors.panel.bg} 88%, transparent)' },
} as const

/**
 * Semantic Colors - Text
 */
export const textColors = {
  DEFAULT: { value: '{colors.panel.fg}' },
  secondary: {
    value: {
      _light: 'color-mix(in srgb, {colors.panel.fg} 70%, transparent)',
      _dark: 'color-mix(in srgb, {colors.panel.bg} 70%, transparent)',
    },
  },
  muted: {
    value: {
      _light: 'color-mix(in srgb, {colors.panel.fg} 60%, transparent)',
      _dark: 'color-mix(in srgb, {colors.panel.bg} 60%, transparent)',
    },
  },
  disabled: {
    value: {
      _light: 'color-mix(in srgb, {colors.panel.fg} 30%, transparent)',
      _dark: 'color-mix(in srgb, {colors.panel.bg} 30%, transparent)',
    },
  },

  inverted: { value: '{colors.panel.bg}' },
  onPrimary: { value: '{colors.panel.bg}' },
  onSecondary: { value: '{colors.panel.fg}' },
  onAccent: { value: '{colors.panel.fg}' },

  error: { value: '{colors.panel.warning}' },
  success: { value: '{colors.panel.success}' },
  info: { value: '{colors.panel.info}' },

  label: { value: '{colors.panel.fg}' },
  caption: {
    value: {
      _light: 'color-mix(in srgb, {colors.panel.fg} 60%, transparent)',
      _dark: 'color-mix(in srgb, {colors.panel.bg} 60%, transparent)',
    },
  },
  placeholder: { value: '{colors.text.muted}' },
  helper: { value: '{colors.text.secondary}' },

  panel: {
    DEFAULT: { value: '{colors.panel.fg}' },
    secondary: { value: '{colors.text.secondary}' },
    heading: { value: '{colors.panel.accent}' },
  },
} as const

/**
 * Semantic Colors - Icon
 */
export const iconColors = {
  DEFAULT: { value: '{colors.panel.fg}' },
  secondary: { value: '{colors.text.secondary}' },
  muted: { value: '{colors.text.muted}' },
  primary: { value: '{colors.panel.primary}' },
  disabled: { value: '{colors.text.disabled}' },
} as const

/**
 * Semantic Colors - Border
 */
export const borderColors = {
  DEFAULT: { value: '{colors.panel.border}' },
  subtle: {
    value: {
      _light: 'color-mix(in srgb, {colors.panel.fg} 30%, transparent)',
      _dark: 'color-mix(in srgb, {colors.panel.bg} 30%, transparent)',
    },
  },

  focus: { value: '{colors.panel.accent}' },
  error: { value: '{colors.panel.warning}' },
  success: { value: '{colors.panel.success}' },

  section: { value: '{colors.border.subtle}' },

  panel: {
    DEFAULT: { value: '{colors.panel.border}' },
    section: { value: '{colors.border.subtle}' },
  },
} as const

/**
 * Semantic Colors - Background
 */
export const bgColors = {
  DEFAULT: { value: '{colors.panel.bg}' },
  subtle: {
    value: {
      _light: 'color-mix(in srgb, {colors.panel.bg} 50%, transparent)',
      _dark: 'color-mix(in srgb, {colors.panel.fg} 50%, transparent)',
    },
  },

  hover: {
    value: {
      _light: 'color-mix(in srgb, {colors.panel.fg} 10%, transparent)',
      _dark: 'color-mix(in srgb, {colors.panel.bg} 15%, transparent)',
    },
  },
  active: {
    value: {
      _light: 'color-mix(in srgb, {colors.panel.fg} 15%, transparent)',
      _dark: 'color-mix(in srgb, {colors.panel.bg} 20%, transparent)',
    },
  },
  selected: { value: '{colors.panel.primary}' },

  primary: { value: '{colors.panel.primary}' },
  secondary: { value: '{colors.panel.secondary}' },
  accent: { value: '{colors.panel.accent}' },
  danger: { value: '{colors.panel.warning}' },
  success: { value: '{colors.panel.success}' },

  transparent: { value: 'transparent' },

  panel: {
    DEFAULT: { value: '{colors.panel.bg}' },
    hover: {
      value: {
        _light: 'color-mix(in srgb, {colors.panel.fg} 10%, transparent)',
        _dark: 'color-mix(in srgb, {colors.panel.bg} 15%, transparent)',
      },
    },
    active: {
      value: {
        _light: 'color-mix(in srgb, {colors.panel.fg} 15%, transparent)',
        _dark: 'color-mix(in srgb, {colors.panel.bg} 20%, transparent)',
      },
    },
  },
} as const

/**
 * Semantic Colors - Input (Form Elements)
 */
export const inputColors = {
  bg: {
    value: {
      _light: '{colors.neo.bg}',
      _dark: '{colors.neo.fg}',
    },
  },
  bgHover: {
    value: {
      _light: '{colors.neo.bg}',
      _dark: '{colors.neo.fg}',
    },
  },
  bgFocus: {
    value: {
      _light: '{colors.neo.bg}',
      _dark: '{colors.neo.fg}',
    },
  },
  bgDisabled: { value: '{colors.bg.subtle}' },

  border: { value: '{colors.border}' },
  borderHover: { value: '{colors.border}' },
  borderFocus: { value: '{colors.border.focus}' },
  borderError: { value: '{colors.border.error}' },

  text: { value: '{colors.text}' },
  textDisabled: { value: '{colors.text.disabled}' },
  textPlaceholder: { value: '{colors.text.placeholder}' },
} as const

/**
 * Semantic Colors - Accent
 */
export const accentColors = {
  primary: { value: '{colors.panel.primary}' },
  secondary: { value: '{colors.panel.secondary}' },
  tertiary: { value: '{colors.panel.accent}' },
  muted: {
    value: {
      _light: 'color-mix(in srgb, {colors.panel.primary} 20%, transparent)',
      _dark: 'color-mix(in srgb, {colors.panel.primary} 30%, transparent)',
    },
  },
} as const

/**
 * Semantic Colors - Surface (Elevation)
 */
export const surfaceColors = {
  base: { value: '{colors.panel.bg}' },
  raised: { value: '{colors.panel.bg}' },
  overlay: { value: '{colors.panel.bg}' },
} as const

// ============================================================================
// 'SPACING SEMANTICS'
// ============================================================================

/**
 * Semantic 'Spacing -' Gestalt Proximity Principles
 */
export const proximitySpacing = {
  tight: {
    value: 'spacing.rhythm0_5',
    description: 'Elements feel unified (e.g., icon + label)',
  },
  close: {
    value: 'spacing.rhythm1',
    description: 'Elements feel related (e.g., form field + helper)',
  },
  related: {
    value: 'spacing.rhythm2',
    description: 'Elements feel grouped (e.g., card sections)',
  },
  separate: {
    value: 'spacing.rhythm4',
    description: 'Elements feel separate (e.g., distinct cards)',
  },
  isolated: {
    value: 'spacing.rhythm8',
    description: 'Elements feel isolated (e.g., page sections)',
  },
} as const

/**
 * Semantic 'Spacing -' Inset (Padding)
 */
export const insetSpacing = {
  tight: { value: 'spacing.rhythm1' },
  normal: { value: 'spacing.rhythm2' },
  loose: { value: 'spacing.rhythm4' },
} as const

/**
 * Semantic 'Spacing -' Stack (Vertical)
 */
export const stackSpacing = {
  tight: { value: 'spacing.rhythm0_5' },
  normal: { value: 'spacing.rhythm1_5' },
  loose: { value: 'spacing.rhythm3' },
} as const

/**
 * Semantic 'Spacing -' Inline (Horizontal)
 */
export const inlineSpacing = {
  tight: { value: 'spacing.rhythm0_25' },
  normal: { value: 'spacing.rhythm1' },
  loose: { value: 'spacing.rhythm2' },
} as const

// ============================================================================
// SHADOW SEMANTICS
// ============================================================================

/**
 * Neo-brutalist Hard Shadows (No Blur)
 */
export const brutalShadows = {
  brutal: {
    value: {
      _light: {
        offsetX: 'spacing.rhythm0_5',
        offsetY: 'spacing.rhythm0_5',
        blur: '0',
        spread: '0',
        color: '{colors.panel.fg}',
      },
      _dark: {
        offsetX: 'spacing.rhythm0_5',
        offsetY: 'spacing.rhythm0_5',
        blur: '0',
        spread: '0',
        color: '{colors.panel.fg}',
      },
    },
  },
  brutalLg: {
    value: {
      _light: {
        offsetX: 'spacing.rhythm1',
        offsetY: 'spacing.rhythm1',
        blur: '0',
        spread: '0',
        color: '{colors.panel.fg}',
      },
      _dark: {
        offsetX: 'spacing.rhythm1',
        offsetY: 'spacing.rhythm1',
        blur: '0',
        spread: '0',
        color: '{colors.panel.fg}',
      },
    },
  },
  brutalInset: {
    value: {
      _light: {
        offsetX: 'spacing.rhythm0_25',
        offsetY: 'spacing.rhythm0_25',
        blur: '0',
        spread: '0',
        color: 'color-mix(in srgb, {colors.panel.fg} 20%, transparent)',
        inset: true,
      },
      _dark: {
        offsetX: 'spacing.rhythm0_25',
        offsetY: 'spacing.rhythm0_25',
        blur: '0',
        spread: '0',
        color: 'color-mix(in srgb, {colors.panel.fg} 20%, transparent)',
        inset: true,
      },
    },
  },
} as const

/**
 * All Semantic Tokens
 */
export const semanticTokens = {
  colors: {
    world: worldColors,
    panel: panelColors,
    focus: focusColors,
    overlay: overlayColors,
    text: textColors,
    icon: iconColors,
    border: borderColors,
    bg: bgColors,
    input: inputColors,
    accent: accentColors,
    surface: surfaceColors,
  },
  spacing: {
    proximity: proximitySpacing,
    inset: insetSpacing,
    stack: stackSpacing,
    inline: inlineSpacing,
  },
  shadows: brutalShadows,
} as const
