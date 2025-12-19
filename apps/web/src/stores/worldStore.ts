import { create } from 'zustand'

interface WorldStore {
  // Mouse tracking
  mousePosition: { x: number; y: number } // Normalized [-1, 1]
  mouseVelocity: { x: number; y: number }

  // Logo tilt (derived from mouse)
  logoRotation: { x: number; y: number } // Degrees

  // Layer depth (for parallax)
  layerDepths: {
    base: number // z-index or translateZ value
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

export const useWorldStore = create<WorldStore>()((set) => ({
  mousePosition: { x: 0, y: 0 },
  mouseVelocity: { x: 0, y: 0 },
  logoRotation: { x: 0, y: 0 },
  layerDepths: {
    base: 0,
    handshake: 10,
    elements: 20,
  },
  zoom: 1,

  updateMousePosition: (x, y) =>
    set((state) => ({
      mousePosition: { x, y },
      mouseVelocity: {
        x: x - state.mousePosition.x,
        y: y - state.mousePosition.y,
      },
    })),

  setLogoRotation: (x, y) => set({ logoRotation: { x, y } }),
  resetCamera: () => set({ logoRotation: { x: 0, y: 0 }, zoom: 1 }),
}))
