// ============================================================================
// POPOVER RECIPE
// ============================================================================

import { sva, type RecipeVariantProps } from 'styled-system/css'

/**
 * Popover recipe - Neo-brutalist popover styling
 *
 * Supports:
 * - Placement: top, bottom, left, right
 * - Arrow indicator
 * - Semantic token usage
 */
export const popoverRecipe = sva({
  slots: ['container', 'content', 'header', 'body', 'arrow'],
  base: {
    container: {
      position: 'relative',
      display: 'inline-flex',
    },
    content: {
      position: 'absolute',
      zIndex: 'popover',
      display: 'flex',
      flexDirection: 'column',
      bg: 'surface.bg',
      borderWidth: 'borderWidth.brutal',
      borderStyle: 'solid',
      borderColor: 'border.default',
      boxShadow: 'elevation.floating',
      minWidth: '12rem',
      maxWidth: '20rem',
      animation: 'scaleIn 150ms ease-out',
    },
    header: {
      px: 'inset.normal',
      py: 'inset.tight',
      borderBottomWidth: 'borderWidth.default',
      borderBottomStyle: 'solid',
      borderBottomColor: 'border.subtle',
      textStyle: 'label.md',
      fontWeight: 'fontWeight.brutal',
      color: 'text.primary',
    },
    body: {
      px: 'inset.normal',
      py: 'inset.tight',
      textStyle: 'body.sm',
      color: 'text.secondary',
    },
    arrow: {
      position: 'absolute',
      width: '0.5rem',
      height: '0.5rem',
      bg: 'surface.bg',
      borderWidth: 'borderWidth.default',
      borderStyle: 'solid',
      borderColor: 'border.default',
      transform: 'rotate(45deg)',
    },
  },

  variants: {
    placement: {
      top: {
        content: {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          mb: 'stack.normal',
        },
        arrow: {
          bottom: '-0.25rem',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          borderTop: 'none',
          borderLeft: 'none',
        },
      },
      bottom: {
        content: {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          mt: 'stack.normal',
        },
        arrow: {
          top: '-0.25rem',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          borderBottom: 'none',
          borderRight: 'none',
        },
      },
      left: {
        content: {
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          mr: 'inline.normal',
        },
        arrow: {
          right: '-0.25rem',
          top: '50%',
          transform: 'translateY(-50%) rotate(45deg)',
          borderLeft: 'none',
          borderBottom: 'none',
        },
      },
      right: {
        content: {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          ml: 'inline.normal',
        },
        arrow: {
          left: '-0.25rem',
          top: '50%',
          transform: 'translateY(-50%) rotate(45deg)',
          borderRight: 'none',
          borderTop: 'none',
        },
      },
    },
  },

  defaultVariants: {
    placement: 'bottom',
  },
})

export type PopoverVariantProps = RecipeVariantProps<typeof popoverRecipe>
