// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import { createContext, useContext, type ReactNode } from 'react'

// Panda CSS
import { css, cx } from 'styled-system/css'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Tabs context value
 */
interface TabsContextValue {
  /** Current active tab value */
  value: string
  /** Callback when tab changes */
  onValueChange: (value: string) => void
}

/**
 * Tabs props
 */
interface TabsProps {
  /** Current active tab value */
  value: string
  /** Callback when tab changes */
  onValueChange: (value: string) => void
  /** Tab content */
  children: ReactNode
}

/**
 * TabsList props
 */
interface TabsListProps {
  /** Tab trigger buttons */
  children: ReactNode
}

/**
 * TabsTrigger props
 */
interface TabsTriggerProps {
  /** Tab value identifier */
  value: string
  /** Tab label content */
  children: ReactNode
}

/**
 * TabsContent props
 */
interface TabsContentProps {
  /** Tab value to match */
  value: string
  /** Content to display when tab is active */
  children: ReactNode
}

// ============================================================================
// STYLES
// ============================================================================

const tabsListStyles = css({
  display: 'flex',
  gap: 'inline.tight',
  borderBottomWidth: 'brutal',
  borderBottomStyle: 'solid',
  borderColor: 'border',
  mb: 'stack.normal',
})

const tabsTriggerBaseStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: 'inline.tight',
  px: 'inset.normal',
  py: 'inset.tight',
  textStyle: 'brutalistLabel',
  letterSpacing: 'normal',
  cursor: 'pointer',
  transitionDuration: 'fast',
  transitionProperty: 'all',
})

const tabsTriggerActiveStyles = css({
  bg: 'bg.selected',
  color: 'text.onPrimary',
  borderWidth: 'brutal',
  borderStyle: 'solid',
  borderColor: 'border',
  borderBottom: 'none',
  mb: '-0.4rem',
})

const tabsTriggerInactiveStyles = css({
  bg: 'transparent',
  color: 'panel.fg',
  border: 'none',
  borderColor: 'transparent',
  _hover: {
    bg: 'bg.subtle',
  },
})

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const TabsContext = createContext<TabsContextValue | null>(null)

/**
 * Hook to access tabs context
 *
 * @throws {Error} When used outside of Tabs component
 * @returns Tabs context value
 */
function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within <Tabs>')
  }
  return context
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Tabs - Neo-brutalist tabs component container
 *
 * Features:
 * - Controlled component pattern
 * - Context-based state sharing
 * - Neo-brutalist styling
 *
 * @example
 * ```tsx
 * <Tabs value="tab1" onValueChange={setValue}>
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 * ```
 */
export function Tabs({ value, onValueChange, children }: TabsProps) {
  return <TabsContext.Provider value={{ value, onValueChange }}>{children}</TabsContext.Provider>
}

/**
 * TabsList - Container for tab trigger buttons
 *
 * Features:
 * - Horizontal flex layout
 * - Bottom border separator
 * - Consistent spacing
 *
 * @example
 * ```tsx
 * <TabsList>
 *   <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *   <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 * </TabsList>
 * ```
 */
export function TabsList({ children }: TabsListProps) {
  return <div className={tabsListStyles}>{children}</div>
}

/**
 * TabsTrigger - Individual tab button
 *
 * Features:
 * - Active/inactive states
 * - Neo-brutalist styling
 * - Icon support
 * - Hover effects
 *
 * @example
 * ```tsx
 * <TabsTrigger value="color">
 *   <Icon name="swatch" />
 *   Color
 * </TabsTrigger>
 * ```
 */
export function TabsTrigger({ value, children }: TabsTriggerProps) {
  const { value: activeValue, onValueChange } = useTabsContext()
  const isActive = activeValue === value

  return (
    <button
      onClick={() => onValueChange(value)}
      className={cx(
        tabsTriggerBaseStyles,
        isActive ? tabsTriggerActiveStyles : tabsTriggerInactiveStyles
      )}
    >
      {children}
    </button>
  )
}

/**
 * TabsContent - Tab panel content container
 *
 * Features:
 * - Conditional rendering based on active tab
 * - Simple wrapper component
 *
 * @example
 * ```tsx
 * <TabsContent value="color">
 *   <ColorSettings />
 * </TabsContent>
 * ```
 */
export function TabsContent({ value, children }: TabsContentProps) {
  const { value: activeValue } = useTabsContext()

  if (activeValue !== value) return null

  return <div>{children}</div>
}
