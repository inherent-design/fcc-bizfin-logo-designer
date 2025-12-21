// ============================================================================
// SWITCH RECIPE
// ============================================================================

import { sva, type RecipeVariantProps } from 'styled-system/css'

/**
 * Switch recipe - Neo-brutalist toggle switch styling
 *
 * Supports:
 * - Size variants: sm, md, lg
 * - On and off states
 * - Focus and disabled states
 * - Semantic token usage
 */
export const switchRecipe = sva({
  slots: ['container', 'wrapper', 'input', 'track', 'thumb', 'label', 'helper'],
  base: {
    container: {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: 'stack.tight',
      cursor: 'pointer',
      userSelect: 'none',

      _disabled: {
        cursor: 'not-allowed',
      },
    },
    wrapper: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'inline.normal',
    },
    input: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0,
      pointerEvents: 'none',

      _focusVisible: {
        '& + div': {
          outline: '2px solid',
          outlineColor: 'focus.ring',
          outlineOffset: '2px',
        },
      },

      _checked: {
        '& + div': {
          bg: 'bg.primary',
          borderColor: 'bg.primary',
        },
        '& + div > div': {
          transform: 'translateX(var(--switch-translate))',
        },
      },

      _disabled: {
        '& + div': {
          opacity: 'disabled',
          borderColor: 'border.subtle',
        },
        '& ~ span': {
          color: 'text.disabled',
        },
      },
    },
    track: {
      position: 'relative',
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      bg: 'bg.subtle',
      borderWidth: 'borderWidth.brutal',
      borderStyle: 'solid',
      borderColor: 'border.default',
      borderRadius: '9999px',
      transitionDuration: 'fast',
      transitionProperty: 'background-color, border-color',
      transitionTimingFunction: 'default',
    },
    thumb: {
      bg: 'surface.bg',
      borderRadius: '9999px',
      boxShadow: 'elevation.flat',
      transitionDuration: 'fast',
      transitionProperty: 'transform',
      transitionTimingFunction: 'default',
    },
    label: {
      textStyle: 'formLabel',
      color: 'text.primary',
    },
    helper: {
      textStyle: 'body.sm',
      color: 'text.helper',
      pl: 'calc(var(--switch-width) + {spacing.inline.normal})',
    },
  },

  variants: {
    size: {
      sm: {
        track: {
          width: '2.5rem',
          height: '1.25rem',
          p: '2px',
        },
        thumb: {
          width: '1rem',
          height: '1rem',
        },
        label: {
          fontSize: 'fontSize.sm',
        },
        container: {
          '--switch-width': '2.5rem',
          '--switch-translate': 'calc(2.5rem - 1rem - 4px)',
        },
      },
      md: {
        track: {
          width: '3rem',
          height: '1.5rem',
          p: '2px',
        },
        thumb: {
          width: '1.25rem',
          height: '1.25rem',
        },
        label: {
          fontSize: 'fontSize.md',
        },
        container: {
          '--switch-width': '3rem',
          '--switch-translate': 'calc(3rem - 1.25rem - 4px)',
        },
      },
      lg: {
        track: {
          width: '3.5rem',
          height: '1.75rem',
          p: '2px',
        },
        thumb: {
          width: '1.5rem',
          height: '1.5rem',
        },
        label: {
          fontSize: 'fontSize.lg',
        },
        container: {
          '--switch-width': '3.5rem',
          '--switch-translate': 'calc(3.5rem - 1.5rem - 4px)',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

export type SwitchVariantProps = RecipeVariantProps<typeof switchRecipe>
