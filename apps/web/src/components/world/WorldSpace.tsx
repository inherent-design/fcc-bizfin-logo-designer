import type { ReactNode } from 'react'
import { css } from 'styled-system/css'
import { useMouseTracking } from '../../hooks/useMouseTracking'
import { useGyroscopeTilt } from '../../hooks/useGyroscopeTilt'
import { useLogoTilt } from '../../hooks/useLogoTilt'

interface WorldSpaceProps {
  children: ReactNode
}

export function WorldSpace({ children }: WorldSpaceProps) {
  // Enable mouse tracking (desktop)
  useMouseTracking()

  // Enable logo tilt (desktop with mouse, mobile with gyroscope)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // Call hooks unconditionally, they'll handle their own logic
  useLogoTilt(isMobile ? 0 : 10) // Max 10 degrees rotation on desktop
  useGyroscopeTilt(isMobile ? 10 : 0) // Max 10 degrees rotation on mobile

  return (
    <div
      className={css({
        width: '100vw',
        height: '100vh',
        bg: 'world.bg', // Radial gradient from semantic tokens
        overflow: 'hidden',
        position: 'relative',
      })}
    >
      {children}
    </div>
  )
}
