import { create } from 'zustand'

interface UIStore {
  // Control panel
  activeTab: 'color' | 'layout'
  isPanelCollapsed: boolean

  // Design gallery drawer
  isGalleryOpen: boolean
  galleryFilter: 'all' | 'favorites' | 'recent'

  // Loading states
  isExporting: boolean
  isImporting: boolean

  // Actions
  setActiveTab: (tab: 'color' | 'layout') => void
  togglePanel: () => void
  toggleGallery: () => void
  setGalleryFilter: (filter: 'all' | 'favorites' | 'recent') => void
  setExporting: (isExporting: boolean) => void
  setImporting: (isImporting: boolean) => void
}

export const useUIStore = create<UIStore>()((set) => ({
  activeTab: 'color',
  isPanelCollapsed: false,
  isGalleryOpen: false, // Hidden on mobile by default
  galleryFilter: 'all',
  isExporting: false,
  isImporting: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  togglePanel: () => set((state) => ({ isPanelCollapsed: !state.isPanelCollapsed })),
  toggleGallery: () => set((state) => ({ isGalleryOpen: !state.isGalleryOpen })),
  setGalleryFilter: (filter) => set({ galleryFilter: filter }),
  setExporting: (isExporting) => set({ isExporting }),
  setImporting: (isImporting) => set({ isImporting }),
}))
