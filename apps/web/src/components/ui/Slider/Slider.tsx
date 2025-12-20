// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import { useId, type ComponentProps } from 'react'

// Component styles
import { sliderRecipe } from './Slider.styles'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Slider component props
 */
interface SliderProps extends Omit<ComponentProps<'input'>, 'type' | 'onChange'> {
  /** Label text for the slider */
  label: string
  /** Current value */
  value: number
  /** Callback when value changes */
  onChange: (value: number) => void
  /** Number of decimal places to show (default: 2) */
  decimals?: number
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Slider - Neo-brutalist range slider component
 *
 * Features:
 * - Label and value display
 * - Cross-browser thumb styling
 * - Uses semantic tokens for all styling
 * - Customizable decimal precision
 *
 * @example
 * ```tsx
 * <Slider
 *   label="Scale"
 *   value={1.5}
 *   min={0.5}
 *   max={2}
 *   step={0.1}
 *   onChange={(val) => setScale(val)}
 * />
 * ```
 */
export function Slider({
  label,
  value,
  onChange,
  decimals = 2,
  id: providedId,
  ...props
}: SliderProps) {
  const generatedId = useId()
  const inputId = providedId || generatedId
  const classes = sliderRecipe()

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <label htmlFor={inputId} className={classes.label}>
          {label}
        </label>
        <span className={classes.value}>{value.toFixed(decimals)}</span>
      </div>

      <input
        id={inputId}
        name={inputId}
        type='range'
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={classes.input}
        {...props}
      />
    </div>
  )
}
