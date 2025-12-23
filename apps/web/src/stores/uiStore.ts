import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { storeLogger } from '../utils/logger'

interface UIStore {
  // Control panel
  activeTab: 'color' | 'layout' | 'gallery'
  isPanelCollapsed: boolean

  // Design gallery drawer
  isGalleryOpen: boolean
  galleryFilter: 'all' | 'favorites' | 'recent'

  // World theme
  worldTheme: 'dark' | 'light'

  // Loading states
  isExporting: boolean
  isImporting: boolean

  // Actions
  setActiveTab: (tab: 'color' | 'layout' | 'gallery') => void
  togglePanel: () => void
  toggleGallery: () => void
  setGalleryFilter: (filter: 'all' | 'favorites' | 'recent') => void
  toggleWorldTheme: () => void
  setExporting: (isExporting: boolean) => void
  setImporting: (isImporting: boolean) => void
}

/**
 * Detect user's preferred color scheme from system settings
 */
function getInitialTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark'
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      activeTab: 'color',
      isPanelCollapsed: false,
      isGalleryOpen: false, // Hidden on mobile by default
      galleryFilter: 'all',
      worldTheme: getInitialTheme(), // Initialize from system preference
      isExporting: false,
      isImporting: false,

      setActiveTab: (tab) =>
        set((state) => {
          storeLogger.debug(
            { store: 'uiStore', action: 'setActiveTab', from: state.activeTab, to: tab },
            'Tab changed'
          )
          return { activeTab: tab }
        }),
      togglePanel: () =>
        set((state) => {
          const newCollapsed = !state.isPanelCollapsed
          storeLogger.debug(
            { store: 'uiStore', action: 'togglePanel', collapsed: newCollapsed },
            'Panel toggled'
          )
          return { isPanelCollapsed: newCollapsed }
        }),
      toggleGallery: () =>
        set((state) => {
          const newOpen = !state.isGalleryOpen
          storeLogger.debug(
            { store: 'uiStore', action: 'toggleGallery', open: newOpen },
            'Gallery toggled'
          )
          return { isGalleryOpen: newOpen }
        }),
      setGalleryFilter: (filter) =>
        set((state) => {
          storeLogger.debug(
            { store: 'uiStore', action: 'setGalleryFilter', from: state.galleryFilter, to: filter },
            'Gallery filter changed'
          )
          return { galleryFilter: filter }
        }),
      toggleWorldTheme: () =>
        set((state) => {
          const newTheme = state.worldTheme === 'dark' ? 'light' : 'dark'
          storeLogger.trace({ from: state.worldTheme, to: newTheme }, 'Toggling world theme')
          return { worldTheme: newTheme }
        }),
      setExporting: (isExporting) => {
        storeLogger.debug(
          { store: 'uiStore', action: 'setExporting', exporting: isExporting },
          'Export state changed'
        )
        set({ isExporting })
      },
      setImporting: (isImporting) => {
        storeLogger.debug(
          { store: 'uiStore', action: 'setImporting', importing: isImporting },
          'Import state changed'
        )
        set({ isImporting })
      },
    }),
    {
      name: 'fcc-logo-designer-ui-storage',
      partialize: (state) => ({ worldTheme: state.worldTheme }),
    }
  )
)
