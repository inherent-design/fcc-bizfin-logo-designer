// ============================================================================
// CARD RECIPE
// ============================================================================

import { cva, type RecipeVariantProps } from 'styled-system/css'

/**
 * Card recipe - Neo-brutalist card container styling
 *
 * Provides consistent card styling across the application
 */
export const cardRecipe = cva({
  base: {
    bg: 'surface.bg',
    borderWidth: 'brutal',
    borderStyle: 'solid',
    borderColor: 'border',
    boxShadow: 'elevation.floating',
    p: 'inset.normal',
  },
})

export type CardVariantProps = RecipeVariantProps<typeof cardRecipe>
