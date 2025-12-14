import { css } from 'styled-system/css'
import { useLogoStore } from '../../store/logoStore'
import { Input } from '../ui/Input'

const QUADRANT_LABELS = ['Top-Left', 'Top-Right', 'Bottom-Right', 'Bottom-Left']

export function LayoutTab() {
  const quadrants = useLogoStore((state) => state.quadrants)
  const setElementScale = useLogoStore((state) => state.setElementScale)
  const setCenterOffset = useLogoStore((state) => state.setCenterOffset)

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        pt: 4,
      })}
    >
      {quadrants.map((quadrant, index) => (
        <div
          key={index}
          className={css({
            p: 4,
            border: '2px solid',
            borderColor: 'panel.border',
            bg: 'white',
          })}
        >
          <div
            className={css({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            })}
          >
            <h3
              className={css({
                fontFamily: 'brutalist',
                fontWeight: 'brutal',
                fontSize: 'sm',
                textTransform: 'uppercase',
                color: 'panel.fg',
              })}
            >
              {QUADRANT_LABELS[index]}
            </h3>

            <div
              className={css({
                px: 2,
                py: 1,
                bg: quadrant.isFilled ? 'panel.primary' : 'transparent',
                border: '2px solid',
                borderColor: 'panel.border',
                fontFamily: 'brutalist',
                fontWeight: 'bold',
                fontSize: '2xs',
                textTransform: 'uppercase',
                color: quadrant.isFilled ? 'white' : 'panel.fg',
              })}
            >
              {quadrant.isFilled ? 'Filled' : 'Unfilled'}
            </div>
          </div>

          <div
            className={css({
              fontFamily: 'brutalist',
              fontSize: 'xs',
              mb: 3,
              color: 'panel.fg',
              opacity: 0.7,
              textTransform: 'capitalize',
            })}
          >
            Element: {quadrant.elementId}
          </div>

          {/* Scale Slider */}
          <div className={css({ mb: 3 })}>
            <div
              className={css({
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2,
              })}
            >
              <label
                className={css({
                  fontFamily: 'brutalist',
                  fontWeight: 'bold',
                  fontSize: 'xs',
                  textTransform: 'uppercase',
                  color: 'panel.fg',
                })}
              >
                Scale
              </label>
              <span
                className={css({
                  fontFamily: 'brutalist',
                  fontWeight: 'brutal',
                  fontSize: 'xs',
                  color: 'panel.primary',
                })}
              >
                {quadrant.elementScale.toFixed(2)}
              </span>
            </div>

            <input
              type='range'
              min={0.5}
              max={2}
              step={0.1}
              value={quadrant.elementScale}
              onChange={(e) => setElementScale(index, Number(e.target.value))}
              className={css({
                width: '100%',
                height: '8px',
                bg: 'panel.border',
                outline: 'none',
                cursor: 'pointer',

                '&::-webkit-slider-thumb': {
                  appearance: 'none',
                  width: '20px',
                  height: '20px',
                  bg: 'panel.primary',
                  border: '2px solid',
                  borderColor: 'panel.border',
                  cursor: 'pointer',
                },

                '&::-moz-range-thumb': {
                  width: '20px',
                  height: '20px',
                  bg: 'panel.primary',
                  border: '2px solid',
                  borderColor: 'panel.border',
                  cursor: 'pointer',
                },
              })}
            />
          </div>

          {/* Position Offsets */}
          <div className={css({ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 })}>
            <div>
              <label
                className={css({
                  fontFamily: 'brutalist',
                  fontWeight: 'bold',
                  fontSize: 'xs',
                  textTransform: 'uppercase',
                  color: 'panel.fg',
                  mb: 1,
                  display: 'block',
                })}
              >
                X Offset
              </label>
              <Input
                type='number'
                value={quadrant.centerOffset.x}
                onChange={(e) =>
                  setCenterOffset(index, {
                    ...quadrant.centerOffset,
                    x: Number(e.target.value),
                  })
                }
                className={css({ width: '100%' })}
              />
            </div>

            <div>
              <label
                className={css({
                  fontFamily: 'brutalist',
                  fontWeight: 'bold',
                  fontSize: 'xs',
                  textTransform: 'uppercase',
                  color: 'panel.fg',
                  mb: 1,
                  display: 'block',
                })}
              >
                Y Offset
              </label>
              <Input
                type='number'
                value={quadrant.centerOffset.y}
                onChange={(e) =>
                  setCenterOffset(index, {
                    ...quadrant.centerOffset,
                    y: Number(e.target.value),
                  })
                }
                className={css({ width: '100%' })}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
