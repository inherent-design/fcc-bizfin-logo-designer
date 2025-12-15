// ============================================================================
// IMPORTS
// ============================================================================

// Panda CSS
import { css } from 'styled-system/css'

// ============================================================================
// STYLES
// ============================================================================

const containerStyles = css({
  fontSize: 'xs',
  color: 'panel.fg',
  opacity: 'subtle',
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
})

const linkStyles = css({
  transition: 'fast',
  _hover: {
    opacity: 'medium',
  },
})

const versionStyles = css({
  fontFamily: 'mono',
})

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * MetaInfo - Footer component displaying copyright and version information
 *
 * Features:
 * - Dynamic copyright year (2025 or range 2025-current)
 * - Version display (from environment variable)
 * - Link to GitHub source code
 *
 * @example
 * ```tsx
 * <MetaInfo />
 * ```
 */
export function MetaInfo() {
  const currentYear = new Date().getFullYear()
  const copyrightYear = currentYear === 2025 ? '2025' : `2025-${currentYear}`

  const version = import.meta.env.VITE_APP_VERSION || 'dev-local'
  const versionDisplay = import.meta.env.MODE === 'production' ? `v${version}` : version

  return (
    <div className={containerStyles}>
      <p>
        <span>© {copyrightYear} inherent.design</span>
        {' | '}
        <a
          href='https://github.com/inherent-design/fcc-bizfin-logo-designer'
          target='_blank'
          rel='noopener noreferrer'
          className={linkStyles}
        >
          Source Code
        </a>
        {' | '}
        <span className={versionStyles}>{versionDisplay}</span>
      </p>
    </div>
  )
}
