// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import type { ComponentProps } from 'react'

// Panda CSS
import { cx } from 'styled-system/css'
import { neoInput, type NeoInputVariantProps } from 'styled-system/recipes'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Input component props
 */
interface InputProps extends ComponentProps<'input'>, NeoInputVariantProps {}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Input - Neo-brutalist styled input component
 *
 * Features:
 * - Uses neoInput recipe for variant styling
 * - Supports all native input props
 * - Merges custom className with recipe styles
 *
 * @example
 * ```tsx
 * <Input type="text" placeholder="Enter text" />
 * ```
 */
export function Input(props: InputProps) {
  const [variantProps, restProps] = neoInput.splitVariantProps(props)
  const { className, ...htmlProps } = restProps

  return <input className={cx(neoInput(variantProps), className)} {...htmlProps} />
}
