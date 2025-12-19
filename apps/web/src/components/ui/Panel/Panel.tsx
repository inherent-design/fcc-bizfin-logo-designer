// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import type { ComponentProps } from 'react'

// Panda CSS
import { cx } from 'styled-system/css'
import { panelRecipe } from './Panel.styles'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Panel component props
 */
type PanelProps = ComponentProps<'div'>

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Panel - Neo-brutalist styled panel component
 *
 * Features:
 * - Uses neoPanel recipe for styling
 * - Supports all native div props
 * - Merges custom className with recipe styles
 *
 * @example
 * ```tsx
 * <Panel>Content here</Panel>
 * ```
 */
export function Panel({ className, ...props }: PanelProps) {
  return <div className={cx(panelRecipe(), className)} {...props} />
}
