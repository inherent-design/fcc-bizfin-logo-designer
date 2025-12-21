// ============================================================================
// ICON RECIPE
// ============================================================================

import { cva, type RecipeVariantProps } from 'styled-system/css'

/**
 * Icon recipe - Uses explicit variant mapping to sizes.icon.* tokens
 *
 * Size progression uses two-stage approach:
 * - Micro sizes (3xs→xs): Musical ratios for subtle transitions
 * - Structural sizes (xs→4xl): Harmonic multiples of 8px base
 */
export const iconRecipe = cva({
  base: {
    display: 'inline-block',
    flexShrink: 0,
  },

  variants: {
    size: {
      '3xs': { width: 'sizes.icon.3xs', height: 'sizes.icon.3xs' },
      '2xs': { width: 'sizes.icon.2xs', height: 'sizes.icon.2xs' },
      'xs': { width: 'sizes.icon.xs', height: 'sizes.icon.xs' },
      'sm': { width: 'sizes.icon.sm', height: 'sizes.icon.sm' },
      'md': { width: 'sizes.icon.md', height: 'sizes.icon.md' },
      'lg': { width: 'sizes.icon.lg', height: 'sizes.icon.lg' },
      'xl': { width: 'sizes.icon.xl', height: 'sizes.icon.xl' },
      '2xl': { width: 'sizes.icon.2xl', height: 'sizes.icon.2xl' },
      '3xl': { width: 'sizes.icon.3xl', height: 'sizes.icon.3xl' },
      '4xl': { width: 'sizes.icon.4xl', height: 'sizes.icon.4xl' },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

export type IconVariantProps = RecipeVariantProps<typeof iconRecipe>
