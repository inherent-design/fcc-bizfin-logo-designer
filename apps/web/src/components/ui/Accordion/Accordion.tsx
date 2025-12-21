// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import { type ReactNode, useState, createContext, useContext } from 'react'

// Panda CSS
import { cx } from 'styled-system/css'

// Internal components
import { Icon } from '../Icon/Icon'

// Component styles
import { accordionRecipe } from './Accordion.styles'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface AccordionContextValue {
  openItems: Set<string>
  toggle: (id: string) => void
  variant?: 'single' | 'multiple'
}

const AccordionContext = createContext<AccordionContextValue | undefined>(undefined)

const useAccordion = () => {
  const context = useContext(AccordionContext)
  if (!context) throw new Error('Accordion components must be used within Accordion')
  return context
}

/**
 * Accordion component props
 */
export interface AccordionProps {
  /** Accordion items */
  children: ReactNode
  /** Allow multiple items open at once */
  type?: 'single' | 'multiple'
  /** Default open items (by id) */
  defaultValue?: string[]
  /** Class name */
  className?: string
}

/**
 * AccordionItem component props
 */
export interface AccordionItemProps {
  /** Unique identifier */
  id: string
  /** Item title */
  title: ReactNode
  /** Item content */
  children: ReactNode
  /** Class name */
  className?: string
}

// ============================================================================
// MAIN COMPONENTS
// ============================================================================

/**
 * Accordion - Neo-brutalist accordion component
 *
 * Features:
 * - Single or multiple open items
 * - Animated expand/collapse
 * - Icon rotation
 * - Uses semantic tokens for all styling
 * - WCAG AA compliant
 *
 * @example
 * ```tsx
 * <Accordion>
 *   <AccordionItem id="1" title="Section 1">Content 1</AccordionItem>
 *   <AccordionItem id="2" title="Section 2">Content 2</AccordionItem>
 * </Accordion>
 * ```
 */
export function Accordion({ children, type = 'single', defaultValue = [], className }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultValue))
  const recipeStyles = accordionRecipe()

  const toggle = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        if (type === 'single') {
          next.clear()
        }
        next.add(id)
      }
      return next
    })
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggle, variant: type }}>
      <div className={cx(recipeStyles.container, className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

/**
 * AccordionItem - Individual accordion item
 */
export function AccordionItem({ id, title, children, className }: AccordionItemProps) {
  const { openItems, toggle } = useAccordion()
  const isOpen = openItems.has(id)
  const recipeStyles = accordionRecipe()

  return (
    <div className={cx(recipeStyles.item, className)}>
      <button
        className={recipeStyles.trigger}
        onClick={() => toggle(id)}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
      >
        <span className={recipeStyles.title}>{title}</span>
        <Icon name="chevrondown" size="sm" className={cx(recipeStyles.icon, isOpen && recipeStyles.iconOpen)} />
      </button>
      {isOpen && (
        <div id={`accordion-content-${id}`} className={recipeStyles.content}>
          {children}
        </div>
      )}
    </div>
  )
}
