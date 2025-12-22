// ============================================================================
// IMPORTS
// ============================================================================

// Base UI
import { Tabs } from '@base-ui/react/tabs'
import { Button } from '@base-ui/react/button'

// Panda CSS
import { css } from 'styled-system/css'

// Recipes
import { buttonRecipe } from '@/recipes/button.recipe'
import { tabsRecipe } from '@/recipes/tabs.recipe'

// Utils
import { useUIStore } from '@/stores/uiStore'

// Components
import { ColorTab } from './ColorTab'
import { LayoutTab } from './LayoutTab'

// Icons
import { Paintbrush, Palette, Grid2X2, Sun, Moon } from 'lucide-react'

// ============================================================================
// STYLES
// ============================================================================

const containerStyles = css({
  // Mobile: 40% height (column layout)
  height: { base: '40%', tablet: '100%' },
  // Tablet+: 40% width (row layout)
  width: { base: '100%', tablet: '40%' },
  // Flex shrink to maintain size
  flexShrink: 0,
  p: { base: 4, tablet: 6 },
  overflowY: 'auto',
  overflowX: 'hidden',
  bg: 'bg.elevated',
})

const panelStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'stack.normal',
  borderWidth: 'brutal',
  borderStyle: 'solid',
  borderColor: 'border.default',
  borderRadius: 'none',
})

const headerStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mb: 'stack.tight',
})

const titleContainerStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: 'inline.normal',
})

const paletteIconStyles = css({
  color: 'text.accent',
})

const titleStyles = css({
  textStyle: 'brutalistLabel',
  fontSize: 'xl',
  color: 'text.primary',
})

const tabContentContainerStyles = css({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  pr: 'inline.tight',
})

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Header section with logo and theme toggle
 */
function ControlPanelHeader() {
  const worldTheme = useUIStore((state) => state.worldTheme)
  const ThemeIcon = worldTheme === 'dark' ? Sun : Moon

  return (
    <div className={headerStyles}>
      <div className={titleContainerStyles}>
        <Paintbrush className={paletteIconStyles} size={48} />
        <h1 className={titleStyles}>Logo Designer</h1>
      </div>
      <Button
        className={buttonRecipe({ variant: 'ghost', size: 'sm' })}
        onClick={() => {
          const toggleWorldTheme = useUIStore.getState().toggleWorldTheme
          toggleWorldTheme()
        }}
      >
        <ThemeIcon size={16} />
      </Button>
    </div>
  )
}

/**
 * Tab navigation triggers
 */
function TabNavigation() {
  const classes = tabsRecipe()

  return (
    <Tabs.List className={classes.list}>
      <Tabs.Tab value='color' className={classes.trigger}>
        <Palette size={20} />
        Color
      </Tabs.Tab>
      <Tabs.Tab value='layout' className={classes.trigger}>
        <Grid2X2 size={20} />
        Layout
      </Tabs.Tab>
    </Tabs.List>
  )
}

/**
 * Tab content panels
 */
function TabPanels() {
  const classes = tabsRecipe()

  return (
    <div className={tabContentContainerStyles}>
      <Tabs.Panel value='color' className={classes.panel}>
        <ColorTab />
      </Tabs.Panel>

      <Tabs.Panel value='layout' className={classes.panel}>
        <LayoutTab />
      </Tabs.Panel>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * ControlPanel - Main control panel for logo design
 *
 * Features:
 * - Tabbed interface (Color, Layout) using Base UI
 * - Theme toggle for world background
 * - Responsive sizing (mobile/tablet/desktop)
 * - Auto-overflow handling
 *
 * Layout:
 * - Mobile: 40% height, full width (column)
 * - Tablet+: 40% width, full height (row)
 *
 * @example
 * ```tsx
 * <ControlPanel />
 * ```
 */
export function ControlPanel() {
  const activeTab = useUIStore((state) => state.activeTab)
  const setActiveTab = useUIStore((state) => state.setActiveTab)
  const classes = tabsRecipe()

  return (
    <div className={containerStyles}>
      <div className={panelStyles}>
        <ControlPanelHeader />

        <Tabs.Root
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as 'color' | 'layout')}
          className={classes.root}
        >
          <TabNavigation />
          <TabPanels />
        </Tabs.Root>
      </div>
    </div>
  )
}
