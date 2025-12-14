import { createContext, useContext, type ReactNode } from 'react'
import { css } from 'styled-system/css'

interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within <Tabs>')
  }
  return context
}

interface TabsProps {
  value: string
  onValueChange: (value: string) => void
  children: ReactNode
}

export function Tabs({ value, onValueChange, children }: TabsProps) {
  return <TabsContext.Provider value={{ value, onValueChange }}>{children}</TabsContext.Provider>
}

interface TabsListProps {
  children: ReactNode
}

export function TabsList({ children }: TabsListProps) {
  return (
    <div
      className={css({
        display: 'flex',
        gap: 2,
        borderBottom: '{borderWidths.brutal} solid',
        borderColor: 'panel.border',
        mb: 4,
      })}
    >
      {children}
    </div>
  )
}

interface TabsTriggerProps {
  value: string
  children: ReactNode
}

export function TabsTrigger({ value, children }: TabsTriggerProps) {
  const { value: activeValue, onValueChange } = useTabsContext()
  const isActive = activeValue === value

  return (
    <button
      onClick={() => onValueChange(value)}
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 4,
        py: 2,
        bg: isActive ? 'panel.primary' : 'transparent',
        color: isActive ? 'panel.bg' : 'panel.fg',
        border: isActive ? '{borderWidths.brutal} solid' : 'none',
        borderColor: isActive ? 'panel.border' : 'transparent',
        borderBottom: 'none',
        fontFamily: 'brutalist',
        fontWeight: 'brutal',
        textTransform: 'uppercase',
        fontSize: 'sm',
        cursor: 'pointer',
        transition: 'all 100ms',
        mb: isActive ? '-{borderWidths.brutal}' : 0,

        _hover: {
          bg: isActive ? 'panel.primary' : 'panel.bg',
        },
      })}
    >
      {children}
    </button>
  )
}

interface TabsContentProps {
  value: string
  children: ReactNode
}

export function TabsContent({ value, children }: TabsContentProps) {
  const { value: activeValue } = useTabsContext()

  if (activeValue !== value) return null

  return <div>{children}</div>
}
