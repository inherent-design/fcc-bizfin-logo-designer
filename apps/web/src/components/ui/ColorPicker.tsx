// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import { useState } from 'react'
import { HslColorPicker } from 'react-colorful'

// Base UI
import { Button } from '@base-ui/react/button'

// Panda CSS
import { css, cx } from '@styled-system/css'

// Recipes
import { buttonRecipe, colorPickerRecipe, inputRecipe } from '@styled-system/recipes'

// Types
import type { HSLColor } from '../../schemas/logoState.schema'

// Utils
import {
  hslToHex,
  hslToRgb,
  hslToString,
  parseColorString,
  rgbToHsl,
  rgbToString,
  type RGBColor,
} from '../../utils/colors'
import { componentLogger } from '../../utils/logger'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Main color picker component props
 */
interface ColorPickerProps {
  /** Current HSL color value */
  color: HSLColor
  /** Callback when color changes */
  onChange: (color: HSLColor) => void
  /** Optional label for the picker */
  label?: string
}

/**
 * Internal content component props
 */
interface ColorPickerContentProps {
  color: HSLColor
  rgb: RGBColor
  hex: string
  hslString: string
  rgbString: string
  toPickerFormat: (hsl: HSLColor) => { h: number; s: number; l: number }
  fromPickerFormat: (picker: { h: number; s: number; l: number }) => HSLColor
  handleHSLChange: (field: 'h' | 's' | 'l', value: string) => void
  handleHSLStringChange: (value: string) => void
  handleRGBChange: (field: 'r' | 'g' | 'b', value: string) => void
  handleRGBStringChange: (value: string) => void
  handleHexChange: (value: string) => void
  onChange: (color: HSLColor) => void
}

/**
 * Color input section props
 */
interface ColorInputSectionProps {
  label: string
  children: React.ReactNode
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert our HSLColor to react-colorful format
 */
function toPickerFormat(hsl: HSLColor): { h: number; s: number; l: number } {
  return { h: hsl.h, s: hsl.s, l: hsl.l }
}

/**
 * Convert react-colorful format to our HSLColor
 */
function fromPickerFormat(picker: { h: number; s: number; l: number }): HSLColor {
  return {
    h: Math.round(picker.h),
    s: Math.round(picker.s),
    l: Math.round(picker.l),
  }
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Reusable color input section wrapper
 */
function ColorInputSection({ label, children }: ColorInputSectionProps) {
  const classes = colorPickerRecipe()

  return (
    <div className={classes.sectionContainer}>
      <h3 className={classes.label}>{label}</h3>
      {children}
    </div>
  )
}

/**
 * HSL input fields (H, S, L individual inputs + full string)
 */
function HSLInputs({
  color,
  hslString,
  onFieldChange,
  onStringChange,
}: {
  color: HSLColor
  hslString: string
  onFieldChange: (field: 'h' | 's' | 'l', value: string) => void
  onStringChange: (value: string) => void
}) {
  const classes = colorPickerRecipe()
  const inputClasses = inputRecipe({ size: 'sm', type: 'number' })
  const textInputClasses = inputRecipe({ size: 'sm', type: 'text' })

  return (
    <ColorInputSection label='HSL'>
      <div className={classes.inputGrid}>
        <div>
          <label htmlFor='hsl-h' className={inputClasses.label}>
            H
          </label>
          <input
            id='hsl-h'
            type='number'
            min={0}
            max={360}
            value={color.h}
            onChange={(e) => onFieldChange('h', e.target.value)}
            className={inputClasses.input}
          />
        </div>
        <div>
          <label htmlFor='hsl-s' className={inputClasses.label}>
            S
          </label>
          <input
            id='hsl-s'
            type='number'
            min={0}
            max={100}
            value={color.s}
            onChange={(e) => onFieldChange('s', e.target.value)}
            className={inputClasses.input}
          />
        </div>
        <div>
          <label htmlFor='hsl-l' className={inputClasses.label}>
            L
          </label>
          <input
            id='hsl-l'
            type='number'
            min={0}
            max={100}
            value={color.l}
            onChange={(e) => onFieldChange('l', e.target.value)}
            className={inputClasses.input}
          />
        </div>
      </div>
      <input
        type='text'
        value={hslString}
        onChange={(e) => onStringChange(e.target.value)}
        className={cx(
          textInputClasses.input,
          css({
            fontFamily: 'mono',
          })
        )}
        placeholder='hsl(360, 100%, 50%)'
      />
    </ColorInputSection>
  )
}

/**
 * RGB input fields (R, G, B individual inputs + full string)
 */
function RGBInputs({
  rgb,
  rgbString,
  onFieldChange,
  onStringChange,
}: {
  rgb: RGBColor
  rgbString: string
  onFieldChange: (field: 'r' | 'g' | 'b', value: string) => void
  onStringChange: (value: string) => void
}) {
  const classes = colorPickerRecipe()
  const inputClasses = inputRecipe({ size: 'sm', type: 'number' })
  const textInputClasses = inputRecipe({ size: 'sm', type: 'text' })

  return (
    <ColorInputSection label='RGB'>
      <div className={classes.inputGrid}>
        <div>
          <label htmlFor='rgb-r' className={inputClasses.label}>
            R
          </label>
          <input
            id='rgb-r'
            type='number'
            min={0}
            max={255}
            value={rgb.r}
            onChange={(e) => onFieldChange('r', e.target.value)}
            className={inputClasses.input}
          />
        </div>
        <div>
          <label htmlFor='rgb-g' className={inputClasses.label}>
            G
          </label>
          <input
            id='rgb-g'
            type='number'
            min={0}
            max={255}
            value={rgb.g}
            onChange={(e) => onFieldChange('g', e.target.value)}
            className={inputClasses.input}
          />
        </div>
        <div>
          <label htmlFor='rgb-b' className={inputClasses.label}>
            B
          </label>
          <input
            id='rgb-b'
            type='number'
            min={0}
            max={255}
            value={rgb.b}
            onChange={(e) => onFieldChange('b', e.target.value)}
            className={inputClasses.input}
          />
        </div>
      </div>
      <input
        type='text'
        value={rgbString}
        onChange={(e) => onStringChange(e.target.value)}
        className={cx(
          textInputClasses.input,
          css({
            fontFamily: 'mono',
          })
        )}
        placeholder='rgb(255, 0, 0)'
      />
    </ColorInputSection>
  )
}

/**
 * HEX input field
 */
function HEXInput({ hex, onChange }: { hex: string; onChange: (value: string) => void }) {
  const inputClasses = inputRecipe({ size: 'sm', type: 'text' })

  return (
    <ColorInputSection label='HEX'>
      <input
        type='text'
        value={hex}
        onChange={(e) => onChange(e.target.value)}
        className={cx(
          inputClasses.input,
          css({
            fontFamily: 'mono',
            textTransform: 'uppercase',
          })
        )}
        placeholder='#FF0000'
        maxLength={7}
      />
    </ColorInputSection>
  )
}

/**
 * Internal content component - contains the actual color picker UI
 * Shared between mobile modal and desktop inline views
 */
function ColorPickerContent({
  color,
  rgb,
  hex,
  hslString,
  rgbString,
  handleHSLChange,
  handleHSLStringChange,
  handleRGBChange,
  handleRGBStringChange,
  handleHexChange,
  onChange,
}: ColorPickerContentProps) {
  const classes = colorPickerRecipe()

  return (
    <div className={classes.gridLayout}>
      {/* Left column: Visual color picker */}
      <div className={classes.pickerColumn}>
        <HslColorPicker
          className='color-picker'
          onChange={(newColor) => onChange(fromPickerFormat(newColor))}
          color={toPickerFormat(color)}
        />
      </div>

      {/* Right column: Input fields */}
      <div className={classes.inputsColumn}>
        <HSLInputs
          hslString={hslString}
          onFieldChange={handleHSLChange}
          onStringChange={handleHSLStringChange}
          color={color}
        />
        <RGBInputs
          rgb={rgb}
          rgbString={rgbString}
          onFieldChange={handleRGBChange}
          onStringChange={handleRGBStringChange}
        />
        <HEXInput hex={hex} onChange={handleHexChange} />
      </div>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * ColorPicker - Neo-brutalist color picker component
 *
 * Features:
 * - HSL, RGB, and HEX input modes
 * - Responsive: Mobile (modal) / Desktop (inline)
 * - Type-safe color conversions
 * - Neo-brutalist design tokens
 * - Base UI Button integration
 *
 * Layout:
 * - Mobile: Single column, stacked sections with modal overlay
 * - Desktop: Two-column grid (picker | inputs)
 *
 * @example
 * ```tsx
 * <ColorPicker
 *   label="Primary Color"
 *   color={{ h: 210, s: 100, l: 50 }}
 *   onChange={(color) => setColor(color)}
 * />
 * ```
 */
export function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const classes = colorPickerRecipe()

  // Convert HSL to other formats for display
  const rgb = hslToRgb(color)
  const hex = hslToHex(color)
  const hslString = hslToString(color)
  const rgbString = rgbToString(rgb)

  // Event handlers
  const handleHSLChange = (field: 'h' | 's' | 'l', value: string) => {
    const numValue = parseInt(value) || 0
    const newColor = { ...color }

    if (field === 'h') {
      newColor.h = Math.max(0, Math.min(360, numValue))
    } else {
      newColor[field] = Math.max(0, Math.min(100, numValue))
    }

    onChange(newColor)
  }

  const handleHSLStringChange = (value: string) => {
    const parsed = parseColorString(value)
    if (parsed) onChange(parsed)
  }

  const handleRGBChange = (field: 'r' | 'g' | 'b', value: string) => {
    const numValue = parseInt(value) || 0
    const clampedValue = Math.max(0, Math.min(255, numValue))
    const newRgb: RGBColor = { ...rgb, [field]: clampedValue }
    onChange(rgbToHsl(newRgb))
  }

  const handleRGBStringChange = (value: string) => {
    const parsed = parseColorString(value)
    if (parsed) onChange(parsed)
  }

  const handleHexChange = (value: string) => {
    const parsed = parseColorString(value)
    if (parsed) onChange(parsed)
  }

  return (
    <div className={classes.container}>
      {/* Optional label */}
      {label && <label className={classes.label}>{label}</label>}

      {/* Mobile: Color preview button (opens modal) */}
      <button
        onClick={() => {
          const newOpenState = !isOpen
          componentLogger.debug(
            {
              component: 'ColorPicker',
              action: newOpenState ? 'modal.open' : 'modal.close',
              color,
              label,
            },
            newOpenState ? 'Color picker modal opened' : 'Color picker modal closed'
          )
          setIsOpen(newOpenState)
        }}
        className={classes.trigger}
        style={{
          backgroundColor: `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
        }}
        aria-label={`Pick ${label || 'color'}`}
      />

      {/* Mobile: Modal overlay */}
      {isOpen && (
        <div className={classes.modalOverlay}>
          <div className={classes.modalContent}>
            <ColorPickerContent
              rgb={rgb}
              hex={hex}
              hslString={hslString}
              rgbString={rgbString}
              toPickerFormat={toPickerFormat}
              fromPickerFormat={fromPickerFormat}
              handleHSLChange={handleHSLChange}
              handleHSLStringChange={handleHSLStringChange}
              handleRGBChange={handleRGBChange}
              handleRGBStringChange={handleRGBStringChange}
              handleHexChange={handleHexChange}
              onChange={onChange}
              color={color}
            />
            <Button
              className={buttonRecipe({ variant: 'primary', size: 'sm' })}
              onClick={() => {
                componentLogger.debug(
                  { component: 'ColorPicker', action: 'modal.done', color },
                  'User clicked Done button'
                )
                setIsOpen(false)
              }}
            >
              Done
            </Button>
          </div>
        </div>
      )}

      {/* Desktop: Inline view */}
      <div className={classes.desktopContainer}>
        <ColorPickerContent
          rgb={rgb}
          hex={hex}
          hslString={hslString}
          rgbString={rgbString}
          toPickerFormat={toPickerFormat}
          fromPickerFormat={fromPickerFormat}
          handleHSLChange={handleHSLChange}
          handleHSLStringChange={handleHSLStringChange}
          handleRGBChange={handleRGBChange}
          handleRGBStringChange={handleRGBStringChange}
          handleHexChange={handleHexChange}
          onChange={onChange}
          color={color}
        />
      </div>
    </div>
  )
}
