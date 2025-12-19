/**
 * Base Token Definitions
 */

import {
  BASES,
  durationBase,
  durationRatios,
  letterSpacingRatios,
  musicalRatios,
  opacityRatios,
  zIndexScale,
} from './constants'

/**
 * Neo-brutalist palette (for controls and UI elements)
 */
export const neoColors = {
  fg: { value: '#1a1a1a' },
  bg: { value: '#fef6e4' },
  primary: { value: '#f582ae' },
  secondary: { value: '#8bd3dd' },
  accent: { value: '#00FF00' },
  warning: { value: '#ff6b6b' },
} as const

/**
 * High-fantasy palette (for backgrounds and accents)
 */
export const fantasyColors = {
  void: {
    start: { value: '#0a0514' },
    mid: { value: '#0f0820' },
    end: { value: '#1a0f2e' },
  },
  aether: {
    start: { value: '#fdfdfb' },
    mid: { value: '#f5faf6' },
    end: { value: '#d7f2ddff' },
  },
  arcana: {
    primary: { value: '#a78bfa' },
    secondary: { value: '#60a5fa' },
    tertiary: { value: '#34d399' },
    glow: { value: 'rgba(167, 139, 250, 0.3)' },
  },
  gold: {
    base: { value: '#d7913a' },
    dark: { value: '#5f4c0c' },
    shimmer: { value: '#ffd700' },
  },
} as const

export const colors = {
  neo: neoColors,
  fantasy: fantasyColors,
} as const

/**
 * Spacing tokens based
 *
 * body:font-size = 62.5%
 * 1 rem = 10px
 */
export const spacing = {
  rhythm1: {
    value: `${(BASES.rhythm * 2) / 10}rem`,
  },
} as const

/**
 * Icon Sizes
 */
export const iconSizes = {
  '3xs': { value: '{spacing.rhythm0_4}' }, // 0.2rem
  '2xs': { value: '{spacing.rhythm0_6}' }, // 0.3rem
  xs: { value: '{spacing.rhythm0_8}' }, // 0.4rem
  sm: { value: '{spacing.rhythm1_4}' }, // 0.7rem
  md: { value: '{spacing.rhythm2_4}' }, // 1.2rem
  lg: { value: '{spacing.rhythm3_6}' }, // 1.8rem
  xl: { value: '{spacing.rhythm4_8}' }, // 2.4rem
  '2xl': { value: '{spacing.rhythm5_6}' }, // 2.8rem
  '3xl': { value: '{spacing.rhythm6_4}' }, // 3.2rem
} as const

/**
 * Container Sizes
 */
export const containerSizes = {
  '4xs': { value: '{spacing.rhythm1_5}' }, // 0.75rem
  '3xs': { value: '{spacing.rhythm2}' }, // 1rem
  '2xs': { value: '{spacing.rhythm2_5}' }, // 1.25rem
  xs: { value: '{spacing.rhythm3}' }, // 1.5rem
  sm: { value: '{spacing.rhythm4}' }, // 2rem
  md: { value: '{spacing.rhythm40}' }, // 20rem
  lg: { value: '{spacing.rhythm48}' }, // 24rem
  xl: { value: '{spacing.rhythm56}' }, // 28rem
  '2xl': { value: '{spacing.rhythm64}' }, // 32rem
  '3xl': { value: '{spacing.rhythm72}' }, // 36rem
  '4xl': { value: '{spacing.rhythm84}' }, // 42rem
} as const

export const contentSizes = {
  full: { value: '100%' },
  screen: { value: '100vw' },
  min: { value: 'min-content' },
  max: { value: 'max-content' },
  fit: { value: 'fit-content' },
}

export const sizes = {
  ...contentSizes,
  ...containerSizes,
  ...iconSizes,
}

/**
 * Font Families
 */
export const fonts = {
  brutalist: { value: 'Space Grotesk, system-ui, sans-serif' },
  mono: { value: 'Fira Code, Consolas, Monaco, monospace' },
} as const

/**
 * Typography scale
 */
export const fontSizes = {
  typeMinus2: {
    value: `${BASES.type / musicalRatios.perfectFourth}rem`,
  },

  typeMinus1: {
    value: `${BASES.type / musicalRatios.minorThird}rem`,
  },

  typeBase: {
    value: `${BASES.type}rem`,
  },

  typePlus1: {
    value: `${BASES.type * musicalRatios.minorThird}rem`,
  },

  typePlus2: {
    value: `${BASES.type * musicalRatios.majorThird}rem`,
  },

  typePlus3: {
    value: `${BASES.type * musicalRatios.perfectFourth}rem`,
  },

  typePlus4: {
    value: `${BASES.type * musicalRatios.perfectFifth}rem`,
  },

  typePlus5: {
    value: `${BASES.type * musicalRatios.minorSixth}rem`,
  },

  typePlus6: {
    value: `${BASES.type * musicalRatios.octave}rem`,
  },

  typePlus7: {
    value: `${BASES.type * musicalRatios.octave * musicalRatios.minorThird}rem`,
  },

  typePlus8: {
    value: `${BASES.type * musicalRatios.octave * musicalRatios.perfectFifth}rem`,
  },

  displayPlus2: {
    value: `${BASES.type * musicalRatios.octave * 3}rem`,
  },

  displayPlus1: {
    value: `${BASES.type * musicalRatios.octave * 2.5}rem`,
  },

  displayBase: {
    value: `${BASES.type * musicalRatios.octave * 2}rem`,
  },

  displayMinus1: {
    value: `${BASES.type * musicalRatios.octave * 1.5}rem`,
  },
} as const

/**
 * Font Weights
 */
export const fontWeights = {
  normal: { value: '400' },
  medium: { value: '500' },
  semibold: { value: '600' },
  bold: { value: '700' },
  brutal: { value: '900' },
} as const

/**
 * Line Height Ratios
 */
export const lineHeightRatios = {
  tight: {
    value: musicalRatios.minorThird,
  },

  normal: {
    value: musicalRatios.perfectFifth,
  },

  relaxed: {
    value: musicalRatios.minorSeventh,
  },
} as const

/**
 * Letter Spacing
 */
export const letterSpacings = {
  tight: {
    value: `${letterSpacingRatios.tight}em`,
  },

  normal: {
    value: `${letterSpacingRatios.normal}em`,
  },

  wide: {
    value: `${letterSpacingRatios.wide}em`,
  },

  wider: {
    value: `${letterSpacingRatios.wider}em`,
  },

  widest: {
    value: `${letterSpacingRatios.widest}em`,
  },
} as const

/**
 * Border Radii
 */
export const radii = {
  none: { value: '0' },
  sm: { value: '{spacing.rhythm0_4}' },
  md: { value: '{spacing.rhythm0_8}' },
  full: { value: '999.9rem' },
} as const

/**
 * Border Widths
 */
export const borderWidths = {
  base: { value: '0.2rem' },
  brutal: {
    DEFAULT: { value: '{spacing.rhythm1_4}' }, // 0.7rem - default brutal border
    sm: { value: '{spacing.rhythm0_8}' }, // 0.4rem
    md: { value: '{spacing.rhythm1_4}' }, // 0.7rem
    lg: { value: '{spacing.rhythm1_6}' }, // 0.8rem
  },
} as const

/**
 * Easing Functions
 */
export const easings = {
  DEFAULT: { value: 'ease' },
  smooth: { value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
} as const

/**
 * Opacity Levels
 */
export const opacityLevels = {
  disabled: {
    value: opacityRatios.disabled,
  },

  muted: {
    value: opacityRatios.muted,
  },

  subtle: {
    value: opacityRatios.subtle,
  },

  medium: {
    value: opacityRatios.medium,
  },
} as const

/**
 * Z-Index Levels
 */
export const zIndexLevels = {
  base: {
    value: zIndexScale.base,
  },

  dropdown: {
    value: zIndexScale.dropdown,
  },

  sticky: {
    value: zIndexScale.sticky,
  },

  overlay: {
    value: zIndexScale.overlay,
  },

  modal: {
    value: zIndexScale.modal,
  },

  tooltip: {
    value: zIndexScale.tooltip,
  },
} as const

/**
 * Animation Durations
 */
export const durations = {
  fast: {
    value: `${durationBase * durationRatios.fast}ms`,
  },

  normal: {
    value: `${durationBase * durationRatios.normal}ms`,
  },

  slow: {
    value: `${durationBase * durationRatios.slow}ms`,
  },

  veryslow: {
    value: `${durationBase * durationRatios.verySlow}ms`,
  },
} as const

/**
 * Blur Effects
 */
export const blurs = {
  glass: { value: '{spacing.rhythm2_4}' }, // 1.2rem
} as const
