import type { LogoState } from '../schemas/logoState.schema'

/**
 * Generate a thumbnail from logo state
 * Returns base64 data URL of SVG
 */
export function generateThumbnail(state: LogoState): string {
  // For now, return a placeholder
  // TODO: Implement actual SVG rendering logic similar to LogoPreview
  // This will require extracting SVG generation logic into a reusable function

  const placeholder = `
    <svg width="120" height="120" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
      <rect width="160" height="160" fill="#f0f0f0"/>
      <text x="80" y="80" text-anchor="middle" fill="#999" font-size="12" font-family="sans-serif">
        ${state.name}
      </text>
    </svg>
  `.trim()

  return `data:image/svg+xml;base64,${btoa(placeholder)}`
}

/**
 * Hook to generate thumbnail from current design state
 */
export function useThumbnailGenerator() {
  return { generateThumbnail }
}
