import { css } from 'styled-system/css'
import { useLogoStore } from '../../store/logoStore'
import { useWorldStore } from '../../store/worldStore'
import { applyElementColors, extractGroupContent } from '../../utils'
import baseShieldSvg from '../../assets/svg/base.svg?raw'
import handshakeSvg from '../../assets/svg/handshake.svg?raw'
import briefcaseSvg from '../../assets/svg/briefcase.svg?raw'
import dollarSvg from '../../assets/svg/dollar-sign.svg?raw'
import leafSvg from '../../assets/svg/grape-leaf.svg?raw'
import mountainsSvg from '../../assets/svg/sierra-nevada.svg?raw'

const elementSvgs: Record<string, string> = {
  briefcase: briefcaseSvg,
  dollar: dollarSvg,
  leaf: leafSvg,
  mountains: mountainsSvg,
}

// Hardcoded positions from original LogoPreview
const BASE_POS = { x: 80, y: 84 }
const HANDSHAKE_POS = { x: 80, y: 74.4 }
const QUADRANT_TL_POS = { x: 64.2348, y: 57 }
const QUADRANT_BR_POS = { x: 95.7213, y: 97 }

// Element base positions (precise coordinates from Illustrator export)
const ELEMENT_BASE_POSITIONS = [
  { x: 64.2348, y: 53.0602 }, // TL (quadrant 0)
  { x: 96.6433, y: 53.9201 }, // TR (quadrant 1)
  { x: 66.3168, y: 92.2365 }, // BL (quadrant 2)
  { x: 94.4771, y: 91.46 }, // BR (quadrant 3)
]

interface LayerProps {
  depth: number
  children: React.ReactNode
}

function ParallaxLayer({ depth, children }: LayerProps) {
  return (
    <div
      className={css({
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })}
      style={{ transform: `translateZ(${depth}px)` }}
    >
      {children}
    </div>
  )
}

export function LogoPreviewWorld() {
  const logoRotation = useWorldStore((state) => state.logoRotation)
  const layerDepths = useWorldStore((state) => state.layerDepths)

  const baseColor = useLogoStore((state) => state.baseColor)
  const quadrants = useLogoStore((state) => state.quadrants)
  const getElementColor = useLogoStore((state) => state.getElementColor)
  const getFillColor = useLogoStore((state) => state.getFillColor)

  // Layer 1: Base (shield + laurel combined)
  const baseLayer = (
    <svg
      viewBox='0 0 160 160'
      className={css({ width: '100%', height: '100%' })}
      preserveAspectRatio='xMidYMid meet'
    >
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
    <svg
      viewBox='0 0 160 160'
      className={css({ width: '100%', height: '100%' })}
      preserveAspectRatio='xMidYMid meet'
    >
      {quadrants[0].isFilled &&
        (() => {
          const color = getFillColor(0)
          return color ? (
            <circle
              r='15'
              fill={`hsl(${color.h}, ${color.s}%, ${color.l}%)`}
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
            <circle
              r='15'
              fill={`hsl(${color.h}, ${color.s}%, ${color.l}%)`}
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
    <svg
      viewBox='0 0 160 160'
      className={css({ width: '100%', height: '100%' })}
      preserveAspectRatio='xMidYMid meet'
    >
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
    <svg
      viewBox='0 0 160 160'
      className={css({ width: '100%', height: '100%' })}
      preserveAspectRatio='xMidYMid meet'
    >
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
    <div
      className={css({
        position: 'absolute',

        // Mobile: bottom 60% height
        bottom: { base: 0, tablet: 0 },
        left: { base: 0, tablet: 'auto' },
        right: { base: 0, tablet: 0 },
        height: { base: '60%', tablet: 'auto' },

        // Tablet+: right 60% width
        top: { tablet: 0 },
        width: { tablet: '60%' },
        maxWidth: { tablet: '800px' },
      })}
    >
      <div
        className={css({
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1000px',
        })}
      >
        <div
          className={css({
            position: 'relative',
            width: '80%',
            maxWidth: '600px',
            aspectRatio: '1/1',
            transformStyle: 'preserve-3d',
          })}
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
