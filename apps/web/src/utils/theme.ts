/**
 * Initialize theme placeholder
 *
 * NOTE: Theme initialization moved to uiStore.ts (getInitialTheme)
 * Theme syncing happens in WorldSpace.tsx via useEffect
 * This function is kept for backwards compatibility but does nothing
 */
export function initTheme(): void {
  // No-op: Theme is now managed by uiStore + WorldSpace
  // uiStore detects system preference on initialization
  // WorldSpace syncs uiStore.worldTheme to document.documentElement.data-theme
}
