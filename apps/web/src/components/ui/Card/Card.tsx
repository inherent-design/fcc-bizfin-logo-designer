// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import type { ComponentProps } from 'react'

// Panda CSS
import { cx } from 'styled-system/css'
import { cardRecipe } from './Card.styles'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Card component props
 */
type CardProps = ComponentProps<'div'>

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Card - Neo-brutalist styled card component
 *
 * Features:
 * - Uses neoCard recipe for styling
 * - Supports all native div props
 * - Merges custom className with recipe styles
 *
 * @example
 * ```tsx
 * <Card>Content here</Card>
 * ```
 */
export function Card({ className, ...props }: CardProps) {
  return <div className={cx(cardRecipe(), className)} {...props} />
}
