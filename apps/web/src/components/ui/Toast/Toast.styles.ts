// ============================================================================
// TOAST RECIPE
// ============================================================================

import { sva, type RecipeVariantProps } from 'styled-system/css'

/**
 * Toast recipe - Neo-brutalist toast styling
 *
 * Supports:
 * - Variant: default, success, warning, error, info
 * - Icon, title, description, action
 * - Semantic token usage
 */
export const toastRecipe = sva({
  slots: ['container', 'iconWrapper', 'content', 'title', 'description', 'action', 'close'],
  base: {
    container: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'inline.normal',
      px: 'inset.normal',
      py: 'inset.normal',
      borderWidth: 'borderWidth.brutal',
      borderStyle: 'solid',
      boxShadow: 'elevation.raised',
      minWidth: '20rem',
      maxWidth: '24rem',
      animation: 'slideInRight 250ms ease-out',
    },
    iconWrapper: {
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 'stack.tight',
    },
    title: {
      textStyle: 'label.md',
      fontWeight: 'fontWeight.brutal',
    },
    description: {
      textStyle: 'body.sm',
    },
    action: {
      mt: 'stack.tight',
    },
    close: {
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bg: 'transparent',
      border: 'none',
      cursor: 'pointer',
      p: '0',
      color: 'text.secondary',

      _hover: {
        color: 'text.primary',
      },
    },
  },

  variants: {
    variant: {
      default: {
        container: {
          bg: 'bg.default',
          borderColor: 'border.default',
        },
        title: {
          color: 'text.primary',
        },
        description: {
          color: 'text.secondary',
        },
      },
      success: {
        container: {
          bg: 'accent.success',
          borderColor: 'border.success',
        },
        iconWrapper: {
          color: 'text.success',
        },
        title: {
          color: 'text.primary',
        },
        description: {
          color: 'text.secondary',
        },
      },
      warning: {
        container: {
          bg: 'accent.warning',
          borderColor: 'accent.warning',
        },
        iconWrapper: {
          color: 'text.error',
        },
        title: {
          color: 'text.primary',
        },
        description: {
          color: 'text.secondary',
        },
      },
      error: {
        container: {
          bg: 'accent.error',
          borderColor: 'border.error',
        },
        iconWrapper: {
          color: 'text.error',
        },
        title: {
          color: 'text.primary',
        },
        description: {
          color: 'text.secondary',
        },
      },
      info: {
        container: {
          bg: 'accent.info',
          borderColor: 'border.default',
        },
        iconWrapper: {
          color: 'icon.primary',
        },
        title: {
          color: 'text.primary',
        },
        description: {
          color: 'text.secondary',
        },
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  },
})

export type ToastVariantProps = RecipeVariantProps<typeof toastRecipe>
