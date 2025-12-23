/**
 * Section Header Recipe (sva - multi-slot)
 *
 * Purpose: Reusable settings section header with optional actions
 * Layer: 5 (Recipes)
 * References: Layer 3 (semantic tokens) only
 *
 * Slots:
 * - root: Container wrapper
 * - title: Section title (h3)
 * - actions: Optional action area (buttons, checkboxes)
 *
 * Usage:
 * ```tsx
 * import { sectionHeaderRecipe } from '@/recipes/sectionHeader.recipe'
 *
 * const classes = sectionHeaderRecipe()
 *
 * <div className={classes.root}>
 *   <h3 className={classes.title}>Section Title</h3>
 *   <div className={classes.actions}>
 *     <button>Action</button>
 *   </div>
 * </div>
 * ```
 */

import { defineSlotRecipe } from '@pandacss/dev'
import { neoTextBase } from './shared/base'

export const sectionHeaderRecipe = defineSlotRecipe({
  className: 'sectionHeader',
  slots: ['root', 'title', 'actions'],

  base: {
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'inline.normal',
      mb: 'stack.tight',
    },

    title: {
      ...neoTextBase,
      fontSize: 'xs',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: 'wider',
      color: 'text.primary',
      opacity: 'subtle',
    },

    actions: {
      display: 'flex',
      alignItems: 'center',
      gap: 'inline.tight',
    },
  },

  variants: {
    size: {
      sm: {
        root: {
          mb: 'micro3',
        },
        title: {
          fontSize: '2xs',
        },
      },
      md: {
        root: {
          mb: 'stack.tight',
        },
        title: {
          fontSize: 'xs',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})
