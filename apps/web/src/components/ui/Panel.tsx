// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import type { ComponentProps } from 'react'

// Panda CSS
import { cx } from 'styled-system/css'
import { neoPanel, type NeoPanelVariantProps } from 'styled-system/recipes'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Panel component props
 */
interface PanelProps extends ComponentProps<'div'>, NeoPanelVariantProps {}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Panel - Neo-brutalist styled panel component
 *
 * Features:
 * - Uses neoPanel recipe for variant styling
 * - Supports all native div props
 * - Merges custom className with recipe styles
 *
 * @example
 * ```tsx
 * <Panel variant="default">Content here</Panel>
 * ```
 */
export function Panel(props: PanelProps) {
  const [variantProps, restProps] = neoPanel.splitVariantProps(props)
  const { className, ...htmlProps } = restProps

  return <div className={cx(neoPanel(variantProps), className)} {...htmlProps} />
}
