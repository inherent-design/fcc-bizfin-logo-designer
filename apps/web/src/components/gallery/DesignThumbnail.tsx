// ============================================================================
// IMPORTS
// ============================================================================

// Panda CSS
import { css } from 'styled-system/css'

// Types
import type { SavedDesign } from '@/store/presetsStore'

// Utils
import { usePresetsStore } from '@/store/presetsStore'
import { useUIStore } from '@/store/uiStore'

// Components
import { Icon } from '@/components/ui/Icon'

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
  border: '{borderWidths.brutal.DEFAULT} solid',
  bg: 'panel.bg',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'fast',
  _hover: {
    transform: 'scaleHover',
    borderColor: 'panel.primary',
  },
})

const containerActiveStyles = css({
  borderColor: 'panel.primary',
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
  fontSize: 'xs',
  color: 'panel.fg',
  opacity: 'disabled',
})

const infoSectionStyles = css({
  p: 2,
  bg: 'panel.bg',
  borderTop: '{borderWidths.brutal.inset} solid',
  borderColor: 'panel.border',
})

const nameStyles = css({
  fontFamily: 'brutalist',
  fontWeight: 'bold',
  fontSize: 'xs',
  color: 'panel.fg',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  mb: 1,
})

const timestampStyles = css({
  fontFamily: 'brutalist',
  fontSize: '2xs',
  color: 'panel.fg',
  opacity: 'subtle',
})

const actionsContainerStyles = css({
  position: 'absolute',
  top: 2,
  right: 2,
  display: 'flex',
  gap: 1,
  opacity: 0,
  transition: 'fast',
  _groupHover: {
    opacity: 1,
  },
})

const actionButtonStyles = css({
  p: 1,
  bg: 'panel.bg',
  border: '{borderWidths.brutal.inset} solid',
  borderColor: 'panel.border',
  cursor: 'pointer',
  _hover: {
    bg: 'neo.secondary',
  },
})

const favoriteButtonStyles = css({
  p: 1,
  border: '{borderWidths.brutal.inset} solid',
  borderColor: 'panel.border',
  cursor: 'pointer',
  _hover: {
    bg: 'neo.warning',
  },
})

const favoriteButtonActiveStyles = css({
  bg: 'neo.warning',
})

const deleteButtonStyles = css({
  p: 1,
  bg: 'panel.bg',
  border: '{borderWidths.brutal.inset} solid',
  borderColor: 'panel.border',
  cursor: 'pointer',
  _hover: {
    bg: 'neo.warning',
  },
})

const iconStyles = css({
  width: 4,
  height: 4,
  color: 'panel.border',
})

const favoriteIconActiveStyles = css({
  width: 4,
  height: 4,
  color: 'panel.bg',
})

const activeBadgeStyles = css({
  position: 'absolute',
  top: 2,
  left: 2,
  px: 2,
  py: 1,
  bg: 'panel.primary',
  border: '{borderWidths.brutal.inset} solid',
  borderColor: 'panel.border',
  fontFamily: 'brutalist',
  fontWeight: 'brutal',
  fontSize: '2xs',
  textTransform: 'uppercase',
  color: 'panel.bg',
})

const systemBadgeStyles = css({
  position: 'absolute',
  bottom: 12,
  left: 2,
  px: 2,
  py: 1,
  bg: 'neo.accent',
  border: '{borderWidths.brutal.inset} solid',
  borderColor: 'panel.border',
  fontFamily: 'brutalist',
  fontWeight: 'brutal',
  fontSize: '2xs',
  textTransform: 'uppercase',
  color: 'panel.fg',
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
            name='heart'
            className={design.isFavorite ? favoriteIconActiveStyles : iconStyles}
          />
        </button>

        {!design.isSystemPreset && (
          <>
            <button
              onClick={() => duplicateDesign(design.id)}
              className={actionButtonStyles}
              title='Duplicate'
            >
              <Icon name='copy' className={iconStyles} />
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
              <Icon name='trash' className={iconStyles} />
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
