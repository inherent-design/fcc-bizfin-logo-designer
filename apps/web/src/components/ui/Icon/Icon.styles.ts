// ============================================================================
// ICON RECIPE
// ============================================================================

import { iconSizes } from '@/tokens'
import { cva, type RecipeVariantProps } from 'styled-system/css'

/**
 * Generate size variants from available icon sizing tokens
 * Each size uses the token reference: icon.{size}
 */
const generateIconSizeVariants = () => {
  return Object.fromEntries(
    Object.keys(iconSizes).map((size) => [
      size,
      {
        width: `icon.${size}`,
        height: `icon.${size}`,
      },
    ])
  )
}

/**
 * Icon recipe - Uses icon-specific size tokens from sizes.icon.*
 * Variants are dynamically generated from token system
 */
export const iconRecipe = cva({
  base: {
    display: 'inline-block',
    flexShrink: 0,
  },

  variants: {
    size: generateIconSizeVariants(),
  },

  defaultVariants: {
    size: 'md',
  },
})

export type IconVariantProps = RecipeVariantProps<typeof iconRecipe>
