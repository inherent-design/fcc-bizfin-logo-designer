import { BASE_SVGS, ELEMENT_SVGS } from '../assets/svg'
import { useLogoStore } from '../store/logoStore'
import { componentLogger } from '../utils/logger'
import { applyElementColors, extractGroupContent } from '../utils/svg'

// Pixel-perfect positioning for all hardcoded elements (in 160×160 canvas)
// All elements are center-anchored using calc(-50% + x) transform
// Positions can be copied directly from Illustrator (with Y sign-flip handled manually)
const HARDCODED_POSITIONS = {
  base: { x: 80, y: 84 }, // Base (shield + laurel)
  handshake: { x: 80, y: 74.4 }, // Handshake overlay
  quadrantTL: { x: 64.2348, y: 57 }, // Top-left quadrant fill
  quadrantBR: { x: 95.7213, y: 97 }, // Bottom-right quadrant fill
  // Initial element positions by quadrant index (0=TL, 1=TR, 2=BL, 3=BR)
  // User centerOffset values are added to these base positions
  elements: [
    { x: 64.2348, y: 53.0602 }, // Quadrant 0 (top-left) - matches quadrantTL
    { x: 96.6433, y: 53.9201 }, // Quadrant 1 (top-right)
    { x: 66.3168, y: 92.2365 }, // Quadrant 2 (bottom-left)
    { x: 94.4771, y: 91.46 }, // Quadrant 3 (bottom-right) - matches quadrantBR
  ],
}

export function LogoPreview() {
  // Use Zustand selectors for specific values to trigger re-renders
  const baseColor = useLogoStore((state) => state.baseColor)
  const quadrants = useLogoStore((state) => state.quadrants)
  const getElementColor = useLogoStore((state) => state.getElementColor)
  const getFillColor = useLogoStore((state) => state.getFillColor)

  // Layer 1: Base (shield + laurel) - hardcoded position
  const base = (() => {
    componentLogger.debug({ baseColor }, 'Applying base color')
    const svg = applyElementColors(BASE_SVGS.base, 'base', {
      fill: baseColor,
      stroke: baseColor,
    })
    return extractGroupContent(svg)
  })()

  // Layer 2: Quadrants - hardcoded positions
  const quadrantTL = (() => {
    const fillColor = getFillColor(0)
    if (!fillColor) return null
    const svg = applyElementColors(BASE_SVGS.quadrantTL, 'quadrant', {
      fill: fillColor,
    })
    return extractGroupContent(svg)
  })()

  const quadrantBR = (() => {
    const fillColor = getFillColor(3)
    if (!fillColor) return null
    const svg = applyElementColors(BASE_SVGS.quadrantBR, 'quadrant', {
      fill: fillColor,
    })
    return extractGroupContent(svg)
  })()

  // Layer 3: Handshake - hardcoded position
  const handshake = (() => {
    const svg = applyElementColors(BASE_SVGS.handshake, 'handshake', {
      stroke: baseColor,
    })
    return extractGroupContent(svg)
  })()

  // Layer 4: Elements - user-controlled positioning
  const elements = quadrants.map((quadrant, position) => {
    const elementSVG = ELEMENT_SVGS[quadrant.elementId]
    if (!elementSVG) return null

    const color = getElementColor(position)
    const { centerOffset, elementScale } = quadrant

    const svg = applyElementColors(elementSVG, 'element', {
      fill: color,
      textFill: color,
    })
    const extracted = extractGroupContent(svg)
    return extracted ? { ...extracted, centerOffset, elementScale } : null
  })

  return (
    <div className='bg-base-200 rounded-xl p-8 flex items-center justify-center'>
      <div className='w-full max-w-md aspect-square'>
        <svg
          viewBox='0 0 160 160'
          className='w-full h-auto'
          preserveAspectRatio='xMidYMid meet'
          xmlns='http://www.w3.org/2000/svg'
          style={{
            transformBox: 'view-box',
          }}
        >
          {/* Layer 1 (bottom): Base - <g id="base"> positioned at hardcoded coords */}
          {base && (
            <g
              key={`base-${baseColor.h}-${baseColor.s}-${baseColor.l}`}
              id={base.id || undefined}
              dangerouslySetInnerHTML={{ __html: base.innerHTML }}
              style={{
                transformBox: 'fill-box',
                transform: `translate(calc(-50% + ${HARDCODED_POSITIONS.base.x}px), calc(-50% + ${HARDCODED_POSITIONS.base.y}px))`,
              }}
            />
          )}

          {/* Layer 2: Quadrants - <g id="quadrantTL/BR"> at hardcoded positions */}
          {quadrantTL && (
            <g
              id={quadrantTL.id || undefined}
              dangerouslySetInnerHTML={{ __html: quadrantTL.innerHTML }}
              style={{
                transformBox: 'fill-box',
                transform: `translate(calc(-50% + ${HARDCODED_POSITIONS.quadrantTL.x}px), calc(-50% + ${HARDCODED_POSITIONS.quadrantTL.y}px))`,
              }}
            />
          )}
          {quadrantBR && (
            <g
              id={quadrantBR.id || undefined}
              dangerouslySetInnerHTML={{ __html: quadrantBR.innerHTML }}
              style={{
                transformBox: 'fill-box',
                transform: `translate(calc(-50% + ${HARDCODED_POSITIONS.quadrantBR.x}px), calc(-50% + ${HARDCODED_POSITIONS.quadrantBR.y}px))`,
              }}
            />
          )}

          {/* Layer 3: Handshake - <g id="handshake"> at hardcoded position */}
          {handshake && (
            <g
              id={handshake.id || undefined}
              dangerouslySetInnerHTML={{ __html: handshake.innerHTML }}
              style={{
                transformBox: 'fill-box',
                transform: `translate(calc(-50% + ${HARDCODED_POSITIONS.handshake.x}px), calc(-50% + ${HARDCODED_POSITIONS.handshake.y}px))`,
              }}
            />
          )}

          {/* Layer 4 (top): Elements - <g id="element-*"> with hardcoded + user offset positions */}
          {elements.map((element, i) => {
            if (!element) return null
            const { id, innerHTML, centerOffset, elementScale } = element
            // Combine hardcoded initial position with user's centerOffset
            const basePos = HARDCODED_POSITIONS.elements[i]
            const finalX = basePos.x + centerOffset.x
            const finalY = basePos.y + centerOffset.y
            return (
              <g
                key={i}
                id={id || undefined}
                dangerouslySetInnerHTML={{ __html: innerHTML }}
                style={{
                  transformBox: 'fill-box',
                  transform: `translate(calc(-50% + ${finalX}px), calc(-50% + ${finalY}px)) scale(${elementScale})`,
                }}
              />
            )
          })}
        </svg>
      </div>
    </div>
  )
}
