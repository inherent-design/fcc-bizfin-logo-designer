// ============================================================================
// IMPORTS
// ============================================================================

// External dependencies
import type { ReactNode } from 'react'

// Panda CSS
import { css } from 'styled-system/css'

// Types
import type { Vec2 } from '../schemas/logoState.schema'

// Utils
import { componentLogger } from '../utils/logger'

// Components
import { Button } from './ui/Button/Button'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * LayoutSettings component props
 */
interface LayoutSettingsProps {
  /** Array of quadrant configurations */
  quadrants: Array<{
    centerOffset: Vec2
    elementScale: number
  }>
  /** Actions for updating quadrant settings */
  actions: {
    setCenterOffset: (position: number, offset: Vec2) => void
    setElementScale: (position: number, scale: number) => void
  }
}

/**
 * SectionHeader component props
 */
interface SectionHeaderProps {
  /** Section title */
  title: string
  /** Optional header actions (e.g., reset button) */
  children?: ReactNode
}

/**
 * SliderControl component props
 */
interface SliderControlProps {
  /** Slider label text */
  label: string
  /** Current slider value */
  value: number
  /** Minimum value */
  min: number
  /** Maximum value */
  max: number
  /** Step increment */
  step: number
  /** Value change handler */
  onChange: (value: number) => void
  /** Reset button handler */
  onReset: () => void
  /** Unique ID for the slider input */
  id: string
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Quadrant display labels
 * Order: [TL, TR, BL, BR]
 */
const QUADRANT_LABELS = ['Top-Left', 'Top-Right', 'Bottom-Left', 'Bottom-Right']

// ============================================================================
// STYLES
// ============================================================================

const sectionHeaderStyles = css({
  fontSize: 'xs',
  fontFamily: 'brutalist',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: 'wider',
  color: 'panel.fg',
  opacity: 'subtle',
})

const sliderContainerStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'stack.tight',
})

const sliderHeaderStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const sliderLabelStyles = css({
  fontSize: 'sm',
  fontFamily: 'brutalist',
  color: 'panel.fg',
  opacity: 'medium',
})

const sliderValueContainerStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: 'inline.tight',
})

const sliderValueStyles = css({
  fontSize: 'xs',
  fontFamily: 'mono',
  color: 'panel.fg',
  opacity: 'muted',
})

const sliderInputStyles = css({
  width: '100%',
  cursor: 'pointer',
})

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * SectionHeader - Quadrant section header with optional actions
 */
function SectionHeader({ title, children }: SectionHeaderProps) {
  return (
    <div>
      <h3 className={sectionHeaderStyles}>{title}</h3>
      {children}
    </div>
  )
}

/**
 * SliderControl - Reusable slider with label, value display, and reset
 */
function SliderControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
  onReset,
  id,
}: SliderControlProps) {
  return (
    <div className={sliderContainerStyles}>
      <div className={sliderHeaderStyles}>
        <label htmlFor={id} className={sliderLabelStyles}>
          {label}
        </label>
        <div className={sliderValueContainerStyles}>
          <span className={sliderValueStyles}>{value.toFixed(1)}</span>
          <Button onClick={onReset} variant='ghost' size='sm' aria-label={`Reset ${label}`}>
            ↺
          </Button>
        </div>
      </div>
      <input
        id={id}
        name={id}
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={sliderInputStyles}
      />
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * LayoutSettings - Quadrant-based layout adjustment controls
 *
 * Features:
 * - Per-quadrant offset controls (X/Y)
 * - Per-quadrant scale controls
 * - Individual reset buttons
 * - Reset all button per quadrant
 *
 * Quadrants:
 * - 0: Top-Left
 * - 1: Top-Right
 * - 2: Bottom-Left
 * - 3: Bottom-Right
 *
 * @example
 * ```tsx
 * <LayoutSettings
 *   quadrants={quadrants}
 *   actions={{
 *     setCenterOffset,
 *     setElementScale
 *   }}
 * />
 * ```
 */
export function LayoutSettings({ quadrants, actions }: LayoutSettingsProps) {
  const handleOffsetChange = (position: number, axis: 'x' | 'y', value: number) => {
    componentLogger.debug({ position, axis, value }, 'Offset changed')
    const currentOffset = quadrants[position].centerOffset
    actions.setCenterOffset(position, {
      ...currentOffset,
      [axis]: value,
    })
  }

  const handleScaleChange = (position: number, scale: number) => {
    componentLogger.debug({ position, scale }, 'Scale changed')
    actions.setElementScale(position, scale)
  }

  const handleResetOffset = (position: number, axis: 'x' | 'y') => {
    componentLogger.debug({ position, axis }, 'Resetting offset')
    const currentOffset = quadrants[position].centerOffset
    actions.setCenterOffset(position, {
      ...currentOffset,
      [axis]: 0,
    })
  }

  const handleResetScale = (position: number) => {
    componentLogger.debug({ position }, 'Resetting scale')
    actions.setElementScale(position, 1.0)
  }

  const handleResetAllForQuadrant = (position: number) => {
    componentLogger.debug({ position }, 'Resetting all for quadrant')
    actions.setCenterOffset(position, { x: 0, y: 0 })
    actions.setElementScale(position, 1.0)
  }

  return (
    <div>
      {quadrants.map((quadrant, i) => {
        const { centerOffset, elementScale } = quadrant

        return (
          <div key={i}>
            <SectionHeader title={`Quadrant ${i + 1} (${QUADRANT_LABELS[i]})`}>
              <Button
                onClick={() => handleResetAllForQuadrant(i)}
                variant='ghost'
                size='sm'
                aria-label={`Reset all for ${QUADRANT_LABELS[i]}`}
              >
                Reset All
              </Button>
            </SectionHeader>

            <div>
              <SliderControl
                id={`layout-offset-x-q${i}`}
                label='Offset X'
                value={centerOffset.x}
                min={-160}
                max={160}
                step={0.1}
                onChange={(value) => handleOffsetChange(i, 'x', value)}
                onReset={() => handleResetOffset(i, 'x')}
              />

              <SliderControl
                id={`layout-offset-y-q${i}`}
                label='Offset Y'
                value={centerOffset.y}
                min={-160}
                max={160}
                step={0.1}
                onChange={(value) => handleOffsetChange(i, 'y', value)}
                onReset={() => handleResetOffset(i, 'y')}
              />

              <SliderControl
                id={`layout-scale-q${i}`}
                label='Scale'
                value={elementScale}
                min={0.5}
                max={2.0}
                step={0.05}
                onChange={(value) => handleScaleChange(i, value)}
                onReset={() => handleResetScale(i)}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
