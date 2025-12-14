import { css } from 'styled-system/css'
import { usePresetsStore, type SavedDesign } from '../../store/presetsStore'
import { useUIStore } from '../../store/uiStore'
import { Icon } from '../ui/Icon'

interface DesignThumbnailProps {
  design: SavedDesign
}

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
      className={css({
        position: 'relative',
        border: '4px solid',
        borderColor: isActive ? 'panel.primary' : 'panel.border',
        bg: 'white',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 100ms',

        _hover: {
          transform: 'scale(1.05)',
          borderColor: 'panel.primary',
        },
      })}
      onClick={handleLoad}
    >
      {/* Thumbnail Image */}
      <div
        className={css({
          width: '100%',
          aspectRatio: '1/1',
          bg: 'world.bg',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        })}
      >
        {design.thumbnail ? (
          <img
            src={design.thumbnail}
            alt={design.name}
            className={css({
              width: '80%',
              height: '80%',
              objectFit: 'contain',
            })}
          />
        ) : (
          <div
            className={css({
              fontFamily: 'brutalist',
              fontSize: 'xs',
              color: 'panel.fg',
              opacity: 0.3,
            })}
          >
            No Preview
          </div>
        )}
      </div>

      {/* Info */}
      <div
        className={css({
          p: 2,
          bg: 'panel.bg',
          borderTop: '2px solid',
          borderColor: 'panel.border',
        })}
      >
        <div
          className={css({
            fontFamily: 'brutalist',
            fontWeight: 'bold',
            fontSize: 'xs',
            color: 'panel.fg',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            mb: 1,
          })}
        >
          {design.name}
        </div>

        <div
          className={css({
            fontFamily: 'brutalist',
            fontSize: '2xs',
            color: 'panel.fg',
            opacity: 0.6,
          })}
        >
          {new Date(design.timestamp).toLocaleDateString()}
        </div>
      </div>

      {/* Actions */}
      <div
        className={css({
          position: 'absolute',
          top: 2,
          right: 2,
          display: 'flex',
          gap: 1,
          opacity: 0,
          transition: 'opacity 100ms',

          _groupHover: {
            opacity: 1,
          },
        })}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => toggleFavorite(design.id)}
          className={css({
            p: 1,
            bg: design.isFavorite ? 'neo.warning' : 'white',
            border: '2px solid',
            borderColor: 'panel.border',
            cursor: 'pointer',

            _hover: {
              bg: 'neo.warning',
            },
          })}
          title='Toggle Favorite'
        >
          <Icon
            name='heart'
            className={css({
              width: 4,
              height: 4,
              color: design.isFavorite ? 'white' : 'panel.border',
            })}
          />
        </button>

        {!design.isSystemPreset && (
          <>
            <button
              onClick={() => duplicateDesign(design.id)}
              className={css({
                p: 1,
                bg: 'white',
                border: '2px solid',
                borderColor: 'panel.border',
                cursor: 'pointer',

                _hover: {
                  bg: 'neo.secondary',
                },
              })}
              title='Duplicate'
            >
              <Icon
                name='copy'
                className={css({
                  width: 4,
                  height: 4,
                  color: 'panel.border',
                })}
              />
            </button>

            <button
              onClick={() => {
                if (confirm(`Delete "${design.name}"?`)) {
                  deleteDesign(design.id)
                }
              }}
              className={css({
                p: 1,
                bg: 'white',
                border: '2px solid',
                borderColor: 'panel.border',
                cursor: 'pointer',

                _hover: {
                  bg: 'neo.warning',
                },
              })}
              title='Delete'
            >
              <Icon
                name='trash'
                className={css({
                  width: 4,
                  height: 4,
                  color: 'panel.border',
                })}
              />
            </button>
          </>
        )}
      </div>

      {/* Active Badge */}
      {isActive && (
        <div
          className={css({
            position: 'absolute',
            top: 2,
            left: 2,
            px: 2,
            py: 1,
            bg: 'panel.primary',
            border: '2px solid',
            borderColor: 'panel.border',
            fontFamily: 'brutalist',
            fontWeight: 'brutal',
            fontSize: '2xs',
            textTransform: 'uppercase',
            color: 'white',
          })}
        >
          Active
        </div>
      )}

      {/* System Preset Badge */}
      {design.isSystemPreset && (
        <div
          className={css({
            position: 'absolute',
            bottom: 12,
            left: 2,
            px: 2,
            py: 1,
            bg: 'neo.accent',
            border: '2px solid',
            borderColor: 'panel.border',
            fontFamily: 'brutalist',
            fontWeight: 'brutal',
            fontSize: '2xs',
            textTransform: 'uppercase',
            color: 'panel.fg',
          })}
        >
          System
        </div>
      )}
    </div>
  )
}
