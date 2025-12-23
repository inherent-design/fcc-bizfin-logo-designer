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

import { defineRecipe } from '@pandacss/dev'
import { neoInteractiveBase, neoTextBase } from './shared/base'

export const badgeRecipe = defineRecipe({
  className: 'badge',
  base: {
    ...neoInteractiveBase,
    ...neoTextBase,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: 'inset.tight',
    py: 'inset.tight', // Migrated from micro2 base token
    fontSize: 'xs',
    fontWeight: 'bold',
    textTransform: 'uppercase',
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
        py: 'inset.tight', // Migrated from micro2 base token
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
