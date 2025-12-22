/**
 * Slider Recipe (sva - multi-slot)
 *
 * Purpose: Reusable range slider styling with coordinated slots
 * Layer: 5 (Recipes)
 * References: Layer 3 (semantic tokens) only
 *
 * Slots:
 * - container: Outer wrapper
 * - label: Slider label
 * - wrapper: Track + value display wrapper
 * - track: Range input (native)
 * - value: Value display text
 *
 * @example
 * ```tsx
 * import { sliderRecipe } from '@/recipes/slider.recipe'
 *
 * const classes = sliderRecipe()
 *
 * <div className={classes.container}>
 *   <label className={classes.label}>Scale</label>
 *   <div className={classes.wrapper}>
 *     <input type="range" min="0" max="100" className={classes.track} />
 *     <span className={classes.value}>50</span>
 *   </div>
 * </div>
 * ```
 */

import { sva } from 'styled-system/css'

export const sliderRecipe = sva({
  slots: ['container', 'label', 'wrapper', 'track', 'value'],

  base: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'stack.tight',
    },

    label: {
      display: 'block',
      textStyle: 'brutalistLabel',
      fontSize: 'xs',
      color: 'text.primary',
      textTransform: 'uppercase',
    },

    wrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: 'inline.tight',
    },

    track: {
      flex: 1,
      appearance: 'none',
      height: '8px',
      borderWidth: 'borders.borderWidth.brutal',
      borderStyle: 'solid',
      borderColor: 'border.default',
      borderRadius: 'none',
      bg: 'bg.input',
      outline: 'none',
      cursor: 'pointer',
      transitionDuration: 'animations.transition.fast.duration',
      transitionProperty: 'all',

      '&::-webkit-slider-thumb': {
        appearance: 'none',
        width: '20px',
        height: '20px',
        borderWidth: 'borders.borderWidth.brutal',
        borderStyle: 'solid',
        borderColor: 'border.default',
        borderRadius: 'none',
        bg: 'bg.interactive.primary',
        cursor: 'pointer',
        transitionDuration: 'animations.transition.fast.duration',
        transitionProperty: 'all',

        '&:hover': {
          bg: 'bg.interactive.primaryHover',
          boxShadow: 'interaction.hover',
        },

        '&:active': {
          boxShadow: 'interaction.pressed',
        },
      },

      '&::-moz-range-thumb': {
        width: '20px',
        height: '20px',
        borderWidth: 'borders.borderWidth.brutal',
        borderStyle: 'solid',
        borderColor: 'border.default',
        borderRadius: 'none',
        bg: 'bg.interactive.primary',
        cursor: 'pointer',
        transitionDuration: 'animations.transition.fast.duration',
        transitionProperty: 'all',

        '&:hover': {
          bg: 'bg.interactive.primaryHover',
          boxShadow: 'interaction.hover',
        },

        '&:active': {
          boxShadow: 'interaction.pressed',
        },
      },

      '&[data-disabled]': {
        opacity: 'disabled',
        cursor: 'not-allowed',

        '&::-webkit-slider-thumb': {
          cursor: 'not-allowed',
        },

        '&::-moz-range-thumb': {
          cursor: 'not-allowed',
        },
      },
    },

    value: {
      textStyle: 'brutalistText',
      fontSize: 'sm',
      color: 'text.secondary',
      minW: '40px',
      textAlign: 'right',
      fontFamily: 'mono',
    },
  },

  variants: {
    size: {
      sm: {
        label: {
          fontSize: '2xs',
        },
        track: {
          height: '6px',
        },
        value: {
          fontSize: 'xs',
          minW: '32px',
        },
      },
      md: {
        label: {
          fontSize: 'xs',
        },
        track: {
          height: '8px',
        },
        value: {
          fontSize: 'sm',
          minW: '40px',
        },
      },
      lg: {
        label: {
          fontSize: 'sm',
        },
        track: {
          height: '10px',
        },
        value: {
          fontSize: 'md',
          minW: '48px',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

/**
 * TypeScript types for slider recipe variants
 */
export type SliderRecipeVariants = Parameters<typeof sliderRecipe>[0]
