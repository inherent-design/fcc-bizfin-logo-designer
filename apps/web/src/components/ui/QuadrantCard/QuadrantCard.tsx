// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import type { ReactNode } from 'react'

// Panda CSS
import { css } from 'styled-system/css'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * QuadrantCard component props
 */
interface QuadrantCardProps {
  /** Content to display in the card */
  children: ReactNode
}

// ============================================================================
// STYLES
// ============================================================================

const cardStyles = css({
  p: 'inset.normal',
  bg: 'bg.subtle',
})

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * QuadrantCard - Simple container for quadrant layout sections
 *
 * Features:
 * - Subtle background
 * - Consistent padding
 * - Used for organizing quadrant-specific controls
 *
 * @example
 * ```tsx
 * <QuadrantCard>
 *   <div>Quadrant content here</div>
 * </QuadrantCard>
 * ```
 */
export function QuadrantCard({ children }: QuadrantCardProps) {
  return <div className={cardStyles}>{children}</div>
}
