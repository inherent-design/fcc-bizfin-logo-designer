// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import { useRef } from 'react'

// Panda CSS
import { css } from 'styled-system/css'

// Utils
import { componentLogger } from '@/utils/logger'

// Store
import { useLogoStore } from '@/stores/logoStore'
import { usePresetsStore } from '@/stores/presetsStore'
import { useUIStore } from '@/stores/uiStore'

// Components
import { Button } from '../ui/Button/Button'
import { Icon } from '../ui/Icon/Icon'
import { Input } from '../ui/Input/Input'

// ============================================================================
// STYLES
// ============================================================================

const containerStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'stack.normal',
  mb: 'stack.normal',
})

const saveRowStyles = css({
  display: 'flex',
  gap: 'inline.tight',
})

const nameInputStyles = css({
  flex: 1,
})

const exportImportRowStyles = css({
  display: 'flex',
  gap: 'inline.tight',
})

const actionButtonStyles = css({
  flex: 1,
})

const iconStyles = css({
  width: 4,
  height: 4,
})

const hiddenFileInputStyles = css({
  display: 'none',
})

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Download JSON blob as file
 *
 * @param json - JSON string to download
 * @param filename - Name of the downloaded file
 */
function downloadJSON(json: string, filename: string): void {
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

/**
 * Generate filename for export with timestamp
 *
 * @returns Filename with timestamp
 */
function generateExportFilename(): string {
  return `logo-design-${Date.now()}.json`
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * GalleryActions - Save/export/import functionality for logo designs
 *
 * Features:
 * - Save designs with custom names
 * - Export designs as JSON files
 * - Import designs from JSON files
 * - Loading states for async operations
 *
 * Note: Thumbnail generation is stubbed (see useThumbnailGenerator.ts)
 *
 * Layout:
 * - Save row: Name input + Save button
 * - Export/Import row: Export and Import buttons with loading states
 *
 * @status Production-ready
 * @see presetsStore.ts for storage logic
 * @see useThumbnailGenerator.ts for thumbnail stub
 *
 * @example
 * ```tsx
 * <GalleryActions />
 * ```
 */
export function GalleryActions() {
  // Store selectors
  const saveDesign = usePresetsStore((state) => state.saveDesign)
  const exportDesign = usePresetsStore((state) => state.exportDesign)
  const importDesign = usePresetsStore((state) => state.importDesign)
  const activeDesignId = usePresetsStore((state) => state.activeDesignId)
  const currentState = useLogoStore((state) => state)
  const isExporting = useUIStore((state) => state.isExporting)
  const isImporting = useUIStore((state) => state.isImporting)
  const setExporting = useUIStore((state) => state.setExporting)
  const setImporting = useUIStore((state) => state.setImporting)

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  // Event handlers
  const handleSave = () => {
    const name = nameInputRef.current?.value.trim()
    if (!name) {
      alert('Please enter a design name')
      return
    }

    saveDesign(name, currentState)
    if (nameInputRef.current) {
      nameInputRef.current.value = ''
    }
  }

  const handleExport = () => {
    if (!activeDesignId) {
      alert('No design selected to export')
      return
    }

    setExporting(true)
    try {
      const json = exportDesign(activeDesignId)
      if (json) {
        downloadJSON(json, generateExportFilename())
      }
    } finally {
      setExporting(false)
    }
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImporting(true)
    try {
      const text = await file.text()
      importDesign(text)
      alert('Design imported successfully!')
    } catch (error) {
      alert('Failed to import design. Please check the file format.')
      componentLogger.error({ error }, 'Failed to import design')
    } finally {
      setImporting(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className={containerStyles}>
      {/* Save New Design Row */}
      <div className={saveRowStyles}>
        <Input
          ref={nameInputRef}
          type='text'
          placeholder='Design name...'
          className={nameInputStyles}
        />
        <Button variant='primary' size='sm' onClick={handleSave}>
          <Icon name='plus' className={iconStyles} />
          Save
        </Button>
      </div>

      {/* Export/Import Row */}
      <div className={exportImportRowStyles}>
        <Button
          variant='secondary'
          size='sm'
          onClick={handleExport}
          disabled={!activeDesignId || isExporting}
          className={actionButtonStyles}
        >
          <Icon name='arrowdowntray' className={iconStyles} />
          {isExporting ? 'Exporting...' : 'Export'}
        </Button>

        <Button
          variant='secondary'
          size='sm'
          onClick={handleImportClick}
          disabled={isImporting}
          className={actionButtonStyles}
        >
          <Icon name='arrowuptray' className={iconStyles} />
          {isImporting ? 'Importing...' : 'Import'}
        </Button>

        <input
          ref={fileInputRef}
          type='file'
          accept='.json'
          onChange={handleFileChange}
          className={hiddenFileInputStyles}
        />
      </div>
    </div>
  )
}
