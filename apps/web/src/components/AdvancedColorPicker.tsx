// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import { useState } from 'react'
import { HslColorPicker } from 'react-colorful'

// Panda CSS
import { css } from 'styled-system/css'

// Types
import type { HSLColor } from '../schemas/logoState.schema'

// Utils
import {
  hslToHex,
  hslToRgb,
  hslToString,
  parseColorString,
  rgbToHsl,
  rgbToString,
  type RGBColor,
} from '../utils/colors'

// Components
import { Button } from './ui/Button'
import { FormLabel } from './ui/FormLabel'
import { Input } from './ui/Input'
import { SectionHeader } from './ui/SectionHeader'

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
  gap: 3,
})

const labelStyles = css({
  fontSize: 'sm',
  fontWeight: 'bold',
  fontFamily: 'brutalist',
  color: 'panel.fg',
  display: 'block',
  textTransform: 'uppercase',
  letterSpacing: 'wider',
})

const mobileButtonStyles = css({
  display: { base: 'block', desktop: 'none' },
  width: '100%',
  height: '12',
  border: '{borderWidths.brutal} solid',
  borderColor: 'panel.border',
  boxShadow: 'brutal',
  cursor: 'pointer',
  transition: 'fast',
  _hover: {
    transform: 'translate(2px, 2px)',
    boxShadow: '2px 2px 0 {colors.panel.border}',
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
  bg: 'overlay.backdrop',
})

const modalContentStyles = css({
  bg: 'panel.bg',
  border: '{borderWidths.brutal} solid',
  borderColor: 'panel.border',
  boxShadow: 'brutalLg',
  p: 6,
  m: 4,
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
  gap: 6,
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
  border: '{borderWidths.brutal} solid',
  borderColor: 'component.colorPicker.pickerBorder',
  boxShadow: 'brutalInset',
  p: 3,
  bg: 'component.colorPicker.pickerBg',
})

const inputsColumnStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  minWidth: 0,
})

const sectionContainerStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
})

const inputGridStyles = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 2,
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
  mt: 4,
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
}: {
  color: HSLColor
  hslString: string
  onFieldChange: (field: 'h' | 's' | 'l', value: string) => void
  onStringChange: (value: string) => void
}) {
  return (
    <ColorInputSection label='HSL'>
      <div className={inputGridStyles}>
        <div>
          <FormLabel htmlFor='hsl-h'>H</FormLabel>
          <Input
            id='hsl-h'
            type='number'
            min={0}
            max={360}
            value={color.h}
            onChange={(e) => onFieldChange('h', e.target.value)}
            className={fullWidthInputStyles}
          />
        </div>
        <div>
          <FormLabel htmlFor='hsl-s'>S</FormLabel>
          <Input
            id='hsl-s'
            type='number'
            min={0}
            max={100}
            value={color.s}
            onChange={(e) => onFieldChange('s', e.target.value)}
            className={fullWidthInputStyles}
          />
        </div>
        <div>
          <FormLabel htmlFor='hsl-l'>L</FormLabel>
          <Input
            id='hsl-l'
            type='number'
            min={0}
            max={100}
            value={color.l}
            onChange={(e) => onFieldChange('l', e.target.value)}
            className={fullWidthInputStyles}
          />
        </div>
      </div>
      <Input
        type='text'
        value={hslString}
        onChange={(e) => onStringChange(e.target.value)}
        className={monoInputStyles}
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
  return (
    <ColorInputSection label='RGB'>
      <div className={inputGridStyles}>
        <div>
          <FormLabel htmlFor='rgb-r'>R</FormLabel>
          <Input
            id='rgb-r'
            type='number'
            min={0}
            max={255}
            value={rgb.r}
            onChange={(e) => onFieldChange('r', e.target.value)}
            className={fullWidthInputStyles}
          />
        </div>
        <div>
          <FormLabel htmlFor='rgb-g'>G</FormLabel>
          <Input
            id='rgb-g'
            type='number'
            min={0}
            max={255}
            value={rgb.g}
            onChange={(e) => onFieldChange('g', e.target.value)}
            className={fullWidthInputStyles}
          />
        </div>
        <div>
          <FormLabel htmlFor='rgb-b'>B</FormLabel>
          <Input
            id='rgb-b'
            type='number'
            min={0}
            max={255}
            value={rgb.b}
            onChange={(e) => onFieldChange('b', e.target.value)}
            className={fullWidthInputStyles}
          />
        </div>
      </div>
      <Input
        type='text'
        value={rgbString}
        onChange={(e) => onStringChange(e.target.value)}
        className={monoInputStyles}
        placeholder='rgb(255, 0, 0)'
      />
    </ColorInputSection>
  )
}

/**
 * HEX input field
 */
function HEXInput({ hex, onChange }: { hex: string; onChange: (value: string) => void }) {
  return (
    <ColorInputSection label='HEX'>
      <Input
        type='text'
        value={hex}
        onChange={(e) => onChange(e.target.value)}
        className={upperMonoInputStyles}
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
}: AdvancedColorPickerContentProps) {
  return (
    <div className={gridLayoutStyles}>
      {/* Left column: Visual color picker */}
      <div className={pickerColumnStyles}>
        <div className={pickerWrapperStyles}>
          <HslColorPicker
            color={toPickerFormat(color)}
            onChange={(newColor) => onChange(fromPickerFormat(newColor))}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Right column: Input fields */}
      <div className={inputsColumnStyles}>
        <HSLInputs
          color={color}
          hslString={hslString}
          onFieldChange={handleHSLChange}
          onStringChange={handleHSLStringChange}
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
              color={color}
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
            />
            <Button
              onClick={() => setIsOpen(false)}
              variant='primary'
              size='sm'
              className={doneButtonStyles}
            >
              Done
            </Button>
          </div>
        </div>
      )}

      {/* Desktop: Inline view */}
      <div className={desktopContainerStyles}>
        <AdvancedColorPickerContent
          color={color}
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
        />
      </div>
    </div>
  )
}
