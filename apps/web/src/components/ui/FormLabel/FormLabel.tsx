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
 * Form label component props
 */
interface FormLabelProps {
  /** Content to display in the label */
  children: ReactNode
  /** HTML for attribute for accessibility */
  htmlFor?: string
}

// ============================================================================
// STYLES
// ============================================================================

const formLabelStyles = css({
  textStyle: 'formLabel',
  color: 'text.label',
  display: 'block',
  mb: 'stack.tight',
})

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * FormLabel - Neo-brutalist form label component
 *
 * Features:
 * - Consistent typography for form labels
 * - Semantic text tokens
 * - Proper accessibility with htmlFor
 *
 * @example
 * ```tsx
 * <FormLabel htmlFor="hue-input">H</FormLabel>
 * <FormLabel>Saturation</FormLabel>
 * ```
 */
export function FormLabel({ children, htmlFor }: FormLabelProps) {
  return (
    <label htmlFor={htmlFor} className={formLabelStyles}>
      {children}
    </label>
  )
}
