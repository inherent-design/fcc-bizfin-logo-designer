import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LogoState } from '../schemas/logoState.schema'
import { storeLogger } from '../utils/logger'

export interface SavedDesign {
  id: string
  name: string
  timestamp: Date
  state: LogoState // Full LogoState snapshot
  thumbnail: string // Base64 SVG data URL
  isFavorite: boolean
  isSystemPreset: boolean
}

interface PresetsStore {
  // Gallery
  designs: SavedDesign[]
  activeDesignId: string | null

  // Actions
  saveDesign: (name: string, state: LogoState) => void
  loadDesign: (id: string) => LogoState | null
  deleteDesign: (id: string) => void
  toggleFavorite: (id: string) => void
  duplicateDesign: (id: string) => void
  renameDesign: (id: string, newName: string) => void
  exportDesign: (id: string) => string | null
  importDesign: (json: string) => void
}

export const usePresetsStore = create<PresetsStore>()(
  persist(
    (set, get) => ({
      designs: [],
      activeDesignId: null,

      /**
       * Save a new design to the gallery
       *
       * @param name - Display name for the design
       * @param state - Full LogoState snapshot
       *
       * @note Thumbnail generation is stubbed (uses placeholder)
       * @see useThumbnailGenerator.ts for stub details
       */
      saveDesign: (name, state) => {
        // STUB: Generate simple thumbnail (base64 SVG data URL)
        // Will be replaced with actual logo rendering
        const thumbnail = `data:image/svg+xml;base64,${btoa('<svg></svg>')}`

        const newDesign: SavedDesign = {
          id: crypto.randomUUID(),
          name,
          timestamp: new Date(),
          state,
          thumbnail,
          isFavorite: false,
          isSystemPreset: false,
        }

        set((store) => ({
          designs: [...store.designs, newDesign],
          activeDesignId: newDesign.id,
        }))
      },

      loadDesign: (id) => {
        const design = get().designs.find((d) => d.id === id)
        if (design) {
          set({ activeDesignId: id })
          return design.state
        }
        return null
      },

      deleteDesign: (id) => {
        set((state) => ({
          designs: state.designs.filter((d) => d.id !== id),
          activeDesignId: state.activeDesignId === id ? null : state.activeDesignId,
        }))
      },

      toggleFavorite: (id) => {
        set((state) => ({
          designs: state.designs.map((d) =>
            d.id === id ? { ...d, isFavorite: !d.isFavorite } : d
          ),
        }))
      },

      duplicateDesign: (id) => {
        const original = get().designs.find((d) => d.id === id)
        if (original) {
          const duplicate: SavedDesign = {
            ...original,
            id: crypto.randomUUID(),
            name: `${original.name} (Copy)`,
            timestamp: new Date(),
            isFavorite: false,
            isSystemPreset: false,
          }
          set((state) => ({ designs: [...state.designs, duplicate] }))
        }
      },

      renameDesign: (id, newName) => {
        set((state) => ({
          designs: state.designs.map((d) => (d.id === id ? { ...d, name: newName } : d)),
        }))
      },

      exportDesign: (id) => {
        const design = get().designs.find((d) => d.id === id)
        if (design) {
          return JSON.stringify(design.state, null, 2)
        }
        return null
      },

      importDesign: (json) => {
        try {
          const state = JSON.parse(json) as LogoState

          const imported: SavedDesign = {
            id: crypto.randomUUID(),
            name: state.name || 'Imported Design',
            timestamp: new Date(),
            state,
            // STUB: Generate simple thumbnail (base64 SVG data URL)
            thumbnail: `data:image/svg+xml;base64,${btoa('<svg></svg>')}`,
            isFavorite: false,
            isSystemPreset: false,
          }

          set((store) => ({
            designs: [...store.designs, imported],
            activeDesignId: imported.id,
          }))
        } catch (error) {
          storeLogger.error({ error }, 'Failed to import design')
          throw error
        }
      },
    }),
    {
      name: 'fcc-logo-designer-gallery',
      version: 1,
    }
  )
)
