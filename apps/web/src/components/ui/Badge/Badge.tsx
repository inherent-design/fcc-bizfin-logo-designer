// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import type { ComponentProps } from 'react'

// Panda CSS
import { cx } from 'styled-system/css'

// Component styles
import { badgeRecipe, type BadgeVariantProps } from './Badge.styles'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Badge component props
 */
type BadgeProps = ComponentProps<'div'> & BadgeVariantProps

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Badge - Neo-brutalist badge component
 *
 * Features:
 * - Variants: filled, unfilled, outline
 * - Sizes: sm, md, lg
 * - Uses semantic tokens for all styling
 * - Supports all native div props
 *
 * @example
 * ```tsx
 * <Badge variant="filled">New</Badge>
 * <Badge variant="unfilled">Draft</Badge>
 * <Badge variant="outline" size="sm">Beta</Badge>
 * ```
 */
export function Badge(props: BadgeProps) {
  const [variantProps, restProps] = badgeRecipe.splitVariantProps(props)
  const { className, ...htmlProps } = restProps

  return <div className={cx(badgeRecipe(variantProps), className)} {...htmlProps} />
}
