// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import type { ReactNode } from 'react'

// Panda CSS
import { cx } from 'styled-system/css'

// Component styles
import { sectionHeaderRecipe, type SectionHeaderVariantProps } from './SectionHeader.styles'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Section header component props
 */
type SectionHeaderProps = SectionHeaderVariantProps & {
  /** Content to display in the header */
  children: ReactNode
}

// ============================================================================
// STYLES
// ============================================================================
// Styles moved to SectionHeader.styles.ts (cva recipe pattern)

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * SectionHeader - Neo-brutalist section header component
 *
 * Features:
 * - Consistent typography for section headers
 * - Optional bottom border
 * - Semantic colorScheme variants (default, primary, secondary, muted)
 *
 * @example
 * ```tsx
 * <SectionHeader>HSL</SectionHeader>
 * <SectionHeader border={false}>Color Settings</SectionHeader>
 * <SectionHeader colorScheme="primary">Featured Section</SectionHeader>
 * ```
 */
export function SectionHeader({ children, border, colorScheme }: SectionHeaderProps) {
  return <div className={cx(sectionHeaderRecipe({ border, colorScheme }))}>{children}</div>
}
