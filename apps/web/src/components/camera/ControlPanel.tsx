// ============================================================================
// IMPORTS
// ============================================================================

// Base UI
import { Button } from '@base-ui/react/button'
import { Tabs } from '@base-ui/react/tabs'

// Panda CSS
import { css, cx } from '@styled-system/css'

// Recipes
import { buttonRecipe, tabsRecipe } from '@styled-system/recipes'

// Utils
import { useUIStore } from '@/stores/uiStore'

// Components
import { ColorTab } from './ColorTab'
import { GalleryTab } from './GalleryTab'
import { LayoutTab } from './LayoutTab'

// Icons
import { Folder, Grid2X2, Moon, Paintbrush, Palette, Sun } from 'lucide-react'

// ============================================================================
// STYLES
// ============================================================================

const containerStyles = css({
  // Flex shrink to maintain size
  flexShrink: 0,
  // Tablet+: 40% width (row layout)
  width: { base: '100%', tablet: '40%' },
  // Mobile: 40% height (column layout)
  height: { base: '40%', tablet: '100%' },
  p: { base: 'inset.tight', tablet: 'inset.normal' },
  bg: 'bg.elevated',
  overflowX: 'hidden',
  overflowY: 'auto',
})

const panelStyles = css({
  display: 'flex',
  gap: 'stack.normal',
  flexDirection: 'column',
  borderColor: 'border.default',
  borderRadius: 'none',
  borderWidth: 'brutal',
  p: { base: 'inset.tight', tablet: 'inset.normal' },
  transitionDuration: 'fast',
  transitionProperty: 'all',

  borderStyle: 'solid',
  '&:hover': {
    borderColor: 'border.moderate',
    boxShadow: 'interaction.hover',
  },

  '&:focus-within': {
    borderColor: 'border.focus',
    boxShadow: 'elevation.floating',
  },
})

const headerStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 'stack.tight',
})

const titleContainerStyles = css({
  display: 'flex',
  gap: 'inline.normal',
  alignItems: 'center',
})

const paintbrushIconStyles = css({
  // Explicitly set to text.primary (not inheriting from ghost button variant)
  color: 'text.primary',
})

const titleStyles = css({
  textStyle: 'brutalistLabel',
  color: 'text.primary',
  fontSize: 'heading',
})

const tabContentContainerStyles = css({
  flex: 1,
  pr: 'inline.tight',
  overflowX: 'hidden',
  overflowY: 'auto',
})

const themeToggleStyles = css({
  aspectRatio: '1',
  minWidth: 'sizes.touch.min',
  minHeight: 'sizes.touch.min',
  // Make button square by using equal padding
  p: 'inset.tight',
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
        <Paintbrush className={paintbrushIconStyles} size={48} />
        <h1 className={titleStyles}>Logo Designer</h1>
      </div>
      <Button
        className={cx(buttonRecipe({ variant: 'ghost', size: 'sm' }), themeToggleStyles)}
        onClick={() => {
          const toggleWorldTheme = useUIStore.getState().toggleWorldTheme
          toggleWorldTheme()
        }}
        aria-label={`Switch to ${worldTheme === 'dark' ? 'light' : 'dark'} theme`}
      >
        <ThemeIcon size={20} />
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
      <Tabs.Tab className={classes.trigger} value='color'>
        <Palette size={20} />
        Color
      </Tabs.Tab>
      <Tabs.Tab className={classes.trigger} value='layout'>
        <Grid2X2 size={20} />
        Layout
      </Tabs.Tab>
      <Tabs.Tab className={classes.trigger} value='gallery'>
        <Folder size={20} />
        Gallery
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
      <Tabs.Panel className={classes.panel} value='color'>
        <ColorTab />
      </Tabs.Panel>

      <Tabs.Panel className={classes.panel} value='layout'>
        <LayoutTab />
      </Tabs.Panel>

      <Tabs.Panel className={classes.panel} value='gallery'>
        <GalleryTab />
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
 * - Tabbed interface (Color, Layout, Gallery) using Base UI
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
          className={classes.root}
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as 'color' | 'layout' | 'gallery')}
        >
          <TabNavigation />
          <TabPanels />
        </Tabs.Root>
      </div>
    </div>
  )
}
