// ============================================================================
// SLIDER RECIPE
// ============================================================================

import { sva, type RecipeVariantProps } from 'styled-system/css'

/**
 * Slider recipe - Neo-brutalist slider styling with sva (slot variants)
 *
 * Slots:
 * - container: Outer wrapper
 * - header: Label and value display container
 * - label: Label text
 * - value: Current value display
 * - input: Range input with cross-browser thumb styling
 */
export const sliderRecipe = sva({
  slots: ['container', 'header', 'label', 'value', 'input'],
  base: {
    container: {
      mb: 'stack.normal',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      mb: 'stack.tight',
    },
    label: {
      textStyle: 'sectionHeader',
      color: 'text',
    },
    value: {
      textStyle: 'brutalistLabel',
      fontSize: 'xs',
      color: 'accent.primary',
    },
    input: {
      width: '100%',
      height: '3xs',
      bg: 'border',
      outline: 'none',
      cursor: 'pointer',

      '&::-webkit-slider-thumb': {
        appearance: 'none',
        width: 'sm',
        height: 'sm',
        bg: 'accent.primary',
        borderWidth: 'base',
        borderStyle: 'solid',
        borderColor: 'border',
        cursor: 'pointer',
      },

      '&::-moz-range-thumb': {
        width: 'sm',
        height: 'sm',
        bg: 'accent.primary',
        borderWidth: 'base',
        borderStyle: 'solid',
        borderColor: 'border',
        cursor: 'pointer',
      },
    },
  },
})

export type SliderVariantProps = RecipeVariantProps<typeof sliderRecipe>
