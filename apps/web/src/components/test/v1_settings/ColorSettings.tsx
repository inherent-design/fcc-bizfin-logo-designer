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
import { AdvancedColorPicker } from '@/components/ui/ColorPicker/ColorPicker'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * ColorSettings component props using hybrid pattern
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

/**
 * Section header props
 */
interface SectionHeaderProps {
  title: string
  children?: React.ReactNode
}

// ============================================================================
// STYLES
// ============================================================================

const sectionHeaderTitleStyles = css({
  fontSize: 'xs',
  fontFamily: 'brutalist',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: 'wider',
  color: 'surface.fg',
  opacity: 'subtle',
})

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
 * Section header with optional child content (e.g., toggle checkbox)
 */
function SectionHeader({ title, children }: SectionHeaderProps) {
  return (
    <div>
      <h3 className={sectionHeaderTitleStyles}>{title}</h3>
      {children}
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * ColorSettings - Color configuration panel for logo design
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
 *
 * @example
 * ```tsx
 * <ColorSettings
 *   baseColor={{ h: 210, s: 100, l: 50 }}
 *   baseDesign={...}
 *   twoToneDesign={null}
 *   actions={{
 *     setBaseColor: (color) => setState({ baseColor: color }),
 *     // ... other actions
 *   }}
 * />
 * ```
 */
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
        <SectionHeader title='Base // Shield + Laurel + Handshake' />
        <AdvancedColorPicker
          label='Shield & Laurel'
          onChange={(newColor) => {
            componentLogger.debug({ from: baseColor, to: newColor }, 'Base color changed')
            actions.setBaseColor(newColor)
          }}
          color={baseColor}
        />
      </div>

      {/* Quadrant Fills */}
      <div>
        <SectionHeader title='Quadrant'>
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
        </SectionHeader>

        {!isTwoTone ? (
          // 1-tone mode: single fill color
          <AdvancedColorPicker
            label='Fill'
            onChange={(newColor) => {
              componentLogger.debug({ to: newColor }, 'Fill color changed')
              actions.setBaseFillColor(newColor)
            }}
            color={baseDesign.fillColorForFilledQuadrants}
          />
        ) : (
          // 2-tone mode: two separate fill colors
          <div className={colorPickerGroupStyles}>
            <AdvancedColorPicker
              label='Quad 1 (TL)'
              onChange={(newColor) => {
                componentLogger.debug({ quadrant: 0, to: newColor }, 'Two-tone fill color changed')
                actions.setTwoToneFillColor(0, newColor)
              }}
              color={twoToneDesign!.fillColorQuadrant0}
            />
            <AdvancedColorPicker
              label='Quad 2 (BR)'
              onChange={(newColor) => {
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
        <SectionHeader title='Element'>
          {isTwoTone && (
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
          )}
        </SectionHeader>

        {!isTwoTone ? (
          // 1-tone mode: 2 element colors
          <div className={colorPickerGroupStyles}>
            <AdvancedColorPicker
              label='Over Base'
              onChange={(newColor) => {
                componentLogger.debug({ to: newColor }, 'Element color over base changed')
                actions.setBaseElementColorOverBase(newColor)
              }}
              color={baseDesign.elementColorOverBase}
            />
            <AdvancedColorPicker
              label='Over Filled'
              onChange={(newColor) => {
                componentLogger.debug({ to: newColor }, 'Element color over filled changed')
                actions.setBaseElementColorOverFilledQuadrants(newColor)
              }}
              color={baseDesign.elementColorOverFilledQuadrants}
            />
          </div>
        ) : !hasUniqueElementColors ? (
          // 2-tone without unique colors: 2 element colors (shared for filled quadrants)
          <div className={colorPickerGroupStyles}>
            <AdvancedColorPicker
              label='Over Base'
              onChange={(newColor) => {
                componentLogger.debug({ to: newColor }, 'Element color over base changed')
                actions.setBaseElementColorOverBase(newColor)
              }}
              color={baseDesign.elementColorOverBase}
            />
            <AdvancedColorPicker
              label='Over Filled'
              onChange={(newColor) => {
                componentLogger.debug({ to: newColor }, 'Element color over filled changed')
                actions.setBaseElementColorOverFilledQuadrants(newColor)
              }}
              color={baseDesign.elementColorOverFilledQuadrants}
            />
          </div>
        ) : (
          // 2-tone with unique colors: 3 colors (separate for each filled quadrant)
          <div className={colorPickerGroupStyles}>
            <AdvancedColorPicker
              label='Over Base'
              onChange={(newColor) => {
                componentLogger.debug({ to: newColor }, 'Element color over base changed')
                actions.setBaseElementColorOverBase(newColor)
              }}
              color={baseDesign.elementColorOverBase}
            />
            <AdvancedColorPicker
              label='Over Quad 1'
              onChange={(newColor) => {
                componentLogger.debug({ quadrant: 0, to: newColor }, 'Unique element color changed')
                actions.setUniqueElementColor(0, newColor)
              }}
              color={twoToneDesign!.uniqueElementColors!.elementColorOverQuadrant0Fill}
            />
            <AdvancedColorPicker
              label='Over Quad 2'
              onChange={(newColor) => {
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
