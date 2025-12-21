// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import { type ReactNode, useState, useRef, useEffect } from 'react'

// Panda CSS
import { cx } from 'styled-system/css'

// Internal components
import { Icon, type IconName } from '../Icon/Icon'

// Component styles
import { dropdownMenuRecipe } from './DropdownMenu.styles'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface DropdownMenuItem {
  label: ReactNode
  icon?: IconName
  onClick?: () => void
  disabled?: boolean
  variant?: 'default' | 'danger'
  divider?: boolean
}

/**
 * DropdownMenu component props
 */
export interface DropdownMenuProps {
  /** Placement variant */
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
  /** Trigger element */
  trigger: ReactNode
  /** Menu items */
  items: DropdownMenuItem[]
  /** Class name */
  className?: string
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * DropdownMenu - Neo-brutalist dropdown menu component
 *
 * Features:
 * - Click-to-open trigger
 * - Menu items with icons, labels, variants
 * - Dividers between items
 * - Close on outside click
 * - Uses semantic tokens for all styling
 * - WCAG AA compliant
 *
 * @example
 * ```tsx
 * <DropdownMenu
 *   trigger={<Button>Menu</Button>}
 *   items={[
 *     { label: 'Edit', icon: 'pencil', onClick: handleEdit },
 *     { label: 'Delete', icon: 'trash', onClick: handleDelete, variant: 'danger' },
 *   ]}
 * />
 * ```
 */
export function DropdownMenu({ trigger, items, placement = 'bottom-start', className }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const recipeStyles = dropdownMenuRecipe({ placement })

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

  const handleItemClick = (item: DropdownMenuItem) => {
    if (item.disabled) return
    item.onClick?.()
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className={recipeStyles.container}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className={cx(recipeStyles.menu, className)} role="menu">
          {items.map((item, index) => (
            <div key={index}>
              {item.divider ? (
                <div className={recipeStyles.divider} role="separator" />
              ) : (
                <button
                  className={cx(
                    recipeStyles.item,
                    item.variant === 'danger' && recipeStyles.itemDanger
                  )}
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  role="menuitem"
                >
                  {item.icon && <Icon name={item.icon} size="sm" />}
                  <span>{item.label}</span>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
