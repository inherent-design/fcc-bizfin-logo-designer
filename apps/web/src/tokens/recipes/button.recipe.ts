/**
 * Button Recipe (cva - single element)
 *
 * Purpose: Reusable button styling with variants
 * Layer: 5 (Recipes)
 * References: Layer 3 (semantic tokens) only
 *
 * Variants:
 * - variant: primary, secondary, ghost
 * - size: sm, md, lg
 *
 * @example
 * ```tsx
 * import { buttonRecipe } from '@/recipes/button.recipe'
 *
 * <button className={buttonRecipe({ variant: 'primary', size: 'md' })}>
 *   Click me
 * </button>
 * ```
 */

import { defineRecipe } from '@pandacss/dev'
import { neoInteractiveBase, neoTextBase, focusState } from './shared/base'

export const buttonRecipe = defineRecipe({
  className: 'button',
  base: {
    ...neoInteractiveBase,
    ...neoTextBase,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'inline.tight',
    px: 'inset.normal',
    py: 'inset.tight',
    bg: 'bg.interactive.default',
    color: 'text.primary',
    cursor: 'pointer',
    fontSize: 'sm',

    '&:hover': {
      bg: 'bg.hover',
      boxShadow: 'interaction.hover',
    },

    '&:active': {
      boxShadow: 'interaction.pressed',
    },

    '&[data-disabled]': {
      opacity: 'disabled',
      cursor: 'not-allowed',
    },

    ...focusState,
  },

  variants: {
    variant: {
      primary: {
        bg: 'bg.interactive.primary',
        color: 'text.onPrimary',
        borderColor: 'border.default',

        '&:hover': {
          bg: 'bg.interactive.primaryHover',
          boxShadow: 'interaction.hover',
        },
      },
      secondary: {
        bg: 'bg.interactive.default',
        color: 'text.primary',
        borderColor: 'border.default',

        '&:hover': {
          bg: 'bg.hover',
        },
      },
      ghost: {
        bg: 'transparent',
        borderColor: 'transparent',
        color: 'text.primary',

        '&:hover': {
          bg: 'bg.hover',
          boxShadow: 'none',
        },
      },
    },

    size: {
      sm: {
        px: 'inset.tight',
        py: 'micro2',
        fontSize: 'xs',
      },
      md: {
        px: 'inset.normal',
        py: 'inset.tight',
        fontSize: 'sm',
      },
      lg: {
        px: 'inset.loose',
        py: 'inset.normal',
        fontSize: 'md',
      },
    },
  },

  defaultVariants: {
    variant: 'secondary',
    size: 'md',
  },
})

