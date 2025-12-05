import Color from 'color'
import type { HSLColor } from '../schemas/logoState.schema'

/**
 * Convert HSL to hex string (for color inputs that need hex)
 */
export function hslToHex(color: HSLColor): string {
  const { h, s, l } = color
  const hDecimal = l / 100
  const a = (s * Math.min(hDecimal, 1 - hDecimal)) / 100

  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0')
  }

  return `#${f(0)}${f(8)}${f(4)}`
}

/**
 * Convert hex to HSL
 */
export function hexToHSL(hex: string): HSLColor {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return { h: 0, s: 0, l: 0 }

  const r = parseInt(result[1], 16) / 255
  const g = parseInt(result[2], 16) / 255
  const b = parseInt(result[3], 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

/**
 * Lighten or darken an HSL color
 */
export function adjustLightness(color: HSLColor, amount: number): HSLColor {
  return {
    ...color,
    l: Math.max(0, Math.min(100, color.l + amount)),
  }
}

/**
 * Increase or decrease saturation
 */
export function adjustSaturation(color: HSLColor, amount: number): HSLColor {
  return {
    ...color,
    s: Math.max(0, Math.min(100, color.s + amount)),
  }
}

/**
 * Check if a color is light (useful for determining text color)
 */
export function isLightColor(color: HSLColor): boolean {
  return color.l > 50
}

/**
 * Get contrasting text color (black or white) for given background
 */
export function getContrastTextColor(backgroundColor: HSLColor): string {
  return isLightColor(backgroundColor) ? '#000000' : '#ffffff'
}

/**
 * RGB color type
 */
export interface RGBColor {
  r: number
  g: number
  b: number
}

/**
 * Convert HSL to RGB using color library
 */
export function hslToRgb(color: HSLColor): RGBColor {
  const rgb = Color.hsl(color.h, color.s, color.l).rgb().object()
  return {
    r: Math.round(rgb.r),
    g: Math.round(rgb.g),
    b: Math.round(rgb.b),
  }
}

/**
 * Convert RGB to HSL using color library
 */
export function rgbToHsl(color: RGBColor): HSLColor {
  const hsl = Color.rgb(color.r, color.g, color.b).hsl().object()
  return {
    h: Math.round(hsl.h),
    s: Math.round(hsl.s),
    l: Math.round(hsl.l),
  }
}

/**
 * Convert HSL to CSS string
 */
export function hslToString(color: HSLColor): string {
  return `hsl(${color.h}, ${color.s}%, ${color.l}%)`
}

/**
 * Convert RGB to CSS string
 */
export function rgbToString(color: RGBColor): string {
  return `rgb(${color.r}, ${color.g}, ${color.b})`
}

/**
 * Parse CSS color string to HSL (supports rgb(), hsl(), hex, named colors)
 */
export function parseColorString(colorString: string): HSLColor | null {
  try {
    const parsed = Color(colorString)
    const hsl = parsed.hsl().object()
    return {
      h: Math.round(hsl.h),
      s: Math.round(hsl.s),
      l: Math.round(hsl.l),
    }
  } catch {
    return null
  }
}
