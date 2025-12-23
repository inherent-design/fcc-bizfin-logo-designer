/**
 * Drag Handle Recipe (cva - single element)
 *
 * Purpose: Interactive drag handle for reorderable lists
 * Layer: 5 (Recipes)
 * References: Layer 3 (semantic tokens) only
 *
 * Variants:
 * - state: default, dragging, disabled
 *
 * Usage:
 * ```tsx
 * import { dragHandleRecipe } from '@/tokens/recipes/dragHandle.recipe'
 * import { GripVertical } from 'lucide-react'
 *
 * <button className={dragHandleRecipe({ state: 'default' })}>
 *   <GripVertical size={16} />
 * </button>
 * ```
 */

import { defineRecipe } from '@pandacss/dev'
import { neoInteractiveBase, focusState } from './shared/base'

export const dragHandleRecipe = defineRecipe({
  className: 'dragHandle',
  base: {
    ...neoInteractiveBase,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'sizes.touch.min', // WCAG 2.2 touch target minimum (44px)
    height: 'sizes.touch.min',
    bg: 'bg.interactive.default',
    color: 'text.secondary',
    cursor: 'grab',
    flexShrink: 0, // Prevent shrinking in flex containers
    touchAction: 'none', // Disable browser touch gestures

    '&:hover': {
      bg: 'bg.interactive.hover',
      color: 'text.interactive.hover',
      boxShadow: 'interaction.hover',
    },

    '&:active': {
      cursor: 'grabbing',
      boxShadow: 'interaction.pressed',
    },

    ...focusState,
  },

  variants: {
    state: {
      default: {},
      dragging: {
        cursor: 'grabbing',
        bg: 'bg.active',
        boxShadow: 'interaction.dragging',
        opacity: 'medium',
        transform: 'scale(1.05)',
      },
      disabled: {
        opacity: 'disabled',
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  },

  defaultVariants: {
    state: 'default',
  },
})
