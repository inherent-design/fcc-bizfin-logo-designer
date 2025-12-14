import { css } from 'styled-system/css'
import { Panel } from '../ui/Panel'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { useUIStore } from '../../store/uiStore'
import { GalleryGrid } from '../gallery/GalleryGrid'
import { GalleryActions } from '../gallery/GalleryActions'

export function DesignGalleryDrawer() {
  const isGalleryOpen = useUIStore((state) => state.isGalleryOpen)
  const toggleGallery = useUIStore((state) => state.toggleGallery)
  const galleryFilter = useUIStore((state) => state.galleryFilter)
  const setGalleryFilter = useUIStore((state) => state.setGalleryFilter)

  if (!isGalleryOpen) {
    return (
      <Button
        variant='primary'
        className={css({
          position: 'absolute',
          bottom: { base: 4, tablet: 6 },
          right: { base: 4, tablet: 6 },
        })}
        onClick={toggleGallery}
      >
        <Icon name='folder' className={css({ width: 5, height: 5 })} />
        Gallery
      </Button>
    )
  }

  return (
    <div
      className={css({
        position: 'absolute',

        // Mobile/Tablet: full-screen overlay
        inset: { base: 0 },
        top: { desktop: 'auto' },
        left: { desktop: 0 },
        right: { desktop: 0 },
        bottom: { desktop: 0 },
        bg: { base: 'rgba(0, 0, 0, 0.5)', desktop: 'transparent' },
        p: { base: 4, desktop: 6 },
        display: { base: 'flex' },
        alignItems: { base: 'flex-end', desktop: 'stretch' },
      })}
      onClick={(e) => {
        if (e.target === e.currentTarget) toggleGallery()
      }}
    >
      <Panel
        className={css({
          width: '100%',
          maxHeight: { base: '80vh', desktop: '400px' },
          overflowY: { base: 'auto' },
        })}
      >
        <div
          className={css({
            p: 6,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          })}
        >
          {/* Header */}
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            })}
          >
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: 3,
              })}
            >
              <Icon
                name='folder'
                className={css({
                  width: 6,
                  height: 6,
                  color: 'panel.primary',
                })}
              />
              <h2
                className={css({
                  fontFamily: 'brutalist',
                  fontWeight: 'brutal',
                  fontSize: 'lg',
                  textTransform: 'uppercase',
                  color: 'panel.fg',
                })}
              >
                Design Gallery
              </h2>
            </div>

            <Button variant='ghost' size='sm' onClick={toggleGallery}>
              <Icon name='close' className={css({ width: 5, height: 5 })} />
            </Button>
          </div>

          {/* Filters */}
          <div
            className={css({
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
            })}
          >
            <Button
              variant={galleryFilter === 'all' ? 'primary' : 'ghost'}
              size='sm'
              onClick={() => setGalleryFilter('all')}
            >
              All
            </Button>
            <Button
              variant={galleryFilter === 'favorites' ? 'primary' : 'ghost'}
              size='sm'
              onClick={() => setGalleryFilter('favorites')}
            >
              <Icon name='heart' className={css({ width: 4, height: 4 })} />
              Favorites
            </Button>
            <Button
              variant={galleryFilter === 'recent' ? 'primary' : 'ghost'}
              size='sm'
              onClick={() => setGalleryFilter('recent')}
            >
              Recent
            </Button>
          </div>

          {/* Gallery Actions */}
          <GalleryActions />

          {/* Gallery Grid */}
          <GalleryGrid />
        </div>
      </Panel>
    </div>
  )
}
