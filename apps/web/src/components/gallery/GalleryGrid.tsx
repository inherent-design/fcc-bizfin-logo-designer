// ============================================================================
// IMPORTS
// ============================================================================

// Panda CSS
import { css } from 'styled-system/css'

// Store
import { usePresetsStore } from '@/stores/presetsStore'
import { useUIStore } from '@/stores/uiStore'

// Components
import { DesignThumbnail } from './DesignThumbnail'

// ============================================================================
// STYLES
// ============================================================================

const emptyStateStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'container2',
  textStyle: 'brutalistText',
  color: 'surface.fg',
  opacity: 'muted',
})

const gridStyles = css({
  display: 'grid',
  gap: 'stack.normal',

  // Responsive grid
  gridTemplateColumns: {
    base: 'repeat(2, 1fr)',
    tablet: 'repeat(3, 1fr)',
  },
})

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * GalleryGrid - Grid display of saved logo designs
 *
 * Features:
 * - Filters designs by gallery filter (all, favorites, recent)
 * - Responsive grid layout (2 cols mobile, 3 cols tablet, auto-fill desktop)
 * - Empty state when no designs match filter
 *
 * @example
 * ```tsx
 * <GalleryGrid />
 * ```
 */
export function GalleryGrid() {
  const designs = usePresetsStore((state) => state.designs)
  const galleryFilter = useUIStore((state) => state.galleryFilter)

  const filteredDesigns = designs.filter((design) => {
    if (galleryFilter === 'favorites') return design.isFavorite
    if (galleryFilter === 'recent') {
      // Show designs from last 7 days
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return new Date(design.timestamp) > weekAgo
    }
    return true
  })

  if (filteredDesigns.length === 0) {
    return (
      <div className={emptyStateStyles}>
        No designs found. Save your first design to get started!
      </div>
    )
  }

  return (
    <div className={gridStyles}>
      {filteredDesigns.map((design) => (
        <DesignThumbnail key={design.id} design={design} />
      ))}
    </div>
  )
}
