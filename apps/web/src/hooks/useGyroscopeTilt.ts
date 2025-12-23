import { useEffect, useRef } from 'react'

import { MAX_LOGO_ROTATION, ROTATION_DAMPING } from '@/constants/world'
import { useWorldStore } from '@/stores/worldStore'
import { clamp, smoothDamp } from '@/utils/animations'
import { componentLogger } from '@/utils/logger'

// Module-specific logger
const gyroLogger = componentLogger.child({ module: 'gyroscope' })

/**
 * Hook to apply logo tilt based on device orientation (gyroscope)
 * For mobile devices
 */
export function useGyroscopeTilt(maxRotation: number = MAX_LOGO_ROTATION) {
  const setLogoRotation = useWorldStore((state) => state.setLogoRotation)
  const currentRotation = useRef({ x: 0, y: 0 })
  const rafId = useRef<number | undefined>(undefined)
  const targetRotation = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Early return if disabled (maxRotation=0 on desktop)
    if (maxRotation === 0) return

    // Check if DeviceOrientationEvent is supported
    if (typeof DeviceOrientationEvent === 'undefined') {
      return
    }

    const handleOrientation = (event: DeviceOrientationEvent) => {
      // beta: front-to-back tilt (-180 to 180)
      // gamma: left-to-right tilt (-90 to 90)
      const beta = event.beta || 0
      const gamma = event.gamma || 0

      // Map device tilt to rotation (-maxRotation to +maxRotation)
      // Clamp beta to reasonable range (0 = flat, ±45 = tilted)
      targetRotation.current.x = clamp((beta - 45) / 45, -1, 1) * maxRotation
      targetRotation.current.y = clamp(gamma / 45, -1, 1) * maxRotation
    }

    const animate = () => {
      // Smooth damp towards target
      currentRotation.current.x = smoothDamp(
        currentRotation.current.x,
        targetRotation.current.x,
        ROTATION_DAMPING
      )
      currentRotation.current.y = smoothDamp(
        currentRotation.current.y,
        targetRotation.current.y,
        ROTATION_DAMPING
      )

      setLogoRotation(currentRotation.current.x, currentRotation.current.y)
      rafId.current = requestAnimationFrame(animate)
    }

    // Request permission on iOS 13+ devices
    const requestPermission = async () => {
      if (
        typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> })
          .requestPermission === 'function'
      ) {
        try {
          const permission = await (
            DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }
          ).requestPermission()
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation)
            rafId.current = requestAnimationFrame(animate)
          }
        } catch (error) {
          gyroLogger.error({ error }, 'Failed to request device orientation permission')
        }
      } else {
        // Non-iOS devices
        window.addEventListener('deviceorientation', handleOrientation)
        rafId.current = requestAnimationFrame(animate)
      }
    }

    requestPermission()

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [maxRotation, setLogoRotation])
}
