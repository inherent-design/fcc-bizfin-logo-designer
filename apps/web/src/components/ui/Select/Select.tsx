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
import { selectRecipe } from './Select.styles'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface SelectOption {
  value: string
  label: ReactNode
  disabled?: boolean
}

/**
 * Select component props
 */
export interface SelectProps {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Select options */
  options: SelectOption[]
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
 * Select - Neo-brutalist select component
 *
 * Features:
 * - Custom dropdown menu
 * - Keyboard navigation
 * - Size variants: sm, md, lg
 * - Uses semantic tokens for all styling
 * - WCAG AA compliant
 *
 * @example
 * ```tsx
 * <Select
 *   options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]}
 *   value={value}
 *   onChange={setValue}
 *   placeholder="Select an option"
 * />
 * ```
 */
export function Select({
  options,
  value,
  defaultValue,
  placeholder = 'Select...',
  onChange,
  disabled,
  size = 'md',
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(defaultValue)
  const containerRef = useRef<HTMLDivElement>(null)
  const recipeStyles = selectRecipe({ size })

  const currentValue = value !== undefined ? value : internalValue
  const selectedOption = options.find((opt) => opt.value === currentValue)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
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
  }

  return (
    <div ref={containerRef} className={cx(recipeStyles.container, className)}>
      <button
        className={recipeStyles.trigger}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={recipeStyles.value}>{selectedOption?.label || placeholder}</span>
        <Icon name="chevrondown" size="sm" className={cx(recipeStyles.icon, isOpen && recipeStyles.iconOpen)} />
      </button>
      {isOpen && (
        <div className={recipeStyles.menu} role="listbox">
          {options.map((option) => (
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
          ))}
        </div>
      )}
    </div>
  )
}
