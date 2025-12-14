import { css } from 'styled-system/css'
import { useLogoStore } from '../../store/logoStore'
import { Button } from '../ui/Button'
import type { HSLColor } from '../../schemas/logoState.schema'

export function ColorTab() {
  const baseColor = useLogoStore((state) => state.baseColor)
  const setBaseColor = useLogoStore((state) => state.setBaseColor)
  const isTwoTone = useLogoStore((state) => state.twoToneDesign !== null)
  const enableTwoTone = useLogoStore((state) => state.enableTwoTone)
  const disableTwoTone = useLogoStore((state) => state.disableTwoTone)
  const setTwoToneFillColor = useLogoStore((state) => state.setTwoToneFillColor)
  const fillColorQ0 = useLogoStore(
    (state) =>
      state.twoToneDesign?.fillColorQuadrant0 || state.baseDesign.fillColorForFilledQuadrants
  )
  const fillColorQ3 = useLogoStore(
    (state) =>
      state.twoToneDesign?.fillColorQuadrant3 || state.baseDesign.fillColorForFilledQuadrants
  )

  const handleBaseColorChange = (channel: keyof HSLColor, value: number) => {
    setBaseColor({ ...baseColor, [channel]: value })
  }

  const handleFillColorChange = (quadrant: 0 | 3, channel: keyof HSLColor, value: number) => {
    const currentColor = quadrant === 0 ? fillColorQ0 : fillColorQ3
    setTwoToneFillColor(quadrant, { ...currentColor, [channel]: value })
  }

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        pt: 4,
      })}
    >
      {/* Base Color */}
      <div>
        <h3
          className={css({
            fontFamily: 'brutalist',
            fontWeight: 'brutal',
            fontSize: 'sm',
            textTransform: 'uppercase',
            mb: 3,
            color: 'panel.fg',
          })}
        >
          Base Color
        </h3>

        <div className={css({ display: 'flex', flexDirection: 'column', gap: 3 })}>
          <ColorSlider
            label='Hue'
            value={baseColor.h}
            max={360}
            onChange={(v) => handleBaseColorChange('h', v)}
          />
          <ColorSlider
            label='Saturation'
            value={baseColor.s}
            max={100}
            onChange={(v) => handleBaseColorChange('s', v)}
          />
          <ColorSlider
            label='Lightness'
            value={baseColor.l}
            max={100}
            onChange={(v) => handleBaseColorChange('l', v)}
          />
        </div>
      </div>

      {/* Two-Tone Toggle */}
      <div>
        <Button
          variant={isTwoTone ? 'primary' : 'secondary'}
          size='sm'
          onClick={() => (isTwoTone ? disableTwoTone() : enableTwoTone())}
          className={css({ width: '100%' })}
        >
          {isTwoTone ? 'Disable' : 'Enable'} Two-Tone
        </Button>
      </div>

      {/* Two-Tone Colors */}
      {isTwoTone && (
        <>
          <div>
            <h3
              className={css({
                fontFamily: 'brutalist',
                fontWeight: 'brutal',
                fontSize: 'sm',
                textTransform: 'uppercase',
                mb: 3,
                color: 'panel.fg',
              })}
            >
              Fill Color (Top-Left)
            </h3>

            <div className={css({ display: 'flex', flexDirection: 'column', gap: 3 })}>
              <ColorSlider
                label='Hue'
                value={fillColorQ0.h}
                max={360}
                onChange={(v) => handleFillColorChange(0, 'h', v)}
              />
              <ColorSlider
                label='Saturation'
                value={fillColorQ0.s}
                max={100}
                onChange={(v) => handleFillColorChange(0, 's', v)}
              />
              <ColorSlider
                label='Lightness'
                value={fillColorQ0.l}
                max={100}
                onChange={(v) => handleFillColorChange(0, 'l', v)}
              />
            </div>
          </div>

          <div>
            <h3
              className={css({
                fontFamily: 'brutalist',
                fontWeight: 'brutal',
                fontSize: 'sm',
                textTransform: 'uppercase',
                mb: 3,
                color: 'panel.fg',
              })}
            >
              Fill Color (Bottom-Right)
            </h3>

            <div className={css({ display: 'flex', flexDirection: 'column', gap: 3 })}>
              <ColorSlider
                label='Hue'
                value={fillColorQ3.h}
                max={360}
                onChange={(v) => handleFillColorChange(3, 'h', v)}
              />
              <ColorSlider
                label='Saturation'
                value={fillColorQ3.s}
                max={100}
                onChange={(v) => handleFillColorChange(3, 's', v)}
              />
              <ColorSlider
                label='Lightness'
                value={fillColorQ3.l}
                max={100}
                onChange={(v) => handleFillColorChange(3, 'l', v)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

interface ColorSliderProps {
  label: string
  value: number
  max: number
  onChange: (value: number) => void
}

function ColorSlider({ label, value, max, onChange }: ColorSliderProps) {
  return (
    <div>
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
          {label}
        </label>
        <span
          className={css({
            fontFamily: 'brutalist',
            fontWeight: 'brutal',
            fontSize: 'xs',
            color: 'panel.primary',
          })}
        >
          {Math.round(value)}
        </span>
      </div>

      <input
        type='range'
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
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
  )
}
