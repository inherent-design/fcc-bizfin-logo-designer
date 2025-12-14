import type { LogoState } from '../schemas/logoState.schema'
import { applyElementColors, extractGroupContent } from './svg'
import baseShieldSvg from '../assets/svg/base.svg?raw'
import handshakeSvg from '../assets/svg/handshake.svg?raw'
import briefcaseSvg from '../assets/svg/briefcase.svg?raw'
import dollarSvg from '../assets/svg/dollar-sign.svg?raw'
import leafSvg from '../assets/svg/grape-leaf.svg?raw'
import mountainsSvg from '../assets/svg/sierra-nevada.svg?raw'
import { hslToString } from './colors'

const ELEMENT_SVGS: Record<string, string> = {
  briefcase: briefcaseSvg,
  dollar: dollarSvg,
  leaf: leafSvg,
  mountains: mountainsSvg,
}

// Hardcoded positions from LogoPreviewWorld
const BASE_POS = { x: 80, y: 84 }
const HANDSHAKE_POS = { x: 80, y: 74.4 }
const QUADRANT_TL_POS = { x: 64.2348, y: 57 }
const QUADRANT_BR_POS = { x: 95.7213, y: 97 }

const ELEMENT_BASE_POSITIONS = [
  { x: 64, y: 57 }, // TL
  { x: 96, y: 57 }, // TR
  { x: 96, y: 97 }, // BR
  { x: 64, y: 97 }, // BL
]

/**
 * Get fill color for quadrant based on state hierarchy
 * Matches logoStore.getFillColor logic
 */
function getFillColor(state: LogoState, quadrantIndex: number) {
  if (!state.quadrants[quadrantIndex].isFilled) {
    return null
  }

  // Check tier 1: two-tone mode
  if (state.twoToneDesign) {
    if (quadrantIndex === 0) {
      return state.twoToneDesign.fillColorQuadrant0
    }
    if (quadrantIndex === 3) {
      return state.twoToneDesign.fillColorQuadrant3
    }
  }

  // Fallback: base design fill
  return state.baseDesign.fillColorForFilledQuadrants
}

/**
 * Get element color for quadrant based on state hierarchy
 * Matches logoStore.getElementColor logic
 */
function getElementColor(state: LogoState, quadrantIndex: number) {
  const quadrant = state.quadrants[quadrantIndex]

  // Check tier 2: unique element colors (only for filled quadrants in two-tone mode)
  if (quadrant.isFilled && state.twoToneDesign?.uniqueElementColors) {
    if (quadrantIndex === 0) {
      return state.twoToneDesign.uniqueElementColors.elementColorOverQuadrant0Fill
    }
    if (quadrantIndex === 3) {
      return state.twoToneDesign.uniqueElementColors.elementColorOverQuadrant3Fill
    }
  }

  // Check tier 1: base element colors
  if (quadrant.isFilled) {
    return state.baseDesign.elementColorOverFilledQuadrants
  } else {
    return state.baseDesign.elementColorOverBase
  }
}

/**
 * Generate complete logo SVG from state
 * Pure function - no React hooks or JSX
 */
export function generateLogoSVG(state: LogoState): string {
  const layers: string[] = []

  // Layer 1: Base (shield + laurel combined)
  const baseContent = extractGroupContent(baseShieldSvg)
  if (baseContent) {
    const baseSVG = applyElementColors(baseContent.innerHTML, 'base', {
      fill: state.baseColor,
      stroke: state.baseColor,
    })
    layers.push(`
      <g transform="translate(${BASE_POS.x}, ${BASE_POS.y})">
        ${baseSVG}
      </g>
    `)
  }

  // Layer 2: Quadrant fills (TL and BR only if filled)
  if (state.quadrants[0].isFilled) {
    const color = getFillColor(state, 0)
    if (color) {
      layers.push(`
        <circle
          cx="${QUADRANT_TL_POS.x}"
          cy="${QUADRANT_TL_POS.y}"
          r="15"
          fill="${hslToString(color)}"
        />
      `)
    }
  }

  if (state.quadrants[2].isFilled) {
    const color = getFillColor(state, 2)
    if (color) {
      layers.push(`
        <circle
          cx="${QUADRANT_BR_POS.x}"
          cy="${QUADRANT_BR_POS.y}"
          r="15"
          fill="${hslToString(color)}"
        />
      `)
    }
  }

  // Layer 3: Handshake overlay
  const handshakeContent = extractGroupContent(handshakeSvg)
  if (handshakeContent) {
    const handshakeSVG = applyElementColors(handshakeContent.innerHTML, 'handshake', {
      fill: state.baseColor,
      stroke: state.baseColor,
    })
    layers.push(`
      <g transform="translate(${HANDSHAKE_POS.x}, ${HANDSHAKE_POS.y})">
        ${handshakeSVG}
      </g>
    `)
  }

  // Layer 4: Elements (with user offsets and scale)
  state.quadrants.forEach((quadrant, index) => {
    const basePos = ELEMENT_BASE_POSITIONS[index]
    const elementSvg = ELEMENT_SVGS[quadrant.elementId]
    if (!elementSvg) return

    const elementContent = extractGroupContent(elementSvg)
    if (!elementContent) return

    const elementColor = getElementColor(state, index)
    const x = basePos.x + quadrant.centerOffset.x
    const y = basePos.y + quadrant.centerOffset.y

    const coloredSVG = applyElementColors(elementContent.innerHTML, 'element', {
      fill: elementColor,
      stroke: elementColor,
    })

    layers.push(`
      <g transform="translate(${x}, ${y}) scale(${quadrant.elementScale})">
        ${coloredSVG}
      </g>
    `)
  })

  // Combine all layers into single SVG
  return `<svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    ${layers.join('\n')}
  </svg>`
}
