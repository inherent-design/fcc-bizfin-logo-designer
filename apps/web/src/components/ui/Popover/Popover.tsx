// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import { type ReactNode, useState, useRef, useEffect } from 'react'

// Panda CSS
import { cx } from 'styled-system/css'

// Component styles
import { popoverRecipe } from './Popover.styles'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Popover component props
 */
export interface PopoverProps {
  /** Placement variant */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  /** Trigger element */
  trigger: ReactNode
  /** Popover content */
  children: ReactNode
  /** Optional title */
  title?: ReactNode
  /** Class name */
  className?: string
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Popover - Neo-brutalist popover component
 *
 * Features:
 * - Placement variants: top, bottom, left, right
 * - Click-to-open trigger
 * - Close on outside click
 * - Uses semantic tokens for all styling
 * - WCAG AA compliant
 *
 * @example
 * ```tsx
 * <Popover trigger={<Button>Click me</Button>} title="Info">
 *   <p>Popover content here</p>
 * </Popover>
 * ```
 */
export function Popover({ trigger, children, title, placement = 'bottom', className }: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const recipeStyles = popoverRecipe({ placement })

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className={recipeStyles.container}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className={cx(recipeStyles.content, className)} role="dialog">
          {title && <div className={recipeStyles.header}>{title}</div>}
          <div className={recipeStyles.body}>{children}</div>
          <div className={recipeStyles.arrow} />
        </div>
      )}
    </div>
  )
}
