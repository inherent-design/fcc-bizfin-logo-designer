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

import { defineSlotRecipe } from '@pandacss/dev'
import { neoInteractiveBase, neoTextBase } from './shared/base'

export const sliderControlRecipe = defineSlotRecipe({
  className: 'sliderControl',
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
      ...neoTextBase,
      fontSize: 'sm',
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
        ...neoInteractiveBase,
        width: '100%',
        height: '8px',
        bg: 'bg.subtle',
      },
      '&::-moz-range-track': {
        ...neoInteractiveBase,
        width: '100%',
        height: '8px',
        bg: 'bg.subtle',
      },

      // Thumb styling
      '&::-webkit-slider-thumb': {
        ...neoInteractiveBase,
        WebkitAppearance: 'none',
        appearance: 'none',
        width: '20px',
        height: '20px',
        bg: 'bg.interactive.default',
        cursor: 'pointer',
        marginTop: '-7px', // Center on track
      },
      '&::-moz-range-thumb': {
        ...neoInteractiveBase,
        width: '20px',
        height: '20px',
        bg: 'bg.interactive.default',
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
