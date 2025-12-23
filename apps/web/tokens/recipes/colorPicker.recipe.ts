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
 * - pickerColumn: Visual picker container
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
      gap: 'stack.tight',
      flexDirection: 'column',
    },

    label: {
      ...neoTextBase,
      display: 'block',
      color: 'text.primary',
      fontSize: 'sm',
      fontWeight: 'bold',
      letterSpacing: 'wider',
      textTransform: 'uppercase',
    },

    trigger: {
      ...neoInteractiveBase,
      cursor: 'pointer',

      display: { base: 'block', md: 'none' },
      width: '100%',
      minHeight: 'sizes.touch.min',
      boxShadow: 'elevation.raised',

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
      display: { base: 'flex', md: 'none' },
      zIndex: 'modal',
      inset: 0,
      position: 'fixed',
      justifyContent: 'center',
      alignItems: 'center',
      bg: 'bg.overlay',
    },

    modalContent: {
      ...neoInteractiveBase,
      width: '100%',
      maxWidth: 'sizes.dialog.default',
      maxHeight: '90vh',
      m: 'inset.normal',
      p: 'inset.spacious',
      bg: 'bg.elevated',
      boxShadow: 'elevation.modal',
      overflowY: 'auto',
    },

    desktopContainer: {
      display: { base: 'none', md: 'block' },
    },

    gridLayout: {
      display: 'grid',
      gap: 'stack.spacious',
      gridTemplateColumns: { base: '1fr', md: '1fr 1fr' },
      maxWidth: '100%',
    },

    pickerColumn: {
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      minWidth: 0,
      p: 'inset.spacious',
    },

    inputsColumn: {
      display: 'flex',
      gap: 'stack.normal',
      flexDirection: 'column',
      minWidth: 0,
    },

    sectionContainer: {
      display: 'flex',
      gap: 'stack.tight',
      flexDirection: 'column',
    },

    inputGrid: {
      display: 'grid',
      gap: 'inline.tight',
      gridTemplateColumns: 'repeat(3, 1fr)',
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
      width: '100%',
      mt: 'stack.normal',
    },
  },
})
