// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import { type ReactNode } from 'react'

// Panda CSS
import { css } from 'styled-system/css'

// Types
import type { Vec2 } from '../../schemas/logoState.schema'

// Utils
import { applyElementColors, extractGroupContent } from '../../utils'

// Store
import { useLogoStore } from '../../store/logoStore'
import { useWorldStore } from '../../store/worldStore'

// Assets
import baseShieldSvg from '../../assets/svg/base.svg?raw'
import briefcaseSvg from '../../assets/svg/briefcase.svg?raw'
import dollarSvg from '../../assets/svg/dollar-sign.svg?raw'
import handshakeSvg from '../../assets/svg/handshake.svg?raw'
import leafSvg from '../../assets/svg/grape-leaf.svg?raw'
import mountainsSvg from '../../assets/svg/sierra-nevada.svg?raw'
import quadrantBRSvg from '../../assets/svg/quadrant-br.svg?raw'
import quadrantTLSvg from '../../assets/svg/quadrant-tl.svg?raw'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * ParallaxLayer component props
 */
interface LayerProps {
  /** Depth value for translateZ transform */
  depth: number
  /** Layer content */
  children: ReactNode
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * SVG element mapping by element ID
 */
const elementSvgs: Record<string, string> = {
  briefcase: briefcaseSvg,
  dollar: dollarSvg,
  leaf: leafSvg,
  mountains: mountainsSvg,
}

/**
 * Base shield position (from original Illustrator export)
 */
const BASE_POS: Vec2 = { x: 80, y: 84 }

/**
 * Handshake overlay position
 */
const HANDSHAKE_POS: Vec2 = { x: 80, y: 74.4 }

/**
 * Top-left quadrant fill position
 */
const QUADRANT_TL_POS: Vec2 = { x: 64.2348, y: 57 }

/**
 * Bottom-right quadrant fill position
 */
const QUADRANT_BR_POS: Vec2 = { x: 95.7213, y: 97 }

/**
 * Element base positions (precise coordinates from Illustrator export)
 * Order: [TL, TR, BL, BR]
 */
const ELEMENT_BASE_POSITIONS: Vec2[] = [
  { x: 64.2348, y: 53.0602 }, // TL (quadrant 0)
  { x: 96.6433, y: 53.9201 }, // TR (quadrant 1)
  { x: 66.3168, y: 92.2365 }, // BL (quadrant 2)
  { x: 94.4771, y: 91.46 }, // BR (quadrant 3)
]

// ============================================================================
// STYLES
// ============================================================================

const containerStyles = css({
  // Mobile: 60% height (column layout)
  height: { base: '60%', tablet: '100%' },
  // Tablet+: 60% width (row layout)
  width: { base: '100%', tablet: '60%' },
  // Flex grow to fill remaining space
  flex: 1,
  position: 'relative',
})

const sceneContainerStyles = css({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  perspective: '1000px',
})

const logoContainerStyles = css({
  position: 'relative',
  width: '80%',
  maxWidth: '600px',
  aspectRatio: '1/1',
  transformStyle: 'preserve-3d',
})

const parallaxLayerStyles = css({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const svgStyles = css({
  width: '100%',
  height: '100%',
})

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * ParallaxLayer - Wrapper for 3D parallax effect
 *
 * Applies translateZ transform to create depth layers.
 */
function ParallaxLayer({ depth, children }: LayerProps) {
  return (
    <div className={parallaxLayerStyles} style={{ transform: `translateZ(${depth}px)` }}>
      {children}
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * LogoPreviewWorld - 3D parallax logo preview component
 *
 * Features:
 * - Multi-layer 3D parallax effect
 * - Dynamic SVG element positioning and scaling
 * - Responsive layout (mobile column, tablet+ row)
 * - User-controlled rotation and layer depths
 * - Quadrant fill support (TL and BR only)
 *
 * Layers (front to back):
 * 1. Base (shield + laurel)
 * 2. Quadrant fills (if enabled)
 * 3. Handshake overlay
 * 4. Elements (briefcase, dollar, leaf, mountains)
 *
 * @example
 * ```tsx
 * <LogoPreviewWorld />
 * ```
 */
export function LogoPreviewWorld() {
  const logoRotation = useWorldStore((state) => state.logoRotation)
  const layerDepths = useWorldStore((state) => state.layerDepths)

  const baseColor = useLogoStore((state) => state.baseColor)
  const quadrants = useLogoStore((state) => state.quadrants)
  const getElementColor = useLogoStore((state) => state.getElementColor)
  const getFillColor = useLogoStore((state) => state.getFillColor)

  // Layer 1: Base (shield + laurel combined)
  const baseLayer = (
    <svg viewBox='0 0 160 160' className={svgStyles} preserveAspectRatio='xMidYMid meet'>
      <g
        dangerouslySetInnerHTML={{
          __html: applyElementColors(extractGroupContent(baseShieldSvg)?.innerHTML ?? '', 'base', {
            fill: baseColor,
            stroke: baseColor,
          }),
        }}
        style={{
          transformBox: 'fill-box',
          transform: `translate(calc(-50% + ${BASE_POS.x}px), calc(-50% + ${BASE_POS.y}px))`,
        }}
      />
    </svg>
  )

  // Layer 2: Quadrant fills (TL and BR only if filled)
  const quadrantFillsLayer = (
    <svg viewBox='0 0 160 160' className={svgStyles} preserveAspectRatio='xMidYMid meet'>
      {quadrants[0].isFilled &&
        (() => {
          const color = getFillColor(0)
          return color ? (
            <g
              dangerouslySetInnerHTML={{
                __html: applyElementColors(
                  extractGroupContent(quadrantTLSvg)?.innerHTML ?? '',
                  'quadrant',
                  { fill: color }
                ),
              }}
              style={{
                transformBox: 'fill-box',
                transform: `translate(calc(-50% + ${QUADRANT_TL_POS.x}px), calc(-50% + ${QUADRANT_TL_POS.y}px))`,
              }}
            />
          ) : null
        })()}
      {quadrants[2].isFilled &&
        (() => {
          const color = getFillColor(2)
          return color ? (
            <g
              dangerouslySetInnerHTML={{
                __html: applyElementColors(
                  extractGroupContent(quadrantBRSvg)?.innerHTML ?? '',
                  'quadrant',
                  { fill: color }
                ),
              }}
              style={{
                transformBox: 'fill-box',
                transform: `translate(calc(-50% + ${QUADRANT_BR_POS.x}px), calc(-50% + ${QUADRANT_BR_POS.y}px))`,
              }}
            />
          ) : null
        })()}
    </svg>
  )

  // Layer 3: Handshake overlay
  const handshakeLayer = (
    <svg viewBox='0 0 160 160' className={svgStyles} preserveAspectRatio='xMidYMid meet'>
      <g
        dangerouslySetInnerHTML={{
          __html: applyElementColors(
            extractGroupContent(handshakeSvg)?.innerHTML ?? '',
            'handshake',
            { fill: baseColor, stroke: baseColor }
          ),
        }}
        style={{
          transformBox: 'fill-box',
          transform: `translate(calc(-50% + ${HANDSHAKE_POS.x}px), calc(-50% + ${HANDSHAKE_POS.y}px))`,
        }}
      />
    </svg>
  )

  // Layer 4: Elements (with user offsets and scale)
  const elementsLayer = (
    <svg viewBox='0 0 160 160' className={svgStyles} preserveAspectRatio='xMidYMid meet'>
      {quadrants.map((quadrant, index) => {
        const basePos = ELEMENT_BASE_POSITIONS[index]
        const elementSvg = elementSvgs[quadrant.elementId]
        if (!elementSvg) return null

        const elementColor = getElementColor(index)
        const finalX = basePos.x + quadrant.centerOffset.x
        const finalY = basePos.y + quadrant.centerOffset.y

        return (
          <g
            key={index}
            dangerouslySetInnerHTML={{
              __html: applyElementColors(
                extractGroupContent(elementSvg)?.innerHTML ?? '',
                'element',
                { fill: elementColor, stroke: elementColor }
              ),
            }}
            style={{
              transformBox: 'fill-box',
              transform: `translate(calc(-50% + ${finalX}px), calc(-50% + ${finalY}px)) scale(${quadrant.elementScale})`,
            }}
          />
        )
      })}
    </svg>
  )

  return (
    <div className={containerStyles}>
      <div className={sceneContainerStyles}>
        <div
          className={logoContainerStyles}
          style={{
            transform: `rotateX(${logoRotation.x}deg) rotateY(${logoRotation.y}deg)`,
          }}
        >
          <ParallaxLayer depth={layerDepths.base}>{baseLayer}</ParallaxLayer>

          <ParallaxLayer depth={layerDepths.base + 20}>{quadrantFillsLayer}</ParallaxLayer>

          <ParallaxLayer depth={layerDepths.handshake}>{handshakeLayer}</ParallaxLayer>

          <ParallaxLayer depth={layerDepths.elements}>{elementsLayer}</ParallaxLayer>
        </div>
      </div>
    </div>
  )
}
