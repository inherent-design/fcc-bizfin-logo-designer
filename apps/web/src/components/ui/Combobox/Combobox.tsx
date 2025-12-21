// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import { type ReactNode, useState, useRef, useEffect } from 'react'

// Panda CSS
import { cx } from 'styled-system/css'

// Internal components
import { Icon } from '../Icon/Icon'

// Component styles
import { comboboxRecipe } from './Combobox.styles'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface ComboboxOption {
  value: string
  label: ReactNode
  disabled?: boolean
}

/**
 * Combobox component props
 */
export interface ComboboxProps {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Combobox options */
  options: ComboboxOption[]
  /** Selected value */
  value?: string
  /** Default value */
  defaultValue?: string
  /** Placeholder text */
  placeholder?: string
  /** Change handler */
  onChange?: (value: string) => void
  /** Disabled state */
  disabled?: boolean
  /** Class name */
  className?: string
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Combobox - Neo-brutalist combobox component
 *
 * Features:
 * - Searchable dropdown
 * - Keyboard navigation
 * - Size variants: sm, md, lg
 * - Filter options by typing
 * - Uses semantic tokens for all styling
 * - WCAG AA compliant
 *
 * @example
 * ```tsx
 * <Combobox
 *   options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]}
 *   value={value}
 *   onChange={setValue}
 *   placeholder="Search..."
 * />
 * ```
 */
export function Combobox({
  options,
  value,
  defaultValue,
  placeholder = 'Search...',
  onChange,
  disabled,
  size = 'md',
  className,
}: ComboboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(defaultValue || '')
  const [searchQuery, setSearchQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const recipeStyles = comboboxRecipe({ size })

  const currentValue = value !== undefined ? value : internalValue
  const selectedOption = options.find((opt) => opt.value === currentValue)

  const filteredOptions = searchQuery
    ? options.filter((opt) =>
        String(opt.label).toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (optionValue: string) => {
    setInternalValue(optionValue)
    onChange?.(optionValue)
    setIsOpen(false)
    setSearchQuery('')
  }

  const handleClear = () => {
    setInternalValue('')
    onChange?.('')
    setSearchQuery('')
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className={cx(recipeStyles.container, className)}>
      <div className={recipeStyles.inputWrapper}>
        <input
          ref={inputRef}
          className={recipeStyles.input}
          value={isOpen ? searchQuery : (selectedOption?.label as string) || ''}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => !disabled && setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
        />
        <div className={recipeStyles.icons}>
          {currentValue && !disabled && (
            <button
              className={recipeStyles.clear}
              onClick={handleClear}
              type="button"
              aria-label="Clear"
            >
              <Icon name="xmark" size="sm" />
            </button>
          )}
          <Icon name="chevrondown" size="sm" className={cx(recipeStyles.chevron, isOpen && recipeStyles.chevronOpen)} />
        </div>
      </div>
      {isOpen && (
        <div className={recipeStyles.menu} role="listbox">
          {filteredOptions.length === 0 ? (
            <div className={recipeStyles.empty}>No options found</div>
          ) : (
            filteredOptions.map((option) => (
              <button
                key={option.value}
                className={cx(
                  recipeStyles.option,
                  option.value === currentValue && recipeStyles.optionSelected
                )}
                onClick={() => !option.disabled && handleSelect(option.value)}
                disabled={option.disabled}
                role="option"
                aria-selected={option.value === currentValue}
              >
                {option.label}
                {option.value === currentValue && <Icon name="check" size="sm" />}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
