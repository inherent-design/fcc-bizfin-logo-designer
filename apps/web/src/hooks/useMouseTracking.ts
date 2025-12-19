import { useEffect } from 'react'
import { useWorldStore } from '../stores/worldStore'

/**
 * Hook to track global mouse position and update world store
 * Normalizes mouse position to [-1, 1] range
 */
export function useMouseTracking() {
  const updateMousePosition = useWorldStore((state) => state.updateMousePosition)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      updateMousePosition(x, y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [updateMousePosition])
}
