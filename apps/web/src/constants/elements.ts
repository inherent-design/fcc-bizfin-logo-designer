/**
 * Element Registry
 * Hard-coded element definitions - IDs must remain stable across schema versions
 */

export interface ElementDefinition {
  id: string
  label: string
}

/**
 * Available elements for logo quadrants
 * IDs correspond to keys in ELEMENT_SVGS in src/assets/svg/index.ts
 */
export const AVAILABLE_ELEMENTS: readonly ElementDefinition[] = [
  { id: 'briefcase', label: 'Briefcase' },
  { id: 'mountains', label: 'Sierra Nevada' },
  { id: 'dollar', label: 'Dollar Sign' },
  { id: 'leaf', label: 'Grape Leaf' },
] as const

/**
 * Valid element IDs (for validation)
 */
export const ELEMENT_IDS = ['briefcase', 'mountains', 'dollar', 'leaf'] as const
export type ElementId = (typeof ELEMENT_IDS)[number]
