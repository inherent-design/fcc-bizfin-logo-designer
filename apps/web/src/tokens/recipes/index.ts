/**
 * Recipes Index
 */

export { badgeRecipe } from './badge.recipe'
export { buttonRecipe } from './button.recipe'
export { colorPickerRecipe } from './colorPicker.recipe'
export { dragHandleRecipe } from './dragHandle.recipe'
export { inputRecipe } from './input.recipe'
export { sectionHeaderRecipe } from './sectionHeader.recipe'
export { sliderControlRecipe } from './sliderControl.recipe'
export { tabsRecipe } from './tabs.recipe'

import { badgeRecipe } from './badge.recipe'
import { buttonRecipe } from './button.recipe'
import { colorPickerRecipe } from './colorPicker.recipe'
import { dragHandleRecipe } from './dragHandle.recipe'
import { inputRecipe } from './input.recipe'
import { sectionHeaderRecipe } from './sectionHeader.recipe'
import { sliderControlRecipe } from './sliderControl.recipe'
import { tabsRecipe } from './tabs.recipe'

export const recipes = {
  baseRecipes: {
    badgeRecipe,
    buttonRecipe,
    dragHandleRecipe,
    inputRecipe,
  },
  slotRecipes: {
    colorPickerRecipe,
    sectionHeaderRecipe,
    sliderControlRecipe,
    tabsRecipe,
  },
} as const
