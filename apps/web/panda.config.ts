import { defineAnimationStyles, defineConfig, defineLayerStyles } from '@pandacss/dev'

import {
  animationStyles,
  blurs,
  borderWidths,
  breakpoints,
  colors,
  containerSizes,
  displaySizes,
  durations,
  easings,
  fonts,
  fontSizes,
  fontWeights,
  iconSizes,
  keyframes,
  layerStyles,
  letterSpacings,
  lineHeightRatios,
  patterns,
  radii,
  semanticTokens,
  spacing,
  textStyles,
} from './src/tokens'

export default defineConfig({
  // ============================================================================
  // BUILD CONFIGURATION
  // ============================================================================

  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  jsxFramework: 'react',
  outdir: 'styled-system',
  importMap: '@styled-system',
  presets: ['@pandacss/preset-base'],
  eject: true,

  // ============================================================================
  // THEME CONFIGURATION
  // ============================================================================

  theme: {
    extend: {
      // Custom breakpoints
      breakpoints,

      // ========================================================================
      // BASE TOKENS (Tier 1: Design Primitives)
      // ========================================================================

      tokens: {
        // Colors - Visual palettes (not functional)
        colors,

        // Spacing - Rhythm grid (8px base with Fibonacci-inspired multipliers)
        spacing,

        // Typography - Font families and weights
        fonts,
        fontWeights,

        // Font sizes
        fontSizes: {
          ...fontSizes,
          ...displaySizes,
        },

        lineHeights: lineHeightRatios,
        letterSpacings,

        // Border radii
        radii,

        // Border widths
        borderWidths,

        // Sizing - Width and height values
        sizes: {
          icon: iconSizes,
          container: containerSizes,
        },

        // Effects - Blur, etc.
        blurs,

        // Animations - Durations and easings
        durations,
        easings,
      },

      // ========================================================================
      // SEMANTIC TOKENS (Tier 2: Functional Purpose with Hierarchy)
      // ========================================================================

      semanticTokens: {
        ...semanticTokens,
      },

      // ========================================================================
      // TEXT STYLES - Typography patterns
      // ========================================================================

      textStyles,

      // ========================================================================
      // LAYER STYLES - Container patterns (borders, shadows, backgrounds)
      // ========================================================================

      layerStyles: defineLayerStyles(layerStyles),

      // ========================================================================
      // ANIMATION STYLES - Animation and transition patterns
      // ========================================================================

      animationStyles: defineAnimationStyles(animationStyles),
    },
  },

  // ============================================================================
  // GLOBAL CSS - Keyframes and global styles
  // ============================================================================

  globalCss: keyframes,

  // ============================================================================
  // PATTERNS - Custom layout and behavioral patterns
  // ============================================================================

  patterns,

  // ============================================================================
  // UTILITIES - Extended utility values
  // ============================================================================

  utilities: {
    extend: {
      opacity: {
        values: {
          disabled: '0.25',
          muted: '0.4',
          subtle: '0.618',
          medium: '0.854',
        },
      },
    },
  },

  // ============================================================================
  // STATIC CSS - Pre-generate runtime recipe values
  // ============================================================================

  staticCss: {
    css: [
      {
        properties: {
          width: ['*'],
          height: ['*'],
        },
      },
    ],
  },

  // ============================================================================
  // CONDITIONS - Theme switching support
  // ============================================================================

  conditions: {
    extend: {
      // Bind _light and _dark conditions to data-theme attribute
      light: '[data-theme="light"] &',
      dark: '[data-theme="dark"] &',
    },
  },
})
