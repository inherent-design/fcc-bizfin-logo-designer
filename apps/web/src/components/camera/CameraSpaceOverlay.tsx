// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import type { ReactNode } from 'react'

// Panda CSS
import { css } from 'styled-system/css'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * CameraSpaceOverlay component props
 */
interface CameraSpaceOverlayProps {
  /** Content to overlay on the camera space */
  children: ReactNode
}

// ============================================================================
// STYLES
// ============================================================================

const overlayStyles = css({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  '& > *': {
    pointerEvents: 'auto',
  },
})

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * CameraSpaceOverlay - Overlay container for camera space UI elements
 *
 * Features:
 * - Full-screen absolute positioning
 * - Non-blocking pointer events (children are interactive)
 * - Used for UI controls over the 3D camera view
 *
 * @example
 * ```tsx
 * <CameraSpaceOverlay>
 *   <ControlPanel />
 * </CameraSpaceOverlay>
 * ```
 */
export function CameraSpaceOverlay({ children }: CameraSpaceOverlayProps) {
  return <div className={overlayStyles}>{children}</div>
}
