// ============================================================================
// IMPORTS
// ============================================================================

// Panda CSS
import { css } from 'styled-system/css'

// Store
import { useUIStore } from '../../store/uiStore'

// Components
import { GalleryActions } from '../gallery/GalleryActions'
import { GalleryGrid } from '../gallery/GalleryGrid'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Panel } from '../ui/Panel'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Gallery filter type
 */
type GalleryFilter = 'all' | 'favorites' | 'recent'

/**
 * Filter button props
 */
interface FilterButtonProps {
  /** Filter type */
  filter: GalleryFilter
  /** Current active filter */
  currentFilter: GalleryFilter
  /** Filter change handler */
  onClick: () => void
  /** Button label */
  children: React.ReactNode
}

// ============================================================================
// STYLES
// ============================================================================

const floatingButtonStyles = css({
  position: 'absolute',
  bottom: { base: 4, tablet: 6 },
  right: { base: 4, tablet: 6 },
})

const overlayContainerStyles = css({
  position: 'absolute',
  // Mobile/Tablet: full-screen overlay
  inset: { base: 0 },
  top: { desktop: 'auto' },
  left: { desktop: 0 },
  right: { desktop: 0 },
  bottom: { desktop: 0 },
  bg: { base: 'overlay.backdrop', desktop: 'transparent' },
  p: { base: 4, desktop: 6 },
  display: { base: 'flex' },
  alignItems: { base: 'flex-end', desktop: 'stretch' },
})

const drawerPanelStyles = css({
  width: '100%',
  maxHeight: { base: '80vh', desktop: '400px' },
  overflowY: { base: 'auto' },
})

const drawerContentStyles = css({
  p: 6,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
})

const headerStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const headerTitleRowStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: 3,
})

const headerIconStyles = css({
  color: 'panel.primary',
})

const headerTitleStyles = css({
  fontFamily: 'brutalist',
  fontWeight: 'brutal',
  fontSize: 'lg',
  textTransform: 'uppercase',
  color: 'panel.fg',
})

const filtersRowStyles = css({
  display: 'flex',
  gap: 2,
  flexWrap: 'wrap',
})

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * FilterButton - Reusable filter button component
 */
function FilterButton({ filter, currentFilter, onClick, children }: FilterButtonProps) {
  return (
    <Button variant={currentFilter === filter ? 'primary' : 'ghost'} size='sm' onClick={onClick}>
      {children}
    </Button>
  )
}

/**
 * GalleryHeader - Header section with title and close button
 */
function GalleryHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className={headerStyles}>
      <div className={headerTitleRowStyles}>
        <Icon name='folder' size='md' className={headerIconStyles} />
        <h2 className={headerTitleStyles}>Design Gallery</h2>
      </div>

      <Button variant='ghost' size='sm' onClick={onClose}>
        <Icon name='close' size='sm' />
      </Button>
    </div>
  )
}

/**
 * GalleryFilters - Filter buttons row
 */
function GalleryFilters({
  currentFilter,
  onFilterChange,
}: {
  currentFilter: GalleryFilter
  onFilterChange: (filter: GalleryFilter) => void
}) {
  return (
    <div className={filtersRowStyles}>
      <FilterButton
        filter='all'
        currentFilter={currentFilter}
        onClick={() => onFilterChange('all')}
      >
        All
      </FilterButton>

      <FilterButton
        filter='favorites'
        currentFilter={currentFilter}
        onClick={() => onFilterChange('favorites')}
      >
        <Icon name='heart' size='xs' />
        Favorites
      </FilterButton>

      <FilterButton
        filter='recent'
        currentFilter={currentFilter}
        onClick={() => onFilterChange('recent')}
      >
        Recent
      </FilterButton>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * DesignGalleryDrawer - Responsive drawer for design gallery
 *
 * Features:
 * - Responsive layout: Floating button (closed) / Drawer (open)
 * - Mobile: Full-screen overlay with backdrop
 * - Desktop: Bottom-anchored drawer panel
 * - Filter controls: All, Favorites, Recent
 * - Gallery actions: Save, Export, Import
 * - Gallery grid: Display saved designs
 *
 * Layout:
 * - Closed state: Floating "Gallery" button (bottom-right)
 * - Open state: Drawer panel with header, filters, actions, and grid
 *
 * Interactions:
 * - Click floating button to open
 * - Click close button or backdrop to close
 *
 * @example
 * ```tsx
 * <DesignGalleryDrawer />
 * ```
 */
export function DesignGalleryDrawer() {
  const isGalleryOpen = useUIStore((state) => state.isGalleryOpen)
  const toggleGallery = useUIStore((state) => state.toggleGallery)
  const galleryFilter = useUIStore((state) => state.galleryFilter)
  const setGalleryFilter = useUIStore((state) => state.setGalleryFilter)

  // Closed state: Floating button
  if (!isGalleryOpen) {
    return (
      <Button variant='primary' className={floatingButtonStyles} onClick={toggleGallery}>
        <Icon name='folder' size='sm' />
        Gallery
      </Button>
    )
  }

  // Open state: Drawer panel
  return (
    <div
      className={overlayContainerStyles}
      onClick={(e) => {
        if (e.target === e.currentTarget) toggleGallery()
      }}
    >
      <Panel className={drawerPanelStyles}>
        <div className={drawerContentStyles}>
          {/* Header */}
          <GalleryHeader onClose={toggleGallery} />

          {/* Filters */}
          <GalleryFilters currentFilter={galleryFilter} onFilterChange={setGalleryFilter} />

          {/* Gallery Actions */}
          <GalleryActions />

          {/* Gallery Grid */}
          <GalleryGrid />
        </div>
      </Panel>
    </div>
  )
}
