import { defineConfig, defineLayerStyles, defineTextStyles } from '@pandacss/dev'

import {
  baseTokens,
  breakpoints,
  layerStyles,
  recipes,
  semanticTokens,
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
      breakpoints,

      tokens: baseTokens,

      semanticTokens,

      textStyles: defineTextStyles(textStyles),
      layerStyles: defineLayerStyles(layerStyles),

      recipes: recipes.baseRecipes,
      slotRecipes: recipes.slotRecipes,
    },
  },

  // patterns,

  // ============================================================================
  // GLOBAL CSS - Third-party library styling
  // ============================================================================
  // Style sub-elements of third-party libraries that don't accept className
  // Uses semantic tokens for theme-aware styling

  globalCss: {
    // react-colorful component styling
    '.react-colorful': {
      width: '100%',
      height: '200px',
    },
    '.react-colorful__saturation': {
      borderRadius: 'none',
      borderWidth: 'brutal',
      borderStyle: 'solid',
      borderColor: 'border.default',
      marginBottom: 'stack.tight',
    },
    '.react-colorful__hue': {
      borderRadius: 'none',
      height: 'sizes.touch.min',
      borderWidth: 'brutal',
      borderStyle: 'solid',
      borderColor: 'border.default',
    },
    '.react-colorful__pointer': {
      width: '24px',
      height: '24px',
      borderWidth: 'brutal',
      borderStyle: 'solid',
      borderColor: 'border.default',
      borderRadius: 'none',
    },

    // dnd-kit drag overlay styling
    '[data-dnd-dragging="true"]': {
      bg: 'drag.active',
    },
  },

  // ============================================================================
  // STATIC CSS - Force recipe class generation (workaround for detection issues)
  // ============================================================================
  // See: recipe-solution-comparison-2025-12-23.md
  // This generates ALL variant combinations for recipes, bypassing static analysis.
  // Trade-off: ~6-8KB bundle size for guaranteed CSS generation.
  // TODO: Investigate cva/sva migration for better tree-shaking.

  staticCss: {
    recipes: '*',
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
