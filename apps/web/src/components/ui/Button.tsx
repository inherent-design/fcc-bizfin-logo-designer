// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import type { ComponentProps } from 'react'

// Panda CSS
import { cx } from 'styled-system/css'
import { neoButton, type NeoButtonVariantProps } from 'styled-system/recipes'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Button component props
 */
interface ButtonProps extends ComponentProps<'button'>, NeoButtonVariantProps {}

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
  const [variantProps, restProps] = neoButton.splitVariantProps(props)
  const { className, ...htmlProps } = restProps

  return <button className={cx(neoButton(variantProps), className)} {...htmlProps} />
}
