import type { LogoState } from '../schemas/logoState.schema'

/**
 * System preset: Default FCC BizFin Club design
 */
export const DEFAULT_PRESET: Omit<LogoState, 'version' | 'name'> = {
  baseColor: { h: 45, s: 65, l: 55 }, // Gold
  availableElements: ['briefcase', 'mountains', 'dollar', 'leaf'],
  quadrants: [
    {
      elementId: 'briefcase',
      elementScale: 1.0,
      centerOffset: { x: 0, y: 0 },
      isFilled: true,
    },
    {
      elementId: 'mountains',
      elementScale: 1.0,
      centerOffset: { x: 0, y: 0 },
      isFilled: false,
    },
    {
      elementId: 'dollar',
      elementScale: 1.0,
      centerOffset: { x: 0, y: 0 },
      isFilled: false,
    },
    {
      elementId: 'leaf',
      elementScale: 1.0,
      centerOffset: { x: 0, y: 0 },
      isFilled: true,
    },
  ],
  baseDesign: {
    fillColorForFilledQuadrants: { h: 210, s: 100, l: 50 }, // Blue
    elementColorOverBase: { h: 0, s: 0, l: 100 }, // White
    elementColorOverFilledQuadrants: { h: 0, s: 0, l: 100 }, // White
  },
  twoToneDesign: null,
}
