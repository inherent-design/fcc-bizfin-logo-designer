// ============================================================================
// INPUT RECIPE
// ============================================================================

import { cva, type RecipeVariantProps } from 'styled-system/css'

/**
 * Input recipe - Neo-brutalist input styling
 *
 * Supports focus, disabled, and placeholder states
 */
export const inputRecipe = cva({
  base: {
    bg: 'input.bg',
    borderWidth: 'brutal',
    borderStyle: 'solid',
    borderColor: 'input.border',
    color: 'input.text',
    px: 'inset.tight',
    py: 'inset.tight',
    fontFamily: 'brutalist',
    fontWeight: 'bold',
    transitionProperty: 'all',
    transitionDuration: 'fast',
    transitionTimingFunction: 'DEFAULT',

    _placeholder: {
      color: 'input.textPlaceholder',
    },

    _focus: {
      outline: '3px solid',
      outlineColor: 'input.borderFocus',
      outlineOffset: '2px',
    },

    _disabled: {
      bg: 'input.bgDisabled',
      color: 'input.textDisabled',
      cursor: 'not-allowed',
    },
  },
})

export type InputVariantProps = RecipeVariantProps<typeof inputRecipe>
