// ============================================================================
// ACCORDION RECIPE
// ============================================================================

import { sva, type RecipeVariantProps } from 'styled-system/css'

/**
 * Accordion recipe - Neo-brutalist accordion styling
 *
 * Supports:
 * - Expand/collapse animation
 * - Icon rotation
 * - Semantic token usage
 */
export const accordionRecipe = sva({
  slots: ['container', 'item', 'trigger', 'title', 'icon', 'iconOpen', 'content'],
  base: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    item: {
      borderBottomWidth: 'borderWidth.default',
      borderBottomStyle: 'solid',
      borderBottomColor: 'border.subtle',

      _last: {
        borderBottom: 'none',
      },
    },
    trigger: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      px: 'inset.normal',
      py: 'inset.normal',
      bg: 'bg.transparent',
      border: 'none',
      textAlign: 'left',
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
    },
    title: {
      textStyle: 'brutalistLabel',
      color: 'text.primary',
      flex: 1,
    },
    icon: {
      flexShrink: 0,
      transitionDuration: 'fast',
      transitionProperty: 'transform',
      transitionTimingFunction: 'default',
    },
    iconOpen: {
      transform: 'rotate(180deg)',
    },
    content: {
      px: 'inset.normal',
      py: 'inset.normal',
      color: 'text.secondary',
      animation: 'slideDown 200ms ease-out',
    },
  },

  variants: {},

  defaultVariants: {},
})

export type AccordionVariantProps = RecipeVariantProps<typeof accordionRecipe>
