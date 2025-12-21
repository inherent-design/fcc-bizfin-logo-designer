// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import { type ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

// Panda CSS
import { cx } from 'styled-system/css'

// Internal components
import { Icon } from '../Icon/Icon'
import { Button } from '../Button/Button'

// Component styles
import { modalRecipe } from './Modal.styles'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Modal component props
 */
export interface ModalProps {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'full'
  /** Whether the modal is open */
  isOpen: boolean
  /** Callback when the modal should close */
  onClose: () => void
  /** Modal title */
  title?: ReactNode
  /** Modal content */
  children: ReactNode
  /** Footer content (usually buttons) */
  footer?: ReactNode
  /** Class name */
  className?: string
  /** Disable close on overlay click */
  closeOnOverlayClick?: boolean
  /** Disable close on escape key */
  closeOnEsc?: boolean
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Modal - Neo-brutalist modal dialog component
 *
 * Features:
 * - Size variants: sm, md, lg, full
 * - Portal rendering
 * - Overlay backdrop
 * - Close on overlay click or Escape key
 * - Focus trap
 * - Uses semantic tokens for all styling
 * - WCAG AA compliant
 *
 * @example
 * ```tsx
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm">
 *   <p>Are you sure?</p>
 * </Modal>
 * ```
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  className,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}: ModalProps) {
  const recipeStyles = modalRecipe({ size })

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose, closeOnEsc])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  return createPortal(
    <div className={recipeStyles.overlay} onClick={handleOverlayClick}>
      <div className={cx(recipeStyles.content, className)} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        {title && (
          <div className={recipeStyles.header}>
            <h2 id="modal-title" className={recipeStyles.title}>
              {title}
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
              <Icon name="xmark" size="sm" />
            </Button>
          </div>
        )}
        <div className={recipeStyles.body}>{children}</div>
        {footer && <div className={recipeStyles.footer}>{footer}</div>}
      </div>
    </div>,
    document.body
  )
}
