/**
 * Badge Recipe (cva - single element)
 *
 * Purpose: Reusable badge/tag styling with variants
 * Layer: 5 (Recipes)
 * References: Layer 3 (semantic tokens) only
 *
 * Variants:
 * - variant: filled, unfilled, success, error, warning
 * - size: sm, md, lg
 *
 * @example
 * ```tsx
 * import { badgeRecipe } from '@/recipes/badge.recipe'
 *
 * <span className={badgeRecipe({ variant: 'filled', size: 'sm' })}>
 *   Active
 * </span>
 * ```
 */

import { cva } from 'styled-system/css'

export const badgeRecipe = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: 'inset.tight',
    py: 'micro2',
    borderWidth: 'borders.borderWidth.brutal',
    borderStyle: 'solid',
    borderColor: 'border.default',
    borderRadius: 'none',
    textStyle: 'brutalistLabel',
    fontSize: 'xs',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    transitionDuration: 'animations.transition.fast.duration',
    transitionProperty: 'all',
  },

  variants: {
    variant: {
      filled: {
        bg: 'bg.interactive.primary',
        borderColor: 'border.default',
        color: 'text.onPrimary',
      },
      unfilled: {
        bg: 'bg.interactive.default',
        borderColor: 'border.default',
        color: 'text.primary',
      },
      success: {
        bg: 'accent.success',
        borderColor: 'border.default',
        color: 'text.onPrimary',
      },
      error: {
        bg: 'accent.danger',
        borderColor: 'border.default',
        color: 'text.onPrimary',
      },
      warning: {
        bg: 'accent.warning',
        borderColor: 'border.default',
        color: 'text.primary',
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
    variant: 'filled',
    size: 'sm',
  },
})

/**
 * TypeScript types for badge recipe variants
 */
export type BadgeRecipeVariants = Parameters<typeof badgeRecipe>[0]
