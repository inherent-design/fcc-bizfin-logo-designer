// ============================================================================
// COMBOBOX RECIPE
// ============================================================================

import { sva, type RecipeVariantProps } from 'styled-system/css'

/**
 * Combobox recipe - Neo-brutalist combobox styling
 *
 * Supports:
 * - Size variants: sm, md, lg
 * - Searchable dropdown
 * - Selected option highlighting
 * - Empty state
 * - Semantic token usage
 */
export const comboboxRecipe = sva({
  slots: ['container', 'inputWrapper', 'input', 'icons', 'clear', 'chevron', 'chevronOpen', 'menu', 'option', 'optionSelected', 'empty'],
  base: {
    container: {
      position: 'relative',
      display: 'inline-flex',
      width: '100%',
    },
    inputWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      flex: 1,
      px: 'inset.normal',
      py: 'inset.tight',
      pr: 'calc({spacing.inset.normal} + 3rem)',
      bg: 'input.bg',
      borderWidth: 'borderWidth.brutal',
      borderStyle: 'solid',
      borderColor: 'input.border',
      textStyle: 'body.md',
      color: 'input.text',
      transitionDuration: 'fast',
      transitionProperty: 'border-color, background-color',
      transitionTimingFunction: 'default',

      _placeholder: {
        color: 'input.textPlaceholder',
      },

      _hover: {
        bg: 'input.bgHover',
        borderColor: 'input.borderHover',
      },

      _focus: {
        bg: 'input.bgFocus',
        borderColor: 'input.borderFocus',
        outline: '2px solid',
        outlineColor: 'focus.ring',
        outlineOffset: '2px',
      },

      _disabled: {
        bg: 'input.bgDisabled',
        color: 'input.textDisabled',
        cursor: 'not-allowed',
        opacity: 'disabled',
      },
    },
    icons: {
      position: 'absolute',
      right: 'inset.tight',
      display: 'flex',
      alignItems: 'center',
      gap: 'inline.tight',
      pointerEvents: 'none',
    },
    clear: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bg: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: 'icon.secondary',
      pointerEvents: 'auto',
      p: '2px',

      _hover: {
        color: 'icon.default',
      },
    },
    chevron: {
      flexShrink: 0,
      color: 'icon.default',
      transitionDuration: 'fast',
      transitionProperty: 'transform',
      transitionTimingFunction: 'default',
    },
    chevronOpen: {
      transform: 'rotate(180deg)',
    },
    menu: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      mt: 'stack.tight',
      zIndex: 'dropdown',
      display: 'flex',
      flexDirection: 'column',
      bg: 'surface.bg',
      borderWidth: 'borderWidth.brutal',
      borderStyle: 'solid',
      borderColor: 'border.default',
      boxShadow: 'elevation.floating',
      maxHeight: '16rem',
      overflowY: 'auto',
      animation: 'slideDown 150ms ease-out',
    },
    option: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
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

      _disabled: {
        color: 'text.disabled',
        cursor: 'not-allowed',
        opacity: 'disabled',
      },
    },
    optionSelected: {
      bg: 'bg.selected',
      fontWeight: 'fontWeight.brutal',
    },
    empty: {
      px: 'inset.normal',
      py: 'inset.normal',
      textAlign: 'center',
      textStyle: 'body.sm',
      color: 'text.secondary',
    },
  },

  variants: {
    size: {
      sm: {
        input: {
          fontSize: 'fontSize.sm',
        },
        option: {
          fontSize: 'fontSize.sm',
        },
      },
      md: {
        input: {
          fontSize: 'fontSize.md',
        },
        option: {
          fontSize: 'fontSize.md',
        },
      },
      lg: {
        input: {
          fontSize: 'fontSize.lg',
        },
        option: {
          fontSize: 'fontSize.lg',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

export type ComboboxVariantProps = RecipeVariantProps<typeof comboboxRecipe>
