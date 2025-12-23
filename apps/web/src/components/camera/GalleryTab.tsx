// ============================================================================
// IMPORTS
// ============================================================================

// Panda CSS
import { css } from '@styled-system/css'

// Store
import { useUIStore } from '@/stores/uiStore'

// Components
import { GalleryActions } from '../gallery/GalleryActions'
import { GalleryGrid } from '../gallery/GalleryGrid'

// Base UI
import { Button } from '@base-ui/react/button'

// Recipes
import { buttonRecipe } from '@styled-system/recipes'

// Icons
import { Heart } from 'lucide-react'

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

const filtersRowStyles = css({
  display: 'flex',
  gap: 'inline.tight',
  mb: 'stack.normal',
  flexWrap: 'wrap',
})

const contentStyles = css({
  display: 'flex',
  gap: 'stack.normal',
  flexDirection: 'column',
})

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * FilterButton - Reusable filter button component
 */
function FilterButton({ filter, currentFilter, onClick, children }: FilterButtonProps) {
  return (
    <Button
      className={buttonRecipe({
        variant: currentFilter === filter ? 'primary' : 'ghost',
        size: 'md',
      })}
      onClick={onClick}
    >
      {children}
    </Button>
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
        currentFilter={currentFilter}
        onClick={() => onFilterChange('all')}
        filter='all'
      >
        All
      </FilterButton>

      <FilterButton
        currentFilter={currentFilter}
        onClick={() => onFilterChange('favorites')}
        filter='favorites'
      >
        <Heart size={24} />
        Favorites
      </FilterButton>

      <FilterButton
        currentFilter={currentFilter}
        onClick={() => onFilterChange('recent')}
        filter='recent'
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
 * GalleryTab - Gallery tab content for saved designs
 *
 * Features:
 * - Filter controls: All, Favorites, Recent
 * - Gallery actions: Save, Export, Import
 * - Gallery grid: Display saved designs
 *
 * @example
 * ```tsx
 * <GalleryTab />
 * ```
 */
export function GalleryTab() {
  const galleryFilter = useUIStore((state) => state.galleryFilter)
  const setGalleryFilter = useUIStore((state) => state.setGalleryFilter)

  return (
    <div className={contentStyles}>
      {/* Filters */}
      <GalleryFilters currentFilter={galleryFilter} onFilterChange={setGalleryFilter} />

      {/* Gallery Actions */}
      <GalleryActions />

      {/* Gallery Grid */}
      <GalleryGrid />
    </div>
  )
}
