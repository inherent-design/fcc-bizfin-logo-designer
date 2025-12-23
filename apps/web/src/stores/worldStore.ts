import { create } from 'zustand'
import { storeLogger } from '@/utils/logger'

interface WorldStore {
  // Mouse tracking
  mousePosition: { x: number; y: number } // Normalized [-1, 1]
  mouseVelocity: { x: number; y: number }

  // Logo tilt (derived from mouse)
  logoRotation: { x: number; y: number } // Degrees

  // Layer depth (for parallax)
  layerDepths: {
    base: number // z-index or translateZ value
    quadrants: number
    handshake: number
    elements: number
  }

  // Viewport
  zoom: number // For future zoom controls

  // Actions
  updateMousePosition: (x: number, y: number) => void
  setLogoRotation: (x: number, y: number) => void
  resetCamera: () => void
}

// Debouncing state for high-frequency logging
let lastMouseLog = 0
let lastRotationLog = 0
let lastLoggedMouse = { x: 0, y: 0 }
let lastLoggedRotation = { x: 0, y: 0 }
const LOG_DEBOUNCE_MS = 500 // Log at most every 500ms during continuous updates

export const useWorldStore = create<WorldStore>()((set) => ({
  mousePosition: { x: 0, y: 0 },
  mouseVelocity: { x: 0, y: 0 },
  logoRotation: { x: 0, y: 0 },
  layerDepths: {
    base: 0,
    quadrants: 1,
    handshake: 2,
    elements: 3,
  },
  zoom: 1,

  updateMousePosition: (x, y) =>
    set((state) => {
      // Debounced trace logging for high-frequency mouse tracking
      // Only log if time passed AND value changed
      const now = Date.now()
      if (now - lastMouseLog > LOG_DEBOUNCE_MS) {
        if (lastLoggedMouse.x !== x || lastLoggedMouse.y !== y) {
          storeLogger.trace(
            { store: 'worldStore', action: 'updateMousePosition', x, y, timestamp: now },
            'Mouse position updated'
          )
          lastMouseLog = now
          lastLoggedMouse = { x, y }
        }
      }
      return {
        mousePosition: { x, y },
        mouseVelocity: {
          x: x - state.mousePosition.x,
          y: y - state.mousePosition.y,
        },
      }
    }),

  setLogoRotation: (x, y) => {
    // Debounced trace logging for high-frequency rotation updates
    // Only log if time passed AND value changed
    const now = Date.now()
    if (now - lastRotationLog > LOG_DEBOUNCE_MS) {
      if (lastLoggedRotation.x !== x || lastLoggedRotation.y !== y) {
        storeLogger.trace(
          { store: 'worldStore', action: 'setLogoRotation', x, y, timestamp: now },
          'Logo rotation changed'
        )
        lastRotationLog = now
        lastLoggedRotation = { x, y }
      }
    }
    set({ logoRotation: { x, y } })
  },
  resetCamera: () => {
    storeLogger.debug({ store: 'worldStore', action: 'resetCamera' }, 'Camera reset')
    set({ logoRotation: { x: 0, y: 0 }, zoom: 1 })
  },
}))
