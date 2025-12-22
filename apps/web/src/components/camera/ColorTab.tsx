// ============================================================================
// IMPORTS
// ============================================================================

// Panda CSS
import { css } from 'styled-system/css'

// Types
import type { HSLColor } from '@/schemas/logoState.schema'

// Utils
import { componentLogger } from '@/utils/logger'

// Components
import { ColorPicker } from '@/components/ui/ColorPicker'

// Recipes
import { sectionHeaderRecipe } from '@/recipes/sectionHeader.recipe'

// Zustand
import { useLogoStore } from '@/stores/logoStore'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * ColorSettings internal component props
 */
interface ColorSettingsProps {
  /** Current base color value */
  baseColor: HSLColor
  /** Base design color configuration */
  baseDesign: {
    /** Fill color for filled quadrants */
    fillColorForFilledQuadrants: HSLColor
    /** Element color displayed over base */
    elementColorOverBase: HSLColor
    /** Element color displayed over filled quadrants */
    elementColorOverFilledQuadrants: HSLColor
  }
  /** Two-tone design configuration (null if disabled) */
  twoToneDesign: {
    /** Fill color for quadrant 0 (top-left) */
    fillColorQuadrant0: HSLColor
    /** Fill color for quadrant 3 (bottom-right) */
    fillColorQuadrant3: HSLColor
    /** Unique element colors per quadrant (null if shared) */
    uniqueElementColors: {
      /** Element color over quadrant 0 fill */
      elementColorOverQuadrant0Fill: HSLColor
      /** Element color over quadrant 3 fill */
      elementColorOverQuadrant3Fill: HSLColor
    } | null
  } | null
  /** Color manipulation actions */
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

// ============================================================================
// STYLES
// ============================================================================

const checkboxStyles = css({
  cursor: 'pointer',
})

const colorPickerGroupStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'stack.normal',
})

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * ColorSettings - Internal color configuration panel
 *
 * Features:
 * - Base color control (shield & laurel)
 * - Quadrant fill colors (1-tone or 2-tone modes)
 * - Element colors (over base and over filled areas)
 * - Unique element colors per quadrant (2-tone mode only)
 *
 * Modes:
 * - 1-tone: Single fill color, 2 element colors
 * - 2-tone: Two fill colors (TL/BR quadrants), 2-3 element colors
 * - 2-tone + unique: Two fill colors, 3 element colors (per quadrant)
 */
function ColorSettings({
  baseColor,
  baseDesign,
  twoToneDesign,
  actions,
}: ColorSettingsProps) {
  const isTwoTone = !!twoToneDesign
  const hasUniqueElementColors = !!twoToneDesign?.uniqueElementColors
  const sectionClasses = sectionHeaderRecipe()

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'stack.loose',
      })}
    >
      {/* Base Color */}
      <div>
        <div className={sectionClasses.root}>
          <h3 className={sectionClasses.title}>Base // Shield + Laurel + Handshake</h3>
        </div>
        <ColorPicker
          label='Shield & Laurel'
          onChange={(newColor: HSLColor) => {
            componentLogger.debug({ from: baseColor, to: newColor }, 'Base color changed')
            actions.setBaseColor(newColor)
          }}
          color={baseColor}
        />
      </div>

      {/* Quadrant Fills */}
      <div>
        <div className={sectionClasses.root}>
          <h3 className={sectionClasses.title}>Quadrant</h3>
          <div className={sectionClasses.actions}>
            <input
              id='two-tone-checkbox'
              name='two-tone-mode'
              type='checkbox'
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
              className={checkboxStyles}
            />
          </div>
        </div>

        {!isTwoTone ? (
          // 1-tone mode: single fill color
          <ColorPicker
            label='Fill'
            onChange={(newColor: HSLColor) => {
              componentLogger.debug({ to: newColor }, 'Fill color changed')
              actions.setBaseFillColor(newColor)
            }}
            color={baseDesign.fillColorForFilledQuadrants}
          />
        ) : (
          // 2-tone mode: two separate fill colors
          <div className={colorPickerGroupStyles}>
            <ColorPicker
              label='Quad 1 (TL)'
              onChange={(newColor: HSLColor) => {
                componentLogger.debug({ quadrant: 0, to: newColor }, 'Two-tone fill color changed')
                actions.setTwoToneFillColor(0, newColor)
              }}
              color={twoToneDesign!.fillColorQuadrant0}
            />
            <ColorPicker
              label='Quad 2 (BR)'
              onChange={(newColor: HSLColor) => {
                componentLogger.debug({ quadrant: 3, to: newColor }, 'Two-tone fill color changed')
                actions.setTwoToneFillColor(3, newColor)
              }}
              color={twoToneDesign!.fillColorQuadrant3}
            />
          </div>
        )}
      </div>

      {/* Element Colors */}
      <div>
        <div className={sectionClasses.root}>
          <h3 className={sectionClasses.title}>Element</h3>
          {isTwoTone && (
            <div className={sectionClasses.actions}>
              <input
                id='unique-element-colors-checkbox'
                name='unique-element-colors'
                type='checkbox'
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
                className={checkboxStyles}
              />
            </div>
          )}
        </div>

        {!isTwoTone ? (
          // 1-tone mode: 2 element colors
          <div className={colorPickerGroupStyles}>
            <ColorPicker
              label='Over Base'
              onChange={(newColor: HSLColor) => {
                componentLogger.debug({ to: newColor }, 'Element color over base changed')
                actions.setBaseElementColorOverBase(newColor)
              }}
              color={baseDesign.elementColorOverBase}
            />
            <ColorPicker
              label='Over Filled'
              onChange={(newColor: HSLColor) => {
                componentLogger.debug({ to: newColor }, 'Element color over filled changed')
                actions.setBaseElementColorOverFilledQuadrants(newColor)
              }}
              color={baseDesign.elementColorOverFilledQuadrants}
            />
          </div>
        ) : !hasUniqueElementColors ? (
          // 2-tone without unique colors: 2 element colors (shared for filled quadrants)
          <div className={colorPickerGroupStyles}>
            <ColorPicker
              label='Over Base'
              onChange={(newColor: HSLColor) => {
                componentLogger.debug({ to: newColor }, 'Element color over base changed')
                actions.setBaseElementColorOverBase(newColor)
              }}
              color={baseDesign.elementColorOverBase}
            />
            <ColorPicker
              label='Over Filled'
              onChange={(newColor: HSLColor) => {
                componentLogger.debug({ to: newColor }, 'Element color over filled changed')
                actions.setBaseElementColorOverFilledQuadrants(newColor)
              }}
              color={baseDesign.elementColorOverFilledQuadrants}
            />
          </div>
        ) : (
          // 2-tone with unique colors: 3 colors (separate for each filled quadrant)
          <div className={colorPickerGroupStyles}>
            <ColorPicker
              label='Over Base'
              onChange={(newColor: HSLColor) => {
                componentLogger.debug({ to: newColor }, 'Element color over base changed')
                actions.setBaseElementColorOverBase(newColor)
              }}
              color={baseDesign.elementColorOverBase}
            />
            <ColorPicker
              label='Over Quad 1'
              onChange={(newColor: HSLColor) => {
                componentLogger.debug({ quadrant: 0, to: newColor }, 'Unique element color changed')
                actions.setUniqueElementColor(0, newColor)
              }}
              color={twoToneDesign!.uniqueElementColors!.elementColorOverQuadrant0Fill}
            />
            <ColorPicker
              label='Over Quad 2'
              onChange={(newColor: HSLColor) => {
                componentLogger.debug({ quadrant: 3, to: newColor }, 'Unique element color changed')
                actions.setUniqueElementColor(3, newColor)
              }}
              color={twoToneDesign!.uniqueElementColors!.elementColorOverQuadrant3Fill}
            />
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT (Container)
// ============================================================================

/**
 * ColorTab - Production color configuration panel for logo designer
 *
 * Connects to Zustand logoStore for state management.
 * Renders ColorSettings with store data and actions.
 *
 * @example
 * ```tsx
 * <ColorTab />
 * ```
 */
export function ColorTab() {
  // Zustand selectors
  const baseColor = useLogoStore((state) => state.baseColor)
  const baseDesign = useLogoStore((state) => state.baseDesign)
  const twoToneDesign = useLogoStore((state) => state.twoToneDesign)

  // Actions
  const actions = {
    setBaseColor: useLogoStore((state) => state.setBaseColor),
    setBaseFillColor: useLogoStore((state) => state.setBaseFillColor),
    setBaseElementColorOverBase: useLogoStore((state) => state.setBaseElementColorOverBase),
    setBaseElementColorOverFilledQuadrants: useLogoStore(
      (state) => state.setBaseElementColorOverFilledQuadrants
    ),
    enableTwoTone: useLogoStore((state) => state.enableTwoTone),
    disableTwoTone: useLogoStore((state) => state.disableTwoTone),
    setTwoToneFillColor: useLogoStore((state) => state.setTwoToneFillColor),
    enableUniqueElementColors: useLogoStore((state) => state.enableUniqueElementColors),
    disableUniqueElementColors: useLogoStore((state) => state.disableUniqueElementColors),
    setUniqueElementColor: useLogoStore((state) => state.setUniqueElementColor),
  }

  return (
    <ColorSettings
      baseColor={baseColor}
      baseDesign={baseDesign}
      twoToneDesign={twoToneDesign}
      actions={actions}
    />
  )
}
