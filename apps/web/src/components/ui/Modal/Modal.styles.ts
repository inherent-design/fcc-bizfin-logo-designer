// ============================================================================
// MODAL RECIPE
// ============================================================================

import { sva, type RecipeVariantProps } from 'styled-system/css'

/**
 * Modal recipe - Neo-brutalist modal styling
 *
 * Supports:
 * - Size variants: sm, md, lg, full
 * - Overlay backdrop
 * - Semantic token usage
 */
export const modalRecipe = sva({
  slots: ['overlay', 'content', 'header', 'title', 'body', 'footer'],
  base: {
    overlay: {
      position: 'fixed',
      inset: 0,
      zIndex: 'modal',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bg: 'overlay.heavy',
      animation: 'fadeIn 200ms ease-out',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      bg: 'surface.bg',
      borderWidth: 'borderWidth.brutal',
      borderStyle: 'solid',
      borderColor: 'border.default',
      boxShadow: 'elevation.floating',
      maxHeight: '90vh',
      animation: 'scaleIn 200ms ease-out',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'inline.normal',
      px: 'inset.loose',
      py: 'inset.normal',
      borderBottomWidth: 'borderWidth.default',
      borderBottomStyle: 'solid',
      borderBottomColor: 'border.subtle',
    },
    title: {
      textStyle: 'heading.md',
      color: 'text.primary',
      flex: 1,
    },
    body: {
      flex: 1,
      px: 'inset.loose',
      py: 'inset.normal',
      color: 'text.secondary',
      overflowY: 'auto',
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 'inline.normal',
      px: 'inset.loose',
      py: 'inset.normal',
      borderTopWidth: 'borderWidth.default',
      borderTopStyle: 'solid',
      borderTopColor: 'border.subtle',
    },
  },

  variants: {
    size: {
      sm: {
        content: {
          width: '20rem',
        },
      },
      md: {
        content: {
          width: '32rem',
        },
      },
      lg: {
        content: {
          width: '48rem',
        },
      },
      full: {
        content: {
          width: '90vw',
          height: '90vh',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

export type ModalVariantProps = RecipeVariantProps<typeof modalRecipe>
