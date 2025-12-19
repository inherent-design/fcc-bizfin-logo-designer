// ============================================================================
// BUTTON RECIPE
// ============================================================================

import { cva, type RecipeVariantProps } from 'styled-system/css'

/**
 * Button recipe - Neo-brutalist button styling
 *
 * Supports variants:
 * - variant: primary, secondary, danger, ghost
 * - size: sm, md, lg
 */
export const buttonRecipe = cva({
  base: {
    bg: 'bg.primary',
    boxShadow: 'brutal',
    color: 'text.inverted',
    borderWidth: 'brutal',
    borderStyle: 'solid',
    borderColor: 'border',
    fontFamily: 'brutalist',
    fontWeight: 'brutal',
    textTransform: 'uppercase',
    px: 'inset.normal',
    py: 'inset.tight',
    cursor: 'pointer',
    transitionDuration: 'fast',
    transitionTimingFunction: 'default',

    _hover: {
      transform: 'translate(2px, 2px)',
      boxShadow: 'brutalInset',
    },

    _active: {
      transform: 'translate(4px, 4px)',
      boxShadow: 'none',
    },

    _disabled: {
      opacity: 'disabled',
      color: 'text.disabled',
      cursor: 'not-allowed',
      transform: 'none',
    },
  },

  variants: {
    variant: {
      primary: {
        bg: 'bg.primary',
      },
      secondary: {
        bg: 'bg.secondary',
      },
      danger: {
        bg: 'bg.danger',
      },
      ghost: {
        bg: 'bg.transparent',
        color: 'text',
        _hover: {
          bg: 'bg.hover',
        },
      },
    },

    size: {
      sm: { px: 'inset.tight', py: 'inset.tight', fontSize: 'xs' },
      md: { px: 'inset.normal', py: 'inset.tight', fontSize: 'sm' },
      lg: { px: 'inset.loose', py: 'inset.normal', fontSize: 'md' },
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export type ButtonVariantProps = RecipeVariantProps<typeof buttonRecipe>
