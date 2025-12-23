import { create } from 'zustand'
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

export const useUIStore = create<UIStore>()((set) => ({
  activeTab: 'color',
  isPanelCollapsed: false,
  isGalleryOpen: false, // Hidden on mobile by default
  galleryFilter: 'all',
  worldTheme: getInitialTheme(), // Initialize from system preference
  isExporting: false,
  isImporting: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  togglePanel: () => set((state) => ({ isPanelCollapsed: !state.isPanelCollapsed })),
  toggleGallery: () => set((state) => ({ isGalleryOpen: !state.isGalleryOpen })),
  setGalleryFilter: (filter) => set({ galleryFilter: filter }),
  toggleWorldTheme: () =>
    set((state) => {
      const newTheme = state.worldTheme === 'dark' ? 'light' : 'dark'
      storeLogger.trace({ from: state.worldTheme, to: newTheme }, 'Toggling world theme')
      return { worldTheme: newTheme }
    }),
  setExporting: (isExporting) => set({ isExporting }),
  setImporting: (isImporting) => set({ isImporting }),
}))
