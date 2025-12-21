// ============================================================================
// IMPORTS
// ============================================================================

// Panda CSS
import { css } from 'styled-system/css'

// Types
import type { SavedDesign } from '@/stores/presetsStore'

// Utils
import { usePresetsStore } from '@/stores/presetsStore'
import { useUIStore } from '@/stores/uiStore'

// Components
import { Icon } from '../ui/Icon/Icon'

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
  position: 'relative',
  borderWidth: 'brutal',
  borderStyle: 'solid',
  borderColor: 'border.default',
  bg: 'surface.bg',
  overflow: 'hidden',
  cursor: 'pointer',
  transitionDuration: 'fast',
  transitionProperty: 'all',
  _hover: {
    transform: 'scale(1.02)',
    borderColor: 'accent.primary',
  },
})

const containerActiveStyles = css({
  borderColor: 'accent.primary',
})

const thumbnailAreaStyles = css({
  width: '100%',
  aspectRatio: '1/1',
  bg: 'world.bg',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
})

const thumbnailImageStyles = css({
  width: '80%',
  height: '80%',
  objectFit: 'contain',
})

const noPreviewStyles = css({
  fontFamily: 'brutalist',
  fontSize: 'typeMinus2',
  color: 'surface.fg',
  opacity: 'disabled',
})

const infoSectionStyles = css({
  p: 'inline.tight',
  bg: 'surface.bg',
  borderTopWidth: 'hairline',
  borderTopStyle: 'solid',
  borderColor: 'border.default',
})

const nameStyles = css({
  fontFamily: 'brutalist',
  fontWeight: 'bold',
  fontSize: 'typeMinus2',
  color: 'surface.fg',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  mb: 'stack.tight',
})

const timestampStyles = css({
  fontFamily: 'brutalist',
  fontSize: 'typeMinus3',
  color: 'surface.fg',
  opacity: 'subtle',
})

const actionsContainerStyles = css({
  position: 'absolute',
  top: '3xs',
  right: '3xs',
  display: 'flex',
  gap: 'inline.tight',
  opacity: 0,
  transitionDuration: 'fast',
  transitionProperty: 'opacity',
  _groupHover: {
    opacity: 1,
  },
})

const actionButtonStyles = css({
  p: 'inline.tight',
  bg: 'surface.bg',
  borderWidth: 'base',
  borderStyle: 'solid',
  borderColor: 'border',
  cursor: 'pointer',
  _hover: {
    bg: 'bg.hover',
  },
})

const favoriteButtonStyles = css({
  p: 'inline.tight',
  borderWidth: 'base',
  borderStyle: 'solid',
  borderColor: 'border',
  cursor: 'pointer',
  _hover: {
    bg: 'accent.solid',
  },
})

const favoriteButtonActiveStyles = css({
  bg: 'accent.warning',
})

const deleteButtonStyles = css({
  p: 'inline.tight',
  bg: 'surface.bg',
  borderWidth: 'base',
  borderStyle: 'solid',
  borderColor: 'border',
  cursor: 'pointer',
  _hover: {
    bg: 'accent.solid',
  },
})

const iconStyles = css({
  width: 4,
  height: 4,
  color: 'border.default',
})

const favoriteIconActiveStyles = css({
  width: 4,
  height: 4,
  color: 'surface.bg',
})

const activeBadgeStyles = css({
  position: 'absolute',
  top: '3xs',
  left: '3xs',
  px: 'inline.tight',
  py: 'inline.tight',
  bg: 'accent.primary',
  borderWidth: 'base',
  borderStyle: 'solid',
  borderColor: 'border.default',
  fontFamily: 'brutalist',
  fontWeight: 'brutal',
  fontSize: 'typeMinus3',
  textTransform: 'uppercase',
  color: 'surface.bg',
})

const systemBadgeStyles = css({
  position: 'absolute',
  bottom: 'sm',
  left: '3xs',
  px: 'inline.tight',
  py: 'inline.tight',
  bg: 'accent.primary',
  borderWidth: 'base',
  borderStyle: 'solid',
  borderColor: 'border',
  fontFamily: 'brutalist',
  fontWeight: 'brutal',
  fontSize: 'typeMinus3',
  textTransform: 'uppercase',
  color: 'text',
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
          <Icon
            className={design.isFavorite ? favoriteIconActiveStyles : iconStyles}
            name='heart'
          />
        </button>

        {!design.isSystemPreset && (
          <>
            <button
              onClick={() => duplicateDesign(design.id)}
              className={actionButtonStyles}
              title='Duplicate'
            >
              <Icon className={iconStyles} name='documentduplicate' />
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
              <Icon className={iconStyles} name='trash' />
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
