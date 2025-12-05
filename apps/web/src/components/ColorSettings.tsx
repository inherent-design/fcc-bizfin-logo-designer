import type { HSLColor } from '../schemas/logoState.schema'
import { componentLogger } from '../utils/logger'
import { AdvancedColorPicker } from './AdvancedColorPicker'

// Section Header Component
function SectionHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div>
      <h3 className='text-xs font-semibold uppercase tracking-wider text-base-content/60'>
        {title}
      </h3>
      {children}
    </div>
  )
}

// Props interface using hybrid pattern
interface ColorSettingsProps {
  // State values (read-only)
  baseColor: HSLColor
  baseDesign: {
    fillColorForFilledQuadrants: HSLColor
    elementColorOverBase: HSLColor
    elementColorOverFilledQuadrants: HSLColor
  }
  twoToneDesign: {
    fillColorQuadrant0: HSLColor
    fillColorQuadrant3: HSLColor
    uniqueElementColors: {
      elementColorOverQuadrant0Fill: HSLColor
      elementColorOverQuadrant3Fill: HSLColor
    } | null
  } | null

  // Actions (grouped)
  actions: {
    setBaseColor: (color: HSLColor) => void
    setBaseFillColor: (color: HSLColor) => void
    setBaseElementColorOverBase: (color: HSLColor) => void
    setBaseElementColorOverFilledQuadrants: (color: HSLColor) => void
    enableTwoTone: () => void
    disableTwoTone: () => void
    setTwoToneFillColor: (quadrant: 0 | 3, color: HSLColor) => void
    enableUniqueElementColors: () => void
    disableUniqueElementColors: () => void
    setUniqueElementColor: (quadrant: 0 | 3, color: HSLColor) => void
  }
}

export function ColorSettings({
  baseColor,
  baseDesign,
  twoToneDesign,
  actions,
}: ColorSettingsProps) {
  const isTwoTone = !!twoToneDesign
  const hasUniqueElementColors = !!twoToneDesign?.uniqueElementColors

  return (
    <div>
      {/* Base Color */}
      <div>
        <SectionHeader title='Base' />
        <AdvancedColorPicker
          label='Shield & Laurel'
          color={baseColor}
          onChange={(newColor) => {
            componentLogger.debug({ from: baseColor, to: newColor }, 'Base color changed')
            actions.setBaseColor(newColor)
          }}
        />
      </div>

      {/* Quadrant Fills */}
      <div>
        <SectionHeader title='Quadrant'>
          <input
            type='checkbox'
            className='toggle toggle-sm'
            checked={isTwoTone}
            onChange={(e) => {
              componentLogger.debug(
                {
                  enabled: e.target.checked,
                },
                'Two-tone mode toggled'
              )
              if (e.target.checked) {
                actions.enableTwoTone()
              } else {
                actions.disableTwoTone()
              }
            }}
            aria-label='Enable 2-tone mode'
          />
        </SectionHeader>

        {!isTwoTone ? (
          // 1-tone mode: single fill color
          <AdvancedColorPicker
            label='Fill'
            color={baseDesign.fillColorForFilledQuadrants}
            onChange={(newColor) => {
              componentLogger.debug({ to: newColor }, 'Fill color changed')
              actions.setBaseFillColor(newColor)
            }}
          />
        ) : (
          // 2-tone mode: two separate fill colors
          <div className='space-y-4'>
            <AdvancedColorPicker
              label='Quad 1 (TL)'
              color={twoToneDesign!.fillColorQuadrant0}
              onChange={(newColor) => {
                componentLogger.debug({ quadrant: 0, to: newColor }, 'Two-tone fill color changed')
                actions.setTwoToneFillColor(0, newColor)
              }}
            />
            <AdvancedColorPicker
              label='Quad 2 (BR)'
              color={twoToneDesign!.fillColorQuadrant3}
              onChange={(newColor) => {
                componentLogger.debug({ quadrant: 3, to: newColor }, 'Two-tone fill color changed')
                actions.setTwoToneFillColor(3, newColor)
              }}
            />
          </div>
        )}
      </div>

      {/* Element Colors */}
      <div>
        <SectionHeader title='Element'>
          {isTwoTone && (
            <input
              type='checkbox'
              className='toggle toggle-sm'
              checked={hasUniqueElementColors}
              onChange={(e) => {
                componentLogger.debug(
                  {
                    enabled: e.target.checked,
                  },
                  'Unique element colors toggled'
                )
                if (e.target.checked) {
                  actions.enableUniqueElementColors()
                } else {
                  actions.disableUniqueElementColors()
                }
              }}
              aria-label='Enable unique element colors'
            />
          )}
        </SectionHeader>

        {!isTwoTone ? (
          // 1-tone mode: 2 element colors
          <div className='space-y-4'>
            <AdvancedColorPicker
              label='Over Base'
              color={baseDesign.elementColorOverBase}
              onChange={(newColor) => {
                componentLogger.debug({ to: newColor }, 'Element color over base changed')
                actions.setBaseElementColorOverBase(newColor)
              }}
            />
            <AdvancedColorPicker
              label='Over Filled'
              color={baseDesign.elementColorOverFilledQuadrants}
              onChange={(newColor) => {
                componentLogger.debug({ to: newColor }, 'Element color over filled changed')
                actions.setBaseElementColorOverFilledQuadrants(newColor)
              }}
            />
          </div>
        ) : !hasUniqueElementColors ? (
          // 2-tone without unique colors: 2 element colors (shared for filled quadrants)
          <div className='space-y-4'>
            <AdvancedColorPicker
              label='Over Base'
              color={baseDesign.elementColorOverBase}
              onChange={(newColor) => {
                componentLogger.debug({ to: newColor }, 'Element color over base changed')
                actions.setBaseElementColorOverBase(newColor)
              }}
            />
            <AdvancedColorPicker
              label='Over Filled'
              color={baseDesign.elementColorOverFilledQuadrants}
              onChange={(newColor) => {
                componentLogger.debug({ to: newColor }, 'Element color over filled changed')
                actions.setBaseElementColorOverFilledQuadrants(newColor)
              }}
            />
          </div>
        ) : (
          // 2-tone with unique colors: 3 colors (separate for each filled quadrant)
          <div className='space-y-4'>
            <AdvancedColorPicker
              label='Over Base'
              color={baseDesign.elementColorOverBase}
              onChange={(newColor) => {
                componentLogger.debug({ to: newColor }, 'Element color over base changed')
                actions.setBaseElementColorOverBase(newColor)
              }}
            />
            <AdvancedColorPicker
              label='Over Quad 1'
              color={twoToneDesign!.uniqueElementColors!.elementColorOverQuadrant0Fill}
              onChange={(newColor) => {
                componentLogger.debug({ quadrant: 0, to: newColor }, 'Unique element color changed')
                actions.setUniqueElementColor(0, newColor)
              }}
            />
            <AdvancedColorPicker
              label='Over Quad 2'
              color={twoToneDesign!.uniqueElementColors!.elementColorOverQuadrant3Fill}
              onChange={(newColor) => {
                componentLogger.debug({ quadrant: 3, to: newColor }, 'Unique element color changed')
                actions.setUniqueElementColor(3, newColor)
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
