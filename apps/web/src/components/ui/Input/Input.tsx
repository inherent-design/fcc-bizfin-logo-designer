// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import type { ComponentProps } from 'react'

// Panda CSS
import { cx } from 'styled-system/css'

// Internal imports
import { inputRecipe } from './Input.styles'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Input component props
 */
type InputProps = ComponentProps<'input'>

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Input - Neo-brutalist styled input component
 *
 * Features:
 * - Uses neoInput recipe for styling
 * - Supports all native input props
 * - Merges custom className with recipe styles
 *
 * @example
 * ```tsx
 * <Input type="text" placeholder="Enter text" />
 * ```
 */
export function Input({ className, ...props }: InputProps) {
  return <input className={cx(inputRecipe(), className)} {...props} />
}
