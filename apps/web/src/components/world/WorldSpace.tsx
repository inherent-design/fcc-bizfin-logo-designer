// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import type { ReactNode } from 'react'
import { useEffect } from 'react'

// Panda CSS
import { css } from 'styled-system/css'

// Constants
import { MAX_LOGO_ROTATION, MOBILE_BREAKPOINT } from '../../constants/world'

// Hooks
import { useGyroscopeTilt } from '../../hooks/useGyroscopeTilt'
import { useLogoTilt } from '../../hooks/useLogoTilt'
import { useMouseTracking } from '../../hooks/useMouseTracking'

// Store
import { useUIStore } from '../../store/uiStore'

// Utils
import { componentLogger } from '../../utils/logger'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * WorldSpace component props
 */
interface WorldSpaceProps {
  /** Content to render inside the world space */
  children: ReactNode
}

// ============================================================================
// STYLES
// ============================================================================

const containerStyles = css({
  width: '100vw',
  height: '100vh',
  bg: 'world.bg',
  overflow: 'hidden',
  display: 'flex',
  // Mobile: column layout (40% controls top, 60% preview bottom)
  flexDirection: { base: 'column', tablet: 'row' },
  // Tablet+: row layout (40% controls left, 60% preview right)
})

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * WorldSpace - Main container for the 3D world environment
 *
 * Features:
 * - Syncs world theme to DOM data attribute for Panda CSS
 * - Enables mouse tracking on desktop
 * - Enables logo tilt (mouse on desktop, gyroscope on mobile)
 * - Responsive layout (column on mobile, row on tablet+)
 *
 * @example
 * ```tsx
 * <WorldSpace>
 *   <ControlPanel />
 *   <LogoPreviewWorld />
 * </WorldSpace>
 * ```
 */
export function WorldSpace({ children }: WorldSpaceProps) {
  const worldTheme = useUIStore((state) => state.worldTheme)

  // Sync world theme to DOM for Panda CSS conditions
  useEffect(() => {
    componentLogger.trace({ worldTheme }, 'Setting data-theme attribute on <html>')
    document.documentElement.setAttribute('data-theme', worldTheme)

    // Verify the attribute was set
    const actualValue = document.documentElement.getAttribute('data-theme')
    componentLogger.trace(
      { expected: worldTheme, actual: actualValue },
      'Verified data-theme attribute'
    )
  }, [worldTheme])

  // Enable mouse tracking (desktop)
  useMouseTracking()

  // Enable logo tilt (desktop with mouse, mobile with gyroscope)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT

  // Call hooks unconditionally, they'll handle their own logic
  useLogoTilt(isMobile ? 0 : MAX_LOGO_ROTATION)
  useGyroscopeTilt(isMobile ? MAX_LOGO_ROTATION : 0)

  return <div className={containerStyles}>{children}</div>
}
