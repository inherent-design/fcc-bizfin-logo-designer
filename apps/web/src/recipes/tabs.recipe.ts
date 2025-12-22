/**
 * Tabs Recipe (sva - multi-slot)
 *
 * Purpose: Reusable tabs styling with coordinated slots
 * Layer: 5 (Recipes)
 * References: Layer 3 (semantic tokens) only
 *
 * Slots:
 * - root: Tabs container
 * - list: Tabs tab list
 * - trigger: Individual tab (Base UI uses Tabs.Tab)
 * - panel: Tab content panel
 *
 * @example
 * ```tsx
 * import { Tabs } from '@base-ui/react/tabs'
 * import { tabsRecipe } from '@/recipes/tabs.recipe'
 *
 * const classes = tabsRecipe()
 *
 * <Tabs.Root className={classes.root}>
 *   <Tabs.List className={classes.list}>
 *     <Tabs.Tab value="color" className={classes.trigger}>Color</Tabs.Tab>
 *     <Tabs.Tab value="layout" className={classes.trigger}>Layout</Tabs.Tab>
 *   </Tabs.List>
 *   <Tabs.Panel value="color" className={classes.panel}>...</Tabs.Panel>
 * </Tabs.Root>
 * ```
 */

import { sva } from 'styled-system/css'

export const tabsRecipe = sva({
  slots: ['root', 'list', 'trigger', 'panel'],

  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'stack.normal',
    },

    list: {
      display: 'flex',
      gap: 'inline.close',
      borderBottomWidth: 'brutal',
      borderBottomStyle: 'solid',
      borderBottomColor: 'border.default',
      position: 'relative',
    },

    trigger: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'inline.tight',
      px: 'inset.normal',
      py: 'inset.tight',
      borderWidth: 'borders.borderWidth.brutal',
      borderStyle: 'solid',
      borderColor: 'border.default',
      borderBottomWidth: 0,
      borderRadius: 'none',
      bg: 'bg.interactive.default',
      color: 'text.primary',
      cursor: 'pointer',
      textStyle: 'brutalistLabel',
      fontSize: 'sm',
      transitionDuration: 'animations.transition.fast.duration',
      transitionProperty: 'all',
      marginBottom: '-3px', // Overlap with list border (brutal = 3px)

      '&:hover:not([data-selected])': {
        bg: 'bg.hover',
      },

      '&[data-selected]': {
        bg: 'bg.elevated',
        borderBottomWidth: 'brutal',
        borderBottomColor: 'bg.elevated',
        zIndex: 1,
      },

      '&:focus-visible': {
        outline: '2px solid',
        outlineColor: 'border.focus',
        outlineOffset: '-2px',
        zIndex: 2,
      },

      '&[data-disabled]': {
        opacity: 'disabled',
        cursor: 'not-allowed',
      },
    },

    panel: {
      p: 0, // Let parent handle padding
      outline: 'none',
    },
  },

  variants: {
    orientation: {
      horizontal: {
        root: {
          flexDirection: 'column',
        },
        list: {
          flexDirection: 'row',
          borderBottomWidth: 'brutal',
          borderBottomStyle: 'solid',
          borderBottomColor: 'border.default',
        },
        trigger: {
          borderBottomWidth: 0,
          marginBottom: '-3px',
        },
      },
      vertical: {
        root: {
          flexDirection: 'row',
        },
        list: {
          flexDirection: 'column',
          borderBottomWidth: 0,
          borderRightWidth: 'brutal',
          borderRightStyle: 'solid',
          borderRightColor: 'border.default',
        },
        trigger: {
          borderBottomWidth: 'brutal',
          borderRightWidth: 0,
          marginBottom: 0,
          marginRight: '-3px',

          '&[data-selected]': {
            borderRightWidth: 'brutal',
            borderRightColor: 'bg.elevated',
          },
        },
      },
    },
  },

  defaultVariants: {
    orientation: 'horizontal',
  },
})

/**
 * TypeScript types for tabs recipe variants
 */
export type TabsRecipeVariants = Parameters<typeof tabsRecipe>[0]
