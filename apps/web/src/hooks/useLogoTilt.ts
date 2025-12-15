import { useEffect, useRef } from 'react'
import { useWorldStore } from '../store/worldStore'
import { calculateTiltFromMouse, smoothDamp } from '../utils/animations'
import { MAX_LOGO_ROTATION, ROTATION_DAMPING } from '../constants/world'

/**
 * Hook to calculate and apply logo tilt based on mouse position
 * Uses smooth damping for natural movement
 */
export function useLogoTilt(maxRotation: number = MAX_LOGO_ROTATION) {
  const mousePosition = useWorldStore((state) => state.mousePosition)
  const setLogoRotation = useWorldStore((state) => state.setLogoRotation)

  // Track current rotation for smooth damping
  const currentRotation = useRef({ x: 0, y: 0 })
  const rafId = useRef<number | undefined>(undefined)

  useEffect(() => {
    const animate = () => {
      // Calculate target rotation from mouse
      const targetRotation = calculateTiltFromMouse(mousePosition.x, mousePosition.y, maxRotation)

      // Smooth damp towards target
      currentRotation.current.x = smoothDamp(
        currentRotation.current.x,
        targetRotation.x,
        ROTATION_DAMPING
      )
      currentRotation.current.y = smoothDamp(
        currentRotation.current.y,
        targetRotation.y,
        ROTATION_DAMPING
      )

      // Update store
      setLogoRotation(currentRotation.current.x, currentRotation.current.y)

      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [mousePosition, maxRotation, setLogoRotation])
}
