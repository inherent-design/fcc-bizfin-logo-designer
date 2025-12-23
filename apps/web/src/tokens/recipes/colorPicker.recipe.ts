/**
 * Color Picker Recipe (sva - multi-slot)
 *
 * Purpose: Reusable color picker styling with coordinated slots
 * Layer: 5 (Recipes)
 * References: Layer 3 (semantic tokens) only
 *
 * Slots:
 * - container: Outer wrapper
 * - label: Color picker label
 * - trigger: Mobile color preview button
 * - modalOverlay: Mobile modal backdrop
 * - modalContent: Mobile modal container
 * - pickerWrapper: Visual picker border/background
 * - inputsColumn: Inputs container
 * - sectionContainer: Input section wrapper
 * - inputGrid: Grid layout for HSL/RGB inputs
 *
 * @example
 * ```tsx
 * import { colorPickerRecipe } from '@/recipes/colorPicker.recipe'
 *
 * const classes = colorPickerRecipe()
 *
 * <div className={classes.container}>
 *   <label className={classes.label}>Base Color</label>
 *   <button className={classes.trigger}>...</button>
 * </div>
 * ```
 */

import { defineSlotRecipe } from '@pandacss/dev'
import { neoInteractiveBase, neoTextBase } from './shared/base'

export const colorPickerRecipe = defineSlotRecipe({
  className: 'colorPicker',
  slots: [
    'container',
    'label',
    'trigger',
    'modalOverlay',
    'modalContent',
    'desktopContainer',
    'gridLayout',
    'pickerColumn',
    'pickerWrapper',
    'inputsColumn',
    'sectionContainer',
    'inputGrid',
    'fullWidthInput',
    'monoInput',
    'upperMonoInput',
    'doneButton',
  ],

  base: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'stack.tight',
    },

    label: {
      ...neoTextBase,
      fontSize: 'sm',
      fontWeight: 'bold',
      color: 'text.primary',
      display: 'block',
      textTransform: 'uppercase',
      letterSpacing: 'wider',
    },

    trigger: {
      ...neoInteractiveBase,
      display: 'block',
      width: '100%',
      minHeight: 'sizes.touch.min',
      boxShadow: 'elevation.raised',
      cursor: 'pointer',

      '@media screen and (min-width: 48rem)': {
        display: 'none',
      },

      '&:hover': {
        transform: 'translate(2px, 2px)',
        boxShadow: 'interaction.hover',
      },

      '&:active': {
        transform: 'translate(4px, 4px)',
        boxShadow: 'none',
      },
    },

    modalOverlay: {
      display: 'flex',
      position: 'fixed',
      inset: 0,
      zIndex: 'modal',
      alignItems: 'center',
      justifyContent: 'center',
      bg: 'bg.overlay',

      '@media screen and (min-width: 48rem)': {
        display: 'none',
      },
    },

    modalContent: {
      ...neoInteractiveBase,
      bg: 'bg.elevated',
      boxShadow: 'elevation.modal',
      p: 'inset.spacious',
      m: 'inset.normal',
      maxWidth: 'sizes.dialog.default',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
    },

    desktopContainer: {
      display: 'none',

      '@media screen and (min-width: 48rem)': {
        display: 'block',
      },
    },

    gridLayout: {
      display: 'grid',
      gridTemplateColumns: { base: '1fr', md: '1fr 1fr' },
      gap: 'stack.spacious',
      maxWidth: '100%',
    },

    pickerColumn: {
      display: 'flex',
      alignItems: 'start',
      position: 'relative',
      minWidth: 0,
    },

    pickerWrapper: {
      ...neoInteractiveBase,
      width: '100%',
      maxWidth: '300px',
      boxShadow: 'elevation.inset',
      p: 'inset.tight',
      bg: 'bg.subtle',
    },

    inputsColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'stack.normal',
      minWidth: 0,
    },

    sectionContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'stack.tight',
    },

    inputGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'inline.tight',
    },

    fullWidthInput: {
      width: '100%',
    },

    monoInput: {
      width: '100%',
      fontFamily: 'mono',
    },

    upperMonoInput: {
      width: '100%',
      fontFamily: 'mono',
      textTransform: 'uppercase',
    },

    doneButton: {
      mt: 'stack.normal',
      width: '100%',
    },
  },
})
