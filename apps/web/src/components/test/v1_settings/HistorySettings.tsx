// ============================================================================
// IMPORTS
// ============================================================================

// Panda CSS
import { css } from '@styled-system/css'

// Utils
import { componentLogger } from '@/utils/logger'

// Components
import { Button } from '../ui/Button/Button'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Section header component props
 */
interface SectionHeaderProps {
  /** Section title text */
  title: string
}

/**
 * History settings component props - uses hybrid pattern
 */
interface HistorySettingsProps {
  /** Current design name (read-only) */
  currentDesignName: string

  /** Action handlers grouped together */
  actions: {
    /** Export current state to JSON string */
    exportState: () => string
    /** Import state from JSON string */
    importState: (json: string) => void
    /** Reset to default design */
    resetToDefault: () => void
  }
}

// ============================================================================
// STYLES
// ============================================================================

const containerStyles = css({
  display: 'flex',
  gap: 'stack.normal',
  flexDirection: 'column',
})

const sectionContainerStyles = css({
  display: 'flex',
  gap: 'stack.tight',
  flexDirection: 'column',
})

const sectionHeaderStyles = css({
  color: 'surface.fg',
  fontFamily: 'brutalist',
  fontSize: 'xs',
  fontWeight: 'bold',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  opacity: 'subtle',
})

const buttonListStyles = css({
  display: 'flex',
  gap: 'stack.tight',
  flexDirection: 'column',
})

const activeDesignButtonStyles = css({
  color: 'accent.primary',
})

const iconStyles = css({
  mr: 'inline.tight',
})

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Copy text to clipboard with fallback to prompt
 *
 * @param text - Text to copy to clipboard
 * @param successMessage - Message to show on success
 */
function copyToClipboardWithFallback(text: string, successMessage: string): void {
  navigator.clipboard.writeText(text).then(
    () => {
      componentLogger.debug('Text copied to clipboard')
      alert(successMessage)
    },
    (err) => {
      componentLogger.error({ error: err }, 'Failed to copy to clipboard')
      prompt('Copy this design JSON:', text)
    }
  )
}

/**
 * Validate JSON string
 *
 * @param json - JSON string to validate
 * @returns True if valid JSON, false otherwise
 */
function isValidJSON(json: string): boolean {
  try {
    JSON.parse(json)
    return true
  } catch {
    return false
  }
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * SectionHeader - Reusable section label component
 */
function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div>
      <h3 className={sectionHeaderStyles}>{title}</h3>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * HistorySettings - Manage design history and state
 *
 * Features:
 * - View saved designs (currently showing placeholder designs)
 * - Export current design to JSON (clipboard)
 * - Import design from JSON (prompt)
 * - Reset to default design (with confirmation)
 *
 * Layout:
 * - Saved Designs section: List of available designs
 * - Actions section: Export, Import, Reset buttons
 *
 * @example
 * ```tsx
 * <HistorySettings
 *   currentDesignName="Default"
 *   actions={{
 *     exportState: () => JSON.stringify(state),
 *     importState: (json) => setState(JSON.parse(json)),
 *     resetToDefault: () => setState(defaultState)
 *   }}
 * />
 * ```
 */
export function HistorySettings({ currentDesignName, actions }: HistorySettingsProps) {
  const handleExport = () => {
    try {
      const json = actions.exportState()
      componentLogger.info({ length: json.length }, 'State exported')
      copyToClipboardWithFallback(json, 'Design exported to clipboard!')
    } catch (error) {
      componentLogger.error({ error }, 'Export failed')
    }
  }

  const handleImport = () => {
    try {
      const json = prompt('Paste design JSON:')
      if (!json) {
        componentLogger.debug('Import cancelled by user')
        return
      }

      if (!isValidJSON(json)) {
        componentLogger.error('Invalid JSON provided')
        alert('Invalid JSON format. Please check and try again.')
        return
      }

      actions.importState(json)
      componentLogger.info({ length: json.length }, 'State imported successfully')
      alert('Design imported successfully!')
    } catch (error) {
      componentLogger.error({ error }, 'Import failed')
    }
  }

  const handleReset = () => {
    if (confirm('Reset to default design? This cannot be undone.')) {
      componentLogger.warn('Resetting to default design')
      actions.resetToDefault()
      alert('Design reset to default!')
    } else {
      componentLogger.debug('Reset cancelled by user')
    }
  }

  return (
    <div className={containerStyles}>
      {/* Saved Designs Section */}
      <div className={sectionContainerStyles}>
        <SectionHeader title='Saved Designs' />
        <div className={buttonListStyles}>
          <Button
            className={activeDesignButtonStyles}
            onClick={() => componentLogger.debug({ name: 'Default' }, 'Saved design clicked')}
            variant='ghost'
            size='sm'
          >
            <span className={iconStyles}>→</span>
            {currentDesignName}
          </Button>
          <Button
            onClick={() => componentLogger.debug({ name: 'High Contrast' }, 'Saved design clicked')}
            variant='ghost'
            size='sm'
            disabled
          >
            High Contrast
          </Button>
          <Button
            onClick={() => componentLogger.debug({ name: 'Minimalist' }, 'Saved design clicked')}
            variant='ghost'
            size='sm'
            disabled
          >
            Minimalist
          </Button>
        </div>
      </div>

      {/* Actions Section */}
      <div className={sectionContainerStyles}>
        <SectionHeader title='Actions' />
        <div className={buttonListStyles}>
          <Button onClick={handleExport} variant='secondary' size='sm'>
            Export Design
          </Button>
          <Button onClick={handleImport} variant='secondary' size='sm'>
            Import Design
          </Button>
          <Button onClick={handleReset} variant='danger' size='sm'>
            Reset to Default
          </Button>
        </div>
      </div>
    </div>
  )
}
