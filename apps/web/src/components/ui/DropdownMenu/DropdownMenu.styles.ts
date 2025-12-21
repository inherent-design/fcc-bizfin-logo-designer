// ============================================================================
// DROPDOWN MENU RECIPE
// ============================================================================

import { sva, type RecipeVariantProps } from 'styled-system/css'

/**
 * DropdownMenu recipe - Neo-brutalist dropdown menu styling
 *
 * Supports:
 * - Placement variants
 * - Item variants (default, danger)
 * - Dividers
 * - Semantic token usage
 */
export const dropdownMenuRecipe = sva({
  slots: ['container', 'menu', 'item', 'itemDanger', 'divider'],
  base: {
    container: {
      position: 'relative',
      display: 'inline-flex',
    },
    menu: {
      position: 'absolute',
      zIndex: 'dropdown',
      display: 'flex',
      flexDirection: 'column',
      bg: 'surface.bg',
      borderWidth: 'borderWidth.brutal',
      borderStyle: 'solid',
      borderColor: 'border.default',
      boxShadow: 'elevation.floating',
      minWidth: '12rem',
      py: 'inset.tight',
      animation: 'slideDown 150ms ease-out',
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      gap: 'inline.normal',
      px: 'inset.normal',
      py: 'inset.tight',
      bg: 'transparent',
      border: 'none',
      textAlign: 'left',
      textStyle: 'body.md',
      color: 'text.primary',
      cursor: 'pointer',
      transitionDuration: 'fast',
      transitionProperty: 'background-color',
      transitionTimingFunction: 'default',

      _hover: {
        bg: 'bg.hover',
      },

      _active: {
        bg: 'bg.active',
      },

      _disabled: {
        color: 'text.disabled',
        cursor: 'not-allowed',
        opacity: 'disabled',
      },
    },
    itemDanger: {
      color: 'text.error',

      _hover: {
        bg: 'bg.danger',
      },
    },
    divider: {
      height: '1px',
      bg: 'border.subtle',
      my: 'inset.tight',
    },
  },

  variants: {
    placement: {
      'bottom-start': {
        menu: {
          top: '100%',
          left: 0,
          mt: 'stack.tight',
        },
      },
      'bottom-end': {
        menu: {
          top: '100%',
          right: 0,
          mt: 'stack.tight',
        },
      },
      'top-start': {
        menu: {
          bottom: '100%',
          left: 0,
          mb: 'stack.tight',
        },
      },
      'top-end': {
        menu: {
          bottom: '100%',
          right: 0,
          mb: 'stack.tight',
        },
      },
    },
  },

  defaultVariants: {
    placement: 'bottom-start',
  },
})

export type DropdownMenuVariantProps = RecipeVariantProps<typeof dropdownMenuRecipe>
