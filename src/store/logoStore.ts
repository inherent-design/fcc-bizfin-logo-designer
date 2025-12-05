import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import defaultDesign from '../../config/defaultDesign.json'
import {
  safeValidateLogoState,
  type HSLColor,
  type LogoState,
  type Quadrant,
  type Vec2,
} from '../schemas/logoState.schema'
import { storageLogger, storeLogger } from '../utils/logger'

interface LogoStore extends LogoState {
  // Actions for updating state
  setBaseColor: (color: HSLColor) => void

  swapElements: (fromPosition: number, toPosition: number) => void
  setElementScale: (position: number, scale: number) => void
  setCenterOffset: (position: number, offset: Vec2) => void

  setBaseFillColor: (color: HSLColor) => void
  setBaseElementColorOverBase: (color: HSLColor) => void
  setBaseElementColorOverFilledQuadrants: (color: HSLColor) => void

  enableTwoTone: () => void
  disableTwoTone: () => void
  setTwoToneFillColor: (quadrant: 0 | 3, color: HSLColor) => void

  enableUniqueElementColors: () => void
  disableUniqueElementColors: () => void
  setUniqueElementColor: (quadrant: 0 | 3, color: HSLColor) => void

  // Utility functions
  getElementColor: (position: number) => HSLColor
  getFillColor: (position: number) => HSLColor | null

  exportState: () => string
  importState: (json: string) => void
  resetToDefault: () => void
}

export const useLogoStore = create<LogoStore>()(
  persist(
    (set, get) => ({
      // Initialize with default design
      ...(defaultDesign as LogoState),

      // Base color actions
      setBaseColor: (color) => {
        storeLogger.debug({ color }, 'Setting base color')
        set({ baseColor: color })
      },

      // Quadrant actions
      swapElements: (fromPosition, toPosition) => {
        storeLogger.debug({ fromPosition, toPosition }, 'Swapping elements')
        set((state) => {
          const newQuadrants = [...state.quadrants] as [Quadrant, Quadrant, Quadrant, Quadrant]
          const tempElementId = newQuadrants[fromPosition].elementId
          newQuadrants[fromPosition].elementId = newQuadrants[toPosition].elementId
          newQuadrants[toPosition].elementId = tempElementId
          return { quadrants: newQuadrants }
        })
      },

      setElementScale: (position, scale) =>
        set((state) => {
          const newQuadrants = [...state.quadrants] as [Quadrant, Quadrant, Quadrant, Quadrant]
          newQuadrants[position] = {
            ...newQuadrants[position],
            elementScale: Math.max(0.5, Math.min(2.0, scale)),
          }
          return { quadrants: newQuadrants }
        }),

      setCenterOffset: (position, offset) =>
        set((state) => {
          const newQuadrants = [...state.quadrants] as [Quadrant, Quadrant, Quadrant, Quadrant]
          newQuadrants[position] = {
            ...newQuadrants[position],
            centerOffset: offset,
          }
          return { quadrants: newQuadrants }
        }),

      // Base design color actions
      setBaseFillColor: (color) => {
        storeLogger.debug({ color }, 'Setting base fill color')
        set((state) => ({
          baseDesign: {
            ...state.baseDesign,
            fillColorForFilledQuadrants: color,
          },
        }))
      },

      setBaseElementColorOverBase: (color) => {
        storeLogger.debug({ color }, 'Setting element color over base')
        set((state) => ({
          baseDesign: {
            ...state.baseDesign,
            elementColorOverBase: color,
          },
        }))
      },

      setBaseElementColorOverFilledQuadrants: (color) => {
        storeLogger.debug({ color }, 'Setting element color over filled quadrants')
        set((state) => ({
          baseDesign: {
            ...state.baseDesign,
            elementColorOverFilledQuadrants: color,
          },
        }))
      },

      // Two-tone mode actions
      enableTwoTone: () => {
        storeLogger.debug('Enabling two-tone mode')
        set((state) => ({
          twoToneDesign: {
            fillColorQuadrant0: state.baseDesign.fillColorForFilledQuadrants,
            fillColorQuadrant3: state.baseDesign.fillColorForFilledQuadrants,
            uniqueElementColors: null,
          },
        }))
      },

      disableTwoTone: () => {
        storeLogger.debug('Disabling two-tone mode')
        set({ twoToneDesign: null })
      },

      setTwoToneFillColor: (quadrant, color) => {
        storeLogger.debug({ quadrant, color }, 'Setting two-tone fill color')
        set((state) => {
          if (!state.twoToneDesign) {
            storeLogger.warn('Attempted to set two-tone fill color when two-tone mode is disabled')
            return state
          }
          return {
            twoToneDesign: {
              ...state.twoToneDesign,
              [quadrant === 0 ? 'fillColorQuadrant0' : 'fillColorQuadrant3']: color,
            },
          }
        })
      },

      // Unique element colors actions
      enableUniqueElementColors: () => {
        storeLogger.debug('Enabling unique element colors')
        set((state) => {
          if (!state.twoToneDesign) {
            storeLogger.warn(
              'Attempted to enable unique element colors when two-tone mode is disabled'
            )
            return state
          }
          return {
            twoToneDesign: {
              ...state.twoToneDesign,
              uniqueElementColors: {
                elementColorOverQuadrant0Fill: state.baseDesign.elementColorOverFilledQuadrants,
                elementColorOverQuadrant3Fill: state.baseDesign.elementColorOverFilledQuadrants,
              },
            },
          }
        })
      },

      disableUniqueElementColors: () => {
        storeLogger.debug('Disabling unique element colors')
        set((state) => {
          if (!state.twoToneDesign) {
            storeLogger.warn(
              'Attempted to disable unique element colors when two-tone mode is disabled'
            )
            return state
          }
          return {
            twoToneDesign: {
              ...state.twoToneDesign,
              uniqueElementColors: null,
            },
          }
        })
      },

      setUniqueElementColor: (quadrant, color) => {
        storeLogger.debug({ quadrant, color }, 'Setting unique element color')
        set((state) => {
          if (!state.twoToneDesign?.uniqueElementColors) {
            storeLogger.warn('Attempted to set unique element color when feature is disabled')
            return state
          }
          return {
            twoToneDesign: {
              ...state.twoToneDesign,
              uniqueElementColors: {
                ...state.twoToneDesign.uniqueElementColors,
                [quadrant === 0
                  ? 'elementColorOverQuadrant0Fill'
                  : 'elementColorOverQuadrant3Fill']: color,
              },
            },
          }
        })
      },

      // Utility functions
      getElementColor: (position) => {
        const state = get()
        const quadrant = state.quadrants[position]

        // If quadrant reveals base (not filled) - positions 1 & 2
        if (!quadrant.isFilled) {
          return state.baseDesign.elementColorOverBase
        }

        // Quadrant is filled (positions 0 & 3) - check if 2-tone mode with unique colors
        if (state.twoToneDesign?.uniqueElementColors) {
          // 3-color mode: separate colors for each filled quadrant
          return position === 0
            ? state.twoToneDesign.uniqueElementColors.elementColorOverQuadrant0Fill
            : state.twoToneDesign.uniqueElementColors.elementColorOverQuadrant3Fill
        }

        // 2-color mode: shared color for both filled quadrants
        return state.baseDesign.elementColorOverFilledQuadrants
      },

      getFillColor: (position) => {
        const state = get()
        const quadrant = state.quadrants[position]

        if (!quadrant.isFilled) return null

        // Check tier 1 (2-tone mode)
        if (state.twoToneDesign) {
          return position === 0
            ? state.twoToneDesign.fillColorQuadrant0
            : state.twoToneDesign.fillColorQuadrant3
        }

        // Fall back to base design
        return state.baseDesign.fillColorForFilledQuadrants
      },

      // Serialization
      exportState: () => {
        const state = get()
        const {
          version,
          name,
          baseColor,
          availableElements,
          quadrants,
          baseDesign,
          twoToneDesign,
        } = state
        const json = JSON.stringify(
          {
            version,
            name,
            baseColor,
            availableElements,
            quadrants,
            baseDesign,
            twoToneDesign,
          },
          null,
          2
        )

        storageLogger.info(
          {
            version,
            name,
            jsonLength: json.length,
          },
          'State exported'
        )

        return json
      },

      importState: (json) => {
        try {
          storageLogger.info(
            {
              jsonLength: json.length,
            },
            'Attempting to import state'
          )
          const imported = JSON.parse(json) as LogoState

          // Validate imported state has required fields
          if (!imported.version || !imported.baseColor || !imported.quadrants) {
            throw new Error('Invalid state structure: missing required fields')
          }

          storageLogger.warn(
            {
              version: imported.version,
              name: imported.name,
            },
            'Importing state (will trigger localStorage write)'
          )

          set(imported)
          storageLogger.info('State imported successfully')
        } catch (error) {
          storageLogger.error({ error }, 'Failed to import state')
          throw error
        }
      },

      resetToDefault: () => {
        storageLogger.warn('Resetting to default design (will trigger localStorage write)')
        set(defaultDesign as LogoState)
        storageLogger.info('Reset to default design complete')
      },
    }),
    {
      name: 'fcc-logo-designer-storage',
      version: 2,
      migrate: (persistedState: unknown, version: number) => {
        storageLogger.info({ version }, 'Migrating stored state')

        // Validate persisted state structure with Zod
        const validationResult = safeValidateLogoState(persistedState)

        if (!validationResult.success) {
          storageLogger.warn(
            {
              errors: validationResult.error.issues,
            },
            'Persisted state failed Zod validation, attempting migration'
          )
        }

        // Cast to Record for property access during migration
        const state = persistedState as Record<string, unknown>

        // Migration for v1: Rename elementColorOverGold -> elementColorOverBase
        // and elementColorOverFill -> elementColorOverFilledQuadrants
        if (state?.baseDesign) {
          const baseDesign = state.baseDesign as Record<string, unknown>

          if (baseDesign.elementColorOverGold && !baseDesign.elementColorOverBase) {
            storageLogger.debug('Migrating elementColorOverGold to elementColorOverBase')
            baseDesign.elementColorOverBase = baseDesign.elementColorOverGold
            delete baseDesign.elementColorOverGold
          }

          if (baseDesign.elementColorOverFill && !baseDesign.elementColorOverFilledQuadrants) {
            storageLogger.debug('Migrating elementColorOverFill to elementColorOverFilledQuadrants')
            baseDesign.elementColorOverFilledQuadrants = baseDesign.elementColorOverFill
            delete baseDesign.elementColorOverFill
          }
        }

        // Migration for v2: Rename elementOffset -> centerOffset
        // Migration for v3: Remove obsolete quadrantCenter field and position field
        if (state?.quadrants && Array.isArray(state.quadrants)) {
          state.quadrants.forEach((quadrant: Record<string, unknown>, i: number) => {
            // v2: Rename elementOffset to centerOffset
            if (quadrant.elementOffset && !quadrant.centerOffset) {
              storageLogger.debug(
                { position: i },
                `Migrating elementOffset to centerOffset for position ${i}`
              )
              quadrant.centerOffset = quadrant.elementOffset
              delete quadrant.elementOffset
            }

            // v3: Remove quadrantCenter (now hardcoded in LogoPreview component)
            if (quadrant.quadrantCenter) {
              storageLogger.debug(
                { position: i },
                `Removing obsolete quadrantCenter for position ${i}`
              )
              delete quadrant.quadrantCenter
            }

            // v3: Remove position field (array index determines position)
            if (quadrant.position !== undefined) {
              storageLogger.debug({ position: i }, `Removing position field from quadrant ${i}`)
              delete quadrant.position
            }
          })
        }

        // Migration for v3: Convert availableElements from objects to IDs
        if (state?.availableElements && Array.isArray(state.availableElements)) {
          const firstElement = state.availableElements[0]
          // Check if this is old format (objects with id property)
          if (firstElement && typeof firstElement === 'object' && 'id' in firstElement) {
            storageLogger.debug('Migrating availableElements from objects to IDs')
            state.availableElements = state.availableElements.map((el: { id: string }) => el.id)
          }
        }

        // Final validation after migration
        const finalValidation = safeValidateLogoState(state)

        if (finalValidation.success) {
          storageLogger.info('State validated successfully after migration')
          return finalValidation.data
        } else {
          storageLogger.error(
            {
              errors: finalValidation.error.issues,
            },
            'State still invalid after migration, falling back to default'
          )
          return defaultDesign as LogoState
        }
      },
      onRehydrateStorage: () => {
        storageLogger.info('Beginning to rehydrate state from localStorage')
        return (state, error) => {
          if (error) {
            storageLogger.error('Failed to rehydrate state from localStorage')
            console.error(error)
          } else {
            storageLogger.info('Successfully rehydrated state from localStorage')
            console.log({
              designName: state?.name,
              version: state?.version,
            })
          }
        }
      },
    }
  )
)
