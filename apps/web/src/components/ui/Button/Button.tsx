// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import type { ComponentProps } from 'react'

// Panda CSS
import { cx } from 'styled-system/css'

// Internal imports
import { buttonRecipe, type ButtonVariantProps } from './Button.styles'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Button component props
 */
type ButtonProps = ComponentProps<'button'> & ButtonVariantProps

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Button - Neo-brutalist styled button component
 *
 * Features:
 * - Uses neoButton recipe for variant styling
 * - Supports all native button props
 * - Merges custom className with recipe styles
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">Click me</Button>
 * ```
 */
export function Button(props: ButtonProps) {
  const [variantProps, restProps] = buttonRecipe.splitVariantProps(props)
  const { className, ...htmlProps } = restProps

  return <button className={cx(buttonRecipe(variantProps), className)} {...htmlProps} />
}
