import type { HSLColor, Vec2 } from '../schemas/logoState.schema'
import { ColorSettings } from './ColorSettings'
import { HistorySettings } from './HistorySettings'
import { LayoutSettings } from './LayoutSettings'

// Props interface using hybrid pattern
interface DesignControlsProps {
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
  quadrants: Array<{
    position: number
    centerOffset: Vec2
    elementScale: number
  }>
  currentDesignName: string

  // Actions (grouped)
  actions: {
    // Color actions
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

    // Layout actions
    setCenterOffset: (position: number, offset: Vec2) => void
    setElementScale: (position: number, scale: number) => void

    // History actions
    exportState: () => string
    importState: (json: string) => void
    resetToDefault: () => void
  }
}

export function DesignControls({
  baseColor,
  baseDesign,
  twoToneDesign,
  quadrants,
  currentDesignName,
  actions,
}: DesignControlsProps) {
  return (
    <div className='lg:bg-base-200 lg:rounded-2xl lg:p-6 space-y-8'>
      <ColorSettings
        baseColor={baseColor}
        baseDesign={baseDesign}
        twoToneDesign={twoToneDesign}
        actions={{
          setBaseColor: actions.setBaseColor,
          setBaseFillColor: actions.setBaseFillColor,
          setBaseElementColorOverBase: actions.setBaseElementColorOverBase,
          setBaseElementColorOverFilledQuadrants: actions.setBaseElementColorOverFilledQuadrants,
          enableTwoTone: actions.enableTwoTone,
          disableTwoTone: actions.disableTwoTone,
          setTwoToneFillColor: actions.setTwoToneFillColor,
          enableUniqueElementColors: actions.enableUniqueElementColors,
          disableUniqueElementColors: actions.disableUniqueElementColors,
          setUniqueElementColor: actions.setUniqueElementColor,
        }}
      />

      <LayoutSettings
        quadrants={quadrants}
        actions={{
          setCenterOffset: actions.setCenterOffset,
          setElementScale: actions.setElementScale,
        }}
      />

      <HistorySettings
        currentDesignName={currentDesignName}
        actions={{
          exportState: actions.exportState,
          importState: actions.importState,
          resetToDefault: actions.resetToDefault,
        }}
      />
    </div>
  )
}
