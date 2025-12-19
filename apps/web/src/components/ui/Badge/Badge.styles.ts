// ============================================================================
// BADGE RECIPE
// ============================================================================

import { cva, type RecipeVariantProps } from 'styled-system/css'

/**
 * Badge recipe - Neo-brutalist badge styling
 *
 * Supports variants:
 * - variant: filled, unfilled, outline
 * - size: sm, md (default), lg
 */
export const badgeRecipe = cva({
  base: {
    px: 'inline.tight',
    py: 'inline.tight',
    borderWidth: 'base',
    borderStyle: 'solid',
    borderColor: 'border',
    textStyle: 'sectionHeader',
    fontSize: '2xs',
    display: 'inline-block',
  },

  variants: {
    variant: {
      filled: {
        bg: 'accent.primary',
        color: 'text.inverted',
        borderColor: 'accent.primary',
      },
      unfilled: {
        bg: 'transparent',
        color: 'text',
        borderColor: 'border',
      },
      outline: {
        bg: 'transparent',
        color: 'accent.primary',
        borderColor: 'accent.primary',
      },
    },

    size: {
      sm: {
        px: 'inline.tight',
        py: 'inline.tight',
        fontSize: '3xs',
      },
      md: {
        px: 'inline.tight',
        py: 'inline.tight',
        fontSize: '2xs',
      },
      lg: {
        px: 'inline.normal',
        py: 'inline.tight',
        fontSize: 'xs',
      },
    },
  },

  defaultVariants: {
    variant: 'unfilled',
    size: 'md',
  },
})

export type BadgeVariantProps = RecipeVariantProps<typeof badgeRecipe>
