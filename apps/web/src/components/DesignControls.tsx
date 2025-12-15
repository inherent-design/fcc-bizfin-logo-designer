// ============================================================================
// IMPORTS
// ============================================================================

// Panda CSS

// Types
import type { HSLColor, Vec2 } from '../schemas/logoState.schema'

// Components
import { ColorSettings } from './ColorSettings'
import { HistorySettings } from './HistorySettings'
import { LayoutSettings } from './LayoutSettings'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * DesignControls props
 */
interface DesignControlsProps {
  /** Base color for the logo */
  baseColor: HSLColor
  /** Base design configuration */
  baseDesign: {
    fillColorForFilledQuadrants: HSLColor
    elementColorOverBase: HSLColor
    elementColorOverFilledQuadrants: HSLColor
  }
  /** Two-tone design configuration (optional) */
  twoToneDesign: {
    fillColorQuadrant0: HSLColor
    fillColorQuadrant3: HSLColor
    uniqueElementColors: {
      elementColorOverQuadrant0Fill: HSLColor
      elementColorOverQuadrant3Fill: HSLColor
    } | null
  } | null
  /** Quadrant layout configuration */
  quadrants: Array<{
    position: number
    centerOffset: Vec2
    elementScale: number
  }>
  /** Current design name */
  currentDesignName: string
  /** Actions for managing design state */
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

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * DesignControls - Main design control container
 *
 * Features:
 * - Color settings management
 * - Layout settings management
 * - History and state management
 * - Responsive panel styling
 *
 * Layout:
 * - Mobile: No border/background (transparent)
 * - Desktop: Panel with border and background
 *
 * @example
 * ```tsx
 * <DesignControls
 *   baseColor={{ h: 210, s: 100, l: 50 }}
 *   baseDesign={baseDesign}
 *   twoToneDesign={twoToneDesign}
 *   quadrants={quadrants}
 *   currentDesignName="My Design"
 *   actions={actions}
 * />
 * ```
 */
export function DesignControls({
  baseColor,
  baseDesign,
  twoToneDesign,
  quadrants,
  currentDesignName,
  actions,
}: DesignControlsProps) {
  return (
    <>
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
    </>
  )
}
