/**
 * Design System Abstractions
 * TextStyles, LayerStyles, AnimationStyles, Keyframes
 */

import { scaleRatios } from './constants'

// ============================================================================
// TEXT STYLES
// ============================================================================

/**
 * Text Styles - Typography patterns
 */
export const textStyles = {
  // Existing brutalist styles
  brutalistLabel: {
    description: 'Bold uppercase labels for form fields and sections',
    value: {
      fontFamily: 'brutalist',
      fontWeight: 'brutal',
      fontSize: 'sm',
      textTransform: 'uppercase',
      letterSpacing: 'wider',
      color: 'text.label',
    },
  },
  sectionHeader: {
    description: 'Small uppercase section headers',
    value: {
      fontFamily: 'brutalist',
      fontWeight: 'bold',
      fontSize: 'xs',
      textTransform: 'uppercase',
      letterSpacing: 'wider',
      color: 'text.caption',
    },
  },
  formLabel: {
    description: 'Standard form input labels',
    value: {
      fontFamily: 'brutalist',
      fontWeight: 'bold',
      fontSize: 'sm',
      color: 'text.label',
    },
  },
  brutalistText: {
    description: 'General brutalist text styling',
    value: {
      fontFamily: 'brutalist',
      fontSize: 'sm',
      color: 'panel.fg',
    },
  },

  // Headings
  h1: {
    description: 'Large display heading (48px)',
    value: {
      fontFamily: 'brutalist',
      fontSize: 'typePlus8', // 3rem (48px)
      lineHeight: 'tight', // 1.200
      letterSpacing: 'tight', // -0.05em
      fontWeight: 'brutal', // 900
      color: 'text',
    },
  },
  h2: {
    description: 'Section heading (32px)',
    value: {
      fontFamily: 'brutalist',
      fontSize: 'typePlus6', // 2rem (32px)
      lineHeight: 'tight', // 1.200
      letterSpacing: 'tight', // -0.05em
      fontWeight: 'bold', // 700
      color: 'text',
    },
  },
  h3: {
    description: 'Subsection heading (24px)',
    value: {
      fontFamily: 'brutalist',
      fontSize: 'typePlus4', // 1.5rem (24px)
      lineHeight: 'normal', // 1.500
      letterSpacing: 'normal', // 0em
      fontWeight: 'semibold', // 600
      color: 'text',
    },
  },

  // Body variants
  bodyLarge: {
    description: 'Large body text for emphasis (20px)',
    value: {
      fontFamily: 'brutalist',
      fontSize: 'typePlus2', // 1.25rem (20px)
      lineHeight: 'relaxed', // 1.778
      letterSpacing: 'normal', // 0em
      color: 'text',
    },
  },
  bodySmall: {
    description: 'Small body text for captions (13.33px)',
    value: {
      fontFamily: 'brutalist',
      fontSize: 'typeMinus1', // 0.833rem (13.33px)
      lineHeight: 'normal', // 1.500
      letterSpacing: 'wide', // 0.025em
      color: 'text.secondary',
    },
  },

  // Utility
  code: {
    description: 'Inline code and monospace text',
    value: {
      fontFamily: 'mono',
      fontSize: 'typeMinus1', // 0.833rem (13.33px)
      lineHeight: 'tight', // 1.200
      letterSpacing: 'normal', // 0em
      color: 'text',
    },
  },
  link: {
    description: 'Hyperlink text styling',
    value: {
      fontFamily: 'brutalist',
      fontSize: 'typeBase', // 1rem (16px)
      lineHeight: 'normal', // 1.500
      letterSpacing: 'normal', // 0em
      textDecoration: 'underline',
      textUnderlineOffset: '0.2em',
      color: 'text',
    },
  },

  // Display headings (high-impact graphics)
  displayHero: {
    description: 'Hero display text (96px) - Largest impact',
    value: {
      fontFamily: 'brutalist',
      fontSize: 'display1', // 6rem (96px)
      lineHeight: 'tight', // 1.200
      letterSpacing: 'tight', // -0.05em
      fontWeight: 'brutal', // 900
      color: 'text',
    },
  },
  displayLarge: {
    description: 'Large display heading (80px)',
    value: {
      fontFamily: 'brutalist',
      fontSize: 'display2', // 5rem (80px)
      lineHeight: 'tight', // 1.200
      letterSpacing: 'tight', // -0.05em
      fontWeight: 'brutal', // 900
      color: 'text',
    },
  },
  displayMedium: {
    description: 'Medium display heading (64px)',
    value: {
      fontFamily: 'brutalist',
      fontSize: 'display3', // 4rem (64px)
      lineHeight: 'tight', // 1.200
      letterSpacing: 'tight', // -0.05em
      fontWeight: 'bold', // 700
      color: 'text',
    },
  },
} as const

// ============================================================================
// LAYER STYLES
// ============================================================================

/**
 * Layer Styles - Container patterns (borders, shadows, backgrounds)
 */
export const layerStyles = {
  // Existing styles
  brutalInset: {
    description: 'Inset brutal container for nested content',
    value: {
      background: 'bg.subtle',
      borderWidth: 'base',
      borderStyle: 'solid',
      borderColor: 'border.panel',
      boxShadow: 'brutalInset',
    },
  },

  // Interactive states
  hoverLift: {
    description: 'Subtle lift transform on hover',
    value: {
      transform: `scale(${scaleRatios.subtle})`,
      transition: `transform {durations.fast} {easings.smooth}`,
    },
  },
  activePush: {
    description: 'Downward push transform on active state',
    value: {
      transform: 'translateY(0.2rem)',
      transition: `transform {durations.fast} {easings.smooth}`,
    },
  },
  focusRing: {
    description: 'Accessible focus ring outline',
    value: {
      outlineWidth: 'base',
      outlineStyle: 'solid',
      outlineColor: 'focus.ring',
      outlineOffset: 'rhythm0_25',
    },
  },

  // Visual effects
  glassmorphism: {
    description: 'Glass-like effect with backdrop blur',
    value: {
      backdropFilter: 'blur(1.2rem)',
      background: 'color-mix(in srgb, {colors.panel.bg} 80%, transparent)',
      borderWidth: 'base',
      borderStyle: 'solid',
      borderColor: 'border',
    },
  },
  brutalPanel: {
    description: 'Standard brutal panel container',
    value: {
      background: 'panel.bg',
      borderWidth: 'brutal',
      borderStyle: 'solid',
      borderColor: 'border',
      boxShadow: 'brutal',
    },
  },
} as const

// ============================================================================
// ANIMATION STYLES
// ============================================================================

/**
 * Animation Styles - Animation and transition patterns
 */
export const animationStyles = {
  fadeIn: {
    description: 'Fade in from opacity 0 to 1',
    value: {
      animationName: 'fadeIn',
      animationDuration: '{durations.normal}',
      animationTimingFunction: 'ease-in',
      animationFillMode: 'forwards',
    },
  },
  slideInUp: {
    description: 'Slide in from bottom with fade',
    value: {
      animationName: 'slideInUp',
      animationDuration: '{durations.slow}',
      animationTimingFunction: 'ease-out',
    },
  },
  spin: {
    description: 'Continuous rotation animation',
    value: {
      animationName: 'spin',
      animationDuration: '{durations.veryslow}',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
    },
  },
  pulse: {
    description: 'Pulsing opacity animation',
    value: {
      animationName: 'pulse',
      animationDuration: '{durations.slow}',
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
    },
  },
} as const

// ============================================================================
// KEYFRAMES
// ============================================================================

/**
 * Keyframes - Global CSS animations
 */
export const keyframes = {
  '@keyframes fadeIn': {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  '@keyframes slideInUp': {
    from: {
      transform: 'translateY(1rem)',
      opacity: '0',
    },
    to: {
      transform: 'translateY(0)',
      opacity: '1',
    },
  },
  '@keyframes spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  '@keyframes pulse': {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.5' },
  },
} as const
