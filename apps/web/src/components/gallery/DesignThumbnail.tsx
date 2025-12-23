// ============================================================================
// IMPORTS
// ============================================================================

// Panda CSS
import { css } from '@styled-system/css'

// Types
import type { SavedDesign } from '@/stores/presetsStore'

// Utils
import { usePresetsStore } from '@/stores/presetsStore'
import { useUIStore } from '@/stores/uiStore'

// Icons
import { Copy, Heart, Trash2 } from 'lucide-react'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * DesignThumbnail component props
 */
interface DesignThumbnailProps {
  /** Design configuration to display */
  design: SavedDesign
}

// ============================================================================
// STYLES
// ============================================================================

const containerStyles = css({
  cursor: 'pointer',
  position: 'relative',
  borderColor: 'border.default',
  borderWidth: 'brutal',
  bg: 'surface.bg',
  overflow: 'hidden',
  transitionDuration: 'fast',
  transitionProperty: 'all',
  borderStyle: 'solid',
  _hover: {
    transform: 'scale(1.02)',
    borderColor: 'accent.primary',
  },
})

const containerActiveStyles = css({
  borderColor: 'accent.primary',
})

const thumbnailAreaStyles = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  aspectRatio: '1/1',
  width: '100%',
  bg: 'world.bg',
  overflow: 'hidden',
})

const thumbnailImageStyles = css({
  objectFit: 'contain',
  width: '80%',
  height: '80%',
})

const noPreviewStyles = css({
  color: 'surface.fg',
  fontFamily: 'brutalist',
  fontSize: 'xs', // Migrated from typeMinus2 base token
  opacity: 'disabled',
})

const infoSectionStyles = css({
  borderColor: 'border.default',
  borderTopWidth: 'hairline',
  p: 'inline.tight',
  bg: 'surface.bg',
  borderTopStyle: 'solid',
})

const nameStyles = css({
  mb: 'stack.tight',
  color: 'surface.fg',
  fontFamily: 'brutalist',
  fontSize: 'xs', // Migrated from typeMinus2 base token
  fontWeight: 'bold',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
})

const timestampStyles = css({
  color: 'surface.fg',
  fontFamily: 'brutalist',
  fontSize: 'xxs', // Migrated from typeMinus3 base token
  opacity: 'subtle',
})

const actionsContainerStyles = css({
  display: 'flex',
  position: 'absolute',
  top: '3xs',
  right: '3xs',
  gap: 'inline.tight',
  opacity: 0,
  transitionDuration: 'fast',
  transitionProperty: 'opacity',
  _groupHover: {
    opacity: 1,
  },
})

const actionButtonStyles = css({
  cursor: 'pointer',
  borderColor: 'border',
  borderWidth: 'default', // Migrated from 'base' (non-existent semantic) to 'default'
  p: 'inline.tight',
  bg: 'surface.bg',
  borderStyle: 'solid',
  _hover: {
    bg: 'bg.hover',
  },
})

const favoriteButtonStyles = css({
  cursor: 'pointer',
  borderColor: 'border',
  borderWidth: 'default', // Migrated from 'base' (non-existent semantic) to 'default'
  p: 'inline.tight',
  borderStyle: 'solid',
  _hover: {
    bg: 'accent.solid',
  },
})

const favoriteButtonActiveStyles = css({
  bg: 'accent.warning',
})

const deleteButtonStyles = css({
  cursor: 'pointer',
  borderColor: 'border',
  borderWidth: 'default', // Migrated from 'base' (non-existent semantic) to 'default'
  p: 'inline.tight',
  bg: 'surface.bg',
  borderStyle: 'solid',
  _hover: {
    bg: 'accent.solid',
  },
})

const iconStyles = css({
  color: 'border.default',
})

const favoriteIconActiveStyles = css({
  color: 'surface.bg',
})

const activeBadgeStyles = css({
  position: 'absolute',
  top: '3xs',
  left: '3xs',
  borderColor: 'border.default',
  borderWidth: 'default', // Migrated from 'base' (non-existent semantic) to 'default'
  py: 'inline.tight',
  px: 'inline.tight',
  color: 'surface.bg',
  fontFamily: 'brutalist',
  fontSize: 'xxs', // Migrated from typeMinus3 base token
  fontWeight: 'brutal',
  textTransform: 'uppercase',
  bg: 'accent.primary',
  borderStyle: 'solid',
})

const systemBadgeStyles = css({
  position: 'absolute',
  left: '3xs',
  bottom: 'sm',
  borderColor: 'border',
  borderWidth: 'default', // Migrated from 'base' (non-existent semantic) to 'default'
  py: 'inline.tight',
  px: 'inline.tight',
  color: 'text',
  fontFamily: 'brutalist',
  fontSize: 'xxs', // Migrated from typeMinus3 base token
  fontWeight: 'brutal',
  textTransform: 'uppercase',
  bg: 'accent.primary',
  borderStyle: 'solid',
})

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * DesignThumbnail - Thumbnail card for saved logo designs
 *
 * Features:
 * - Displays design preview image or fallback
 * - Shows design name and save timestamp
 * - Action buttons: favorite, duplicate, delete
 * - Active state indicator
 * - System preset badge
 * - Click to load design and close gallery
 *
 * @example
 * ```tsx
 * <DesignThumbnail
 *   design={{
 *     id: 'abc123',
 *     name: 'My Logo',
 *     thumbnail: 'data:image/png...',
 *     timestamp: Date.now(),
 *     isFavorite: false,
 *     isSystemPreset: false,
 *   }}
 * />
 * ```
 */
export function DesignThumbnail({ design }: DesignThumbnailProps) {
  const loadDesign = usePresetsStore((state) => state.loadDesign)
  const deleteDesign = usePresetsStore((state) => state.deleteDesign)
  const toggleFavorite = usePresetsStore((state) => state.toggleFavorite)
  const duplicateDesign = usePresetsStore((state) => state.duplicateDesign)
  const activeDesignId = usePresetsStore((state) => state.activeDesignId)
  const toggleGallery = useUIStore((state) => state.toggleGallery)

  const isActive = activeDesignId === design.id

  const handleLoad = () => {
    loadDesign(design.id)
    toggleGallery()
  }

  return (
    <div
      className={`${containerStyles} ${isActive ? containerActiveStyles : ''}`}
      onClick={handleLoad}
    >
      {/* Thumbnail Image */}
      <div className={thumbnailAreaStyles}>
        {design.thumbnail ? (
          <img src={design.thumbnail} alt={design.name} className={thumbnailImageStyles} />
        ) : (
          <div className={noPreviewStyles}>No Preview</div>
        )}
      </div>

      {/* Info */}
      <div className={infoSectionStyles}>
        <div className={nameStyles}>{design.name}</div>
        <div className={timestampStyles}>{new Date(design.timestamp).toLocaleDateString()}</div>
      </div>

      {/* Actions */}
      <div className={actionsContainerStyles} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => toggleFavorite(design.id)}
          className={`${favoriteButtonStyles} ${design.isFavorite ? favoriteButtonActiveStyles : ''}`}
          title='Toggle Favorite'
        >
          <Heart
            className={design.isFavorite ? favoriteIconActiveStyles : iconStyles}
            size={16}
            fill={design.isFavorite ? 'currentColor' : 'none'}
          />
        </button>

        {!design.isSystemPreset && (
          <>
            <button
              onClick={() => duplicateDesign(design.id)}
              className={actionButtonStyles}
              title='Duplicate'
            >
              <Copy className={iconStyles} size={16} />
            </button>

            <button
              onClick={() => {
                if (confirm(`Delete "${design.name}"?`)) {
                  deleteDesign(design.id)
                }
              }}
              className={deleteButtonStyles}
              title='Delete'
            >
              <Trash2 className={iconStyles} size={16} />
            </button>
          </>
        )}
      </div>

      {/* Active Badge */}
      {isActive && <div className={activeBadgeStyles}>Active</div>}

      {/* System Preset Badge */}
      {design.isSystemPreset && <div className={systemBadgeStyles}>System</div>}
    </div>
  )
}
