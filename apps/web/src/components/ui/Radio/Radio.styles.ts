// ============================================================================
// RADIO RECIPE
// ============================================================================

import { sva, type RecipeVariantProps } from 'styled-system/css'

/**
 * Radio recipe - Neo-brutalist radio button styling
 *
 * Supports:
 * - Size variants: sm, md, lg
 * - Checked and unchecked states
 * - Focus and disabled states
 * - Semantic token usage
 */
export const radioRecipe = sva({
  slots: ['container', 'wrapper', 'input', 'circle', 'dot', 'label', 'helper'],
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
          borderColor: 'border.focus',
          outline: '2px solid',
          outlineColor: 'focus.ring',
          outlineOffset: '2px',
        },
      },

      _checked: {
        '& + div > div': {
          opacity: 1,
          transform: 'scale(1)',
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
    circle: {
      position: 'relative',
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      bg: 'bg.transparent',
      borderWidth: 'borderWidth.brutal',
      borderStyle: 'solid',
      borderColor: 'border.default',
      borderRadius: '9999px',
      transitionDuration: 'fast',
      transitionProperty: 'border-color',
      transitionTimingFunction: 'default',

      _hover: {
        borderColor: 'border.focus',
      },
    },
    dot: {
      bg: 'bg.primary',
      borderRadius: '9999px',
      opacity: 0,
      transform: 'scale(0)',
      transitionDuration: 'fast',
      transitionProperty: 'opacity, transform',
      transitionTimingFunction: 'default',
    },
    label: {
      textStyle: 'formLabel',
      color: 'text.primary',
    },
    helper: {
      textStyle: 'body.sm',
      color: 'text.helper',
      pl: 'calc(var(--radio-size) + {spacing.inline.normal})',
    },
  },

  variants: {
    size: {
      sm: {
        circle: {
          width: 'size.icon.sm',
          height: 'size.icon.sm',
        },
        dot: {
          width: '50%',
          height: '50%',
        },
        label: {
          fontSize: 'fontSize.sm',
        },
        container: {
          '--radio-size': 'token(sizes.icon.sm)',
        },
      },
      md: {
        circle: {
          width: 'size.icon.md',
          height: 'size.icon.md',
        },
        dot: {
          width: '50%',
          height: '50%',
        },
        label: {
          fontSize: 'fontSize.md',
        },
        container: {
          '--radio-size': 'token(sizes.icon.md)',
        },
      },
      lg: {
        circle: {
          width: 'size.icon.lg',
          height: 'size.icon.lg',
        },
        dot: {
          width: '50%',
          height: '50%',
        },
        label: {
          fontSize: 'fontSize.lg',
        },
        container: {
          '--radio-size': 'token(sizes.icon.lg)',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

export type RadioVariantProps = RecipeVariantProps<typeof radioRecipe>
