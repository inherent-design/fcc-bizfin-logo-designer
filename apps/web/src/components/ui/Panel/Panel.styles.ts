// ============================================================================
// PANEL RECIPE
// ============================================================================

import { cva, type RecipeVariantProps } from 'styled-system/css'

/**
 * Panel recipe - Neo-brutalist panel container styling
 *
 * Provides consistent panel styling across the application
 */
export const panelRecipe = cva({
  base: {
    bg: 'surface.bg',
    borderWidth: 'brutal',
    borderStyle: 'solid',
    borderColor: 'border',
    boxShadow: 'brutalLg',
    p: 'inset.normal',
  },
})

export type PanelVariantProps = RecipeVariantProps<typeof panelRecipe>
