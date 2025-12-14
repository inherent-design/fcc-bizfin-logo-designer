import type { ReactNode } from 'react'
import { css } from 'styled-system/css'

interface CameraSpaceOverlayProps {
  children: ReactNode
}

export function CameraSpaceOverlay({ children }: CameraSpaceOverlayProps) {
  return (
    <div
      className={css({
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        '& > *': {
          pointerEvents: 'auto',
        },
      })}
    >
      {children}
    </div>
  )
}
