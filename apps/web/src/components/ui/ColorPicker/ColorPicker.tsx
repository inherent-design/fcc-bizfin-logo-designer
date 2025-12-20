// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import { useId, useState } from 'react'
import { HslColorPicker } from 'react-colorful'

// Panda CSS
import { css } from 'styled-system/css'

// Types
import type { HSLColor } from '@/schemas/logoState.schema'

// Utils
import {
  hslToHex,
  hslToRgb,
  hslToString,
  parseColorString,
  rgbToHsl,
  rgbToString,
  type RGBColor,
} from '@/utils/colors'

// Components
import { Button } from '../Button/Button'
import { FormLabel } from '../FormLabel/FormLabel'
import { Input } from '../Input/Input'
import { SectionHeader } from '../SectionHeader/SectionHeader'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Main color picker component props
 */
interface AdvancedColorPickerProps {
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
interface AdvancedColorPickerContentProps {
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
  idPrefix: string
}

/**
 * Color input section props
 */
interface ColorInputSectionProps {
  label: string
  children: React.ReactNode
}

// ============================================================================
// STYLES
// ============================================================================

const containerStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'inline.normal',
})

const labelStyles = css({
  textStyle: 'brutalistLabel',
  color: 'panel.fg',
  display: 'block',
})

const mobileButtonStyles = css({
  display: { base: 'block', desktop: 'none' },
  width: '100%',
  height: '12',
  borderWidth: 'brutal',
  borderStyle: 'solid',
  borderColor: 'panel.border',
  boxShadow: 'brutal',
  cursor: 'pointer',
  transitionDuration: 'fast',
  transitionProperty: 'all',
  _hover: {
    transform: 'translate(2px, 2px)',
    boxShadow: 'brutalInset',
  },
  _active: {
    transform: 'translate(4px, 4px)',
    boxShadow: 'none',
  },
})

const modalOverlayStyles = css({
  display: { base: 'flex', desktop: 'none' },
  position: 'fixed',
  inset: 0,
  zIndex: 'modal',
  alignItems: 'center',
  justifyContent: 'center',
  bg: 'overlay',
})

const modalContentStyles = css({
  bg: 'panel.bg',
  borderWidth: 'brutal',
  borderStyle: 'solid',
  borderColor: 'panel.border',
  boxShadow: 'brutalLg',
  p: 'inset.loose',
  m: 'stack.normal',
  maxWidth: 'md',
  width: '100%',
  maxHeight: '90vh',
  overflowY: 'auto',
})

const desktopContainerStyles = css({
  display: { base: 'none', desktop: 'block' },
})

const gridLayoutStyles = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: '1fr 1fr' },
  gap: 'stack.loose',
  maxWidth: '100%',
})

const pickerColumnStyles = css({
  display: 'flex',
  alignItems: 'start',
  position: 'relative',
  minWidth: 0,
})

const pickerWrapperStyles = css({
  width: '100%',
  maxWidth: '300px',
  borderWidth: 'brutal',
  borderStyle: 'solid',
  borderColor: 'panel.border',
  boxShadow: 'brutalInset',
  p: 'inset.tight',
  bg: 'panel.bg',
})

const inputsColumnStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'stack.normal',
  minWidth: 0,
})

const sectionContainerStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'inline.tight',
})

const inputGridStyles = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 'inline.tight',
})

const fullWidthInputStyles = css({
  width: '100%',
})

const monoInputStyles = css({
  width: '100%',
  fontFamily: 'mono', // Uses Panda token fonts.mono
})

const upperMonoInputStyles = css({
  width: '100%',
  fontFamily: 'mono', // Uses Panda token fonts.mono
  textTransform: 'uppercase',
})

const doneButtonStyles = css({
  mt: 'stack.normal',
  width: '100%',
})

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
  return (
    <div className={sectionContainerStyles}>
      <SectionHeader>{label}</SectionHeader>
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
  idPrefix,
}: {
  color: HSLColor
  hslString: string
  onFieldChange: (field: 'h' | 's' | 'l', value: string) => void
  onStringChange: (value: string) => void
  idPrefix: string
}) {
  const hId = `${idPrefix}-hsl-h`
  const sId = `${idPrefix}-hsl-s`
  const lId = `${idPrefix}-hsl-l`
  const stringId = `${idPrefix}-hsl-string`

  return (
    <ColorInputSection label='HSL'>
      <div className={inputGridStyles}>
        <div>
          <FormLabel htmlFor={hId}>H</FormLabel>
          <Input
            className={fullWidthInputStyles}
            id={hId}
            name={hId}
            type='number'
            min={0}
            max={360}
            value={color.h}
            onChange={(e) => onFieldChange('h', e.target.value)}
          />
        </div>
        <div>
          <FormLabel htmlFor={sId}>S</FormLabel>
          <Input
            className={fullWidthInputStyles}
            id={sId}
            name={sId}
            type='number'
            min={0}
            max={100}
            value={color.s}
            onChange={(e) => onFieldChange('s', e.target.value)}
          />
        </div>
        <div>
          <FormLabel htmlFor={lId}>L</FormLabel>
          <Input
            className={fullWidthInputStyles}
            id={lId}
            name={lId}
            type='number'
            min={0}
            max={100}
            value={color.l}
            onChange={(e) => onFieldChange('l', e.target.value)}
          />
        </div>
      </div>
      <Input
        className={monoInputStyles}
        id={stringId}
        name={stringId}
        type='text'
        value={hslString}
        onChange={(e) => onStringChange(e.target.value)}
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
  idPrefix,
}: {
  rgb: RGBColor
  rgbString: string
  onFieldChange: (field: 'r' | 'g' | 'b', value: string) => void
  onStringChange: (value: string) => void
  idPrefix: string
}) {
  const rId = `${idPrefix}-rgb-r`
  const gId = `${idPrefix}-rgb-g`
  const bId = `${idPrefix}-rgb-b`
  const stringId = `${idPrefix}-rgb-string`

  return (
    <ColorInputSection label='RGB'>
      <div className={inputGridStyles}>
        <div>
          <FormLabel htmlFor={rId}>R</FormLabel>
          <Input
            className={fullWidthInputStyles}
            id={rId}
            name={rId}
            type='number'
            min={0}
            max={255}
            value={rgb.r}
            onChange={(e) => onFieldChange('r', e.target.value)}
          />
        </div>
        <div>
          <FormLabel htmlFor={gId}>G</FormLabel>
          <Input
            className={fullWidthInputStyles}
            id={gId}
            name={gId}
            type='number'
            min={0}
            max={255}
            value={rgb.g}
            onChange={(e) => onFieldChange('g', e.target.value)}
          />
        </div>
        <div>
          <FormLabel htmlFor={bId}>B</FormLabel>
          <Input
            className={fullWidthInputStyles}
            id={bId}
            name={bId}
            type='number'
            min={0}
            max={255}
            value={rgb.b}
            onChange={(e) => onFieldChange('b', e.target.value)}
          />
        </div>
      </div>
      <Input
        className={monoInputStyles}
        id={stringId}
        name={stringId}
        type='text'
        value={rgbString}
        onChange={(e) => onStringChange(e.target.value)}
        placeholder='rgb(255, 0, 0)'
      />
    </ColorInputSection>
  )
}

/**
 * HEX input field
 */
function HEXInput({
  hex,
  onChange,
  idPrefix,
}: {
  hex: string
  onChange: (value: string) => void
  idPrefix: string
}) {
  const hexId = `${idPrefix}-hex`

  return (
    <ColorInputSection label='HEX'>
      <Input
        className={upperMonoInputStyles}
        id={hexId}
        name={hexId}
        type='text'
        value={hex}
        onChange={(e) => onChange(e.target.value)}
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
function AdvancedColorPickerContent({
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
  idPrefix,
}: AdvancedColorPickerContentProps) {
  return (
    <div className={gridLayoutStyles}>
      {/* Left column: Visual color picker */}
      <div className={pickerColumnStyles}>
        <div className={pickerWrapperStyles}>
          <HslColorPicker
            onChange={(newColor) => onChange(fromPickerFormat(newColor))}
            style={{ width: '100%' }}
            color={toPickerFormat(color)}
          />
        </div>
      </div>

      {/* Right column: Input fields */}
      <div className={inputsColumnStyles}>
        <HSLInputs
          hslString={hslString}
          onFieldChange={handleHSLChange}
          onStringChange={handleHSLStringChange}
          idPrefix={idPrefix}
          color={color}
        />
        <RGBInputs
          rgb={rgb}
          rgbString={rgbString}
          onFieldChange={handleRGBChange}
          onStringChange={handleRGBStringChange}
          idPrefix={idPrefix}
        />
        <HEXInput hex={hex} onChange={handleHexChange} idPrefix={idPrefix} />
      </div>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * AdvancedColorPicker - Neo-brutalist color picker component
 *
 * Features:
 * - HSL, RGB, and HEX input modes
 * - Responsive: Mobile (modal) / Desktop (inline)
 * - Type-safe color conversions
 * - Neo-brutalist design tokens
 *
 * Layout:
 * - Mobile: Single column, stacked sections with modal overlay
 * - Desktop: Two-column grid (picker | inputs)
 *
 * @example
 * ```tsx
 * <AdvancedColorPicker
 *   label="Primary Color"
 *   color={{ h: 210, s: 100, l: 50 }}
 *   onChange={(color) => setColor(color)}
 * />
 * ```
 */
export function AdvancedColorPicker({ color, onChange, label }: AdvancedColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const uniqueId = useId()

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
    <div className={containerStyles}>
      {/* Optional label */}
      {label && <label className={labelStyles}>{label}</label>}

      {/* Mobile: Color preview button (opens modal) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={mobileButtonStyles}
        style={{
          backgroundColor: `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
        }}
        aria-label={`Pick ${label || 'color'}`}
      />

      {/* Mobile: Modal overlay */}
      {isOpen && (
        <div className={modalOverlayStyles}>
          <div className={modalContentStyles}>
            <AdvancedColorPickerContent
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
              idPrefix={uniqueId}
              color={color}
            />
            <Button
              className={doneButtonStyles}
              onClick={() => setIsOpen(false)}
              variant='primary'
              size='sm'
            >
              Done
            </Button>
          </div>
        </div>
      )}

      {/* Desktop: Inline view */}
      <div className={desktopContainerStyles}>
        <AdvancedColorPickerContent
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
          idPrefix={uniqueId}
          color={color}
        />
      </div>
    </div>
  )
}
