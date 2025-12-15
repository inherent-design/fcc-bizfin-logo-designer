// ============================================================================
// IMPORTS
// ============================================================================

// Panda CSS
import { css } from 'styled-system/css'

// Utils
import { useUIStore } from '../../store/uiStore'

// Components
import { ColorTab } from '../tabs/ColorTab'
import { LayoutTab } from '../tabs/LayoutTab'
import { Icon } from '../ui/Icon'
import { Panel } from '../ui/Panel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs'

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
  gap: 4,
  p: 6,
})

const headerStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mb: 2,
})

const titleContainerStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: 3,
})

const paletteIconStyles = css({
  color: 'panel.primary',
})

const titleStyles = css({
  fontFamily: 'brutalist',
  fontWeight: 'brutal',
  fontSize: 'xl',
  textTransform: 'uppercase',
  color: 'panel.fg',
})

const themeToggleButtonStyles = css({
  px: 2,
  py: 1,
  border: '{borderWidths.brutal.DEFAULT} solid',
  borderColor: 'panel.border',
  bg: 'panel.bg',
  cursor: 'pointer',
  fontFamily: 'brutalist',
  fontWeight: 'bold',
  fontSize: 'xs',
  textTransform: 'uppercase',
  color: 'panel.fg',
  transition: 'fast',
  _hover: {
    transform: 'translate(1px, 1px)',
    boxShadow: '2px 2px 0 {colors.panel.border}',
  },
  _active: {
    transform: 'translate(2px, 2px)',
    boxShadow: 'none',
  },
})

const tabContentContainerStyles = css({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  pr: 2,
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
        <Icon name='palette' size='lg' className={paletteIconStyles} />
        <h1 className={titleStyles}>Logo Designer</h1>
      </div>
      <button
        onClick={() => {
          const toggleWorldTheme = useUIStore.getState().toggleWorldTheme
          toggleWorldTheme()
        }}
        className={themeToggleButtonStyles}
        title='Toggle world theme'
      >
        {useUIStore((state) => (state.worldTheme === 'dark' ? '☀️' : '🌑'))}
      </button>
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
        <Icon name='palette' size='xs' />
        Color
      </TabsTrigger>
      <TabsTrigger value='layout'>
        <Icon name='grid' size='xs' />
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
