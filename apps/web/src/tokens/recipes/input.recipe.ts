/**
 * Input Recipe (sva - multi-slot)
 *
 * Purpose: Reusable form input styling with label
 * Layer: 5 (Recipes)
 * References: Layer 3 (semantic tokens) only
 *
 * Slots:
 * - label: Input label element
 * - input: Input field element
 *
 * @example
 * ```tsx
 * import { inputRecipe } from '@/recipes/input.recipe'
 *
 * const classes = inputRecipe({ size: 'md' })
 *
 * <div>
 *   <label className={classes.label} htmlFor="name">Name</label>
 *   <input id="name" type="text" className={classes.input} />
 * </div>
 * ```
 */

import { defineSlotRecipe } from '@pandacss/dev'
import { neoInteractiveBase, neoTextBase } from './shared/base'

export const inputRecipe = defineSlotRecipe({
  className: 'input',
  slots: ['label', 'input'],

  base: {
    label: {
      ...neoTextBase,
      display: 'block',
      fontSize: 'xs',
      color: 'text.primary',
      mb: 'micro2',
      textTransform: 'uppercase',
    },

    input: {
      ...neoInteractiveBase,
      width: '100%',
      px: 'inset.tight',
      py: 'inset.tight',
      bg: 'bg.input',
      color: 'text.primary',
      fontSize: 'sm',

      '&:focus': {
        outline: '2px solid',
        outlineColor: 'border.focus',
        outlineOffset: '0',
      },

      '&[data-disabled]': {
        opacity: 'disabled',
        cursor: 'not-allowed',
      },

      '&::placeholder': {
        color: 'text.tertiary',
        opacity: 'medium',
      },
    },
  },

  variants: {
    size: {
      sm: {
        label: {
          fontSize: '2xs',
          mb: 'micro1',
        },
        input: {
          px: 'micro3',
          py: 'micro2',
          fontSize: 'xs',
        },
      },
      md: {
        label: {
          fontSize: 'xs',
          mb: 'micro2',
        },
        input: {
          px: 'inset.tight',
          py: 'inset.tight',
          fontSize: 'sm',
        },
      },
      lg: {
        label: {
          fontSize: 'sm',
          mb: 'stack.tight',
        },
        input: {
          px: 'inset.normal',
          py: 'inset.normal',
          fontSize: 'md',
        },
      },
    },

    type: {
      text: {},
      number: {
        input: {
          fontFamily: 'mono',
        },
      },
      color: {
        input: {
          height: '12',
          cursor: 'pointer',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
    type: 'text',
  },
})
