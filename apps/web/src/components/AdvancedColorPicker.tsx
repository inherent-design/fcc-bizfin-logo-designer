import { useState } from 'react'
import { HslColorPicker } from 'react-colorful'
import type { HSLColor } from '../schemas/logoState.schema'
import {
  hslToRgb,
  rgbToHsl,
  hslToHex,
  hslToString,
  rgbToString,
  parseColorString,
  type RGBColor,
} from '../utils/colors'

interface AdvancedColorPickerProps {
  color: HSLColor
  onChange: (color: HSLColor) => void
  label?: string
}

export function AdvancedColorPicker({ color, onChange, label }: AdvancedColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Convert HSL to other formats for display
  const rgb = hslToRgb(color)
  const hex = hslToHex(color)
  const hslString = hslToString(color)
  const rgbString = rgbToString(rgb)

  // Convert react-colorful format to/from our HSLColor
  const toPickerFormat = (hsl: HSLColor) => ({ h: hsl.h, s: hsl.s, l: hsl.l })
  const fromPickerFormat = (picker: { h: number; s: number; l: number }): HSLColor => ({
    h: Math.round(picker.h),
    s: Math.round(picker.s),
    l: Math.round(picker.l),
  })

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
    if (parsed) {
      onChange(parsed)
    }
  }

  const handleRGBChange = (field: 'r' | 'g' | 'b', value: string) => {
    const numValue = parseInt(value) || 0
    const clampedValue = Math.max(0, Math.min(255, numValue))
    const newRgb: RGBColor = { ...rgb, [field]: clampedValue }
    onChange(rgbToHsl(newRgb))
  }

  const handleRGBStringChange = (value: string) => {
    const parsed = parseColorString(value)
    if (parsed) {
      onChange(parsed)
    }
  }

  const handleHexChange = (value: string) => {
    const parsed = parseColorString(value)
    if (parsed) {
      onChange(parsed)
    }
  }

  return (
    <div className='space-y-3'>
      {label && <label className='text-sm font-medium text-base-content/70 block'>{label}</label>}

      {/* Mobile: Color preview button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='lg:hidden w-full h-12 rounded-lg border-2 border-base-content/20 shadow-sm'
        style={{
          backgroundColor: `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
        }}
        aria-label={`Pick ${label || 'color'}`}
      />

      {/* Mobile: Popover */}
      {isOpen && (
        <div className='lg:hidden fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='bg-base-200 rounded-xl shadow-xl p-6 m-4 max-w-md w-full max-h-[90vh] overflow-y-auto'>
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
            <button onClick={() => setIsOpen(false)} className='mt-4 w-full btn btn-sm btn-primary'>
              Done
            </button>
          </div>
        </div>
      )}

      {/* Desktop: Inline */}
      <div className='hidden lg:block'>
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

function AdvancedColorPickerContent({
  color,
  rgb,
  hex,
  hslString,
  rgbString,
  toPickerFormat,
  fromPickerFormat,
  handleHSLChange,
  handleHSLStringChange,
  handleRGBChange,
  handleRGBStringChange,
  handleHexChange,
  onChange,
}: AdvancedColorPickerContentProps) {
  return (
    <div className='grid grid-cols-2 gap-6'>
      {/* Left column: Color picker */}
      <div className='flex items-start'>
        <HslColorPicker
          color={toPickerFormat(color)}
          onChange={(newColor) => onChange(fromPickerFormat(newColor))}
          className='w-full'
        />
      </div>

      {/* Right column: Input groups */}
      <div className='space-y-4'>
        {/* HSL Section */}
        <div className='space-y-2'>
          <div className='text-xs font-semibold uppercase tracking-wider text-base-content/60'>
            HSL
          </div>
          <div className='grid grid-cols-3 gap-2'>
            <div>
              <label className='text-xs text-base-content/50 block mb-1'>H</label>
              <input
                type='number'
                min='0'
                max='360'
                value={color.h}
                onChange={(e) => handleHSLChange('h', e.target.value)}
                className='input input-xs input-bordered w-full'
              />
            </div>
            <div>
              <label className='text-xs text-base-content/50 block mb-1'>S</label>
              <input
                type='number'
                min='0'
                max='100'
                value={color.s}
                onChange={(e) => handleHSLChange('s', e.target.value)}
                className='input input-xs input-bordered w-full'
              />
            </div>
            <div>
              <label className='text-xs text-base-content/50 block mb-1'>L</label>
              <input
                type='number'
                min='0'
                max='100'
                value={color.l}
                onChange={(e) => handleHSLChange('l', e.target.value)}
                className='input input-xs input-bordered w-full'
              />
            </div>
          </div>
          <input
            type='text'
            value={hslString}
            onChange={(e) => handleHSLStringChange(e.target.value)}
            className='input input-xs input-bordered w-full font-mono'
            placeholder='hsl(360, 100%, 50%)'
          />
        </div>

        {/* RGB Section */}
        <div className='space-y-2'>
          <div className='text-xs font-semibold uppercase tracking-wider text-base-content/60'>
            RGB
          </div>
          <div className='grid grid-cols-3 gap-2'>
            <div>
              <label className='text-xs text-base-content/50 block mb-1'>R</label>
              <input
                type='number'
                min='0'
                max='255'
                value={rgb.r}
                onChange={(e) => handleRGBChange('r', e.target.value)}
                className='input input-xs input-bordered w-full'
              />
            </div>
            <div>
              <label className='text-xs text-base-content/50 block mb-1'>G</label>
              <input
                type='number'
                min='0'
                max='255'
                value={rgb.g}
                onChange={(e) => handleRGBChange('g', e.target.value)}
                className='input input-xs input-bordered w-full'
              />
            </div>
            <div>
              <label className='text-xs text-base-content/50 block mb-1'>B</label>
              <input
                type='number'
                min='0'
                max='255'
                value={rgb.b}
                onChange={(e) => handleRGBChange('b', e.target.value)}
                className='input input-xs input-bordered w-full'
              />
            </div>
          </div>
          <input
            type='text'
            value={rgbString}
            onChange={(e) => handleRGBStringChange(e.target.value)}
            className='input input-xs input-bordered w-full font-mono'
            placeholder='rgb(255, 0, 0)'
          />
        </div>

        {/* HEX Section */}
        <div className='space-y-2'>
          <div className='text-xs font-semibold uppercase tracking-wider text-base-content/60'>
            HEX
          </div>
          <input
            type='text'
            value={hex}
            onChange={(e) => handleHexChange(e.target.value)}
            className='input input-xs input-bordered w-full font-mono uppercase'
            placeholder='#FF0000'
            maxLength={7}
          />
        </div>
      </div>
    </div>
  )
}
