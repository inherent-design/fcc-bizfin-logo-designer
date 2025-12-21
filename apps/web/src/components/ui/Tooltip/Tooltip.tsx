// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import { type ReactNode, useState } from 'react'

// Panda CSS
import { cx } from 'styled-system/css'

// Component styles
import { tooltipRecipe } from './Tooltip.styles'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Tooltip component props
 */
export interface TooltipProps {
  /** Tooltip content */
  content: ReactNode
  /** Element that triggers the tooltip */
  children: ReactNode
  /** Placement variant */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  /** Visual variant */
  variant?: 'dark' | 'light'
  /** Class name for the container */
  className?: string
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Tooltip - Neo-brutalist tooltip component
 *
 * Features:
 * - Placement variants: top, bottom, left, right
 * - Variant: dark, light
 * - Hover and focus triggers
 * - Uses semantic tokens for all styling
 * - WCAG AA compliant
 *
 * @example
 * ```tsx
 * <Tooltip content="Click to copy">
 *   <button>Copy</button>
 * </Tooltip>
 * ```
 */
export function Tooltip({ content, children, placement = 'top', variant = 'dark', className }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const recipeStyles = tooltipRecipe({ placement, variant })

  return (
    <div
      className={cx(recipeStyles.container, className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={recipeStyles.tooltip} role="tooltip">
          <div className={recipeStyles.content}>{content}</div>
          <div className={recipeStyles.arrow} />
        </div>
      )}
    </div>
  )
}
