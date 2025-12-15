// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import type { ReactNode } from 'react'

// Panda CSS
import { css, cx } from 'styled-system/css'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Section header component props
 */
interface SectionHeaderProps {
  /** Content to display in the header */
  children: ReactNode
  /** Whether to show bottom border (default: true) */
  border?: boolean
}

// ============================================================================
// STYLES
// ============================================================================

const sectionHeaderStyles = css({
  fontSize: 'xs',
  fontFamily: 'brutalist',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: 'wider',
  color: 'text.caption',
  pb: 1,
})

const withBorderStyles = css({
  borderBottom: '{borderWidths.brutal.DEFAULT} solid',
  borderColor: 'component.colorPicker.sectionBorder',
})

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * SectionHeader - Neo-brutalist section header component
 *
 * Features:
 * - Consistent typography for section headers
 * - Optional bottom border
 * - Uses semantic text tokens
 *
 * @example
 * ```tsx
 * <SectionHeader>HSL</SectionHeader>
 * <SectionHeader border={false}>Color Settings</SectionHeader>
 * ```
 */
export function SectionHeader({ children, border = true }: SectionHeaderProps) {
  return <div className={cx(sectionHeaderStyles, border && withBorderStyles)}>{children}</div>
}
