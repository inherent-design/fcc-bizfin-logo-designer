// ============================================================================
// IMPORTS
// ============================================================================

// Panda CSS
import { css } from 'styled-system/css'

// Utils
import { useUIStore } from '@/stores/uiStore'

// Components
import { ColorTab } from '../tabs/ColorTab'
import { LayoutTab } from '../tabs/LayoutTab'
import { Button } from '../ui/Button/Button'
import { Icon } from '../ui/Icon/Icon'
import { Panel } from '../ui/Panel/Panel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs/Tabs'

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
})

const panelStyles = css({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 'stack.normal',
  p: 'inset.loose',
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
  color: 'panel.primary',
})

const titleStyles = css({
  textStyle: 'brutalistLabel',
  fontSize: 'xl',
  color: 'panel.fg',
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
  return (
    <div className={headerStyles}>
      <div className={titleContainerStyles}>
        <Icon className={paletteIconStyles} name='paintbrush' size='3xl' />
        <h1 className={titleStyles}>Logo Designer</h1>
      </div>
      <Button
        variant='ghost'
        size='sm'
        onClick={() => {
          const toggleWorldTheme = useUIStore.getState().toggleWorldTheme
          toggleWorldTheme()
        }}
      >
        <Icon
          name={useUIStore((state) => (state.worldTheme === 'dark' ? 'sun' : 'moon'))}
          size='sm'
        />
      </Button>
    </div>
  )
}

/**
 * Tab navigation triggers
 */
function TabNavigation() {
  return (
    <TabsList>
      <TabsTrigger value='color'>
        <Icon name='swatch' size='md' />
        Color
      </TabsTrigger>
      <TabsTrigger value='layout'>
        <Icon name='squares2x2' size='md' />
        Layout
      </TabsTrigger>
    </TabsList>
  )
}

/**
 * Tab content panels
 */
function TabPanels() {
  return (
    <div className={tabContentContainerStyles}>
      <TabsContent value='color'>
        <ColorTab />
      </TabsContent>

      <TabsContent value='layout'>
        <LayoutTab />
      </TabsContent>
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
 * - Tabbed interface (Color, Layout)
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

  return (
    <div className={containerStyles}>
      <Panel className={panelStyles}>
        <ControlPanelHeader />

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as 'color' | 'layout')}
        >
          <TabNavigation />
          <TabPanels />
        </Tabs>
      </Panel>
    </div>
  )
}
