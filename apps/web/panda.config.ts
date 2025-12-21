import { defineConfig, defineTextStyles } from '@pandacss/dev'

// Import base tokens from baseTokens.ts
import { baseTokens, breakpoints, semanticTokens } from './src/tokens'
import { textStyles } from './src/tokens/styles/textStyles'

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

      // layerStyles: defineLayerStyles(layerStyles),

      // animationStyles: defineAnimationStyles(animationStyles),
    },
  },

  // globalCss: keyframes,

  // patterns,

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
