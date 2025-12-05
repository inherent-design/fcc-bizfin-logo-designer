import { componentLogger } from '../utils/logger'

// Section Header Component
function SectionHeader({ title }: { title: string }) {
  return (
    <div>
      <h3 className='text-xs font-semibold uppercase tracking-wider text-base-content/60'>
        {title}
      </h3>
    </div>
  )
}

// Props interface using hybrid pattern
interface HistorySettingsProps {
  // State values (read-only)
  currentDesignName: string

  // Actions (grouped)
  actions: {
    exportState: () => string
    importState: (json: string) => void
    resetToDefault: () => void
  }
}

export function HistorySettings({ currentDesignName, actions }: HistorySettingsProps) {
  const handleExport = () => {
    try {
      const json = actions.exportState()
      componentLogger.info({ length: json.length }, 'State exported')

      // Copy to clipboard
      navigator.clipboard.writeText(json).then(
        () => {
          componentLogger.debug('State copied to clipboard')
          // TODO: Add toast notification
          alert('Design exported to clipboard!')
        },
        (err) => {
          componentLogger.error({ error: err }, 'Failed to copy to clipboard')
          // Fallback: show in prompt
          prompt('Copy this design JSON:', json)
        }
      )
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

      // Validate JSON before importing
      try {
        JSON.parse(json)
        actions.importState(json)
        componentLogger.info(
          {
            length: json.length,
          },
          'State imported successfully'
        )
        // TODO: Add toast notification
        alert('Design imported successfully!')
      } catch (parseError) {
        componentLogger.error({ error: parseError }, 'Invalid JSON provided')
        alert('Invalid JSON format. Please check and try again.')
      }
    } catch (error) {
      componentLogger.error({ error }, 'Import failed')
    }
  }

  const handleReset = () => {
    if (confirm('Reset to default design? This cannot be undone.')) {
      componentLogger.warn('Resetting to default design')
      actions.resetToDefault()
      // TODO: Add toast notification
      alert('Design reset to default!')
    } else {
      componentLogger.debug('Reset cancelled by user')
    }
  }

  return (
    <div>
      {/* Saved Designs */}
      <div>
        <SectionHeader title='Saved Designs' />
        <div>
          <button
            onClick={() => componentLogger.debug({ name: 'Default' }, 'Saved design clicked')}
            className='btn btn-ghost btn-sm text-primary'
          >
            → {currentDesignName}
          </button>
          <button
            onClick={() =>
              componentLogger.debug(
                {
                  name: 'High Contrast',
                },
                'Saved design clicked'
              )
            }
            className='btn btn-ghost btn-sm'
            disabled
          >
            High Contrast
          </button>
          <button
            onClick={() =>
              componentLogger.debug(
                {
                  name: 'Minimalist',
                },
                'Saved design clicked'
              )
            }
            className='btn btn-ghost btn-sm'
            disabled
          >
            Minimalist
          </button>
        </div>
      </div>

      {/* Actions */}
      <div>
        <SectionHeader title='Actions' />
        <div>
          <button onClick={handleExport} className='btn btn-sm btn-outline'>
            Export Design
          </button>
          <button onClick={handleImport} className='btn btn-sm btn-outline'>
            Import Design
          </button>
          <button onClick={handleReset} className='btn btn-sm btn-outline btn-error'>
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  )
}
