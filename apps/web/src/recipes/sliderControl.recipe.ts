/**
 * Slider Control Recipe (sva - multi-slot)
 *
 * Purpose: Reusable slider control with label, value display, and actions
 * Layer: 5 (Recipes)
 * References: Layer 3 (semantic tokens) only
 *
 * Slots:
 * - container: Outer wrapper
 * - header: Header row (label + value + actions)
 * - label: Slider label text
 * - valueContainer: Value display + reset button wrapper
 * - value: Numeric value display
 * - slider: Range input element
 *
 * Usage:
 * ```tsx
 * import { sliderControlRecipe } from '@/recipes/sliderControl.recipe'
 *
 * const classes = sliderControlRecipe()
 *
 * <div className={classes.container}>
 *   <div className={classes.header}>
 *     <label className={classes.label}>Scale</label>
 *     <div className={classes.valueContainer}>
 *       <span className={classes.value}>1.0</span>
 *       <button>Reset</button>
 *     </div>
 *   </div>
 *   <input type="range" className={classes.slider} />
 * </div>
 * ```
 */

import { sva } from 'styled-system/css'

export const sliderControlRecipe = sva({
  slots: ['container', 'header', 'label', 'valueContainer', 'value', 'slider'],

  base: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'stack.tight',
    },

    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    label: {
      fontSize: 'sm',
      fontFamily: 'brutalist',
      color: 'text.primary',
      opacity: 'medium',
    },

    valueContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: 'inline.tight',
    },

    value: {
      fontSize: 'xs',
      fontFamily: 'mono',
      color: 'text.primary',
      opacity: 'muted',
      minWidth: '12', // Prevent layout shift
      textAlign: 'right',
    },

    slider: {
      width: '100%',
      cursor: 'pointer',

      // Remove default styles (cross-browser)
      appearance: 'none',
      WebkitAppearance: 'none',
      bg: 'transparent',

      // Track styling
      '&::-webkit-slider-runnable-track': {
        width: '100%',
        height: '8px',
        bg: 'bg.subtle',
        borderWidth: 'borders.borderWidth.brutal',
        borderStyle: 'solid',
        borderColor: 'border.default',
        borderRadius: 'none',
      },
      '&::-moz-range-track': {
        width: '100%',
        height: '8px',
        bg: 'bg.subtle',
        borderWidth: 'borders.borderWidth.brutal',
        borderStyle: 'solid',
        borderColor: 'border.default',
        borderRadius: 'none',
      },

      // Thumb styling
      '&::-webkit-slider-thumb': {
        WebkitAppearance: 'none',
        appearance: 'none',
        width: '20px',
        height: '20px',
        bg: 'bg.interactive.default',
        borderWidth: 'borders.borderWidth.brutal',
        borderStyle: 'solid',
        borderColor: 'border.default',
        borderRadius: 'none',
        cursor: 'pointer',
        marginTop: '-7px', // Center on track
      },
      '&::-moz-range-thumb': {
        width: '20px',
        height: '20px',
        bg: 'bg.interactive.default',
        borderWidth: 'borders.borderWidth.brutal',
        borderStyle: 'solid',
        borderColor: 'border.default',
        borderRadius: 'none',
        cursor: 'pointer',
      },

      // Focus state
      '&:focus-visible': {
        outline: '2px solid',
        outlineColor: 'border.focus',
        outlineOffset: '2px',
      },

      // Hover state (thumb)
      '&:hover::-webkit-slider-thumb': {
        bg: 'bg.hover',
      },
      '&:hover::-moz-range-thumb': {
        bg: 'bg.hover',
      },
    },
  },

  variants: {
    size: {
      sm: {
        container: {
          gap: 'micro3',
        },
        label: {
          fontSize: 'xs',
        },
        value: {
          fontSize: '2xs',
        },
      },
      md: {
        container: {
          gap: 'stack.tight',
        },
        label: {
          fontSize: 'sm',
        },
        value: {
          fontSize: 'xs',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

/**
 * TypeScript types for slider control recipe variants
 */
export type SliderControlRecipeVariants = Parameters<typeof sliderControlRecipe>[0]
