/**
 * Shared Recipe Base Patterns
 *
 * Purpose: Common styling patterns used across multiple recipes
 * Layer: 5 (Recipes - shared patterns)
 * References: Layer 3 (semantic tokens) only
 *
 * Usage:
 * ```tsx
 * import { neoInteractiveBase, neoTextBase } from '@/recipes/shared/base'
 *
 * export const myRecipe = cva({
 *   base: {
 *     ...neoInteractiveBase,
 *     ...neoTextBase,
 *     // Component-specific overrides
 *   }
 * })
 * ```
 */

/**
 * Neo-brutalist interactive element base
 *
 * Common pattern for buttons, inputs, tabs, badges
 * - Thick borders (brutal)
 * - No border radius
 * - Fast transitions
 * - Solid border style
 */
export const neoInteractiveBase = {
  borderWidth: 'brutal' as const,
  borderStyle: 'solid' as const,
  borderColor: 'border.default' as const,
  borderRadius: 'none' as const,
  transitionDuration: 'fast' as const,
  transitionProperty: 'all' as const,
}

/**
 * Neo-brutalist text base
 *
 * Common pattern for interactive text elements
 * - Brutalist font family
 * - Brutalist label text style
 */
export const neoTextBase = {
  textStyle: 'brutalistLabel' as const,
  fontFamily: 'brutalist' as const,
}

/**
 * Interactive state patterns
 *
 * Common hover/active/disabled states
 */
export const interactiveStates = {
  '&:hover:not([data-disabled])': {
    bg: 'bg.hover',
  },
  '&:active:not([data-disabled])': {
    bg: 'bg.active',
  },
  '&[data-disabled]': {
    opacity: 'disabled',
    cursor: 'not-allowed',
  },
}

/**
 * Focus state pattern
 *
 * Common focus-visible outline styling
 */
export const focusState = {
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'border.focus',
    outlineOffset: '2px',
  },
}
