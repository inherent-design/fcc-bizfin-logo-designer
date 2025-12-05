import { unwrapSVG } from '../../utils/svg'

import baseSVG from './base.svg?raw'
import quadrantTLSVG from './quadrant-tl.svg?raw'
import quadrantBRSVG from './quadrant-br.svg?raw'
import handshakeSVG from './handshake.svg?raw'

// Unwrap SVGs at import time to remove outer <g id="fcc-biz-fin-logo"> wrapper
// while preserving inner <g id="..."> with element IDs
export const BASE_SVGS = {
  base: unwrapSVG(baseSVG),
  quadrantTL: unwrapSVG(quadrantTLSVG),
  quadrantBR: unwrapSVG(quadrantBRSVG),
  handshake: unwrapSVG(handshakeSVG),
}

import grapeLeafSVG from './grape-leaf.svg?raw'
import sierraNevadaSVG from './sierra-nevada.svg?raw'
import dollarSignSVG from './dollar-sign.svg?raw'
import briefcaseSVG from './briefcase.svg?raw'

export const ELEMENT_SVGS: Record<string, string> = {
  leaf: unwrapSVG(grapeLeafSVG),
  mountains: unwrapSVG(sierraNevadaSVG),
  dollar: unwrapSVG(dollarSignSVG),
  briefcase: unwrapSVG(briefcaseSVG),
}
