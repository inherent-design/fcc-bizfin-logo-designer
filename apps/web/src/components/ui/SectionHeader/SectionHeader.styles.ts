// ============================================================================
// SECTION HEADER RECIPE
// ============================================================================

import { cva, type RecipeVariantProps } from 'styled-system/css'

/**
 * SectionHeader recipe - Neo-brutalist section header styling
 *
 * Supports variants:
 * - border: true/false - Show/hide bottom border
 * - colorScheme: default, primary, secondary, muted - Semantic color variants
 */
export const sectionHeaderRecipe = cva({
  base: {
    textStyle: 'sectionHeader',
    pb: 'stack.tight',
  },

  variants: {
    border: {
      true: {
        borderBottomWidth: 'brutal',
        borderBottomStyle: 'solid',
        borderColor: 'border',
      },
      false: {},
    },

    colorScheme: {
      default: {
        color: 'text.caption',
      },
      primary: {
        color: 'accent.primary',
      },
      secondary: {
        color: 'accent.secondary',
      },
      muted: {
        color: 'text.muted',
      },
    },
  },

  defaultVariants: {
    border: true,
    colorScheme: 'default',
  },
})

export type SectionHeaderVariantProps = RecipeVariantProps<typeof sectionHeaderRecipe>
