/**
 * Base Color Tokens
 *
 * Layer 2: CSS values with OKLCH color space
 * - Format: { value: 'oklch(L% C H)' }
 * - NO token references
 * - Magnitude-based naming (gray.0-10, not semantic)
 *
 * Color space: OKLCH (perceptually uniform)
 * - L (Lightness): 0-100%
 * - C (Chroma): 0-0.4 (saturation)
 * - H (Hue): 0-360 degrees
 *
 * Browser support: 92%+ (Chrome 111+, Firefox 113+, Safari 15.4+)
 *
 * @see ~/production/.atlas/connector-outputs/color-perception-palette-generation-2025-12-21.md
 */

import { formatCss } from 'culori'
import { neutralColors } from '../primitives'

/**
 * Neutral gray palette (blue-gray hue)
 *
 * Generated from OKLCH primitives with:
 * - Hue: 240° (blue-gray)
 * - Chroma: 0.05 (low saturation, reduced at extremes)
 * - Lightness: 11-step perceptually uniform scale
 *
 * Naming: gray.0 (lightest) to gray.10 (darkest)
 */
export const colors = {
  gray: {
    0: { value: formatCss(neutralColors[0]) },   // oklch(97% 0.035 240) - lightest
    1: { value: formatCss(neutralColors[1]) },   // oklch(95% 0.035 240)
    2: { value: formatCss(neutralColors[2]) },   // oklch(93% 0.035 240)
    3: { value: formatCss(neutralColors[3]) },   // oklch(88% 0.05 240)
    4: { value: formatCss(neutralColors[4]) },   // oklch(80% 0.05 240)
    5: { value: formatCss(neutralColors[5]) },   // oklch(72% 0.05 240)
    6: { value: formatCss(neutralColors[6]) },   // oklch(60% 0.05 240)
    7: { value: formatCss(neutralColors[7]) },   // oklch(50% 0.05 240)
    8: { value: formatCss(neutralColors[8]) },   // oklch(40% 0.05 240)
    9: { value: formatCss(neutralColors[9]) },   // oklch(32% 0.035 240)
    10: { value: formatCss(neutralColors[10]) }, // oklch(24% 0.035 240) - darkest
  },
} as const
