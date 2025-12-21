// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import { type ReactNode } from 'react'

// Panda CSS
import { cx } from 'styled-system/css'

// Internal components
import { Icon, type IconName } from '../Icon/Icon'

// Component styles
import { toastRecipe } from './Toast.styles'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Toast component props
 */
export interface ToastProps {
  /** Visual variant */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  /** Toast title */
  title: ReactNode
  /** Toast description */
  description?: ReactNode
  /** Icon to display */
  icon?: IconName
  /** Action button */
  action?: ReactNode
  /** Close button callback */
  onClose?: () => void
  /** Class name */
  className?: string
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Toast - Neo-brutalist toast notification component
 *
 * Features:
 * - Variant: default, success, warning, error, info
 * - Optional icon, title, description, action
 * - Close button
 * - Uses semantic tokens for all styling
 * - WCAG AA compliant
 *
 * @example
 * ```tsx
 * <Toast variant="success" title="Saved!" description="Your changes have been saved." />
 * <Toast variant="error" title="Error" description="Something went wrong." icon="xmark" />
 * ```
 */
export function Toast({
  title,
  description,
  icon,
  action,
  onClose,
  variant = 'default',
  className,
}: ToastProps) {
  const recipeStyles = toastRecipe({ variant })

  const defaultIcons: Record<string, IconName> = {
    success: 'check',
    warning: 'exclamationtriangle',
    error: 'xmark',
    info: 'informationcircle',
  }

  const iconName = icon || (variant !== 'default' ? defaultIcons[variant] : undefined)

  return (
    <div className={cx(recipeStyles.container, className)} role="alert">
      {iconName && (
        <div className={recipeStyles.iconWrapper}>
          <Icon name={iconName} size="md" />
        </div>
      )}
      <div className={recipeStyles.content}>
        <div className={recipeStyles.title}>{title}</div>
        {description && <div className={recipeStyles.description}>{description}</div>}
        {action && <div className={recipeStyles.action}>{action}</div>}
      </div>
      {onClose && (
        <button className={recipeStyles.close} onClick={onClose} aria-label="Close">
          <Icon name="xmark" size="sm" />
        </button>
      )}
    </div>
  )
}
