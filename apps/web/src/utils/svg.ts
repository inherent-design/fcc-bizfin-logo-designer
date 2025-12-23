import type { HSLColor } from '@/schemas/logoState.schema'
import { hslToString } from './colors'
import { componentLogger } from '@/utils/logger'

// Module-specific logger
const svgLogger = componentLogger.child({ module: 'svg' })

/**
 * Apply fill color to SVG elements
 */
export function applySVGFill(svgString: string, color: HSLColor): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgString, 'image/svg+xml')

  const parseError = doc.querySelector('parsererror')
  if (parseError) {
    svgLogger.error({ error: parseError.textContent }, 'SVG parsing error')
    return svgString
  }

  const colorString = hslToString(color)

  doc.querySelectorAll('[fill]').forEach((element) => {
    const currentFill = element.getAttribute('fill')
    if (currentFill && currentFill.toLowerCase() !== 'none') {
      element.setAttribute('fill', colorString)
    }
  })

  return new XMLSerializer().serializeToString(doc)
}

/**
 * Apply stroke color to SVG elements
 */
export function applySVGStroke(svgString: string, color: HSLColor): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgString, 'image/svg+xml')

  const parseError = doc.querySelector('parsererror')
  if (parseError) {
    svgLogger.error({ error: parseError.textContent }, 'SVG parsing error')
    return svgString
  }

  const colorString = hslToString(color)

  doc.querySelectorAll('[stroke]').forEach((element) => {
    const currentStroke = element.getAttribute('stroke')
    if (currentStroke && currentStroke.toLowerCase() !== 'none') {
      element.setAttribute('stroke', colorString)
    }
  })

  return new XMLSerializer().serializeToString(doc)
}

/**
 * Apply fill color to text elements
 */
export function applySVGTextFill(svgString: string, color: HSLColor): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgString, 'image/svg+xml')

  const parseError = doc.querySelector('parsererror')
  if (parseError) {
    svgLogger.error({ error: parseError.textContent }, 'SVG parsing error')
    return svgString
  }

  const colorString = hslToString(color)

  doc.querySelectorAll('text').forEach((element) => {
    element.setAttribute('fill', colorString)
  })

  return new XMLSerializer().serializeToString(doc)
}

// Rest is mostly specific for FCC Biz Fin Club logo elements

/**
 * Element-aware color application
 */
interface ColorTargets {
  fill?: HSLColor
  stroke?: HSLColor
  textFill?: HSLColor
}

export function applyElementColors(
  svgString: string,
  elementType: 'base' | 'quadrant' | 'handshake' | 'element',
  colors: ColorTargets
): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgString, 'image/svg+xml')

  const parseError = doc.querySelector('parsererror')
  if (parseError) {
    svgLogger.error({ error: parseError.textContent }, 'SVG parsing error')
    return svgString
  }

  if (elementType === 'base') {
    // Base: apply fill to laurel/shield, stroke to shield
    if (colors.fill) {
      const fillString = hslToString(colors.fill)
      // Update both attributes and inline styles
      doc.querySelectorAll('[fill], [style*="fill"]').forEach((el) => {
        const currentFill = el.getAttribute('fill')
        if (currentFill && currentFill !== 'none') {
          el.setAttribute('fill', fillString)
        }
        // Also update inline styles
        const style = el.getAttribute('style')
        if (style && style.includes('fill:')) {
          const newStyle = style.replace(/fill:\s*[^;]+/g, `fill: ${fillString}`)
          el.setAttribute('style', newStyle)
        }
      })
    }
    if (colors.stroke) {
      const strokeString = hslToString(colors.stroke)
      // Update both attributes and inline styles
      doc.querySelectorAll('[stroke], [style*="stroke"]').forEach((el) => {
        const currentStroke = el.getAttribute('stroke')
        if (currentStroke && currentStroke !== 'none') {
          el.setAttribute('stroke', strokeString)
        }
        // Also update inline styles
        const style = el.getAttribute('style')
        if (style && style.includes('stroke:')) {
          const newStyle = style.replace(/stroke:\s*[^;]+/g, `stroke: ${strokeString}`)
          el.setAttribute('style', newStyle)
        }
      })
    }
  }

  if (elementType === 'handshake') {
    // Handshake: keep fill white, sync stroke with baseColor
    if (colors.stroke) {
      const strokeString = hslToString(colors.stroke)
      doc.querySelectorAll('[stroke], [style*="stroke"]').forEach((el) => {
        const currentStroke = el.getAttribute('stroke')
        if (currentStroke && currentStroke !== 'none') {
          el.setAttribute('stroke', strokeString)
        }
        // Update inline styles
        const style = el.getAttribute('style')
        if (style && style.includes('stroke:')) {
          const newStyle = style.replace(/stroke:\s*[^;]+/g, `stroke: ${strokeString}`)
          el.setAttribute('style', newStyle)
        }
      })
    }
    // Don't touch fills (keep white)
  }

  if (elementType === 'quadrant') {
    // Quadrant: simple fill override
    if (colors.fill) {
      const fillString = hslToString(colors.fill)
      doc.querySelectorAll('[fill], [style*="fill"]').forEach((el) => {
        const currentFill = el.getAttribute('fill')
        if (currentFill && currentFill !== 'none') {
          el.setAttribute('fill', fillString)
        }
        // Update inline styles
        const style = el.getAttribute('style')
        if (style && style.includes('fill:')) {
          const newStyle = style.replace(/fill:\s*[^;]+/g, `fill: ${fillString}`)
          el.setAttribute('style', newStyle)
        }
      })
    }
  }

  if (elementType === 'element') {
    // Elements: check for text element first (dollar sign)
    const textEl = doc.querySelector('text')
    if (textEl && colors.textFill) {
      const fillString = hslToString(colors.textFill)
      textEl.setAttribute('fill', fillString)
      // Update inline styles
      const style = textEl.getAttribute('style')
      if (style && style.includes('fill:')) {
        const newStyle = style.replace(/fill:\s*[^;]+/g, `fill: ${fillString}`)
        textEl.setAttribute('style', newStyle)
      }
    } else if (colors.fill) {
      // Standard path-based elements
      const fillString = hslToString(colors.fill)
      doc.querySelectorAll('[fill], [style*="fill"]').forEach((el) => {
        // Skip rect elements with fill: none (e.g., bounding boxes in dollar sign)
        if (el.tagName.toLowerCase() === 'rect') {
          const style = el.getAttribute('style')
          if (style && style.includes('fill:') && style.includes('none')) {
            return // Skip this element
          }
        }

        const currentFill = el.getAttribute('fill')
        if (currentFill && currentFill !== 'none') {
          el.setAttribute('fill', fillString)
        }
        // Update inline styles
        const style = el.getAttribute('style')
        if (style && style.includes('fill:')) {
          const newStyle = style.replace(/fill:\s*[^;]+/g, `fill: ${fillString}`)
          el.setAttribute('style', newStyle)
        }
      })
    }
  }

  return new XMLSerializer().serializeToString(doc)
}

/**
 * Extract viewBox from SVG string
 * Useful for determining natural dimensions
 */
export function getSVGViewBox(svgString: string): {
  x: number
  y: number
  width: number
  height: number
} | null {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgString, 'image/svg+xml')
  const svgRoot = doc.querySelector('svg')

  if (!svgRoot) return null

  const viewBox = svgRoot.getAttribute('viewBox')
  if (!viewBox) return null

  const [x, y, width, height] = viewBox.split(/\s+/).map(Number)
  return { x, y, width, height }
}

/**
 * Extract inner content from SVG (without wrapper <svg> element)
 * Returns just the inner <g> content for embedding
 */
export function extractSVGContent(svgString: string): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgString, 'image/svg+xml')
  const svgRoot = doc.querySelector('svg')

  if (!svgRoot) return ''

  // Extract all children and serialize them
  const children = Array.from(svgRoot.children)
  return children.map((child) => new XMLSerializer().serializeToString(child)).join('')
}

/**
 * Remove outer wrappers while preserving inner content
 *
 * Handles multiple wrapper scenarios:
 *
 * Example 1 (nested <g>):
 *   <svg><g id="fcc-biz-fin-logo"><g id="base">...</g></g></svg>
 * Output: <g id="base">...</g>
 *
 * Example 2 (direct children):
 *   <svg><g id="fcc-biz-fin-logo"><path id="quadrant-tl">...</path></g></svg>
 * Output: <g id="quadrant-tl"><path id="quadrant-tl">...</path></g>
 *
 * Example 3 (element assets with #elements wrapper):
 *   <svg><g id="fcc-biz-fin-logo"><g id="elements"><g id="element-briefcase">...</g></g></g></svg>
 * Output: <g id="element-briefcase">...</g>
 *
 * This removes both "fcc-biz-fin-logo" and "elements" wrappers.
 */
export function unwrapSVG(svgString: string): string {
  svgLogger.trace({ preview: svgString.substring(0, 200) }, '[unwrapSVG] Input SVG preview')

  const parser = new DOMParser()
  const doc = parser.parseFromString(svgString, 'image/svg+xml')

  const parseError = doc.querySelector('parsererror')
  if (parseError) {
    svgLogger.error({ error: parseError.textContent }, '[unwrapSVG] SVG parsing error')
    return svgString
  }

  const svgRoot = doc.querySelector('svg')
  if (!svgRoot) {
    svgLogger.warn('[unwrapSVG] No <svg> root found')
    return svgString
  }
  svgLogger.debug({ id: svgRoot.getAttribute('id') }, '[unwrapSVG] Found <svg> root')

  // Find the outer wrapper <g> (typically id="fcc-biz-fin-logo")
  const outerG = svgRoot.querySelector('g#fcc-biz-fin-logo, g[id="fcc-biz-fin-logo"]')
  if (!outerG) {
    svgLogger.debug('[unwrapSVG] No fcc-biz-fin-logo wrapper, extracting content as-is')
    return extractSVGContent(svgString)
  }
  svgLogger.debug('[unwrapSVG] Found outer wrapper: #fcc-biz-fin-logo')

  // Check for #elements wrapper (used in element assets)
  const elementsWrapper = outerG.querySelector('g#elements, g[id="elements"]')
  if (elementsWrapper) {
    svgLogger.debug('[unwrapSVG] Found #elements wrapper')
    const innerG = elementsWrapper.querySelector('g')
    if (innerG) {
      // Case 1: Nested <g> exists (e.g., dollar-sign.svg)
      const result = new XMLSerializer().serializeToString(innerG)
      svgLogger.trace(
        {
          type: 'element-nested-g',
          id: innerG.getAttribute('id'),
          preview: result.substring(0, 200),
        },
        '[unwrapSVG] Output'
      )
      return result
    }

    // Case 2: No nested <g>, direct path children (e.g., briefcase.svg)
    svgLogger.debug('[unwrapSVG] No nested <g> in #elements, creating wrapper')
    const firstChildWithId = Array.from(elementsWrapper.children).find((child) =>
      child.hasAttribute('id')
    )
    const elementId = firstChildWithId?.getAttribute('id') || 'element'
    svgLogger.debug({ elementId }, '[unwrapSVG] Using element id')

    const newG = doc.createElementNS('http://www.w3.org/2000/svg', 'g')
    newG.setAttribute('id', elementId)
    Array.from(elementsWrapper.children).forEach((child) => {
      newG.appendChild(child.cloneNode(true))
    })

    const result = new XMLSerializer().serializeToString(newG)
    svgLogger.trace(
      {
        type: 'element-direct-children',
        id: elementId,
        preview: result.substring(0, 200),
      },
      '[unwrapSVG] Output'
    )
    return result
  }

  // Check if there's a nested <g> (like <g id="base">)
  const innerG = outerG.querySelector('g')
  if (innerG) {
    const result = new XMLSerializer().serializeToString(innerG)
    svgLogger.trace(
      {
        type: 'nested-g',
        id: innerG.getAttribute('id'),
        preview: result.substring(0, 200),
      },
      '[unwrapSVG] Output'
    )
    return result
  }

  // No nested <g>, so we have direct children (like <path id="quadrant-tl">)
  svgLogger.debug('[unwrapSVG] No nested <g>, creating wrapper for direct children')
  const firstChildWithId = Array.from(outerG.children).find((child) => child.hasAttribute('id'))
  const groupId = firstChildWithId?.getAttribute('id') || 'unwrapped'
  svgLogger.debug({ groupId }, '[unwrapSVG] Using group id')

  // Create a new <g> with the element's ID and move all children into it
  const newG = doc.createElementNS('http://www.w3.org/2000/svg', 'g')
  newG.setAttribute('id', groupId)

  // Move all children from outerG to newG
  Array.from(outerG.children).forEach((child) => {
    newG.appendChild(child.cloneNode(true))
  })

  const result = new XMLSerializer().serializeToString(newG)
  svgLogger.trace(
    {
      type: 'created-wrapper',
      id: groupId,
      preview: result.substring(0, 200),
    },
    '[unwrapSVG] Output'
  )
  return result
}

/**
 * Extract attributes and inner content from a <g> element
 * Used to avoid double-wrapper issue with dangerouslySetInnerHTML
 *
 * @param svgString - SVG string containing a <g> element (e.g., from unwrapSVG)
 * @returns Object with id, attributes, and inner HTML content
 */
export function extractGroupContent(svgString: string): {
  id: string | null
  attributes: Record<string, string>
  innerHTML: string
} | null {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgString, 'image/svg+xml')

  const parseError = doc.querySelector('parsererror')
  if (parseError) {
    svgLogger.error({ error: parseError.textContent }, '[extractGroupContent] SVG parsing error')
    return null
  }

  const rootG = doc.querySelector('g')
  if (!rootG) {
    svgLogger.warn('[extractGroupContent] No <g> element found')
    return null
  }

  // Extract id
  const id = rootG.getAttribute('id')

  // Extract all attributes (except xmlns which React handles)
  const attributes: Record<string, string> = {}
  Array.from(rootG.attributes).forEach((attr) => {
    if (attr.name !== 'xmlns') {
      attributes[attr.name] = attr.value
    }
  })

  // Extract inner HTML (all children)
  const innerHTML = Array.from(rootG.children)
    .map((child) => new XMLSerializer().serializeToString(child))
    .join('')

  return { id, attributes, innerHTML }
}
