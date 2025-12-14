import { css } from 'styled-system/css'
import { useRef } from 'react'
import { usePresetsStore } from '../../store/presetsStore'
import { useLogoStore } from '../../store/logoStore'
import { useUIStore } from '../../store/uiStore'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Input } from '../ui/Input'

export function GalleryActions() {
  const saveDesign = usePresetsStore((state) => state.saveDesign)
  const exportDesign = usePresetsStore((state) => state.exportDesign)
  const importDesign = usePresetsStore((state) => state.importDesign)
  const activeDesignId = usePresetsStore((state) => state.activeDesignId)
  const currentState = useLogoStore((state) => state)
  const isExporting = useUIStore((state) => state.isExporting)
  const isImporting = useUIStore((state) => state.isImporting)
  const setExporting = useUIStore((state) => state.setExporting)
  const setImporting = useUIStore((state) => state.setImporting)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

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
        const blob = new Blob([json], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `logo-design-${Date.now()}.json`
        a.click()
        URL.revokeObjectURL(url)
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
      console.error(error)
    } finally {
      setImporting(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        mb: 4,
      })}
    >
      {/* Save New Design */}
      <div className={css({ display: 'flex', gap: 2 })}>
        <Input
          ref={nameInputRef}
          type='text'
          placeholder='Design name...'
          className={css({ flex: 1 })}
        />
        <Button variant='primary' size='sm' onClick={handleSave}>
          <Icon name='plus' className={css({ width: 4, height: 4 })} />
          Save
        </Button>
      </div>

      {/* Export/Import */}
      <div className={css({ display: 'flex', gap: 2 })}>
        <Button
          variant='secondary'
          size='sm'
          onClick={handleExport}
          disabled={!activeDesignId || isExporting}
          className={css({ flex: 1 })}
        >
          <Icon name='download' className={css({ width: 4, height: 4 })} />
          {isExporting ? 'Exporting...' : 'Export'}
        </Button>

        <Button
          variant='secondary'
          size='sm'
          onClick={handleImportClick}
          disabled={isImporting}
          className={css({ flex: 1 })}
        >
          <Icon name='upload' className={css({ width: 4, height: 4 })} />
          {isImporting ? 'Importing...' : 'Import'}
        </Button>

        <input
          ref={fileInputRef}
          type='file'
          accept='.json'
          onChange={handleFileChange}
          className={css({ display: 'none' })}
        />
      </div>
    </div>
  )
}
